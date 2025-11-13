import React, { useState } from 'react';
import type { DataFlowStep } from '@iniity/types';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface DataFlowVisualizerProps {
  steps: DataFlowStep[];
}

export const DataFlowVisualizer: React.FC<DataFlowVisualizerProps> = ({ steps }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  };
  const handlePrev = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  };

  if (!steps || steps.length === 0) {
    return <p>No data flow steps to display.</p>;
  }

  const activeStep = steps[currentStepIndex];
  // Fix: Corrected typo from `active-Step.to` to `activeStep.to`.
  const activeSystems = [activeStep.from, activeStep.to].filter(s => s !== 'Admin' && s !== 'System');
  const activeFlow = { from: activeStep.from, to: activeStep.to };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <ArchitectureDiagram activeSystems={activeSystems} activeFlow={activeFlow} />
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 min-h-[120px]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-white">Step {activeStep.step}: {activeStep.system}</h3>
          <p className="text-sm font-mono text-gray-400">
            {currentStepIndex + 1} / {steps.length}
          </p>
        </div>
        <p className="text-gray-300">{activeStep.action}</p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeftIcon />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};