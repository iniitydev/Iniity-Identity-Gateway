import dotenv from 'dotenv';

// Load environment variables from .env file, primarily for local development.
// In a production environment, variables should be injected directly by the runtime.
dotenv.config();

/**
 * Retrieves a required environment variable.
 * Throws an error if the variable is not set, ensuring the application fails fast
 * in case of a missing critical configuration.
 * @param key The name of the environment variable.
 * @returns The value of the environment variable.
 */
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`FATAL ERROR: Environment variable ${key} is not set.`);
  }
  return value;
};

const config = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || 'development',
  
  // These sensitive values are loaded from the environment.
  // In a production environment, these MUST be injected via a secure secret management system
  // (e.g., Kubernetes Secrets, AWS Secrets Manager, Docker Secrets)
  // and should NOT be present in a .env file. The getRequiredEnv function ensures
  // the application will not start without them.
  zitadelApiKey: getRequiredEnv('ZITADEL_API_KEY'),
  authentikApiToken: getRequiredEnv('AUTHENTIK_API_TOKEN'),
  
  // The database URL is also treated as a required secret.
  databaseUrl: getRequiredEnv('DATABASE_URL'),
};

export default config;
