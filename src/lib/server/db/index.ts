import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
if (!env.POSTGRES_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.POSTGRES_URL);
export const db = drizzle(client);
