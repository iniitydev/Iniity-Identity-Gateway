
export interface Role {
  title: string;
  system: string;
  function: string;
  strength: string;
  details: string[];
  color: string;
}

export interface SummaryRow {
  Role: string;
  'Recommended System': string;
  Function: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface DataFlowStep {
  step: number;
  actor: string;
  system: string;
  action: string;
  from: string;
  to: string;
}
