import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
