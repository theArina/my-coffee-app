<script lang="ts">
  import '$styles/Card.css';

  export let blendName: string;
  export let origin: string;
  export let variety: string;
  export let notes: string[];
  export let intensifier: string;
  export let image: string = undefined;
  export let imageStatus: string;
</script>

<div class="card">
  <img src={image} alt={imageStatus} class="card-img" />
  <h2>{blendName}</h2>
  <p><strong>Origin:</strong> {origin}</p>
  <p><strong>Variety:</strong> {variety}</p>
  <p><strong>Intensifier:</strong> {intensifier}</p>
  <div class="notes">
    {#each notes as note}
      <span class="note">{note}</span>
    {/each}
  </div>
</div>
