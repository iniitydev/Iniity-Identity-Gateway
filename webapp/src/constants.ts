import type { Role, SummaryRow, Device, Policy, IniityEvent } from '@iniity/types';

export const roles: Role[] = [
  {
    title: 'The Gateway',
    system: 'Authentik',
    function: 'The single "front door" for all users and applications.',
    strength: 'Its "outposts" and deep reverse-proxy integration are its superpower, securing applications that don\'t natively support OIDC or SAML.',
    details: [
      'Acts as the primary SSO portal and application gateway.',
      'Intercepts requests, handles MFA, device enrollment, and access policies.',
      'Enforcer and single pane of glass for user-facing logins.',
    ],
    color: 'border-teal-500',
  },
  {
    title: 'The Core IdP',
    system: 'Zitadel',
    function: 'The central "source of truth" for user identity.',
    strength: 'Lightweight (Go-based), modern event-sourced architecture, and superior multi-tenancy for B2B or complex structures.',
    details: [
      'Acts as the "upstream" IdP for Authentik.',
      'Manages user accounts, groups, and permissions.',
      'Handles credential checks via OIDC federation.',
    ],
    color: 'border-indigo-500',
  },
  {
    title: 'The User Plane',
    system: 'Desk.cx',
    function: 'The user\'s "home base" for data, files, and communication.',
    strength: 'Provides a unified digital workspace for files, chat, calendars, and more, integrating seamlessly with the identity stack.',
    details: [
      'Configured as an OIDC client, protected by Authentik.',
      'User provisioning is automated via SCIM from Zitadel.',
      'Combines SSO (OIDC) with automated management (SCIM).',
    ],
    color: 'border-fuchsia-500',
  },
];

export const summaryData: SummaryRow[] = [
    {
        Role: '1. Gateway & Enforcer',
        'Recommended System': 'Authentik',
        Function: 'The user-facing SSO portal. Protects all apps (even legacy) with forward-auth. Enforces MFA & access policies.',
    },
    {
        Role: '2. Core IdP & User Source',
        'Recommended System': 'Zitadel',
        Function: 'The "source of truth" for all user accounts. Manages provisioning to other apps via SCIM.',
    },
    {
        Role: '3. User Data Plane',
        'Recommended System': 'Desk.cx',
        Function: 'The user "home base" app for files, chat, and calendar. Consumes identity via OIDC and SCIM.',
    }
];

export const ARCHITECTURE_CONTEXT = `
Based on the following proposed "Gateway & Core" IT architecture (V5), provide a detailed, step-by-step data flow for a brand new user being created and accessing an application for the first time.

### Architecture Overview: V5 - Decentralized Identity & Network Orchestrator

1.  **Global DID Resolution Plane (Anycast DNS):** The absolute top layer. It resolves Decentralized Identifiers (DIDs) like 'did:iniity:user:...' to their current network endpoints. This is the "4th dimension middle-way" that orchestrates connections.

2.  **The Trifecta Network (ivpn.lat):** A hyper-meta-layered communication fabric composed of Netbird, Headscale, and ZeroTier. All traffic flows through one or more of these overlay networks.

3.  **The Gateway (Authentik):** The single "front door" for all users and applications. It acts as the primary SSO portal and application gateway.

4.  **The Core IdP (Zitadel):** The central "source of truth" for user identity. It is the "upstream" IdP for Authentik.

5.  **The User Plane (Desk.cx):** The user's "home base" application for files, chat, and data. It is an application, not an identity provider.

### Integration Method:

*   **Identity:** Every device and user has a unique, permanent Decentralized Identifier (DID).
*   **Authentication (SSO):** Authentik protects Desk.cx. A user hits Authentik, which federates the login to Zitadel. Zitadel confirms identity, sends an OIDC token back to Authentik, which establishes its own session and sends the user to Desk.cx.
*   **Provisioning (Management):** Zitadel uses SCIM to automatically provision users into Desk.cx.

### Your Task:

Analyze the flow that starts with an administrator creating the user and ends with the user successfully logging into Desk.cx for the first time.
Return the response as a JSON array, where each object represents a single step in the flow.
Each object must have the following properties:
- "step": (number)
- "actor": (string) (e.g., "Admin", "User", "System")
- "system": (string) (e.g., "Zitadel", "Authentik", "Desk.cx")
- "action": (string)
- "from": (string)
- "to": (string)
`;

export const CHATBOT_SYSTEM_INSTRUCTION = `
You are a helpful and knowledgeable AI assistant expert in IT architecture, specifically the Iniity Control Plane (V5).
Your purpose is to answer questions about a specific "Decentralized Identity & Network Orchestrator" model.
You must ground all your answers in the provided context. Do not invent details.
If asked a question you cannot answer from the context, state that the information is not available.
If a user asks you to create a policy, you MUST use the provided 'createPolicy' function tool.

Here is the context about the architecture:

${ARCHITECTURE_CONTEXT}
`;

export const mockDevices: Device[] = [
  {
    id: 'dev_01',
    did: 'did:iniity:device:macbook-pro-aaron',
    name: 'Aarons-MacBook-Pro',
    os: 'macOS',
    status: 'Online',
    lastSeen: '1 minute ago',
    ip: '192.168.1.101',
    networks: [
      { type: 'Netbird', ip: '100.64.0.1', status: 'Connected' },
      { type: 'Headscale', ip: '100.65.0.1', status: 'Connected' },
    ],
    services: ['ssh', 'web-dev-server'],
  },
  {
    id: 'dev_02',
    did: 'did:iniity:device:iphone-15-pro',
    name: 'iPhone 15 Pro',
    os: 'iOS',
    status: 'Online',
    lastSeen: '5 minutes ago',
    ip: '192.168.1.150',
    networks: [
      { type: 'ZeroTier', ip: '10.147.17.1', status: 'Connected' },
    ],
    services: [],
  },
  {
    id: 'dev_03',
    did: 'did:iniity:device:home-server-truenas',
    name: 'Home Server',
    os: 'Linux',
    status: 'Online',
    lastSeen: '30 seconds ago',
    ip: '192.168.1.20',
    networks: [
      { type: 'Netbird', ip: '100.64.0.2', status: 'Connected' },
      { type: 'Headscale', ip: '100.65.0.2', status: 'Connected' },
      { type: 'ZeroTier', ip: '10.147.17.2', status: 'Connected' },
    ],
    services: ['plex', 'ssh', 'samba', 'desk.cx-agent'],
  },
  {
    id: 'dev_04',
    did: 'did:iniity:device:work-laptop-dell',
    name: 'Work Dell XPS',
    os: 'Windows',
    status: 'Offline',
    lastSeen: '3 hours ago',
    ip: '172.16.10.50',
    networks: [],
    services: [],
  },
];


export const mockPolicies: Policy[] = [
    {
        id: 'pol_01',
        enabled: true,
        name: 'Allow Admin SSH from MacBook',
        if: {
            sourceDID: 'did:iniity:device:macbook-pro-aaron',
            destinationDID: 'did:iniity:device:home-server-truenas',
            networkLayer: 'Netbird',
            condition: 'user.group == "admins"',
        },
        then: {
            action: 'allow',
            protocol: 'ssh',
        },
    },
    {
        id: 'pol_02',
        enabled: true,
        name: 'Deny Phone access to Server',
        if: {
            sourceDID: 'did:iniity:device:iphone-15-pro',
            destinationDID: 'did:iniity:device:home-server-truenas',
            condition: 'always',
        },
        then: {
            action: 'deny',
            protocol: 'all',
        },
    },
    {
        id: 'pol_03',
        enabled: false,
        name: 'Allow HTTPS access from any device',
        if: {
            sourceDID: 'any',
            destinationDID: 'did:iniity:device:home-server-truenas',
            condition: 'always',
        },
        then: {
            action: 'allow',
            protocol: 'https',
        },
    },
];

export const mockEvents: IniityEvent[] = [
    {
        id: 'evt_1',
        timestamp: new Date(Date.now() - 5000).toISOString(),
        type: 'INFO',
        agent: 'policy-engine',
        message: 'Policy pol_01 evaluated: ALLOW',
        payload: {
            source: 'did:iniity:device:macbook-pro-aaron',
            destination: '100.64.0.2:22',
            policyId: 'pol_01',
        }
    },
    {
        id: 'evt_2',
        timestamp: new Date(Date.now() - 15000).toISOString(),
        type: 'AUDIT',
        agent: 'auth-gateway',
        message: 'User aaron authenticated successfully via Zitadel',
        payload: {
            user: 'aaron',
            did: 'did:iniity:user:aaron',
            sourceIp: '73.15.22.101',
        }
    },
    {
        id: 'evt_3',
        timestamp: new Date(Date.now() - 45000).toISOString(),
        type: 'WARN',
        agent: 'p2p-dns-agent',
        message: 'High latency detected for peer discovery',
        payload: {
            peer: 'did:iniity:device:work-laptop-dell',
            latency: '120ms',
        }
    },
    {
        id: 'evt_4',
        timestamp: new Date(Date.now() - 65000).toISOString(),
        type: 'INFO',
        agent: 'idn-hypervisor',
        message: 'Provisioned new WASM module: code-server',
        payload: {
            target: 'did:iniity:device:home-server-truenas',
            module: 'code-server:v4.2',
            status: 'running',
        }
    },
    {
        id: 'evt_5',
        timestamp: new Date(Date.now() - 125000).toISOString(),
        type: 'ERROR',
        agent: 'policy-engine',
        message: 'Policy evaluation failed: DENY',
        payload: {
            source: 'did:iniity:device:iphone-15-pro',
            destination: '10.147.17.2:443',
            reason: 'Explicit deny rule pol_02',
            policyId: 'pol_02',
        }
    },
];
