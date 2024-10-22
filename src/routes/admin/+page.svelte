<script lang="ts">
    import SuperDebug, { superForm, fileProxy } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    
    export let data: PageData;

    const { form } = superForm(data.form);

    console.log('form', form);

    const file = fileProxy(form, 'image');
</script>

<main>
  <SuperDebug data={$form} />
  <form class="flex flex-col justify-start items-start" method="POST" enctype="multipart/form-data">
    <label for="title ">Title</label>
    <input type="text" name="title" bind:value={$form.title} required class="input input-bordered"/>

    <label for="slug ">Slug</label>
    <input type="text" name="slug" bind:value={$form.slug} required class="input input-bordered"/>

    <label for="caption">Caption</label>
    <textarea name="caption" bind:value={$form.caption} class="textarea textarea-bordered"></textarea>

    <label for="image">Image</label>
    <input type="file" accept="img/png, img/jpeg" name="image" bind:files={$file} class="input"/>

    <label for="imageAltText">Image Alt Text</label>
    <input type="text" name="imageAltText" bind:value={$form.imageAltText} required class="input input-bordered"/>

    <button class="btn btn-primary">Save</button>
  </form>
</main>

