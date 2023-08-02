<script lang="ts">
  import '$lib/styles/app.scss'
  import { RobotButtonStore } from "$lib/stores/robot-button-store";
  import { ResourceStore } from '$lib/stores/resource-store';
  import Button from "./generic/rf-button.svelte";
  
  let resourceInputSatisfaction: Map<string, boolean> = new Map<string, boolean>();
  $: {
    for (let name of $RobotButtonStore.keys()) {
      let button = $RobotButtonStore.get(name)!;
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

<h2>Robots</h2>
<div class="button-container">
  {#each $RobotButtonStore.keys() as name}
  {@const resourceData = $RobotButtonStore.get(name)}
    {#if resourceData}
      <Button
        on:click={() => RobotButtonStore.use(name)}
        name={name}
        tooltip={resourceData.description}
        inputs={resourceData.inputs}
        products={resourceData.outputs}
        disabled={resourceData.disabled || resourceInputSatisfaction.get(name)?.valueOf() === false}
        sustain={resourceData.sustain}
        />
    {/if}
  {/each}
</div>