import { randomUUID } from 'crypto';

import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { env } from '$env/dynamic/private';

import { db } from '$lib/server/db';

const memorySchema = z.object({
  slug: z.string(),
  caption: z.optional(z.string()),
  image: z.instanceof(File, { message: 'image is required'}),
  imageAltText: z.string(),
})

import type { PageServerLoad } from './$types';
import { memoriesTable } from '$lib/server/db/schema';

export const load = (async () => {
  const form = await superValidate(zod(memorySchema));
  return {
    form
  };
}) satisfies PageServerLoad;

const uploadImage = async (image: File) => {
      // upload the image to tigris
    const s3 = new S3Client({
      region: 'auto',
      endpoint: env.AWS_ENDPOINT_URL_S3,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
      }
    });

    const params = {
      Bucket: env.BUCKET_NAME,
      Key: image.name,
      Body: Buffer.from(await image.arrayBuffer()),
      ContentType: image.type
    };

    console.log('params', params);

    const putObjectCommand = new PutObjectCommand(params);

    try {
      const response = await s3.send(putObjectCommand);
      console.log('response', response);

      return {
        response,
        error: null
      };
    } catch (error) {
      console.error('error', error);
      return {
        response: null,
        error
      }
    }
}

export const actions = {
  default: async ({ request, locals: { user } }) => {

    if (!user) {
      return {
        error: 'You must be logged in to create a memory'
      }
    }

    const formData = await request.formData();
    console.log('formData', formData);
    const form = await superValidate(formData, zod(memorySchema));

    console.log('form', form);

    const { error, response } = await uploadImage(form.data.image);

    if (error) {
      return {
        form: withFiles(form),
        error: 'error uploading image'
      }
    }

    if (response) {
      // create a new memory record in the database
      const imageUrl = `${env.BASE_IMAGE_URL}/${form.data.image.name}`;

      console.log('imageUrl', imageUrl);

      const newMemoryOptions = {
        id: randomUUID(),
        userId: user.id,
        slug: form.data.slug,
        caption: form.data.caption,
        imageUrl,
        imageAltText: form.data.imageAltText
      };

      console.log('newMemoryOptions', newMemoryOptions);

      try {
        const newMemory = await db.insert(memoriesTable).values(newMemoryOptions);

        console.log('newMemory', newMemory);

        return {
          form: withFiles(form),
        }
      } catch (error) {
        console.error('error', error);
        return {
          form: withFiles(form),
          error: 'error saving memory'
        }
      }
    }
  }
}
