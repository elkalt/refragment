import { writable } from "svelte/store";
import { FabricatorStructureData } from "$lib/definitions/fabricator-structures";
import { TickManager } from "./tick-manager";
import { ResourceStore } from "./resource-store";

function createFabricatorStructureStore() {
  let {subscribe, update} = writable(FabricatorStructureData);

  function inputsSatisfied(inputs: {input: string, amount: number}[]) {
    for (let input of inputs) {
      if (input.amount > ResourceStore.getAmount(input.input)) return false;
    }
    return true;
  }

  return {
    subscribe,
    increment: (fabricatorName: string, amount: number) => {
      let fabricator = FabricatorStructureData.get(fabricatorName);
      if (!fabricator) throw new Error("Fabricator does not exist: " + fabricatorName);

      for (let i = 0; i < amount; i++) {
        fabricator.created.push(TickManager.getCurrentTick());
      }
      update(() => FabricatorStructureData);
    },
    decrement: (fabricatorName: string, amount: number) => {
      let fabricator = FabricatorStructureData.get(fabricatorName);
      if (!fabricator) throw new Error("Fabricator does not exist: " + fabricatorName);

      for (let i = 0; i < amount; i++) {
        fabricator.created.pop();
      }
      update(() => FabricatorStructureData);
    },
    tickUpdate: (currentTick: number) => {
      for (let [fabricatorName, fabricator] of FabricatorStructureData) {
        for (let startTick of fabricator.created) {
          let elapsedTicks = currentTick - startTick;
          if (elapsedTicks !== 0 && elapsedTicks % fabricator.interval === 0 && inputsSatisfied(fabricator.inputs)) {
            for (let input of fabricator.inputs) {
              ResourceStore.decrement(input.input, input.amount);
            }
            for (let output of fabricator.outputs) {
              ResourceStore.increment(output.output, output.amount);
            }
          }
        }
      }
    }
  };
}

export let FabricatorStructureStore = createFabricatorStructureStore();