# Identity Service

This service is the core backend component responsible for handling the business logic related to identity federation, user management, and communication between the different parts of the architecture (Zitadel, Authentik, etc.).

## Tech Stack

-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Package Manager**: npm

## Project Structure

The service follows a standard layered architecture pattern:

-   `src/`: Contains all the source code for the service.
    -   `api/`: Defines the HTTP API layer (routes and controllers). This is the entry point for all incoming requests.
    -   `config/`: Manages environment variables and application configuration.
    -   `middleware/`: Holds Express middleware for tasks like authentication, logging, and error handling.
    -   `models/`: Contains data models and schemas (e.g., for users, roles, tenants).
    -   `services/`: Implements the core business logic, decoupled from the API layer.
    -   `utils/`: Provides shared utility functions, such as loggers or formatters.
-   `index.ts`: The main entry point for the application server.

## Getting Started

1.  **Navigate to the service directory:**
    ```sh
    cd services/identity-service
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Copy the `.env.example` to a new `.env` file and fill in the required values.
    ```sh
    cp .env.example .env
    ```
4.  **Run in development mode:**
    ```sh
    npm run dev
    ```
