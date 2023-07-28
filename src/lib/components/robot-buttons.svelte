<script lang="ts">
  import '$lib/styles/app.scss'
  import { RobotStore } from "$lib/stores/robot-store";
  import type { Robot } from '$lib/interfaces/robot';
  import Button from "./generic/rf-button.svelte";

  let resourceButtons: string[];
  $: resourceButtons = Array.from($RobotStore.entries())
    .filter(([k, v]) => {
      return v.unlocked;
    })
    .map(([k, v]) => k);

  function mapInputs(resource: Robot): { input: string; amount: number }[] {
    let result: { input: string; amount: number }[] = [];
    for (let i = 0; i < resource.inputs.length; i++) {
      result.push({ input: resource.inputs[i], amount: resource.baseCost[i] });
    }
    return result;
  }

  function mapProducts(resource: Robot): { output: string; amount: number }[] {
    let result: { output: string; amount: number }[] = [];
    for (let i = 0; i < resource.products.length; i++) {
      result.push({ output: resource.products[i], amount: resource.baseProduction[i] });
    }
    return result;
  }
</script>

<h2>Robots</h2>
<div class="button-container">
  {#each resourceButtons as name}
    {@const resourceData = $RobotStore.get(name)}
    {#if resourceData}
      <Button
        on:click={() => RobotStore.use(name)}
        name={name}
        tooltip={resourceData.description}
        inputs={mapInputs(resourceData)}
        products={mapProducts(resourceData)}
        sustain={{interval: resourceData.baseProductionInterval, totalTime: resourceData.baseProductionTime}}
        />
    {/if}
  {/each}
</div>

<style lang="scss">

</style>