import type { ButtonData } from "$lib/interfaces/button-data";
import type { ResourceStore } from "./resource-store";
import { writable } from "svelte/store";

export interface ButtonStore {
  subscribe: (run: (value: Map<string, ButtonData>) => void, invalidate?: (value?: Map<string, ButtonData>) => void) => () => void;
  unlock: (resourceButtonName: string) => void;
  use: (resourceName: string) => void;
  tickUpdate: () => void;
}

export function createButtonStore(
  resourceButtons: Map<string, ButtonData>,
  inputs: ResourceStore[],
  outputs: ResourceStore[])
{
  let {subscribe, update} = writable(resourceButtons);

  return {
    subscribe,
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
            for (let inputMap of inputs) {
              if (inputMap.contains(input.input)) inputMap.decrement(input.input, input.amount);
            }
          }
        }
        for (let output of resourceButton.outputs) {
          for (let outputMap of outputs) {
           if (outputMap.contains(output.output)) outputMap.increment(output.output, output.amount);
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
    }
  }
}