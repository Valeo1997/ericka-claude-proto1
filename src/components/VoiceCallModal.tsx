import React, { useState, useEffect, useRef } from 'react';
import { PhoneOff, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';

const bookCustomerFunction: FunctionDeclaration = {
  name: 'bookCustomer',
  description: 'Books a customer appointment by saving their information. Call this ONLY when you have gathered ALL required information: First Name, Last Name, Email, Phone Number, and Address.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: { type: Type.STRING },
      lastName: { type: Type.STRING },
      email: { type: Type.STRING },
      phone: { type: Type.STRING },
      address: { type: Type.STRING },
    },
    required: ['firstName', 'lastName', 'email', 'phone', 'address'],
  },
};

function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToFloat32(base64: string): Float32Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const int16Array = new Int16Array(bytes.buffer);
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / (int16Array[i] < 0 ? 0x8000 : 0x7FFF);
  }
  return float32Array;
}

export const VoiceCallModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<string>('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      startCall();
    } else {
      endCall();
    }
    return () => endCall();
  }, [isOpen]);

  const startCall = async () => {
    try {
      setStatus('connecting');
      setTranscript('');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;
      nextPlayTimeRef.current = audioCtx.currentTime;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, sampleRate: 16000 } });
      streamRef.current = stream;

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioCtx.destination);

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
          systemInstruction: "You are Erica, a professional AI Dispatcher for a plumbing company. Keep your responses concise and conversational. Ask for First Name, Last Name, Email, Phone, and Address to book an appointment.",
          tools: [{ functionDeclarations: [bookCustomerFunction] }],
        },
        callbacks: {
          onopen: () => {
            setStatus('connected');
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = floatTo16BitPCM(inputData);
              const base64 = arrayBufferToBase64(pcm16);
              sessionPromise.then((session: any) => {
                session.sendRealtimeInput({
                  media: { data: base64, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              playAudioChunk(base64Audio);
            }

            if (message.serverContent?.interrupted) {
              stopPlayback();
            }

            if (message.toolCall) {
              const call = message.toolCall.functionCalls[0];
              if (call.name === 'bookCustomer') {
                setTranscript('Booking appointment...');
                sessionPromise.then((session: any) => {
                  session.sendToolResponse({
                    functionResponses: [{
                      name: 'bookCustomer',
                      id: call.id,
                      response: { status: 'success', message: 'Booking saved successfully.' }
                    }]
                  });
                });
              }
            }
          },
          onerror: (err: any) => {
            console.error("Live API Error:", err);
            setStatus('error');
          },
          onclose: () => {
            setStatus('idle');
          }
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error("Failed to start call:", err);
      setStatus('error');
    }
  };

  const playAudioChunk = (base64: string) => {
    const audioCtx = audioContextRef.current;
    if (!audioCtx) return;

    const float32Data = base64ToFloat32(base64);
    const audioBuffer = audioCtx.createBuffer(1, float32Data.length, 24000);
    audioBuffer.getChannelData(0).set(float32Data);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);

    const startTime = Math.max(audioCtx.currentTime, nextPlayTimeRef.current);
    source.start(startTime);
    
    nextPlayTimeRef.current = startTime + audioBuffer.duration;
    
    activeSourcesRef.current.push(source);
    setIsSpeaking(true);
    
    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
      if (activeSourcesRef.current.length === 0) {
        setIsSpeaking(false);
      }
    };
  };

  const stopPlayback = () => {
    activeSourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    activeSourcesRef.current = [];
    setIsSpeaking(false);
    if (audioContextRef.current) {
      nextPlayTimeRef.current = audioContextRef.current.currentTime;
    }
  };

  const endCall = () => {
    stopPlayback();
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.then((s: any) => s.close()).catch(() => {});
      sessionRef.current = null;
    }
    setStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-[#0a1324] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/10 to-transparent pointer-events-none" />
          
          <div className="p-8 flex flex-col items-center text-center relative z-10">
            <h3 className="text-white font-display text-2xl mb-1">Erica AI</h3>
            <p className="text-electric-blue text-sm font-bold uppercase tracking-widest mb-12">
              {status === 'connecting' ? 'Connecting...' : status === 'connected' ? 'Call in Progress' : status === 'error' ? 'Connection Error' : 'Call Ended'}
            </p>

            <div className="relative mb-12">
              {isSpeaking && (
                <>
                  <div className="absolute inset-0 bg-electric-blue/20 rounded-full animate-ping" />
                  <div className="absolute -inset-4 bg-electric-blue/10 rounded-full animate-pulse" />
                </>
              )}
              <div className={`w-32 h-32 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${isSpeaking ? 'bg-electric-blue shadow-[0_0_40px_rgba(45,142,255,0.5)]' : 'bg-white/5 border border-white/10'}`}>
                <Bot className={`w-12 h-12 ${isSpeaking ? 'text-white' : 'text-electric-blue'}`} />
              </div>
            </div>

            {transcript && (
              <p className="text-slate-400 text-sm mb-8 h-10 flex items-center justify-center italic">
                {transcript}
              </p>
            )}

            <div className="flex items-center gap-6">
              <button 
                onClick={() => {
                  endCall();
                  onClose();
                }}
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all hover:scale-105"
              >
                <PhoneOff size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
