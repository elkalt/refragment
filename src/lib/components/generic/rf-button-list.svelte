<script lang="ts">
  import type { ButtonData } from "$lib/interfaces/button-data";
  import { createEventDispatcher } from "svelte";
  import { ResourcesStore } from "$lib/stores/resources-store";
  import Button from "./rf-button.svelte";

  export let title: string = "";
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
        if (input.amount > $ResourcesStore.get(input.input)!.amount) {
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
  {#each buttonStore.keys() as name}
    {@const ButtonData = buttonStore.get(name)}
    {#if ButtonData && ButtonData.unlocked}
      <Button
        on:click={() => dispatch("click", {name: name})}
        name={name}
        tooltip={ButtonData.description}
        inputs={ButtonData.inputs}
        products={ButtonData.outputs}
        cooldown={ButtonData.cooldown}
        sustain={ButtonData.sustain}
        disabled={ButtonData.disabled || resourceInputSatisfaction.get(name)?.valueOf() === false}
        />
    {/if}
  {/each}
</div>