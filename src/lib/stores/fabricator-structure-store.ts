import { writable } from "svelte/store";
import { FabricatorStructureData } from "$lib/definitions/fabricator-structures";
import { TickManager } from "./tick-manager";
import { ResourcesStore } from "./resources-store";
import { FabricatorStore } from "./fabricator-store";

function createFabricatorStructureStore() {
  let {subscribe, update} = writable(FabricatorStructureData);

  function inputsSatisfied(inputs: {input: string, amount: number}[]) {
    for (let input of inputs) {
      if (input.amount > ResourcesStore.getAmount(input.input)) return false;
    }
    return true;
  }

  return {
    subscribe,
    increment: (fabricatorName: string, amount: number) => {
      let fabricator = FabricatorStructureData.get(fabricatorName);
      if (!fabricator) throw new Error("fabricator does not exist: " + fabricatorName);

      let toPush = Math.min(amount, FabricatorStore.getAmount(fabricatorName) - fabricator.created.length);
      let currentTick = TickManager.getCurrentTick();
      for (let i = 0; i < toPush; i++) {
        fabricator.created.push(currentTick);
      }
      update(() => FabricatorStructureData);
    },
    decrement: (fabricatorName: string, amount: number) => {
      let fabricator = FabricatorStructureData.get(fabricatorName);
      if (!fabricator) throw new Error("fabricator does not exist: " + fabricatorName);

      let toPop = Math.min(Math.abs(amount), fabricator.created.length);
      console.log(toPop)
      for (let i = 0; i < toPop; i++) {
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
              ResourcesStore.decrement(input.input, input.amount);
            }
            for (let output of fabricator.outputs) {
              ResourcesStore.increment(output.output, output.amount);
            }
          }
        }
      }
    }
  };
}

export let FabricatorStructureStore = createFabricatorStructureStore();