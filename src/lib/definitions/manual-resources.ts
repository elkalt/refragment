import type { ManualResource } from '$lib/interfaces/manual-resource';

export let ManualResources: Map<string, ManualResource> = new Map([
  [
    "Generate",
    {
      description: "Hand crank the generator",
      products: ["Energy"],
      baseProduction: [1],
      inputs: ["Time"],
      baseCost: [5],
      disabled: false,
      unlocked: true
    }
  ],
  [
    "Mine",
    {
      description: "Power a stationary mine",
      products: ["Coal", "Iron Ore"],
      baseProduction: [3, 2],
      inputs: ["Energy"],
      baseCost: [5],
      disabled: false,
      unlocked: true
    }
  ],
  [
    "Smelt",
    {
      description: "Power an iron smelter",
      products: ["Iron"],
      baseProduction: [1],
      inputs: ["Coal", "Iron Ore"],
      baseCost: [5, 4],
      disabled: false,
      unlocked: true
    }
  ]
]);