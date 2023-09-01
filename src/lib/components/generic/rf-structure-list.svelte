<script lang="ts">
  import type { StructureListData } from "$lib/interfaces/structure-list-data";
  import { createEventDispatcher } from "svelte";
  import RfStructureManager from "./rf-structure-manager.svelte";
  
  export let title: string = "";
  export let columns: number;
  export let structureDataStore: Map<string, StructureListData>;

  let dispatch = createEventDispatcher();
</script>

{#if title.length > 0}
  <h2>{title}</h2>
{/if}
<div class="button-container" style:grid-template-columns="repeat({columns}, 1fr)">
  {#each structureDataStore.keys() as name}
    {@const structureData = structureDataStore.get(name)}
    {#if structureData && structureData.unlocked}
      <RfStructureManager
        on:click={(event) => dispatch("click", {name: name, amount: event.detail.amount})}
        structureData={structureData}>
      </RfStructureManager>
    {/if}
  {/each}
</div>