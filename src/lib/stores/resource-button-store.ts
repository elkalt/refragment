import { ResourceButtons } from "$lib/definitions/resource-buttons";
import { writable } from "svelte/store";
import { ResourceStore } from "./resource-store";

function createResourceButtonStore() {
  let {subscribe, update} = writable(ResourceButtons);

  return {
    subscribe,
    unlock: (resource: string) => {
      if (!ResourceButtons.has(resource)) throw new Error("Resource does not exist: " + resource);

      ResourceButtons.get(resource)!.unlocked = true;
      update(() => ResourceButtons);
    },

    use: (resource: string) => {
      let manualResource = ResourceButtons.get(resource);
      
      if (manualResource) {
        for (let input of manualResource.inputs) {
          if (input.input === "Time") {
            manualResource.disabled = true;
            manualResource.cooldown = input.amount;
            update(() => ResourceButtons);
          } else { 
            ResourceStore.decrement(input.input, input.amount);
          }
        }
        for (let output of manualResource.outputs) {
          ResourceStore.increment(output.output, output.amount);
        }
      } else {
        throw new Error("Manual resource does not exist: " + resource);
      }
    },

    update: () => {
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

export let ResourceButtonStore = createResourceButtonStore();