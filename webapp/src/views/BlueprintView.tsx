import React, { useState, useCallback } from 'react';
import { RoleCard } from '../components/RoleCard';
import { SummaryTable } from '../components/SummaryTable';
import { ActionButton } from '../components/ActionButton';
import { Modal } from '../components/Modal';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { ExportIcon } from '../components/icons/ExportIcon';
import { FlowIcon } from '../components/icons/FlowIcon';
// Fix: Removed non-existent 'mockEvents' from import.
import { ARCHITECTURE_CONTEXT, roles, summaryData } from '../constants';
import { generateDataFlow, getQuickAnalysis } from '../services/geminiService';
// Fix: Removed unused 'IniityEvent' type import.
import type { Role, SummaryRow, DataFlowStep } from '@iniity/types';
import { DataFlowVisualizer } from '../components/DataFlowVisualizer';
import { BrainIcon } from '../components/icons/BrainIcon';


// Fix: Removed API key props as they are no longer needed.
export const BlueprintView: React.FC = () => {
  const [isDataFlowModalOpen, setIsDataFlowModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [analysisContent, setAnalysisContent] = useState('');
  const [analysisTitle, setAnalysisTitle] = useState('');

  const [dataFlowSteps, setDataFlowSteps] = useState<DataFlowStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDataFlow = useCallback(async () => {
    setIsDataFlowModalOpen(true);
    setIsLoading(true);
    setError(null);
    setDataFlowSteps([]);
    try {
      // Fix: Call service function without API key.
      const steps = await generateDataFlow(ARCHITECTURE_CONTEXT);
      setDataFlowSteps(steps);
    } catch (err) {
      setError('Failed to generate data flow. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateExportContent = () => {
    const headers = Object.keys(summaryData[0]).join(',');
    const rows = summaryData.map(row => 
      Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')
    );
    return [headers, ...rows].join('\n');
  };
  
  const handleExport = () => {
    setIsExportModalOpen(true);
  };
  
  const handleQuickAnalysis = useCallback(async (role: Role) => {
    setAnalysisTitle(`Quick Analysis: ${role.system}`);
    setIsAnalysisModalOpen(true);
    setAnalysisContent('');
    setIsLoading(true);
    try {
        // Fix: Call service function without API key.
        const result = await getQuickAnalysis(role.system, role.function);
        setAnalysisContent(result);
    } catch (err) {
        setAnalysisContent('An error occurred while generating the analysis.');
    } finally {
        setIsLoading(false);
    }
  }, []);

  return (
    <>
      <section className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Iniity Federation Model</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-400">
          A recommended framework leveraging each system for its unique strength, defining clear, non-overlapping roles to prevent redundancy and complexity.
        </p>
      </section>

      <ArchitectureDiagram />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
        {roles.map((role: Role) => (
            <div key={role.system} className="flex flex-col">
                <RoleCard {...role} />
                <button 
                    onClick={() => handleQuickAnalysis(role)}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 rounded-md text-indigo-300 hover:bg-gray-700 transition-all text-sm"
                    title={`Analyze ${role.system}`}
                >
                    <BrainIcon />
                    Quick Analysis
                </button>
            </div>
        ))}
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold text-center text-white mb-6">Framework Roles Summary</h3>
        <SummaryTable data={summaryData} />
      </section>

      <section className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <ActionButton onClick={handleExport} icon={<ExportIcon />} text="Export to Sheets" />
        <div className="relative">
          <ActionButton 
            onClick={handleGenerateDataFlow} 
            icon={<FlowIcon />} 
            text="Outline New User Data Flow" 
            primary 
          />
        </div>
      </section>

      <Modal isOpen={isDataFlowModalOpen} onClose={() => setIsDataFlowModalOpen(false)} title="New User Creation Data Flow" size="3xl">
        {isLoading && <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div></div>}
        {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
        {dataFlowSteps.length > 0 && (
          <DataFlowVisualizer steps={dataFlowSteps} />
        )}
      </Modal>

      <Modal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} title="Export Data (CSV Format)">
        <p className="mb-4 text-gray-400">Copy the content below and paste it into your favorite spreadsheet application.</p>
        <textarea
          readOnly
          className="w-full h-48 p-2 bg-gray-800 border border-gray-700 rounded-md text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={generateExportContent()}
        />
      </Modal>
      
      <Modal isOpen={isAnalysisModalOpen} onClose={() => setIsAnalysisModalOpen(false)} title={analysisTitle}>
          {isLoading ? (
              <div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>
          ) : (
              <p className="text-gray-300 whitespace-pre-wrap">{analysisContent}</p>
          )}
      </Modal>
    </>
  );
};