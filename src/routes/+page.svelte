<script lang="ts">
  import '$lib/styles/app.scss'
  import ResourceList from '$lib/components/resource-list.svelte';
  import Fabrication from '$lib/components/fabrication.svelte';
  import ControlRoom from '$lib/components/control-room.svelte';

  let modules = [
    "Control Room",
    "Fabrication"
  ]

  let currentModule = "Control Room"
</script>

<div class=header>
  {#each modules as module}
    <button class="module" on:click={() => currentModule = module}>{ module }</button>
  {/each}
</div>

<div class='content-container'>
  <div class="resources"><ResourceList /></div>
  
  <div class="main-area">
    {#if currentModule === "Control Room"}
      <ControlRoom />
    {/if}
    {#if currentModule === "Fabrication"}
      <Fabrication />
    {/if}
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
    font-size: 1.1rem;
    border: 0px;
    border-bottom: 1px solid var(--accent)-light;
    cursor: pointer;
  }
}

.content-container {
  display: grid;
  padding-top: 2rem;
  grid-template-columns: 1fr 0.25fr 2fr 0.25fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  .resources { grid-area: 1 / 1 / 3 / 2; }
  .main-area { grid-area: 1 / 3 / 2 / 4; }
  // .upgrades { grid-area: 1 / 5 / 2 / 6; }
}
</style>