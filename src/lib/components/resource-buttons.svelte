<script lang="ts">
  import type { ButtonData } from "$lib/interfaces/button-data";
  import type { ManualResource } from "$lib/interfaces/manual-resource";
  import type { Resource } from "$lib/interfaces/resource";
  import { ManualResourceStore } from "$lib/stores/manual-resource-store";
  import { ResourceStore } from "$lib/stores/resource-store";
  import Button from "./generic/rf-button.svelte";

  let resourceButtons: ButtonData[];
  $: resourceButtons = Array.from($ManualResourceStore.entries())
    .filter(([k, v]) => v.unlocked)
    .map(([k, v]) => {
      return {
        name: k,
        inputs: mapInputs(v),
        outputs: mapOutputs(v),
      };
    });

  let resourceInputSatisfaction: Map<string, boolean> = new Map<string, boolean>();
  $: {
    for (let buttonData of resourceButtons) {
      let button = $ManualResourceStore.get(buttonData.name)!;
      let satisfied = true;
      for (let i = 0; i < button.inputs.length; i++) {
        if (button.inputs[i] === "Time") {
          continue;
        }
        if (button.baseCost[i] > $ResourceStore.get(button.inputs[i])!.amount) {
          satisfied = false;
          break;
        }
      }
      resourceInputSatisfaction.set(buttonData.name, satisfied);
    } 
  }

  function mapInputs(resource: ManualResource): { input: string; amount: number }[] {
    let result: { input: string; amount: number }[] = [];
    for (let i = 0; i < resource.inputs.length; i++) {
      result.push({ input: resource.inputs[i], amount: resource.baseCost[i] });
    }
    return result;
  }

  function mapOutputs(resource: ManualResource): { output: string; amount: number }[] {
    let result: { output: string; amount: number }[] = [];
    for (let i = 0; i < resource.products.length; i++) {
      result.push({ output: resource.products[i], amount: resource.baseProduction[i] });
    }
    return result;
  }
</script>

<h2>Actions</h2>
<div class="button-container">
  {#each resourceButtons as buttonData}
    {@const resourceData = $ManualResourceStore.get(buttonData.name)}
    {#if resourceData}
      <Button
        on:click={() => ManualResourceStore.use(buttonData.name)}
        name={buttonData.name}
        tooltip={resourceData.description}
        inputs={buttonData.inputs}
        products={buttonData.outputs}
        disabled={resourceData.disabled || resourceInputSatisfaction.get(buttonData.name)?.valueOf() === false}
        />
    {/if}
  {/each}
</div>