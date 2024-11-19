<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

  const { data } = $props();

  const { memories } = data;

  let memory = $state(memories[0]);

  const selectMemory = (number: number) => {
    const foundMemory = memories.find(memory => memory.number === number);
    if (foundMemory) {
      memory = foundMemory;
    }
  }

  const decrement = () => {
    if (memory.number > 1) {
      selectMemory(memory.number - 1);
    }
  }

  const increment = () => {
    if (memory.number < memories.length) {
      selectMemory(memory.number + 1);
    }
  }

  const goToFirst = () => {
    selectMemory(1);
  }

  const goToLast = () => {
    selectMemory(memories.length);
  }

  let isFirst = $derived(memory?.number === 1);
  let isLast = $derived(memory?.number === memories.length);

</script>

<main class="flex flex-col justify-center items-center container">
  {#if memory}
    <section class="flex flex-col justify-center items-center my-8 p-8 w-full">
      <section class="border-b-2 border-gray-300 pb-4 w-1/2 flex justify-space-around gray-500 space-x-2">
        <section class="flex-1 flex justify-start space-x-2">
          {#if !isFirst}
            <button class="btn-neutral" onclick={goToFirst} aria-label="first"><FontAwesomeIcon icon={faAnglesLeft} /></button>
            <button class="btn-neutral" onclick={decrement}><FontAwesomeIcon icon={faAngleLeft} /></button>
          {/if}
        </section>

        <h2 class="text-2xl flex-2 flex justify-center text-center">{memory.title}</h2>

        <section class="flex-1 flex justify-end space-x-2">
          {#if !isLast}
            <button class="btn-neutral" onclick={increment}><FontAwesomeIcon icon={faAngleRight} /></button>
            <button class="btn-neutral" onclick={goToLast}><FontAwesomeIcon icon={faAnglesRight} /></button>
          {/if}
        </section>
      </section>

      <img src={memory.imageUrl} alt={memory.imageAltText} class="max-w-2xl w-1/2 h-1/2 py-4" />
      <p class="text-lg w-1/2 text-center border-t-2 border-gray-300 pt-4">{memory.caption}</p>
    </section>
  {/if}
</main>

<style>
  p {
    font-family: 'Shadows Into Light', cursive;
  }
</style>
