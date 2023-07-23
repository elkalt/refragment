<script lang="ts">
  import { ManualResourceStore } from "$lib/stores/manual-resource-store";
  import { ResourceStore } from '$lib/stores/resource-store';

  let resourceButtons: string[];
  $: resourceButtons = Array.from($ManualResourceStore.entries())
    .filter(([k, v]) => {
      return v.unlocked;
    })
    .map(([k, v]) => k);
  
  const handleClick = (name: string) => {
    let manualResource = $ManualResourceStore.get(name);

    if (manualResource) {
      for (let i = 0; i < manualResource.consumed.length; i++) {
        if (manualResource.consumed[i] !== "Time") {
          ResourceStore.decrement(manualResource.consumed[i], manualResource.baseCost[i]);
        }
      }
      for (let i = 0; i < manualResource.products.length; i++) {
        ResourceStore.increment(manualResource.products[i], manualResource.baseProduction[i]);
      }
    }
  }
</script>

<div class="button-container">
  {#each resourceButtons as name}
    <button on:click={() => handleClick(name)}>
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