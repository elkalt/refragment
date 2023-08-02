import type { ButtonData } from '$lib/interfaces/button-data';

export let GeneratorButtons: Map<string, ButtonData> = new Map([
  [
    "Boiler",
    {
      description: "A boiler that burns coal to generate energy",
      inputs: [{input: "Energy", amount: 10}, {input: "Iron", amount: 10}],
      outputs: [{output: "Boiler", amount: 1}],
      disabled: false,
      unlocked: true
    }
  ]
]);