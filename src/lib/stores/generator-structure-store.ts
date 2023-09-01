import { writable } from "svelte/store";
import { GeneratorStructureData } from "$lib/definitions/generator-structures";
import { TickManager } from "./tick-manager";
import { ResourceStore } from "./resource-store";

function createGeneratorStructureStore() {
  let {subscribe, update} = writable(GeneratorStructureData);

  function inputsSatisfied(inputs: {input: string, amount: number}[]) {
    for (let input of inputs) {
      if (input.amount > ResourceStore.getAmount(input.input)) return false;
    }
    return true;
  }

  return {
    subscribe,
    increment: (generatorName: string, amount: number) => {
      let generator = GeneratorStructureData.get(generatorName);
      if (!generator) throw new Error("Generator does not exist: " + generatorName);

      for (let i = 0; i < amount; i++) {
        generator.created.push(TickManager.getCurrentTick());
      }
      update(() => GeneratorStructureData);
    },
    decrement: (generatorName: string, amount: number) => {
      let generator = GeneratorStructureData.get(generatorName);
      if (!generator) throw new Error("Generator does not exist: " + generatorName);

      for (let i = 0; i < amount; i++) {
        generator.created.pop();
      }
      update(() => GeneratorStructureData);
    },
    tickUpdate: (currentTick: number) => {
      for (let [generatorName, generator] of GeneratorStructureData) {
        for (let startTick of generator.created) {
          let elapsedTicks = currentTick - startTick;
          if (elapsedTicks !== 0 && elapsedTicks % generator.interval === 0 && inputsSatisfied(generator.inputs)) {
            for (let input of generator.inputs) {
              ResourceStore.decrement(input.input, input.amount);
            }
            for (let output of generator.outputs) {
              ResourceStore.increment(output.output, output.amount);
            }
          }
        }
      }
    }
  };
}

export let GeneratorStructureStore = createGeneratorStructureStore();