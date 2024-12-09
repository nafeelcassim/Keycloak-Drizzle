import { jsonb, pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './user';

export const profileInfo = pgTable('profile_info', {
  id: uuid('id').defaultRandom().primaryKey(),
  metadata: jsonb('metadata').notNull(),
  userId: uuid('user_Id').references(() => users.id),
});
