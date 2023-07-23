import type { Resource } from "$lib/interfaces/resource";
import { writable } from "svelte/store";

function createResources() {
  let resources: Map<string, Resource> = new Map([
    ["Energy", {unlocked: true, amount: 0}],
    ["Research", {unlocked: false, amount: 0}],
  ]);

  let {subscribe, update} = writable(resources);

  return {
    subscribe,
    increment: (resource: string, amount: number) => {
      if (!resources.has(resource)) throw new Error("Resource does not exist: " + resource);

      resources.get(resource)!.amount += amount;
      update(() => resources);
    },
    decrement: (resource: string, amount: number) => {
      if (!resources.has(resource)) throw new Error("Resource does not exist: " + resource);

      resources.get(resource)!.amount -= amount;
      update(() => resources);
    }
  }
}

export let Resources = createResources();