<script lang="ts">
  import { FabricatorButtonStore } from "$lib/stores/fabricator-button-store";
  import { FabricatorStore } from "$lib/stores/fabricator-store";
  import { FabricatorStructureStore } from "$lib/stores/fabricator-structure-store";
  import { GeneratorButtonStore } from "$lib/stores/generator-button-store";
  import { GeneratorStore } from "$lib/stores/generator-store";
  import { GeneratorStructureStore } from "$lib/stores/generator-structure-store";
  import { ResourcesButtonStore } from "$lib/stores/resources-button-store";
  import { ResourcesStore } from "$lib/stores/resources-store";
  import { RobotButtonStore } from "$lib/stores/robot-button-store";
  import { RobotStore } from "$lib/stores/robot-store";
  import { TickManager } from "$lib/stores/tick-manager";

  let stores = {
    FabricatorButtonStore: $FabricatorButtonStore,
    FabricatorStore: $FabricatorStore,
    FabricatorStructureStore: $FabricatorStructureStore,
    GeneratorButtonStore: $GeneratorButtonStore,
    GeneratorStore: $GeneratorStore,
    GeneratorStructureStore: $GeneratorStructureStore,
    ResourcesButtonStore: $ResourcesButtonStore,
    ResourcesStore: $ResourcesStore,
    RobotButtonStore: $RobotButtonStore,
    RobotStore: $RobotStore,
    TickManager: $TickManager,
  };

  let exportText = "Export Save";
  
  interface Save {
    [key: string]: any;
  }

  function mapToObj(map: Map<string, any>){
    const obj: Save = {};
    for (let [k, v] of map) {
      obj[k] = v
    }
    return obj
  }

  function objToMap(obj: Save){
    const map = new Map();
    for (let k of Object.keys(obj)) {
      map.set(k, obj[k]);
    }
    return map
  }

  async function exportSave() {
    let save: Save = {};
    for (let [storeName, store] of Object.entries(stores)) {
      if (store instanceof Map) {
        save[storeName] = mapToObj(store);
      } else {
        save[storeName] = store;
      }
    }
    let base64String = btoa(JSON.stringify(save));
    await navigator.clipboard.writeText(base64String);

    exportText = "Copied to clipboard!";
    setTimeout(() => {
      exportText = "Export Save";
    }, 2000);
  }

  function importSave() {
    console.log($ResourcesStore.get("Energy"))
    let base64String = window.prompt('Please enter your save data:');
    if (base64String) {
      let save = JSON.parse(atob(base64String));
      for (let [storeName, store] of Object.entries(stores)) {
        if (storeName === "TickManager") {
          store = save[storeName];
        } else {
          store = objToMap(save[storeName]);
        }
      }
    }

    console.log($ResourcesStore.get("Energy"))
  }
</script>

<h2>Saves</h2>
<div class="saves-container">
  <button on:click={() => exportSave()}>{ exportText }</button>
  <button on:click={() => importSave()}>Import Save</button>
</div>

<h2>Settings</h2>
<input type="range" min="0" max="500">

<style lang="scss">
@import '$lib/styles/variables.scss';
button {
  padding: 1rem;
}

.saves-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}
</style>