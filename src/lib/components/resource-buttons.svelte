<script lang="ts">
  import { ManualResources } from "$lib/stores/manual-resources";
  import { Resources } from '$lib/stores/resources';


  let resourceButtons: string[];
  $: resourceButtons = Array.from(ManualResources.entries())
    .filter(([k, v]) => $Resources.get(k)?.unlocked)
    .map(([k, v]) => k);
  
  const handleClick = (name: string) => {
    let manualResource = ManualResources.get(name);
    
    if (manualResource) {
      if (manualResource.costIdentifier !== "Time") {
        Resources.decrement(manualResource.costIdentifier, manualResource.baseCost);
      }
      Resources.increment(name, manualResource.baseCost);
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