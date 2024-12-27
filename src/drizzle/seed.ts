import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { faker } from '@faker-js/faker';

const pool = new Pool({
  connectionString: 'postgres://admin:admin@localhost:5432/drizzle',
  ssl: false,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const user = await db
          .insert(schema.users)
          .values({
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          })
          .returning();
        return user[0].id;
      }),
  );
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
