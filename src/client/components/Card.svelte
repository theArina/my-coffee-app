<script lang="ts">
  import '$styles/Card.css';
  import LoadingDots from './LoadingDots.svelte';
  import { onMount } from 'svelte';
  import { getImage } from '$api';

  export let blendName: string;
  export let origin: string;
  export let variety: string;
  export let notes: string[];
  export let intensifier: string;
  export let isFirstCardOnPage = false;

  let image: string | undefined;
  let imageStatus: 'loading' | 'success' | 'failure' = 'loading';

  const getImageAlt = (): string => {
    switch (imageStatus) {
      case 'failure':
        return `Failed to load "${blendName}" image :(`;
      case 'success':
        return `"${blendName}" image`;
    }
  };

  async function loadImage() {
    try {
      const res = await getImage(isFirstCardOnPage);
      image = res.file;
      imageStatus = `success`;
    } catch (e) {
      console.error('Failed to fetch image data:', e);
      imageStatus = 'failure';
    }
  }

  onMount(() => {
    loadImage();
  });
</script>

<div class="card">
  {#if imageStatus === 'loading'}
    <LoadingDots />
  {:else}
    <div class="image-container">
      <img src={image} alt={getImageAlt()} class="card-img" />
      {#if image}
        <div class="intensifier">{intensifier}</div>
      {/if}
    </div>
  {/if}
  <div class="card-content">
    <h2>{blendName}</h2>
    <p><strong>Origin:</strong> {origin}</p>
    <p><strong>Variety:</strong> {variety}</p>
    {#if imageStatus === 'failure'}
      <p><strong>Intensifier:</strong> {intensifier}</p>
    {/if}
    <div class="notes">
      {#each notes as note}
        <span class="note">{note}</span>
      {/each}
    </div>
  </div>
</div>
