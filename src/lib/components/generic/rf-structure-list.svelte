<script lang="ts">
  import type { StructureListData } from "$lib/interfaces/structure-list-data";
  import type { ButtonData } from "$lib/interfaces/button-data";
  import type { Resource } from "$lib/interfaces/resource";
  import { createEventDispatcher } from "svelte";
  import RfStructureManager from "./rf-structure-manager.svelte";
  import RfButtonList from "./rf-button-list.svelte";
  
  export let title: string = "";
  export let columns: number;
  export let structureButtonStore: Map<string, ButtonData>
  export let structureDataStore: Map<string, StructureListData>;
  export let structureStore: Map<string, Resource>;

  let dispatch = createEventDispatcher();
</script>

{#if title.length > 0}
  <h2>{title}</h2>
{/if}
<div class="structure-container">
  <div class="buttons-container">
    <RfButtonList
      columns={1}
      buttonStore={structureButtonStore}
      on:click={(event) => dispatch("button_click", {name: event.detail.name})}>
    </RfButtonList>
  </div>
  <div class="button-container" style:grid-template-columns="repeat({columns}, 1fr)">
    {#each structureDataStore.keys() as name}
      {@const structureData = structureDataStore.get(name)}
      {#if structureData && structureData.unlocked}
        <RfStructureManager
          on:click={(event) => dispatch("manager_click", {name: name, amount: event.detail.amount})}
          specializedName={name}
          structureData={structureData}
          structureStore={structureStore}>
        </RfStructureManager>
      {/if}
    {/each}
  </div>
</div>