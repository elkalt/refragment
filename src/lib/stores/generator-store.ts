import { writable } from "svelte/store";
import { Generators } from "$lib/definitions/generators";

function createGeneratorStore() {
  let {subscribe, update} = writable(Generators);

  return {
    subscribe,
    increment: (generator: string, amount: number) => {
      if (!Generators.has(generator)) throw new Error("Generator does not exist: " + generator);

      Generators.get(generator)!.amount += amount;
      update(() => Generators);
    },
    decrement: (generator: string, amount: number) => {
      if (!Generators.has(generator)) throw new Error("Generator does not exist: " + generator);

      Generators.get(generator)!.amount -= amount;
      update(() => Generators);
    }
  }
}

export let GeneratorStore = createGeneratorStore();