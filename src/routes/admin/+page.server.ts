import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const memorySchema = z.object({
  slug: z.string(),
  caption: z.optional(z.string()),
  image: z.instanceof(File, { message: 'image is required'}),
  imageAltText: z.string(),
})

import type { PageServerLoad } from './$types';

export const load = (async () => {
  const form = await superValidate(zod(memorySchema));
  return {
    form
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    console.log('formData', formData);
    const form = await superValidate(formData, zod(memorySchema));

    console.log('form', form);
  }
}
