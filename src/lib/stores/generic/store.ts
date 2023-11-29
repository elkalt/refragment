import { writable } from "svelte/store";

export interface Store {
  subscribe: (run: (value: Map<string, any>) => void, invalidate?: (value?: Map<string, any>) => void) => () => void;
  update: (updater: (value: Map<string, any>) => Map<string, any>) => void;
  overwrite: (newResources: Map<string, any>) => void;
}

export function createStore(map: Map<string, any>): Store {
  let { subscribe, update } = writable(map);

  return {
    subscribe,
    update,

    overwrite: (newResources: Map<string, any>) => {
      update((oldResources: Map<string, any>) => {
        for (let [k, v] of newResources) {
          oldResources.set(k, v);
        }
        return oldResources;
      });
    },
  };
}