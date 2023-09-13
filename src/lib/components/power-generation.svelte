<script lang="ts">
  import RfButtonList from "./generic/rf-button-list.svelte";
  import RfStructureList from "./generic/rf-structure-list.svelte";
  import { GeneratorButtonStore } from "$lib/stores/generator-button-store";
  import { GeneratorStructureStore } from "$lib/stores/generator-structure-store";
  import { GeneratorStore } from "$lib/stores/generator-store";

  function adjustGenerators(generatorName: string, amount: number) {
    if (amount < 0) {
      GeneratorStructureStore.decrement(generatorName, amount);
    } else {
      GeneratorStructureStore.increment(generatorName, amount)
    }
  }
</script>

<h2>Generators</h2>
<div class="structure-container">
  <div class="buttons-container">
    <RfButtonList
      columns={1}
      buttonStore={$GeneratorButtonStore}
      on:click={(event) => GeneratorButtonStore.use(event.detail.name)}>
    </RfButtonList>
  </div>
  <div class="buttons-container">
    <RfStructureList
      columns={1}
      structureDataStore={$GeneratorStructureStore}
      structureStore={$GeneratorStore}
      on:click={(event) => adjustGenerators(event.detail.name, event.detail.amount)}>
    </RfStructureList>
  </div>
</div>

<style lang="scss">
  h2 {
    margin-bottom: 1rem;
  }
</style>