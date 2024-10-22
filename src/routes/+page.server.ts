import { desc } from 'drizzle-orm';

import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { memoriesTable } from '$lib/server/db/schema';

export const load = (async () => {
  const memories = await db.select().from(memoriesTable).orderBy(desc(memoriesTable.number)).execute();

  return {
    memories
  };
}) satisfies PageServerLoad;
