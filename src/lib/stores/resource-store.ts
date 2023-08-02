import { writable } from "svelte/store";
import { Resources } from "$lib/definitions/resources";

function createResourceStore() {
  let {subscribe, update} = writable(Resources);

  return {
    subscribe,
    increment: (resource: string, amount: number) => {
      if (!Resources.has(resource)) throw new Error("Resource does not exist: " + resource);
      
      Resources.get(resource)!.amount += amount;
      update(() => Resources);
    },
    decrement: (resource: string, amount: number) => {
      if (!Resources.has(resource)) throw new Error("Resource does not exist: " + resource);

      Resources.get(resource)!.amount -= amount;
      update(() => Resources);
    }
  }
}

export let ResourceStore = createResourceStore();