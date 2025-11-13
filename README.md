
<div align="center">
  <img src="https://raw.githubusercontent.com/user-attachments/assets/dd3571d8-f860-4963-8a9d-b8d4f6c4cd2e" width="120px" alt="Iniity Logo" />
  <h1 align="center">Iniity | The Identity Federation Platform</h1>
  <p align="center">
    <strong>A modern, interactive platform for designing, visualizing, and mastering next-generation identity federation architectures.</strong>
    <br />
    <br />
    <em>Powered by <a href="#-tech-stack">Google Gemini</a>, Ethr.Cloud Concepts, and AuthO.iD Principles.</em>
  </p>
  <p align="center">
    <a href="#">
      <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg"/>
    </a>
    <a href="#">
      <img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
    </a>
    <a href="#">
      <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg"/>
    </a>
  </p>
</div>

---

## The Challenge: A Crisis of Complexity

In today's distributed world, identity and access management (IAM) has become a labyrinth. Monolithic, legacy systems are too heavy, while a disorganized collection of modern tools creates redundancy, security gaps, and a nightmare of operational complexity. We are caught between old giants that can't adapt and new specialists that don't cooperate.

This is the problem **Iniity** was born to solve.

## The Vision: From the Desk of the Founder

> "We are moving beyond the era of monolithic identity providers. The future is a symphony of specialized services, each performing its role with precision and excellence. The challenge isn't a lack of tools, but a lack of a blueprint—a coherent philosophy for orchestrating them. Iniity is that blueprint, brought to life. It’s a tool for architects and a classroom for developers, designed to make the power of federated identity intuitive, visual, and accessible to all."
>
> — **Aaron Lyon Phillips Lubimiv**, Founder & Chief Architect of Iniity

## 🏛️ The Iniity Philosophy: The "Gateway & Core" Model

Iniity champions a clear, powerful architectural pattern: the **Federation of Specialists**. Instead of a single, overburdened system, we define non-overlapping roles, leveraging each component for its unique strength.

![Architecture Diagram](https://raw.githubusercontent.com/user-attachments/assets/b8398118-80e9-4674-8b6b-3e5f488ca8c8)

Our recommended framework consists of three distinct layers:

| Role                         | Recommended System | Core Function                                                                                              |
| ---------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **1. The Gateway & Enforcer**  | **Authentik**      | The user-facing SSO portal and application gateway. It protects all apps (even legacy ones) with forward-auth, enforces MFA, and manages access policies. |
| **2. The Core IdP & User Source** | **Zitadel**        | The lightweight, multi-tenant "source of truth" for all user accounts. It manages the core identity and provisions users to other applications via SCIM. |
| **3. The User Data Plane**     | **Nextcloud**      | The user's "home base" application for files, communication, and collaboration. It consumes identity via OIDC and is provisioned by the Core IdP. |

This model provides a clean separation of concerns, leveraging best-in-class, cloud-native tools to build a resilient, scalable, and manageable identity infrastructure.

## ✨ Key Features

-   **🎨 Interactive Architecture Diagram:** A dynamic, visual representation of the core components and their relationships.
-   **⚡ AI-Powered Data Flow Generation:** Witness complex processes unfold in real-time. With a single click, the Google Gemini API generates a step-by-step visualization of the new user journey, from creation in the IdP to their first successful login.
-   **🤖 Context-Aware AI Assistant:** Have a question about the architecture? Our integrated chatbot, powered by Gemini, is pre-loaded with the entire system context to provide you with instant, accurate answers.
-   **📊 Framework Role Analysis:** Explore detailed cards for each component, outlining their function, key strengths, and specific implementation details.
-   **📋 Data Export:** Easily export the framework summary to CSV for use in presentations, spreadsheets, and architectural documentation.

## 🚀 Getting Started

Experience the power of Iniity on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm (v9 or later)
-   A **Google Gemini API Key**. You can obtain one from [Google AI Studio](https://aistudio.google.com/).

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/iniity-platform.git
    cd iniity-platform
    ```

2.  **Install Dependencies:**
    This project is a monorepo. The following command installs dependencies for all packages from the root directory.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    The web application requires your Gemini API key. Create a `.env` file in the `webapp/` directory:
    ```bash
    # Location: ./webapp/.env
    API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```

4.  **Run the Development Server:**
    ```bash
    # Run this command from the root directory
    npm run dev --workspace=webapp
    ```
    Navigate to `http://localhost:5173` to see the application live.

## 🛠️ Tech Stack & Project Structure

Iniity is built with a modern, scalable tech stack, organized as a monorepo to manage interconnected services seamlessly.

-   **Frontend (`/webapp`):** React, TypeScript, Vite, Tailwind CSS
-   **AI Integration:** Google Gemini API (`@google/genai`)
-   **Backend (`/services`):** Node.js, Express, TypeScript (foundation for future logic)
-   **Shared Code (`/packages`):** Reusable types and utilities.

## 🔮 The Backend Vision: `identity-service`

Included in the `/services` directory is the `identity-service`, the seed of our future backend. While the current frontend operates directly with the Gemini API for visualization, this service is architected to become the "brain" of the operation.

**Future capabilities will include:**
-   Managing real OIDC and SCIM communication between services.
-   Providing a stateful API for configuring and managing the federation.
-   Orchestrating user provisioning workflows.

## 🤝 How to Contribute

We believe in the power of community to build revolutionary tools. Contributions are welcome and highly encouraged!

1.  **Fork** the repository.
2.  Create a new **feature branch** (`git checkout -b feat/my-amazing-feature`).
3.  **Commit** your changes (`git commit -m 'feat: Add some amazing feature'`).
4.  **Push** to the branch (`git push origin feat/my-amazing-feature`).
5.  Open a **Pull Request**.

Please report bugs, suggest features, or ask questions through **GitHub Issues**.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
<div align="center">
  <strong>Iniity.com | Ethr.Cloud | AuthO.iD</strong>
</div>
