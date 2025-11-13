import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { ActionButton } from './ActionButton';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentKey: string | null;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose, onSave, currentKey }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (isOpen && currentKey) {
      setApiKey(currentKey);
    }
  }, [isOpen, currentKey]);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col animate-slide-in-up border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Configuration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-2">
                Gemini API Key
              </label>
              <input
                type="password"
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your API key"
              />
              <p className="mt-2 text-xs text-gray-500">
                Your key is stored securely in your browser's local storage and is never sent to our servers. Get your key from{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                  Google AI Studio
                </a>.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <ActionButton onClick={handleSave} text="Save Key" primary disabled={!apiKey.trim()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
