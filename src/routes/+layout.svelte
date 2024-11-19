<script lang="ts">
    import '../app.css';

    let { children } = $props();
</script>

<header>
  <h1 class="text-8xl">Doodlebug</h1>
</header>

{#if children}
  {@render children()}
{/if}
