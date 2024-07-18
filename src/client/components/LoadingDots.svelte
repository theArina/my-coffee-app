<script lang="ts">
  import '$styles/LoadingDots.css';

  const dots = Array(3).fill(0);
</script>

<div class="dots">
  {#each dots as _}
    <div class="dot"></div>
  {/each}
</div>
