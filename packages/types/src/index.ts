import type * as React from 'react';

export interface Role {
  title: string;
  system: string;
  function: string;
  strength: string;
  details: string[];
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
  generatedBy?: 'AI' | 'user';
  rationale?: string;
}

export interface IniityEvent {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';
  agent: 'idn-hypervisor' | 'p2p-dns-agent' | 'policy-engine' | 'auth-gateway';
  message: string;
  payload: Record<string, any>;
}

// Types for the new User Center View
export interface UserProfile {
    did: string;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
}

export interface UserSession {
    id: string;
    device: string;
    os: string;
    location: string;
    ip: string;
    lastAccessed: string;
    isCurrent: boolean;
}

export interface ConnectedApplication {
    id: string;
    name: string;
    logoUrl: string;
    description: string;
    scopes: string[];
    connectedAt: string;
}