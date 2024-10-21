<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main>
  <form class="flex flex-col justify-start items-start" method="POST">
    <label>
      Slug
      <input type="text" name="slug" required class="input input-bordered"/>
    </label>
    <label>
      Caption
      <textarea name="caption" class="textarea textarea-bordered"></textarea>
    </label>

    <label>
      Image
      <input type="file" accept="img/*" name="image" class="input"/>
    </label>

    <button class="btn btn-primary">Save</button>
  </form>
</main>

