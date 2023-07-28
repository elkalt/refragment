<script lang="ts">
  import type { ManualResource } from "$lib/interfaces/manual-resource";
  import { ManualResourceStore } from "$lib/stores/manual-resource-store";
  import Button from "./generic/rf-button.svelte";

  let resourceButtons: string[];
  $: resourceButtons = Array.from($ManualResourceStore.entries())
    .filter(([k, v]) => v.unlocked)
    .map(([k, v]) => k);

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
        />
    {/if}
  {/each}
</div>