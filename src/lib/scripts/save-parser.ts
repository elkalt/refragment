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
  FabricatorButtonStore: FabricatorButtonStore,
  FabricatorStore: FabricatorStore,
  FabricatorStructureStore: FabricatorStructureStore,
  GeneratorButtonStore: GeneratorButtonStore,
  GeneratorStore: GeneratorStore,
  GeneratorStructureStore: GeneratorStructureStore,
  ResourcesButtonStore: ResourcesButtonStore,
  ResourcesStore: ResourcesStore,
  RobotButtonStore: RobotButtonStore,
  RobotStore: RobotStore,
  TickManager: TickManager,
};

interface Object {
  [key: string]: any;
}

function mapToObj(map: Map<string, any>){
  const obj: Object = {};
  for (let [k, v] of map) {
    obj[k] = v
  }
  return obj
}

function objToMap(obj: Object): Map<string, any> {
  const map = new Map();
  for (let k of Object.keys(obj)) {
    map.set(k, obj[k]);
  }
  return map
}

export function currentStateAsB64(): Promise<string> {
  let save: Object = {};
  let promises = [];

  for (let [storeName, store] of Object.entries(stores)) {
    let promise = new Promise<void>((resolve) => {
      store.subscribe((value) => {
        if (value instanceof Map) {
          save[storeName] = mapToObj(value);
        } else {
          save[storeName] = value;
        }
        resolve();
      });
    });
    promises.push(promise);
  }

  return Promise.all(promises).then(() => {
    let base64String = btoa(JSON.stringify(save));
    return base64String;
  });
}

export function B64ToCurrentState(base64String: string): void {
  let save = JSON.parse(atob(base64String));
  let count = 0;
  for (let [storeName, store] of Object.entries(stores)) {
    if (storeName === "TickManager") {
      store.overwrite(save[storeName]);
    } else {
      store.overwrite(objToMap(save[storeName]));
    }
    count++;
  }
}