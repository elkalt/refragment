import { GeneratorButtons } from "$lib/definitions/generator-buttons";
import { writable } from "svelte/store";
import { GeneratorStore } from "./generator-store";
import { ResourceStore } from "./resource-store";

function createGeneratorButtonStore() {
  let {subscribe, update} = writable(GeneratorButtons);

  return {
    subscribe,
    unlock: (generator: string) => {
      if (!GeneratorButtons.has(generator)) throw new Error("Resource does not exist: " + generator);

      GeneratorButtons.get(generator)!.unlocked = true;
      update(() => GeneratorButtons);
    },

    use: (generator: string) => {
      let generatorResource = GeneratorButtons.get(generator);
      
      if (generatorResource) {
        for (let input of generatorResource.inputs) {
          if (input.input === "Time") {
            generatorResource.disabled = true;
            update(() => GeneratorButtons);

            setTimeout(() => {
              generatorResource!.disabled = false;
              update(() => GeneratorButtons);
            }, input.amount * 1000);
          } else { 
            ResourceStore.decrement(input.input, input.amount);
          }
        }
        for (let output of generatorResource.outputs) {
          GeneratorStore.increment(output.output, output.amount);
        }
      } else {
        throw new Error("Manual resource does not exist: " + generator);
      }
    }
  }
}

export let GeneratorButtonStore = createGeneratorButtonStore();