import { ResourceButtons } from "$lib/definitions/resource-buttons";
import { writable } from "svelte/store";
import { ResourcesStore } from "./resources-store";

function createResourcesButtonStore() {
  let {subscribe, update} = writable(ResourceButtons);

  return {
    subscribe,
    unlock: (resourceButtonName: string) => {
      let resourceButton = ResourceButtons.get(resourceButtonName);
      if (!resourceButton) throw new Error("Resource does not exist: " + resourceButtonName);

      resourceButton!.unlocked = true;
      update(() => ResourceButtons);
    },

    use: (resourceButtonName: string) => {
      let resourceButton = ResourceButtons.get(resourceButtonName);
      
      if (resourceButton) {
        for (let input of resourceButton.inputs) {
          if (input.input === "Time") {
            resourceButton.disabled = true;
            resourceButton.cooldown = input.amount;
            update(() => ResourceButtons);
          } else { 
            ResourcesStore.decrement(input.input, input.amount);
          }
        }
        for (let output of resourceButton.outputs) {
          ResourcesStore.increment(output.output, output.amount);
        }
      } else {
        throw new Error("Manual resource does not exist: " + resourceButtonName);
      }
    },

    tickUpdate: () => {
      for (let buttonName of ResourceButtons.keys()) {
        let button = ResourceButtons.get(buttonName)!;
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
      update(() => ResourceButtons);
    }
  }
}

export let ResourcesButtonStore = createResourcesButtonStore();