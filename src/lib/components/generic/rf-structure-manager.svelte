<script lang="ts">
  import type { StructureListData } from "$lib/interfaces/structure-list-data";
  import type { Resource } from "$lib/interfaces/resource";
  import { createEventDispatcher } from "svelte";

  export let specializedName: string;
  export let structureData: StructureListData;
  export let structureStore: Map<string, Resource>;

  let activeHovered = false;
  let oneHovered = false;
  let tenHovered = false;
  let minusOneHovered = false;
  let minusTenHovered = false;
  
  let structure: Resource;
  $: structure = structureStore.get(structureData.structure)!

  let active: number;
  $: active = structureData.created.length;

  let dispatch = createEventDispatcher();
</script>

<div class="structure-container"
  role="status"
  on:mouseenter={() => activeHovered = true}
  on:mouseleave={() => activeHovered = false}>
  <div class="info-container">
    <div>{specializedName}</div>
    <div class="sub-info">Active: {active} / {structure.amount}</div>
  </div>
  {#if activeHovered}
    <div class="exchange-container">
      <div class="resource-container">
        {#each structureData.inputs as input}
          <div>{input.amount * active} {input.input}</div>
        {/each}
      </div>
      ->
      <div class="resource-container">
        {#each structureData.outputs as output}
          <div>{output.amount * active} {output.output}</div>
        {/each}
      </div>
    </div>
  {/if}
  <div class="adjust-container">
    <button
      on:mouseenter={() => oneHovered = true}
      on:focus={() => oneHovered = true}
      on:mouseleave={() => oneHovered = false}
      on:focusout={() => oneHovered = false}
      on:click={() => dispatch("click", {amount: 1})}>
      {oneHovered ? "+1" : "+"}
    </button>
    <button
      on:mouseenter={() => tenHovered = true}
      on:focus={() => tenHovered = true}
      on:mouseleave={() => tenHovered = false}
      on:focusout={() => tenHovered = false}
      on:click={() => dispatch("click", {amount: 10})}>
      {tenHovered ? "+10" : "++"}
    </button>
    <button
      on:mouseenter={() => minusOneHovered = true}
      on:focus={() => minusOneHovered = true}
      on:mouseleave={() => minusOneHovered = false}
      on:focusout={() => minusOneHovered = false}
      on:click={() => dispatch("click", {amount: -1})}>
      {minusOneHovered ? "-1" : "-"}
    </button>
    <button
      on:mouseenter={() => minusTenHovered = true}
      on:focus={() => minusTenHovered = true}
      on:mouseleave={() => minusTenHovered = false}
      on:focusout={() => minusTenHovered = false}
      on:click={() => dispatch("click", {amount: -10})}>
      {minusTenHovered ? "-10" : "--"}
    </button>
  </div>
</div>

<style lang="scss">
  .structure-container {
    display: flex;
    flex-direction: row;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    font-weight: 700;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .sub-info {
        font-size: 0.8rem;
        font-weight: 400;
      }
    }

    .exchange-container {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      align-items: center;

      .resource-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    .adjust-container {
      display: grid;
      grid-template-columns: repeat(2, 1.1rem);
      grid-template-rows: repeat(2, 1.1rem);
      gap: 0.5rem;

      button {
        border: 0;
        padding: 0;
      }
    }
  }
</style>