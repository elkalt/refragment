import type { Structure } from "$lib/interfaces/structure";

export let Generators: Map<string, Structure> = new Map([
  [
    "Boiler",
    {
      unlocked: true,
      amount: 0,
      inputs: [{input: "Coal", amount: 1}],
      outputs: [{output: "Energy", amount: 1}],
      interval: 150,
      created: [],
    }
  ],
]);