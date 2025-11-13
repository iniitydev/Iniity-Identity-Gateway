
import type { Role, SummaryRow } from './types';

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
    system: 'Nextcloud',
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
        'Recommended System': 'Nextcloud',
        Function: 'The user "home base" app for files, chat, and calendar. Consumes identity via OIDC and SCIM.',
    },
    {
        Role: '(Redundant)',
        'Recommended System': 'Keycloak',
        Function: 'Too heavy and complex if Zitadel is used. Solves the same problems in an older, less efficient way.',
    },
    {
        Role: '(Redundant)',
        'Recommended System': 'Casdoor',
        Function: 'Its CIAM/multi-tenancy role is already handled better by Zitadel\'s "Organizations" and SCIM features.',
    },
];

export const ARCHITECTURE_CONTEXT = `
Based on the following proposed "Gateway & Core" IT architecture, provide a detailed, step-by-step data flow for a brand new user being created and accessing an application for the first time.

### Architecture Overview:

1.  **The Gateway (Authentik):** The single "front door" for all users and applications. It acts as the primary SSO portal and application gateway, sitting in front of all other services (like Nextcloud). It handles MFA and access policies. It uses its "outposts" and reverse-proxy integration to secure applications.

2.  **The Core IdP (Zitadel):** The central "source of truth" for user identity. It is the "upstream" IdP for Authentik. It's where user accounts, groups, and permissions are actually managed. It's lightweight, built in Go, and has strong multi-tenancy features.

3.  **The User Plane (Nextcloud):** The user's "home base" application for files, chat, and data. It is an application, not an identity provider.

### Integration Method:

*   **Authentication (SSO):** Authentik protects Nextcloud. A user hits Authentik, which federates the login to Zitadel. Zitadel confirms identity, sends an OIDC token back to Authentik, which establishes its own session and sends the user to Nextcloud.
*   **Provisioning (Management):** Zitadel uses SCIM (System for Cross-domain Identity Management) to automatically provision users into Nextcloud. When a user is created in Zitadel, it automatically creates the user in Nextcloud, sets up their home folder, groups, and storage quota.

### Your Task:

Analyze the flow that starts with an administrator creating the user and ends with the user successfully logging into Nextcloud for the first time.
Return the response as a JSON array, where each object represents a single step in the flow.
Each object must have the following properties:
- "step": (number) The sequential step number.
- "actor": (string) The primary entity initiating the action (e.g., "Admin", "User", "System").
- "system": (string) The main system where the action takes place (e.g., "Zitadel", "Authentik", "Nextcloud").
- "action": (string) A concise description of the action being performed.
- "from": (string) The name of the component where the flow for this step originates (e.g., "Admin", "Zitadel", "Authentik"). Use "User" for the end-user.
- "to": (string) The name of the component where the flow for this step terminates (e.g., "Zitadel", "Nextcloud", "Authentik").

Example of a single step object:
{
  "step": 1,
  "actor": "Admin",
  "system": "Zitadel",
  "action": "An administrator creates a new user account in the Zitadel console, assigning them to a group with Nextcloud access.",
  "from": "Admin",
  "to": "Zitadel"
}
`;

export const CHATBOT_SYSTEM_INSTRUCTION = `
You are a helpful and knowledgeable AI assistant expert in IT architecture.
Your purpose is to answer questions about a specific proposed "Gateway & Core" IT architecture model.
You must ground all your answers in the provided context. Do not invent details.
If asked a question you cannot answer from the context, state that the information is not available in the provided architectural documents.

Here is the context about the architecture:

${ARCHITECTURE_CONTEXT}
`;