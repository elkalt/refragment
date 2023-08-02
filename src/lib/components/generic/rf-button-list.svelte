<script lang="ts">
  import type { ButtonData } from "$lib/interfaces/button-data";
  import { createEventDispatcher } from "svelte";
  import { ResourceStore } from "$lib/stores/resource-store";
  import Button from "./rf-button.svelte";

  export let header: string;
  export let columns: number;
  export let buttonStore: Map<string, ButtonData>;

  let dispatch = createEventDispatcher();

  let resourceInputSatisfaction: Map<string, boolean> = new Map<string, boolean>();
  $: {
    for (let name of buttonStore.keys()) {
      let button = buttonStore.get(name)!;
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

<h2>{header}</h2>
<div class="button-container" style:grid-template-columns="repeat({columns}, 1fr)">
  {#each buttonStore.keys() as name}
    {@const resourceData = buttonStore.get(name)}
    {#if resourceData && resourceData.unlocked}
      <Button
        on:click={() => dispatch("click", {name: name})}
        name={name}
        tooltip={resourceData.description}
        inputs={resourceData.inputs}
        products={resourceData.outputs}
        disabled={resourceData.disabled || resourceInputSatisfaction.get(name)?.valueOf() === false}
        />
    {/if}
  {/each}
</div>