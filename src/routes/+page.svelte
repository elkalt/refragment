<script lang="ts">
  import '$lib/styles/app.scss'
  import ResourceList from '$lib/components/resource-list.svelte';
  import ResourceButtons from '$lib/components/resource-buttons.svelte';
  import Replication from '$lib/components/replication.svelte';

  let modules = [
    "Main",
    "Replication"
  ]

  let currentModule = "Main"
</script>

<div class=header>
  {#each modules as module}
    <button class="module" on:click={() => currentModule = module}>{ module }</button>
  {/each}
</div>

<div class='content-container'>
  <div class="resources"><ResourceList /></div>
  
  <div class="main-area">
    {#if currentModule === "Main"}
      <ResourceButtons />
    {/if}
    {#if currentModule === "Replication"}
      <Replication />
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
  border-bottom: 1px solid $accent;

  .module {
    font-size: 1.1rem;
    border: 0px;
    border-bottom: 1px solid $accent-light;
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
  // .right { grid-area: 1 / 5 / 2 / 6; }
}
</style>