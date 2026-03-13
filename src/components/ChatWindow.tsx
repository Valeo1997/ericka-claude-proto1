import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, CheckCircle2, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { supabase } from '../lib/supabase';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const bookCustomerFunction: FunctionDeclaration = {
  name: 'bookCustomer',
  description: 'Books a customer appointment by saving their information to the database. Call this ONLY when you have gathered ALL required information: First Name, Last Name, Email, Phone Number, and Address.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: {
        type: Type.STRING,
        description: 'The first name of the customer.',
      },
      lastName: {
        type: Type.STRING,
        description: 'The last name of the customer.',
      },
      email: {
        type: Type.STRING,
        description: 'The email address of the customer.',
      },
      phone: {
        type: Type.STRING,
        description: 'The phone number of the customer.',
      },
      address: {
        type: Type.STRING,
        description: 'The physical address where the service is needed.',
      },
    },
    required: ['firstName', 'lastName', 'email', 'phone', 'address'],
  },
};

type Message = {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
};

export const ChatWindow = ({ onOpenCall }: { onOpenCall?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm Erica, your AI Dispatcher. How can I help you today? If you need to book an appointment, just let me know!",
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
    // Initialize chat session
    const initChat = () => {
      try {
        const session = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are Erica, a professional and helpful AI Dispatcher for a plumbing company. 
Your goal is to help customers and book appointments. 
To book an appointment, you MUST gather the following 5 pieces of information from the customer:
1. First Name
2. Last Name
3. Email Address
4. Phone Number
5. Physical Address

Ask for this information naturally, one or two pieces at a time. 
Once you have ALL 5 pieces of information, you MUST call the 'bookCustomer' tool to save the booking.
After calling the tool, confirm the booking with the customer and let them know a technician will be dispatched.
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

  const saveToSupabase = async (customerData: any) => {
    if (!supabase) {
      console.warn('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
      return { success: false, error: 'Database not configured' };
    }

    try {
      // Assuming you have a 'customers' or 'bookings' table
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            first_name: customerData.firstName,
            last_name: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            status: 'pending',
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      console.error('Error saving to Supabase:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chatSession || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    // Add user message to UI
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userText });
      
      // Check for function calls
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'bookCustomer') {
          const args = call.args as any;
          
          // Add a system message indicating we are saving
          setMessages((prev) => [...prev, {
            id: Date.now().toString() + '-sys',
            role: 'system',
            text: 'Saving booking information to database...'
          }]);

          // Save to Supabase
          const result = await saveToSupabase(args);
          
          // Send to Webhook
          try {
            await fetch('https://services.leadconnectorhq.com/hooks/xS6XtHTWs9JzkVQk6iwk/webhook-trigger/af0d3f11-c4fd-4159-969a-5596484152ff', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(args)
            });
          } catch (webhookError) {
            console.error('Error sending to webhook:', webhookError);
          }
          
          if (result.success) {
            setMessages((prev) => [...prev, {
              id: Date.now().toString() + '-success',
              role: 'system',
              text: '✅ Booking successfully saved to Supabase!'
            }]);
            
            // Send the function response back to the model so it can reply to the user
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
          } else {
             setMessages((prev) => [...prev, {
              id: Date.now().toString() + '-error',
              role: 'system',
              text: `❌ Failed to save booking: ${result.error}`
            }]);
            
            // Let the model know it failed
            const followUpResponse = await chatSession.sendMessage({
              message: [{
                functionResponse: {
                  name: 'bookCustomer',
                  response: { status: 'error', message: result.error }
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
        }
      } else if (response.text) {
        // Normal text response
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
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-electric-blue text-white flex items-center justify-center shadow-[0_0_20px_rgba(45,142,255,0.4)] hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh] bg-navy-slate border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center relative">
                  <MessageSquare className="text-electric-blue w-5 h-5" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy-slate" />
                </div>
                <div>
                  <h3 className="text-soft-white font-bold text-sm">Erica AI</h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-electric-blue text-[10px] font-black uppercase tracking-widest">Online</p>
                    <span className="text-white/20 text-[10px]">•</span>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${supabase ? 'text-green-400' : 'text-red-400'}`}>
                      {supabase ? 'DB Connected' : 'DB Offline'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onOpenCall && (
                  <button 
                    onClick={onOpenCall}
                    className="text-green-400 hover:text-green-300 bg-green-400/10 hover:bg-green-400/20 transition-colors p-2 rounded-full"
                    title="Call Erica"
                  >
                    <PhoneCall size={18} />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-cool-gray hover:text-white transition-colors p-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}
                >
                  {msg.role === 'system' ? (
                    <div className="bg-white/5 text-cool-gray text-xs px-4 py-2 rounded-full border border-white/10">
                      {msg.text}
                    </div>
                  ) : (
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-electric-blue text-white rounded-br-sm' 
                          : 'bg-white text-gray-900 rounded-bl-sm shadow-sm font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-electric-blue" />
                    <span className="text-xs text-gray-600 font-medium">Erica is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white border border-white/10 rounded-full px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-electric-blue/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-electric-blue text-white flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
