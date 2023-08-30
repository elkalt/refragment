<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let active: number;
  export let max: number;

  let dispatch = createEventDispatcher();
</script>

<div class="structure-container">
  <div>
    Active: {active} / {max}
  </div>
  <div class="adjust-container">
    <button on:click={() => dispatch("click", {amount: 1})}>+</button>
    <button on:click={() => dispatch("click", {amount: 10})}>++</button>
    <button on:click={() => dispatch("click", {amount: -1})}>-</button>
    <button on:click={() => dispatch("click", {amount: -10})}>--</button>
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

    .adjust-container {
      align-items: center;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 0.5rem;

      button {
        border: 0;
        padding: 0;
      }
    }
  }
</style>