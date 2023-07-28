<script lang="ts">
  import type { ManualResource } from "$lib/interfaces/manual-resource";
  import type { Resource } from "$lib/interfaces/resource";
  import { ManualResourceStore } from "$lib/stores/manual-resource-store";
  import { ResourceStore } from "$lib/stores/resource-store";
  import Button from "./generic/rf-button.svelte";

  let resourceButtons: string[];
  $: resourceButtons = Array.from($ManualResourceStore.entries())
    .filter(([k, v]) => v.unlocked)
    .map(([k, v]) => k);

  let resourceInputSatisfaction: Map<string, boolean> = new Map<string, boolean>();
  $: resourceInputSatisfaction = new Map<string, boolean>(
    Array.from($ManualResourceStore.entries())
      .filter(([k, v]) => v.unlocked)
      .map(([k, v]) => [k, areInputsFufilled(v, $ResourceStore)])
    );

  function mapInputs(resource: ManualResource): { input: string; amount: number }[] {
    let result: { input: string; amount: number }[] = [];
    for (let i = 0; i < resource.inputs.length; i++) {
      result.push({ input: resource.inputs[i], amount: resource.baseCost[i] });
    }
    return result;
  }

  function mapProducts(resource: ManualResource): { output: string; amount: number }[] {
    let result: { output: string; amount: number }[] = [];
    for (let i = 0; i < resource.products.length; i++) {
      result.push({ output: resource.products[i], amount: resource.baseProduction[i] });
    }
    return result;
  }

  function areInputsFufilled(resource: ManualResource, listener: Map<string, Resource>): boolean {
    // this takes the resource store as an input so that the reactive declaration will update when it changes
    let result = true;
    for (let i = 0; i < resource.inputs.length; i++) {
      if (resource.inputs[i] === "Time") {
        continue;
      }
      if (resource.baseCost[i] > $ResourceStore.get(resource.inputs[i])!.amount) {
        result = false;
        break;
      }
    }
    return result;
  }
</script>

<h2>Actions</h2>
<div class="button-container">
  {#each resourceButtons as name}
    {@const resourceData = $ManualResourceStore.get(name)}
    {#if resourceData}
      <Button
        on:click={() => ManualResourceStore.use(name)}
        name={name}
        tooltip={resourceData.description}
        inputs={mapInputs(resourceData)}
        products={mapProducts(resourceData)}
        disabled={resourceData.disabled || resourceInputSatisfaction.get(name)?.valueOf() === false}
        />
    {/if}
  {/each}
</div>