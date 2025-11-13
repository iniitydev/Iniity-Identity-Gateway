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

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: any[];
    }
  }
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
  groundingMetadata?: GroundingMetadata;
  policy?: Policy;
}

export interface DataFlowStep {
  step: number;
  actor: string;
  system: string;
  action: string;
  from: string;
  to: string;
}

export interface Device {
  id: string;
  did: string;
  name: string;
  os: 'macOS' | 'Windows' | 'Linux' | 'iOS' | 'Android';
  status: 'Online' | 'Offline' | 'Unmanaged';
  lastSeen: string;
  ip: string;
  networks: {
    type: 'Netbird' | 'Headscale' | 'ZeroTier';
    ip: string;
    status: 'Connected';
  }[];
  services: string[];
}

export interface Policy {
  id: string;
  enabled: boolean;
  name: string;
  if: {
    sourceDID: string;
    destinationDID: string;
    networkLayer?: 'Netbird' | 'Headscale' | 'ZeroTier' | 'any';
    condition: string;
  };
  then: {
    action: 'allow' | 'deny';
    protocol: 'ssh' | 'https' | 'all';
  };
}

export interface IniityEvent {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';
  agent: 'idn-hypervisor' | 'p2p-dns-agent' | 'policy-engine' | 'auth-gateway';
  message: string;
  payload: Record<string, any>;
}
