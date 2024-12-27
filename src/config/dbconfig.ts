export function dbConfig() {
  return {
    connectionString: process.env.DB_URL,
    ssl: false,
  };
}
