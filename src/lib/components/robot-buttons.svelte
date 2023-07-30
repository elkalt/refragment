<script lang="ts">
  import '$lib/styles/app.scss'
  import type { Robot } from '$lib/interfaces/robot';
  import { RobotStore } from "$lib/stores/robot-store";
  import { ResourceStore } from '$lib/stores/resource-store';
  import Button from "./generic/rf-button.svelte";
  import type { ButtonData } from '$lib/interfaces/button-data';

  let resourceButtons: ButtonData[];
  $: resourceButtons = Array.from($RobotStore.entries())
    .filter(([k, v]) => {
      return v.unlocked;
    })
    .map(([k, v]) => {
      return {
        name: k,
        inputs: mapInputs(v),
        outputs: mapOutputs(v),
        sustain: { interval: v.baseProductionInterval, totalTime: v.baseProductionTime },
       };
    });
  
  let resourceInputSatisfaction: Map<string, boolean> = new Map<string, boolean>();
  $: {
    for (let buttonData of resourceButtons) {
      let button = $RobotStore.get(buttonData.name)!;
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

  function mapInputs(resource: Robot): { input: string; amount: number }[] {
    let result: { input: string; amount: number }[] = [];
    for (let i = 0; i < resource.inputs.length; i++) {
      result.push({ input: resource.inputs[i], amount: resource.baseCost[i] });
    }
    return result;
  }

  function mapOutputs(resource: Robot): { output: string; amount: number }[] {
    let result: { output: string; amount: number }[] = [];
    for (let i = 0; i < resource.products.length; i++) {
      result.push({ output: resource.products[i], amount: resource.baseProduction[i] });
    }
    return result;
  }
</script>

<h2>Robots</h2>
<div class="button-container">
  {#each resourceButtons as buttonData}
  {@const resourceData = $RobotStore.get(buttonData.name)}
    {#if resourceData}
      <Button
        on:click={() => RobotStore.use(buttonData.name)}
        name={buttonData.name}
        tooltip={resourceData.description}
        inputs={buttonData.inputs}
        products={buttonData.outputs}
        disabled={resourceData.disabled || resourceInputSatisfaction.get(buttonData.name)?.valueOf() === false}
        sustain={buttonData.sustain}
        />
    {/if}
  {/each}
</div>