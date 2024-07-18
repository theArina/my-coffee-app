<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import '$styles/Alert.css';

  export let message: string;
  export let duration: number = 5000;

  let alertVisible = true;
  const dispatch = createEventDispatcher();

  onMount(() => {
    const timeout = setTimeout(() => {
      alertVisible = false;
      dispatch('close');
    }, duration);

    return () => clearTimeout(timeout);
  });

  function closeAlert() {
    alertVisible = false;
    dispatch('close');
  }
</script>

{#if alertVisible}
  <div class="alert">
    <span class="alert-icon">⚠️</span>
    <span class="alert-message">{message}</span>
    <button on:click={closeAlert} class="alert-close">&times;</button>
  </div>
{/if}
