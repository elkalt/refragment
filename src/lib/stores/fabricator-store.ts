import { writable } from "svelte/store";
import { Fabricators } from "$lib/definitions/fabricators";

function createFabricatorStore() {
  let {subscribe, update} = writable(Fabricators);

  return {
    subscribe,
    increment: (fabricatorName: string, amount: number) => {
      let fabricator = Fabricators.get(fabricatorName);
      if (!fabricator) throw new Error("Fabricator does not exist: " + fabricatorName);

      fabricator.amount += amount;
      update(() => Fabricators);
    },
    decrement: (fabricatorName: string, amount: number) => {
      let fabricator = Fabricators.get(fabricatorName);
      if (!fabricator) throw new Error("Fabricator does not exist: " + fabricatorName);

      fabricator!.amount -= amount;
      update(() => Fabricators);
    },
  };
}

export let FabricatorStore = createFabricatorStore();