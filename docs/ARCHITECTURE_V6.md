# Architecture V7: Technical Deep Dive

This document provides a detailed technical breakdown of the Iniity platform architecture. It has evolved to include a critical new pillar: a user-facing management plane. This completes the "Federation of Specialists" model by providing a clear, non-overlapping role for a Casdoor-inspired component, rebranded as the **Iniity User Center**.

## The Core Philosophy: A Tale of Two Planes

The V7 architecture perfects the separation of concerns between the **System Plane** (the "engine room") and the **User Plane** (the "cockpit").

-   **The System Plane (IdP):** This is the system's "source of truth"—what the system knows about a user. It is an API-first, developer-centric domain focused on security, reliability, and scalability. **Zitadel** is the exemplar for this role.
-   **The User Plane (Management UI):** This is the user's "control plane"—how the user sees and manages themselves. It is a UI-first, user-centric domain focused on clarity, accessibility, and empowerment. **The Iniity User Center** is the exemplar for this role.

## The Four Pillars of the V7 Architecture

1.  **The Gateway (Authentik): The Enforcer & Universal Reverse Proxy**
    -   **Function:** Remains the single, universal "front door" for all users and applications. It is the primary policy enforcement point for access control, MFA, and device enrollment.
    -   **Interaction:** It protects all user-facing applications, including `Desk.cx` and the new `Iniity User Center`. It relies on Zitadel for upstream identity verification, creating a robust chain of trust. Its "outpost" model allows it to secure applications that have no built-in authentication.

2.  **The Core IdP (Zitadel): The System of Record & API Hub**
    -   **Function:** Remains the ultimate, API-first "source of truth" for all identity data. This is where user accounts, credentials, and system-level permissions are securely stored and managed by administrators.
    -   **Interaction:** It is the powerful "engine" that the rest of the system queries. Authentik federates logins to it, and the Iniity User Center calls its APIs to perform user-initiated actions. It also acts as the central SCIM server for provisioning users into downstream applications like `Desk.cx`.

3.  **The User Center (Iniity User Center): The User's Cockpit**
    -   **Function:** This is the crucial user experience layer. It is the **universal user management fabric**—a dedicated, user-friendly web application where end-users manage their own digital identity.
    -   **Key Capabilities:**
        -   **Profile Management:** Update personal details (name, avatar, contact info).
        -   **Security Center:** Manage MFA devices (TOTP, WebAuthn), review security policies, and change passwords.
        -   **Session Management:** View and revoke active login sessions across all devices.
        -   **Application Consent:** Manage which third-party applications are authorized to access their data.
    -   **Interaction:** The User Center is an OIDC client protected by Authentik. Crucially, when a user performs an action (e.g., adds an MFA key), the User Center makes a secure, backend API call to Zitadel to persist that change in the core system of record. It is the beautiful **frontend** to the powerful **backend** that is Zitadel.

4.  **The User Plane (Desk.cx): The Digital Workspace**
    -   **Function:** Remains the user's "home base" for data, files, and communication. It is where work gets done.
    -   **Interaction:** It consumes identity from the federation but is not responsible for managing it. A user within `Desk.cx` would be seamlessly redirected to the `Iniity User Center` to manage their profile, creating a cohesive but functionally separate experience.

## The Policy Engine: Identity-Defined Networking (IDN)

A core concept within Iniity is the **Policy Engine**. This is not a single application but a distributed capability that governs access based on identity, not just network location.

-   **How it Works:** Policies are defined in a simple, human-readable format. These policies are evaluated in real-time by agents running on devices or at the gateway level.
-   **Example:** A policy could state, "Allow user 'aaron' to SSH into 'server-01' only from his registered MacBook Pro, between 9 AM and 5 PM." This combines user identity, device identity, and context (time) to make a decision.
-   **AI Integration:** The Policy Editor view demonstrates how Gemini can be used to translate natural language into these structured policies, making sophisticated security accessible to everyone.

## Why This Architecture is Superior

-   **No Redundancy:** Zitadel is the IdP engine; the User Center is the user's dashboard. They have distinct purposes and audiences. This avoids the "two sources of truth" problem entirely.
-   **World-Class User Experience:** End-users are provided with an intuitive, empowering interface for their identity, which is often a weakness of developer-centric IdPs.
-   **Enhanced Security Posture:** By giving users a clear and easy way to manage their sessions and MFA devices, they are empowered to take a more active role in their own security.
-   **Scalability & Flexibility:** The decoupled nature allows each component to be scaled and updated independently. You could swap out the User Center's backend from Zitadel to another IdP with minimal disruption to the user experience, as long as the APIs are met. This is a truly future-proof design.