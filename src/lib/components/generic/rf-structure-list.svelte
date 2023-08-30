<script lang="ts">
  import type { Structure } from "$lib/interfaces/structure";
  import { createEventDispatcher } from "svelte";
  import { ResourceStore } from "$lib/stores/resource-store";
  import RfStructureManager from "./rf-structure-manager.svelte";

  export let title: string = "";
  export let columns: number;
  export let structureStore: Map<string, Structure>;

  let dispatch = createEventDispatcher();

  let resourceInputSatisfaction: Map<string, boolean> = new Map<string, boolean>();
  $: {
    for (let name of structureStore.keys()) {
      let button = structureStore.get(name)!;
      let satisfied = true;
      for (let input of button.inputs) {
        if (input.input === "Time") {
          continue;
        }
        if (input.amount > $ResourceStore.get(input.input)!.amount) {
          satisfied = false;
          break;
        }
      }
      resourceInputSatisfaction.set(name, satisfied);
    }
    resourceInputSatisfaction = new Map(resourceInputSatisfaction);
  }
</script>

{#if title.length > 0}
  <h2>{title}</h2>
{/if}
<div class="button-container" style:grid-template-columns="repeat({columns}, 1fr)">
  {#each structureStore.keys() as name}
    {@const structureData = structureStore.get(name)}
    {#if structureData && structureData.unlocked}
      <RfStructureManager
        on:click={(event) => dispatch("click", {name: name, amount: event.detail.amount})}
        structure={structureData}>
      </RfStructureManager>
    {/if}
  {/each}
</div>