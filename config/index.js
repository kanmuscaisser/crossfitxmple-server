import dotenv from 'dotenv';
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  host: process.env.CROSSFITXMPLE_SERVER_HOST || 'localhost',
  baseRoute: process.env.API_BASE_ROUTE || '/api',
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};

export { config };
