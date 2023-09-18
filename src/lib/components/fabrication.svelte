<script lang="ts">
  import RfButtonList from "./generic/rf-button-list.svelte";
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
<div class="structure-container">
  <div class="buttons-container">
    <RfButtonList
      columns={1}
      buttonStore={$FabricatorButtonStore}
      on:click={(event) => FabricatorButtonStore.use(event.detail.name)}>
    </RfButtonList>
  </div>
  <div class="buttons-container">
    <RfStructureList
      columns={1}
      structureDataStore={$FabricatorStructureStore}
      structureStore={$FabricatorStore}
      on:click={(event) => adjustFabricators(event.detail.name, event.detail.amount)}>
    </RfStructureList>
  </div>
</div>

<style lang="scss">
  h2 {
    margin-bottom: 1rem;
  }
</style>