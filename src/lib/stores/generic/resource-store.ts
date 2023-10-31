import type { Resource } from "$lib/interfaces/resource";
import { createStore, type Store } from "./store";

export interface ResourceStore extends Store {
  subscribe: (run: (value: Map<string, Resource>) => void, invalidate?: (value?: Map<string, Resource>) => void) => () => void;
  increment: (resourceName: string, amount: number) => void;
  decrement: (resourceName: string, amount: number) => void;
  getAmount: (resourceName: string) => number;
  contains: (resourceName: string) => boolean;
}

export function createResourceStore(Resources: Map<string,Resource>, ) {
  let {subscribe, update, overwrite, dump} = createStore(Resources);

  return {
    subscribe,
    update,
    overwrite,
    dump,
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
    },

    contains: (resourceName: string) => {
      let resource = Resources.get(resourceName);
      return resource !== undefined;
    },
  }
}