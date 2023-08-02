import type { ButtonData } from '$lib/interfaces/button-data';

export let ResourceButtons: Map<string, ButtonData> = new Map([
  [
    "Generate",
    {
      description: "Hand crank the generator",
      inputs: [{input: "Time", amount: 1}],
      outputs: [{output: "Energy", amount: 5}],
      disabled: false,
      unlocked: true
    }
  ],
  [
    "Mine",
    {
      description: "Power a stationary mine",
      inputs: [{input: "Energy", amount: 5}],
      outputs: [{output: "Coal", amount: 3}, {output: "Iron Ore", amount: 2}],
      disabled: false,
      unlocked: true
    }
  ],
  [
    "Smelt",
    {
      description: "Power an iron smelter",
      inputs: [{input: "Coal", amount: 5}, {input: "Iron Ore", amount: 4}],
      outputs: [{output: "Iron", amount: 1}],
      disabled: false,
      unlocked: true
    }
  ]
]);