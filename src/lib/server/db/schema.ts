import { pgTable, pgSchema, serial, text, integer, uuid } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

// the supabase auth users table
// there are many other fields, but these are the only ones we interact with
export const authUser = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age')
});
