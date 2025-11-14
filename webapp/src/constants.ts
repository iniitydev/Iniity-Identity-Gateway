import type { Role, SummaryRow, Device, Policy, IniityEvent, UserProfile, UserSession, ConnectedApplication } from '@iniity/types';
import { BlueprintIcon } from './components/icons/BlueprintIcon';
import { TerminalIcon } from './components/icons/TerminalIcon';
import { DeviceIcon } from './components/icons/DeviceIcon';
import { PolicyIcon } from './components/icons/PolicyIcon';
import { UserCircleIcon } from './components/icons/UserCircleIcon';


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
    icon: TerminalIcon,
  },
  {
    title: 'The Core IdP',
    system: 'Zitadel',
    function: 'The central, API-first "source of truth" for user identity.',
    strength: 'Lightweight (Go-based), modern event-sourced architecture, and superior multi-tenancy for B2B or complex structures.',
    details: [
      'Acts as the "upstream" IdP for Authentik.',
      'Manages user accounts, groups, and permissions.',
      'System of record for all identity data.',
    ],
    color: 'border-indigo-500',
    icon: BlueprintIcon,
  },
   {
    title: 'The User Center',
    system: 'Iniity User Center',
    function: 'The universal user management fabric for the end-user.',
    strength: 'Provides a beautiful, intuitive UI for users to manage their own profile, security settings (MFA), active sessions, and application consents.',
    details: [
      'User-facing "cockpit" for personal identity management.',
      'Acts as a UI layer on top of Zitadel, calling its APIs.',
      'Extends the Desk.cx experience with a dedicated management portal.',
    ],
    color: 'border-sky-500',
    icon: UserCircleIcon,
  },
  {
    title: 'The User Plane',
    system: 'Desk.cx',
    function: 'The user\'s "home base" for data, files, and communication.',
    strength: 'Provides a unified digital workspace for files, chat, calendars, and more, integrating seamlessly with the identity stack.',
    details: [
      'Configured as an OIDC client, protected by Authentik.',
      'User provisioning is automated via SCIM from Zitadel.',
      'Focuses on application functionality, not identity management.',
    ],
    color: 'border-fuchsia-500',
    icon: DeviceIcon,
  },
];

export const summaryData: SummaryRow[] = [
    {
        Role: '1. Gateway & Enforcer',
        'Recommended System': 'Authentik',
        Function: 'The user-facing SSO portal. Protects all apps, enforces MFA & access policies.',
    },
    {
        Role: '2. Core IdP & System Source',
        'Recommended System': 'Zitadel',
        Function: 'The API-first "source of truth" for all user accounts. Manages provisioning to other apps via SCIM.',
    },
    {
        Role: '3. User Management Fabric',
        'Recommended System': 'Iniity User Center',
        Function: 'The user\'s personal "cockpit" to manage their profile, security, and sessions.',
    },
    {
        Role: '4. User Data Plane',
        'Recommended System': 'Desk.cx',
        Function: 'The user "home base" app for files, chat, and calendar. Consumes identity via OIDC.',
    }
];

export const ARCHITECTURE_CONTEXT = `
Based on the following proposed "Gateway & Core" IT architecture (V6), provide a detailed, step-by-step data flow for a brand new user being created and accessing an application for the first time.

### Architecture Overview: V6 - The User-Centric Management Fabric

1.  **The Gateway (Authentik):** The single "front door" for all users and applications. It acts as the primary SSO portal and application gateway, protecting all user-facing services.

2.  **The Core IdP (Zitadel):** The central, API-first "source of truth" for user identity. It is the "upstream" IdP for Authentik and the system of record for all user accounts, credentials, and system-level permissions. It is managed by administrators.

3.  **The User Center (Iniity User Center):** A user-facing management platform (inspired by Casdoor). This is the "cockpit" for end-users to manage their own profile, security settings (like MFA), view active sessions, and manage application consents. It interacts with Zitadel via APIs to persist changes.

4.  **The User Plane (Desk.cx):** The user's "home base" application for files, chat, and data. It is an application, not an identity provider.

### Integration Method:

*   **Authentication (SSO):** Authentik protects both Desk.cx and the Iniity User Center. A user accesses an app, is redirected to Authentik, which federates the login to Zitadel. Zitadel confirms identity, and the user is sent back to their target application.
*   **Provisioning (Management):** Zitadel uses SCIM to automatically provision users into Desk.cx. The User Center uses Zitadel's APIs to let users manage their own data within the source of truth.

### Your Task:

Analyze the flow that starts with an administrator creating the user and ends with the user successfully logging into Desk.cx for the first time.
Return the response as a JSON array, where each object represents a single step in the flow.
Each object must have the following properties:
- "step": (number)
- "actor": (string) (e.g., "Admin", "User", "System")
- "system": (string) (e.g., "Zitadel", "Authentik", "Desk.cx", "Iniity User Center")
- "action": (string)
- "from": (string)
- "to": (string)
`;

export const CHATBOT_SYSTEM_INSTRUCTION = `
You are a helpful and knowledgeable AI assistant expert in IT architecture, specifically the Iniity Control Plane (V6).
Your purpose is to answer questions about a specific "User-Centric Management Fabric" model.
You must ground all your answers in the provided context. Do not invent details.
If asked a question you cannot answer from the context, state that the information is not available.
If a user asks you to create a policy, you MUST use the provided 'createPolicy' function tool.

Here is the context about the architecture:

${ARCHITECTURE_CONTEXT}
`;

// ... (mockDevices, mockPolicies, mockEvents remain the same) ...

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

// Mock data for the User Center
export const mockUserProfile: UserProfile = {
    did: 'did:iniity:user:aaron-lubimiv',
    name: 'Aaron L. Phillips Lubimiv',
    email: 'aaron@iniity.com',
    avatarUrl: `https://i.pravatar.cc/150?u=aaron`,
    createdAt: '2023-01-15T10:00:00Z',
};

export const mockSessions: UserSession[] = [
    {
        id: 'session_1',
        device: 'Aarons-MacBook-Pro',
        os: 'macOS Sonoma',
        location: 'New York, USA',
        ip: '73.15.22.101',
        lastAccessed: new Date(Date.now() - 60000 * 5).toISOString(),
        isCurrent: true,
    },
    {
        id: 'session_2',
        device: 'iPhone 15 Pro',
        os: 'iOS 17.5',
        location: 'New York, USA',
        ip: '172.58.100.20',
        lastAccessed: new Date(Date.now() - 60000 * 60 * 2).toISOString(),
        isCurrent: false,
    },
];

export const mockApps: ConnectedApplication[] = [
    {
        id: 'app_1',
        name: 'Desk.cx',
        logoUrl: 'https://raw.githubusercontent.com/user-attachments/assets/b8398118-80e9-4674-8b6b-3e5f488ca8c8',
        description: 'Your personal data and collaboration hub.',
        scopes: ['profile', 'email', 'files.read', 'files.write'],
        connectedAt: '2023-02-01T12:00:00Z',
    },
    {
        id: 'app_2',
        name: 'Grafana',
        logoUrl: 'https://static-00.iconduck.com/assets.00/grafana-icon-512x575-ylaeo5a2.png',
        description: 'Analytics and monitoring for your personal network.',
        scopes: ['profile', 'email', 'metrics.read'],
        connectedAt: '2023-03-10T18:30:00Z',
    },
];
