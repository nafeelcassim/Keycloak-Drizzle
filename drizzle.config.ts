import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://admin:admin@localhost:5432/drizzle',
  },
});
