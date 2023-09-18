<script lang="ts">
  import '$lib/styles/app.scss'
  import RfResourceList from '$lib/components/generic/rf-resource-list.svelte';
  import Fabrication from '$lib/components/fabrication.svelte';
  import ControlRoom from '$lib/components/control-room.svelte';
  import PowerGeneration from '$lib/components/power-generation.svelte';
  import { TickManager } from '$lib/stores/tick-manager';
  import { ResourceStore } from '$lib/stores/resource-store';
  import { GeneratorStore } from '$lib/stores/generator-store';
  import { FabricatorStore } from '$lib/stores/fabricator-store';
  
  let modules = [
    "Power Generation",
    "Control Room",
    "Fabrication",
  ]

  let currentModule = "Control Room"
  setInterval(() => {
    TickManager.updateTick();
  }, $TickManager.tickSpeed);
</script>

<div class=header>
  {#each modules as module}
    <button class="module" on:click={() => currentModule = module}>{ module }</button>
  {/each}
</div>

<div class='content-container'>
  <div class="resources">
    <RfResourceList
      title="Resources"
      resourceStore={$ResourceStore}>
    </RfResourceList>
  </div>
  
  <div class="main-area">
    {#if currentModule === "Control Room"}
      <ControlRoom />
    {:else if currentModule === "Fabrication"}
      <Fabrication />
    {:else if currentModule === "Power Generation"}
      <PowerGeneration />
    {/if}
  </div>

  <div class="automatics">
    <div>
      <RfResourceList
        title="Generators"
        resourceStore={$GeneratorStore}>
      </RfResourceList>
    </div>
    <div>
      <RfResourceList
        title="Fabricators"
        resourceStore={$FabricatorStore}>
      </RfResourceList>
    </div>
  </div>
</div>

<style lang="scss">
@import '$lib/styles/variables.scss';
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--accent);

  .module {
    width: auto;
    font-size: 1.1rem;
    border: 0px;
    border-bottom: 1px solid var(--accent);
    cursor: pointer;
  }
}

.content-container {
  display: grid;
  padding-top: 2rem;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  .resources { grid-area: 1 / 1 / 2 / 2; }
  .main-area { grid-area: 1 / 2 / 2 / 3; }
  .automatics {
    grid-area: 1 / 3 / 2 / 4;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>