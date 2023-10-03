import { writable } from "svelte/store";
import { GeneratorStructureData } from "$lib/definitions/generator-structures";
import { TickManager } from "./tick-manager";
import { ResourcesStore } from "./resources-store";
import { GeneratorStore } from "./generator-store";

function createGeneratorStructureStore() {
  let {subscribe, update} = writable(GeneratorStructureData);

  function inputsSatisfied(inputs: {input: string, amount: number}[]) {
    for (let input of inputs) {
      if (input.amount > ResourcesStore.getAmount(input.input)) return false;
    }
    return true;
  }

  return {
    subscribe,
    increment: (generatorName: string, amount: number) => {
      let generator = GeneratorStructureData.get(generatorName);
      if (!generator) throw new Error("Generator does not exist: " + generatorName);

      let toPush = Math.min(amount, GeneratorStore.getAmount(generatorName) - generator.created.length);
      let currentTick = TickManager.getCurrentTick();
      for (let i = 0; i < toPush; i++) {
        generator.created.push(currentTick);
      }
      update(() => GeneratorStructureData);
    },
    decrement: (generatorName: string, amount: number) => {
      let generator = GeneratorStructureData.get(generatorName);
      if (!generator) throw new Error("Generator does not exist: " + generatorName);

      let toPop = Math.min(Math.abs(amount), generator.created.length);
      console.log(toPop)
      for (let i = 0; i < toPop; i++) {
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
              ResourcesStore.decrement(input.input, input.amount);
            }
            for (let output of generator.outputs) {
              ResourcesStore.increment(output.output, output.amount);
            }
          }
        }
      }
    }
  };
}

export let GeneratorStructureStore = createGeneratorStructureStore();