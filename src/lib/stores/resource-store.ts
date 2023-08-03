import { writable } from "svelte/store";
import { Resources } from "$lib/definitions/resources";

function createResourceStore() {
  let {subscribe, update} = writable(Resources);

  return {
    subscribe,
    increment: (resourceName: string, amount: number) => {
      let resource = Resources.get(resourceName);
      if (!resource) throw new Error("Resource does not exist: " + resourceName);
      
      resource!.amount += amount;
      update(() => Resources);
    },
    decrement: (resourceName: string, amount: number) => {
      let resource = Resources.get(resourceName);
      if (!resource) throw new Error("Resource does not exist: " + resourceName);

      resource!.amount -= amount;
      update(() => Resources);
    },
    getAmount: (resourceName: string) => {
      let resource = Resources.get(resourceName);
      if (!resource) throw new Error("Resource does not exist: " + resourceName);

      return resource!.amount;
    }
  }
}

export let ResourceStore = createResourceStore();