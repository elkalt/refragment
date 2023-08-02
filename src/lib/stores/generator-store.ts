import { writable } from "svelte/store";
import { Generators } from "$lib/definitions/generators";

function createGeneratorStore() {
  let {subscribe, update} = writable(Generators);

  return {
    subscribe,
    increment: (generatorName: string, amount: number) => {
      let generator = Generators.get(generatorName);
      if (generator) throw new Error("Generator does not exist: " + generatorName);

      generator!.amount += amount;
      update(() => Generators);
    },
    decrement: (generatorName: string, amount: number) => {
      let generator = Generators.get(generatorName);
      if (generator) throw new Error("Generator does not exist: " + generatorName);

      generator!.amount -= amount;
      update(() => Generators);
    }
  }
}

export let GeneratorStore = createGeneratorStore();