<script lang="ts">
  import { onMount } from 'svelte';
  import Card from './Card.svelte';

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

  async function loadCard() {
    loading = true;
    try {
      const resCoffee = await fetch('http://localhost:3000/api/coffee');
      if (!resCoffee.ok) throw new Error('Failed to fetch coffee data');
      const coffee = await resCoffee.json();
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
    } catch (error) {
      console.error('Error loading card:', error);
    }
    loading = false;
  }

  async function loadImage(cardIndex) {
    try {
      const resImage = await fetch('http://localhost:3000/api/image');
      if (!resImage.ok) throw new Error('Failed to fetch image data');
      const image = await resImage.json();
      cards[cardIndex].image = image.file;
      cards[cardIndex].imageStatus = `"${cards[cardIndex].blendName}" image`;
    } catch (error) {
      console.error('Error loading image:', error);
      cards[cardIndex].imageStatus = `Couldn't load "${cards[cardIndex].blendName}" image:(`;
    }
  }

  onMount(loadCard);
</script>

<div>
    {#each cards as card}
        <Card {...card}/>
    {/each}
    <button on:click={loadCard} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
    </button>
</div>
