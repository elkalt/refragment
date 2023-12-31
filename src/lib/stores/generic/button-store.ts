import type { ButtonData } from "$lib/interfaces/button-data";
import type { ResourceStore } from "./resource-store";
import { createStore, type Store } from "./store";

export interface ButtonStore extends Store {
  subscribe: (run: (value: Map<string, ButtonData>) => void, invalidate?: (value?: Map<string, ButtonData>) => void) => () => void;
  unlock: (resourceButtonName: string) => void;
  use: (resourceName: string) => void;
  tickUpdate: () => void;
}

export function createButtonStore(
  resourceButtons: Map<string, ButtonData>,
  inputStores: ResourceStore[],
  outputStores: ResourceStore[])
{
  let {subscribe, update} = createStore(resourceButtons);

  return {
    subscribe,
    update,
    overwrite: (newButtons: Map<string, ButtonData>) => {
      update((oldButtons: Map<string, ButtonData>) => {
        for (let [k, v] of newButtons) {
          if (oldButtons.has(k)) {
            v.disabled = oldButtons.get(k)!.disabled;
            v.unlocked = oldButtons.get(k)!.unlocked;
            v.cooldown = oldButtons.get(k)!.cooldown;
          }
          oldButtons.set(k, v);
        }
        return oldButtons;
      });
    },
    unlock: (resourceButtonName: string) => {
      let resourceButton = resourceButtons.get(resourceButtonName);
      if (!resourceButton) throw new Error("Button does not exist: " + resourceButtonName);

      resourceButton!.unlocked = true;
      update(() => resourceButtons);
    },

    use: (resourceButtonName: string) => {
      let resourceButton = resourceButtons.get(resourceButtonName);
      
      if (resourceButton) {
        for (let input of resourceButton.inputs) {
          if (input.input === "Time") {
            resourceButton.disabled = true;
            resourceButton.cooldown = input.amount;
            update(() => resourceButtons);
          } else { 
            for (let inputStore of inputStores) {
              if (inputStore.contains(input.input)) inputStore.decrement(input.input, input.amount);
            }
          }
        }
        for (let output of resourceButton.outputs) {
          for (let outputStore of outputStores) {
           if (outputStore.contains(output.output)) outputStore.increment(output.output, output.amount);
          }
        }
      } else {
        throw new Error("Manual resource does not exist: " + resourceButtonName);
      }
    },

    tickUpdate: () => {
      for (let buttonName of resourceButtons.keys()) {
        let button = resourceButtons.get(buttonName)!;
        if (button.cooldown) {
          if (button.cooldown - 1 === 0) {
            button.cooldown--;
            button.disabled = false;
          } 
          if (button.cooldown > 1) {
            button.cooldown--;
          }
        }
      }
      update(() => resourceButtons);
    },
  }
}