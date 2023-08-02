<script lang="ts">
  import { ResourceButtonStore } from "$lib/stores/resource-button-store";
  import { ResourceStore } from "$lib/stores/resource-store";
  import Button from "./generic/rf-button.svelte";

  let resourceInputSatisfaction: Map<string, boolean> = new Map<string, boolean>();
  $: {
    for (let name of $ResourceButtonStore.keys()) {
      let button = $ResourceButtonStore.get(name)!;
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

<h2>Actions</h2>
<div class="button-container">
  {#each $ResourceButtonStore.keys() as name}
    {@const resourceData = $ResourceButtonStore.get(name)}
    {#if resourceData && resourceData.unlocked}
      <Button
        on:click={() => ResourceButtonStore.use(name)}
        name={name}
        tooltip={resourceData.description}
        inputs={resourceData.inputs}
        products={resourceData.outputs}
        disabled={resourceData.disabled || resourceInputSatisfaction.get(name)?.valueOf() === false}
        />
    {/if}
  {/each}
</div>