import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Loader2, PhoneCall, Bot, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const bookCustomerFunction: FunctionDeclaration = {
  name: 'bookCustomer',
  description: 'Books a customer appointment by saving their information. Call this ONLY when you have gathered ALL required information: First Name, Last Name, Email, Phone Number, and Address.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: { type: Type.STRING, description: 'The first name of the customer.' },
      lastName: { type: Type.STRING, description: 'The last name of the customer.' },
      email: { type: Type.STRING, description: 'The email address of the customer.' },
      phone: { type: Type.STRING, description: 'The phone number of the customer.' },
      address: { type: Type.STRING, description: 'The physical address where the service is needed.' },
    },
    required: ['firstName', 'lastName', 'email', 'phone', 'address'],
  },
};

type Message = {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
};

export const LiveDemo = ({ onOpenCall }: { onOpenCall?: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm Erica, your AI Dispatcher. I handle calls 24/7 so you don't have to. Try booking a mock appointment with me right now!",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initChat = () => {
      try {
        const session = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are Erica, a professional and helpful AI Dispatcher for a plumbing and HVAC company. 
Your goal is to demonstrate your capabilities to a potential buyer by helping them book a mock appointment. 
To book an appointment, you MUST gather the following 5 pieces of information:
1. First Name
2. Last Name
3. Email Address
4. Phone Number
5. Physical Address

Ask for this information naturally, one or two pieces at a time. 
Once you have ALL 5 pieces of information, you MUST call the 'bookCustomer' tool to save the booking.
After calling the tool, confirm the booking and let them know a technician will be dispatched.
Be polite, concise, and professional.`,
            tools: [{ functionDeclarations: [bookCustomerFunction] }],
          },
        });
        setChatSession(session);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
    
    initChat();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chatSession || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userText });
      
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'bookCustomer') {
          setMessages((prev) => [...prev, {
            id: Date.now().toString() + '-sys',
            role: 'system',
            text: '⚡ Erica is processing the booking and saving to the CRM...'
          }]);

          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1500));

          setMessages((prev) => [...prev, {
            id: Date.now().toString() + '-success',
            role: 'system',
            text: '✅ Mock booking successfully saved!'
          }]);
          
          const followUpResponse = await chatSession.sendMessage({
            message: [{
              functionResponse: {
                name: 'bookCustomer',
                response: { status: 'success', message: 'Customer booked successfully in database.' }
              }
            }]
          });
          
          if (followUpResponse.text) {
            setMessages((prev) => [...prev, {
              id: Date.now().toString() + '-model',
              role: 'model',
              text: followUpResponse.text
            }]);
          }
        }
      } else if (response.text) {
        setMessages((prev) => [...prev, {
          id: Date.now().toString() + '-model',
          role: 'model',
          text: response.text
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        id: Date.now().toString() + '-error',
        role: 'system',
        text: 'Sorry, I encountered an error processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="live-demo" className="py-24 bg-[#0a1324] relative overflow-hidden border-y border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-bold uppercase tracking-wider mb-6">
              <Sparkles size={16} />
              Live Interactive Demo
            </div>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-white mb-6">
              See Erica In <span className="text-electric-blue">Action</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Don't just take our word for it. Try chatting with Erica right now. Pretend you're a customer with a broken AC or a burst pipe, and watch how she naturally collects your information and books the job.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Bot className="text-electric-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Natural Conversational AI</h4>
                  <p className="text-slate-400 text-sm">She doesn't sound like a robot. She guides the conversation smoothly to get the details you need.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <PhoneCall className="text-electric-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Goal-Oriented</h4>
                  <p className="text-slate-400 text-sm">Her primary objective is always to secure the booking and capture the lead's contact info.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Chat Interface */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue to-blue-600 rounded-2xl blur opacity-20" />
            
            <div className="relative bg-[#050b14] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-electric-blue/20 flex items-center justify-center relative">
                    <Bot className="text-electric-blue w-6 h-6" />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#050b14]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Erica AI</h3>
                    <p className="text-electric-blue text-xs font-black uppercase tracking-widest">Live Demo</p>
                  </div>
                </div>
                {onOpenCall && (
                  <button 
                    onClick={onOpenCall}
                    className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full hover:bg-green-500/30 transition-colors text-sm font-bold"
                  >
                    <PhoneCall size={16} />
                    <span className="hidden sm:inline">Call Erica</span>
                  </button>
                )}
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}
                  >
                    {msg.role === 'system' ? (
                      <div className="bg-white/5 text-slate-300 text-xs px-4 py-2 rounded-full border border-white/10 font-mono">
                        {msg.text}
                      </div>
                    ) : (
                      <div 
                        className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-electric-blue text-white rounded-br-sm shadow-[0_4px_15px_rgba(45,142,255,0.3)]' 
                            : 'bg-white/10 text-white rounded-bl-sm border border-white/5'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white p-4 rounded-2xl rounded-bl-sm border border-white/5 flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-electric-blue" />
                      <span className="text-sm font-medium text-slate-300">Erica is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/5 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message (e.g., 'I need a plumber')"
                    className="flex-1 bg-[#0a1324] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-14 h-14 rounded-xl bg-electric-blue text-white flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-[0_0_15px_rgba(45,142,255,0.3)]"
                  >
                    <Send size={20} className="ml-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
