import { ManualResources } from "$lib/definitions/manual-resources";
import { writable } from "svelte/store";
import { ResourceStore } from "./resource-store";

function createManualResourceStore() {
  let {subscribe, update} = writable(ManualResources);

  return {
    subscribe,
    unlock: (resource: string) => {
      if (!ManualResources.has(resource)) throw new Error("Resource does not exist: " + resource);

      ManualResources.get(resource)!.unlocked = true;
      update(() => ManualResources);
    },
    use: (resource: string) => {
      let manualResource = ManualResources.get(resource);
      
      if (manualResource) {
        for (let i = 0; i < manualResource.consumed.length; i++) {
          if (manualResource.consumed[i] !== "Time") {
            ResourceStore.decrement(manualResource.consumed[i], manualResource.baseCost[i]);
          }
        }
        for (let i = 0; i < manualResource.products.length; i++) {
          ResourceStore.increment(manualResource.products[i], manualResource.baseProduction[i]);
        }
      } else {
        throw new Error("Manual resource does not exist: " + resource);
      }
    }
  }
}

export let ManualResourceStore = createManualResourceStore();