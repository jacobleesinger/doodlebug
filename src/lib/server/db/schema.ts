import { pgTable, pgSchema, text, uuid, timestamp, serial } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

// the supabase auth users table
// there are many other fields, but these are the only ones we interact with
export const authUsersTable = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const usersTable = pgTable('users', {
	id: uuid('id')
		.primaryKey()
		.references(() => authUsersTable.id),
	email: text('email').unique().notNull(),
	name: text('name').notNull()
});

export const memoriesTable = pgTable('memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').references(() => usersTable.id),
  number: serial('number').notNull(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  caption: text('caption'),
  imageUrl: text('imageUrl').notNull(),
  imageAltText: text('imageAltText').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
