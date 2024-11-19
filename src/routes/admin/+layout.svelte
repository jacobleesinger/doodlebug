<script lang="ts">
  const { children  } = $props();

</script>


<main>
	{#if children}
    {@render children()}
  {/if}
</main>
