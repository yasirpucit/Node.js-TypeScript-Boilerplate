const { APP_NAME, DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV, PORT } = process.env;

const config = {
  server: {
    port: PORT || 3000,
  },
  database: {
    url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  },
  jwt: {
    secret: JWT_SECRET || 'ItsAJwtSecret',
    expiresIn: JWT_EXPIRES_IN || '1h',
  },
  app: {
    name: APP_NAME || 'Node Typescript',
    environment: NODE_ENV || 'development',
  },
};

export default config;
