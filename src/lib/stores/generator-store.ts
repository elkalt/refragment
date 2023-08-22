import { writable } from "svelte/store";
import type { Structure } from "$lib/interfaces/structure";
import { Generators } from "$lib/definitions/generators";
import { ResourceStore } from "./resource-store";
import { TickManager } from "./tick-manager";

function createGeneratorStore() {
  let {subscribe, update} = writable(Generators);

  function isSatisfied(generator: Structure): boolean {
    for (let input of generator.inputs) {
      if (input.amount > ResourceStore.getAmount(input.input)) {
        return false;
      }
    }
    return true;
  }
  
  return {
    subscribe,
    increment: (generatorName: string, amount: number) => {
      let generator = Generators.get(generatorName);
      if (!generator) throw new Error("Generator does not exist: " + generatorName);

      generator.amount += amount;
      generator.created.push(TickManager.getCurrentTick());
      update(() => Generators);
    },
    decrement: (generatorName: string, amount: number) => {
      let generator = Generators.get(generatorName);
      if (!generator) throw new Error("Generator does not exist: " + generatorName);

      generator!.amount -= amount;
      update(() => Generators);
    },
    adjust: (generatorName: string, amount: number) => {
      if (amount > 0) {
        GeneratorStore.activate(generatorName, amount);
      } else if (amount < 0) {
        GeneratorStore.deactivate(generatorName, -amount);
      }
    },
    activate: (generatorName: string, amount: number) => {
      let generator = Generators.get(generatorName);
      if (generator) {
        let available = generator.amount - generator.created.length;
        let currentTick = TickManager.getCurrentTick();
        for (let i = 0; i < Math.min(amount, available); i++) {
          generator.created.push(currentTick);
        }
        update(() => Generators);
      } else throw new Error("Generator does not exist: " + generatorName);
    },
    deactivate: (generatorName: string, amount: number) => {
      let generator = Generators.get(generatorName);
      if (generator) {
        let available = generator.created!.length;
        for (let i = 0; i < Math.min(amount, available); i++) {
          generator.created.pop();
        }
        update(() => Generators);
      } else throw new Error("Generator does not exist: " + generatorName);
    },

    tickUpdate: (currentTick: number) => {
      for (let generator of Generators.values()) {
        for (let created of generator.created) {
          let elapsed = currentTick - created;
          if (elapsed !== 0 && elapsed % generator.interval === 0 && isSatisfied(generator)) {
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
  }
}

export let GeneratorStore = createGeneratorStore();