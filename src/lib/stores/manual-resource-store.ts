import { ManualResources } from "$lib/definitions/manual-resources";
import { writable } from "svelte/store";

function createManualResourceStore() {
  let {subscribe, update} = writable(ManualResources);

  return {
    subscribe,
    unlock: (resource: string) => {
      if (!ManualResources.has(resource)) throw new Error("Resource does not exist: " + resource);

      ManualResources.get(resource)!.unlocked = true;
      update(() => ManualResources);
    }
  }
}

export let ManualResourceStore = createManualResourceStore();