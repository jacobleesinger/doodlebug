<script lang="ts">
    import { superForm, fileProxy } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    
    export let data: PageData;

    const { form } = superForm(data.form);

    console.log('form', form);

    const file = fileProxy(form, 'image');
</script>

<main class="flex flex-col justify-center items-center container">
   <h2 class="text-2xl my-8">Add Memory</h2>
  <form class="flex flex-col justify-start items-start" method="POST" enctype="multipart/form-data">
    <section class="flex flex-col space-y-2 mb-4">
      <label for="title ">Title</label>
      <input type="text" name="title" bind:value={$form.title} required class="input input-bordered"/>
    </section>

    <section class="flex flex-col space-y-2 mb-4">
      <label for="slug ">Slug</label>
      <input type="text" name="slug" bind:value={$form.slug} required class="input input-bordered"/>
    </section>

    <section class="flex flex-col space-y-2 mb-4">
      <label for="caption">Caption</label>
      <textarea name="caption" bind:value={$form.caption} class="textarea textarea-bordered"></textarea>
    </section>

    <section class="flex flex-col space-y-2 mb-4">
      <label for="image">Image</label>
      <input type="file" accept="img/png, img/jpeg" name="image" bind:files={$file} class="input"/>
    </section>

    <section class="flex flex-col space-y-2 mb-4">
      <label for="imageAltText">Image Alt Text</label>
      <input type="text" name="imageAltText" bind:value={$form.imageAltText} required class="input input-bordered"/>
    </section>

    <section class="flex mt-4">
        <button class="btn btn-primary">Save</button>
    </section>
  </form>
</main>

