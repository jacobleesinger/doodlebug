<script lang="ts">
  const { children, data  } = $props();
  import { goto } from '$app/navigation';

    const { supabase } = $derived(data);

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
	<nav>
		<a href="/">Home</a>
	</nav>
	<button onclick={logout}>Logout</button>
</header>
<main>
	{#if children}
    {@render children()}
  {/if}
</main>
