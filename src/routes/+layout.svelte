<script lang="ts">
  import { goto } from '$app/navigation';
  import '../app.css';

  let { children, data  } = $props();

  let { supabase, user } = $derived(data);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      goto('/auth')
    }
  };
</script>

<header>
  <a href="/"><h1 class="text-8xl">Doodlebug</h1></a>
</header>

{#if user}
  <button onclick={logout}>Log Out</button>
{/if}

{#if children}
  {@render children()}
{/if}
