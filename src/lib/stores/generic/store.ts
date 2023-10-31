import { writable } from "svelte/store";

export interface Store {
  subscribe: (run: (value: Map<string, any>) => void, invalidate?: (value?: Map<string, any>) => void) => () => void;
  update: (updater: (value: Map<string, any>) => Map<string, any>) => void;
  dump: () => Map<string, any>;
  overwrite: (newResources: Map<string, any>) => void;
}

export function createStore(map: Map<string, any>): Store {
  let { subscribe, update } = writable(map);

  return {
    subscribe,
    update,
    dump: () => {
      return map;
    },

    overwrite: (newResources: Map<string, any>) => {
      map = newResources;
      update(() => map);
    }
  };
}