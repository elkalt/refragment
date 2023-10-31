<script lang="ts">
  import '$lib/styles/app.scss'
  import { TickManager } from '$lib/stores/tick-manager';
  import { ResourcesStore } from '$lib/stores/resources-store';
  import { GeneratorStore } from '$lib/stores/generator-store';
  import { FabricatorStore } from '$lib/stores/fabricator-store';
  import RfResourceList from '$lib/components/generic/rf-resource-list.svelte';
  import Fabrication from '$lib/components/fabrication.svelte';
  import ControlRoom from '$lib/components/control-room.svelte';
  import PowerGeneration from '$lib/components/power-generation.svelte';
  import Config from '$lib/components/config.svelte';
  
  const modules = [
    "config",
    "Power Generation",
    "Control Room",
    "Fabrication",
  ]

  let currentModule = "config"
  setInterval(() => {
    TickManager.updateTick();
  }, $TickManager.tickSpeed);
</script>

<div class="header">
  <div class="module-container">
    {#each modules as module}
      {#if module !== "config"}
        <button
          style:border-bottom={module === currentModule ? "2px solid var(--accent-light)" : ""}
          on:click={() => currentModule = module}>
          { module }
        </button>
      {/if}
    {/each}
  </div>
  <div class="settings">
    <button
      on:click={() => currentModule = "config"}>
      <span class="material-symbols-outlined"
        style:font-weight={currentModule === "config" ? "700" : ""}>
        settings
      </span>
    </button>
  </div>
</div>

<div class="content-container">
  <div class="resources">
    <RfResourceList
      title="Resources"
      resourceStore={$ResourcesStore}>
    </RfResourceList>
  </div>
  
  <div class="main-area">
    {#if currentModule === "Control Room"}
      <ControlRoom />
    {:else if currentModule === "Fabrication"}
      <Fabrication />
    {:else if currentModule === "Power Generation"}
      <PowerGeneration />
    {:else if currentModule === "config"}
      <Config />
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
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--accent);

  .module-container {
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  
    button {
      width: auto;
      font-size: 1.1rem;
      border: 0px;
      border-bottom: 1px solid var(--accent);
    }
  }

  .settings {
    flex-grow: 0;
    flex-shrink: 1;
    margin-right: 1rem;
    cursor: pointer;

    button {
      border: 0px;
      font-size: 1.1rem;
    }
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