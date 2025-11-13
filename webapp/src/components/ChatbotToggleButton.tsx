import React from 'react';
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';

interface ChatbotToggleButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatbotToggleButton: React.FC<ChatbotToggleButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-indigo-500 z-50"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      aria-expanded={isOpen}
    >
      {isOpen ? <CloseIcon /> : <ChatIcon />}
    </button>
  );
};
