<script lang="ts">
  import '$styles/CoffeeList.css';
  import { onMount } from 'svelte';
  import Card from './Card.svelte';
  import Alert from './Alert.svelte';
  import LoadingDots from './LoadingDots.svelte';
  import * as API from '$api';

  const INACTIVITY_TIME = 1000 * 30;

  interface CoffeeCard {
    blendName: string;
    origin: string;
    variety: string;
    notes: string[];
    intensifier: string;
    imageStatus: string;
    image?: string;
  }

  let cards: CoffeeCard[] = [];
  let loading = false;
  let isFirstCardOnPage = true;
  let timer: number;
  let error: string | null = null;

  async function loadCard() {
    loading = true;
    clearError();
    try {
      const coffee = await API.getCoffee(isFirstCardOnPage);
      cards = [
        ...cards,
        {
          blendName: coffee.blend_name,
          origin: coffee.origin,
          variety: coffee.variety,
          intensifier: coffee.intensifier,
          notes: coffee.notes.split(', '),
          imageStatus: `Loading "${coffee.blend_name}" image...`,
        },
      ];
      loadImage(cards.length - 1);
    } catch (e) {
      console.error('Failed to fetch coffee data:', e);
      loading = false;
      error = e.message;
    }
  }

  async function loadImage(cardIndex) {
    try {
      const image = await API.getImage(isFirstCardOnPage);
      cards[cardIndex].image = image.file;
      cards[cardIndex].imageStatus = `"${cards[cardIndex].blendName}" image`;
    } catch (e) {
      console.error('Failed to fetch image data:', e);
      cards[cardIndex].imageStatus =
        `Couldn't load "${cards[cardIndex].blendName}" image:(`;
    } finally {
      loading = false;
      isFirstCardOnPage = false;
    }
  }

  function setTimer() {
    timer = setInterval(() => {
      loadCard();
    }, INACTIVITY_TIME) as number;
  }

  function resetTimer() {
    clearInterval(timer);
    setTimer();
  }

  function clearError() {
    error = null;
  }

  onMount(() => {
    loadCard();

    setTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  });
</script>

<div>
  {#each cards as card}
    <Card {...card} />
  {/each}
  {#if loading || cards.length === 0}
    <LoadingDots />
  {:else}
    <button on:click={loadCard} class="load-more-button"> Load More</button>
  {/if}
  {#if error}
    <Alert message={error} on:close={clearError} />
  {/if}
</div>
