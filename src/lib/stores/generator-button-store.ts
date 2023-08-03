import { GeneratorButtons } from "$lib/definitions/generator-buttons";
import { writable } from "svelte/store";
import { GeneratorStore } from "./generator-store";
import { ResourceStore } from "./resource-store";

function createGeneratorButtonStore() {
  let {subscribe, update} = writable(GeneratorButtons);

  return {
    subscribe,
    unlock: (generatorButtonName: string) => {
      let generator = GeneratorButtons.get(generatorButtonName);
      if (!generator) throw new Error("Resource does not exist: " + generatorButtonName);

      generator!.unlocked = true;
      update(() => GeneratorButtons);
    },

    use: (generatorButtonName: string) => {
      let generatorButton = GeneratorButtons.get(generatorButtonName);
      
      if (generatorButton) {
        for (let input of generatorButton.inputs) {
          if (input.input === "Time") {
            generatorButton.disabled = true;
            update(() => GeneratorButtons);

            setTimeout(() => {
              generatorButton!.disabled = false;
              update(() => GeneratorButtons);
            }, input.amount * 1000);
          } else { 
            ResourceStore.decrement(input.input, input.amount);
          }
        }
        for (let output of generatorButton.outputs) {
          GeneratorStore.increment(output.output, output.amount);
        }
      } else {
        throw new Error("Manual resource does not exist: " + generatorButtonName);
      }
    }
  }
}

export let GeneratorButtonStore = createGeneratorButtonStore();