import { index, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './user';

export const groups = pgTable('groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('first_name').notNull(),
});

export const usersToGroups = pgTable(
  'usersToGroups',
  {
    userId: uuid('user_id').references(() => users.id),
    groupId: uuid('group_id').references(() => groups.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIndex: index('userIdIndex').on(table.userId),
  }),
);
