import React, { useState, useEffect, useRef } from 'react';
import { getChatSession } from '../services/geminiService';
import { CHATBOT_SYSTEM_INSTRUCTION } from '../constants';
import type { ChatMessage, GroundingMetadata } from '@iniity/types';
import { SendIcon } from './icons/SendIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SourceIcon } from './icons/SourceIcon';
import { Chat } from '@google/genai';


interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Hello! I'm an AI assistant with expertise in the proposed IT architecture. How can I help you today?" }],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<Chat | null>(null);

  useEffect(() => {
    if (!chatInstance.current) {
      chatInstance.current = getChatSession(CHATBOT_SYSTEM_INSTRUCTION);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatInstance.current) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatInstance.current.sendMessage(currentInput);
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      const modelMessage: ChatMessage = { 
        role: 'model', 
        parts: [{ text: response.text }],
        groundingMetadata,
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: 'Sorry, I encountered an error. Please check your API key and try again.' }],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  const renderSources = (metadata?: GroundingMetadata) => {
    if (!metadata?.groundingChunks?.length) return null;

    const webSources = metadata.groundingChunks.filter(c => c.web);

    if (webSources.length === 0) return null;

    return (
        <div className="mt-2 pt-2 border-t border-gray-600">
            <h4 className="text-xs font-bold text-gray-400 mb-1 flex items-center gap-1.5">
                <SourceIcon />
                Sources
            </h4>
            <ul className="text-xs space-y-1">
                {webSources.map((chunk, index) => (
                    <li key={index}>
                        <a 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:underline truncate block"
                        >
                            {chunk.web.title || chunk.web.uri}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-out animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbot-title"
    >
        <div 
            className="fixed bottom-20 right-6 w-[calc(100%-3rem)] sm:w-96 h-[70vh] max-h-[600px] bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-2xl flex flex-col border border-gray-700 transition-transform duration-300 ease-out transform animate-slide-in-up"
            onClick={(e) => e.stopPropagation()}
        >
            <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                <h3 id="chatbot-title" className="font-bold text-white">AI Operator</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white md:hidden" aria-label="Close chat">
                    <CloseIcon />
                </button>
            </header>
            
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg px-4 py-2 shadow ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.parts[0].text.replace(/\n/g, '<br />') }} />
                            {msg.role === 'model' && renderSources(msg.groundingMetadata)}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-gray-700 flex-shrink-0">
                <div className="flex items-center bg-gray-800/50 rounded-lg ring-1 ring-gray-700 focus-within:ring-indigo-500">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask the AI Operator..."
                        className="w-full bg-transparent p-3 text-gray-300 placeholder-gray-500 focus:outline-none"
                        disabled={isLoading}
                        aria-label="Chat input"
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="p-3 text-indigo-400 disabled:text-gray-600 disabled:cursor-not-allowed hover:text-indigo-300 transition-colors" aria-label="Send message">
                        <SendIcon />
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};
