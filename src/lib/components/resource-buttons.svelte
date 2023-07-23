<script lang="ts">
  import { ManualResources } from "$lib/definitions/manual-resources";
  import { ResourceStore } from '$lib/stores/resource-store';

  let resourceButtons: string[];
  $: resourceButtons = Array.from(ManualResources.entries())
    .filter(([k, v]) => {
      for (let product of v.products) {
        if (!$ResourceStore.get(product)?.unlocked) {
          return false;
        }
      }
      return true;
    })
    .map(([k, v]) => k);
  
  const handleClick = (name: string) => {
    let manualResource = ManualResources.get(name);

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
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: center;

    button {
      background-color: transparent;
      padding: 1rem;
      cursor: pointer;
      border: 1px solid $accent;
    }
  }
</style>