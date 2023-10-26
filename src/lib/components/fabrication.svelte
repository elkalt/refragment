<script lang="ts">
  import RfStructureList from "./generic/rf-structure-list.svelte";
  import { FabricatorButtonStore } from "$lib/stores/fabricator-button-store";
  import { FabricatorStructureStore } from "$lib/stores/fabricator-structure-store";
  import { FabricatorStore } from "$lib/stores/fabricator-store";

  function adjustFabricators(fabricatorName: string, amount: number) {
    if (amount < 0) {
      FabricatorStructureStore.decrement(fabricatorName, amount);
    } else {
      FabricatorStructureStore.increment(fabricatorName, amount)
    }
  }
</script>

<h2>Fabricators</h2>
<RfStructureList
  columns={1}
  structureButtonStore={$FabricatorButtonStore}
  structureDataStore={$FabricatorStructureStore}
  structureStore={$FabricatorStore}
  on:manager_click={(event) => adjustFabricators(event.detail.name, event.detail.amount)}
  on:button_click={(event) => FabricatorButtonStore.use(event.detail.name)}>
</RfStructureList>

<style lang="scss">
  h2 {
    margin-bottom: 1rem;
  }
</style>