<script lang="ts">
  import { ManualResources } from "$lib/definitions/manual-resources";
  import { ResourceStore } from '$lib/stores/resource-store';

  let resourceButtons: string[];
  $: resourceButtons = Array.from(ManualResources.entries())
    .filter(([k, v]) => $ResourceStore.get(k)?.unlocked)
    .map(([k, v]) => k);
  
  const handleClick = (name: string) => {
    let manualResource = ManualResources.get(name);
    
    if (manualResource) {
      if (manualResource.costIdentifier !== "Time") {
        ResourceStore.decrement(manualResource.costIdentifier, manualResource.baseCost);
      }
      ResourceStore.increment(name, manualResource.baseProduction);
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
    flex-direction: column;
    gap: 1rem;

    button {
      background-color: transparent;
      padding: 1rem;
      cursor: pointer;
      border: 1px solid $accent;
    }
  }
</style>