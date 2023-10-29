<script lang="ts">
  import RfStructureList from "./generic/rf-structure-list.svelte";
  import { GeneratorButtonStore } from "$lib/stores/generator-button-store";
  import { GeneratorStructureStore } from "$lib/stores/generator-structure-store";
  import { GeneratorStore } from "$lib/stores/generator-store";

  function adjustGenerators(generatorName: string, amount: number) {
    if (amount < 0) {
      GeneratorStructureStore.decrement(generatorName, amount);
    } else {
      GeneratorStructureStore.increment(generatorName, amount);
    }
  }
</script>

<h2>Generators</h2>
<RfStructureList
  columns={1}
  structureButtonStore={$GeneratorButtonStore}
  structureDataStore={$GeneratorStructureStore}
  structureStore={$GeneratorStore}
  on:manager_click={(event) => adjustGenerators(event.detail.name, event.detail.amount)}
  on:button_click={(event) => GeneratorButtonStore.use(event.detail.name)}>
</RfStructureList>

<style lang="scss">
  h2 {
    margin-bottom: 1rem;
  }
</style>