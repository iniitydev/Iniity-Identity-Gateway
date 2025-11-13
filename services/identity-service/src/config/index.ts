import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || 'development',
  zitadelApiKey: process.env.ZITADEL_API_KEY,
  authentikApiToken: process.env.AUTHENTIK_API_TOKEN,
  databaseUrl: process.env.DATABASE_URL,
};

export default config;
