import React, { useState } from 'react';
import { MainHeader } from './components/MainHeader';
import { Chatbot } from './components/Chatbot';
import { ChatbotToggleButton } from './components/ChatbotToggleButton';
import { BlueprintView } from './views/BlueprintView';
import { OperationsView } from './views/OperationsView';
import { FleetView } from './views/FleetView';
import { PolicyEditorView } from './views/PolicyEditorView';

export type AppView = 'Blueprint' | 'Operations' | 'Fleet' | 'Policies';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeView, setActiveView] = useState<AppView>('Blueprint');
  
  const renderView = () => {
    switch(activeView) {
      case 'Blueprint':
        return <BlueprintView />;
      case 'Operations':
        return <OperationsView />;
      case 'Fleet':
        return <FleetView />;
      case 'Policies':
        return <PolicyEditorView />;
      default:
        return <BlueprintView />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-300 flex flex-col">
      <MainHeader 
        activeView={activeView} 
        setActiveView={setActiveView}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderView()}
      </main>

      <footer className="text-center p-6 text-gray-500 border-t border-gray-800 mt-12">
        <p>© Iniity.com | Ethr.Cloud | AuthO.iD</p>
      </footer>
      
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
      <ChatbotToggleButton isOpen={isChatOpen} onClick={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default App;