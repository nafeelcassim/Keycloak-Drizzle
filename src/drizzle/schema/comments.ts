import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './user';
import { posts } from './posts';
import { relations } from 'drizzle-orm';

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  text: text('first_name').notNull(),
  authorId: uuid('author_id').references(() => users.id),
  postId: uuid('post_id').references(() => posts.id),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
}));
