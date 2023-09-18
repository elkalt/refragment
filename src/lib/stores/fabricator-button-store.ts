import { FabricatorButtons } from "$lib/definitions/fabricator-buttons";
import { writable } from "svelte/store";
import { FabricatorStore } from "./fabricator-store";
import { ResourceStore } from "./resource-store";

function createFabricatorButtonStore() {
  let {subscribe, update} = writable(FabricatorButtons);

  return {
    subscribe,
    unlock: (fabricatorButtonName: string) => {
      let fabricator = FabricatorButtons.get(fabricatorButtonName);
      if (!fabricator) throw new Error("Resource does not exist: " + fabricatorButtonName);

      fabricator!.unlocked = true;
      update(() => FabricatorButtons);
    },

    use: (fabricatorButtonName: string) => {
      let fabricatorButton = FabricatorButtons.get(fabricatorButtonName);
      
      if (fabricatorButton) {
        for (let input of fabricatorButton.inputs) {
          if (input.input === "Time") {
            fabricatorButton.disabled = true;
            update(() => FabricatorButtons);

            setTimeout(() => {
              fabricatorButton!.disabled = false;
              update(() => FabricatorButtons);
            }, input.amount * 1000);
          } else { 
            ResourceStore.decrement(input.input, input.amount);
          }
        }
        for (let output of fabricatorButton.outputs) {
          FabricatorStore.increment(output.output, output.amount);
        }
      } else {
        throw new Error("Manual resource does not exist: " + fabricatorButtonName);
      }
    }
  }
}

export let FabricatorButtonStore = createFabricatorButtonStore();