<script lang="ts">
  import { ManualResourceStore } from "$lib/stores/manual-resource-store";

  let resourceButtons: string[];
  $: resourceButtons = Array.from($ManualResourceStore.entries())
    .filter(([k, v]) => v.unlocked)
    .map(([k, v]) => k);
</script>

<h2>Actions</h2>
<div class="button-container">
  {#each resourceButtons as name}
    <button on:click={() => ManualResourceStore.use(name)}>
      { name }
    </button>
  {/each}
</div>

<style lang="scss">
  @import "$lib/styles/variables.scss";
  .button-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      background-color: transparent;
      padding: 1rem;
      cursor: pointer;
      border: 1px solid $accent;
    }
  }
</style>