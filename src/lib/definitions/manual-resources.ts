import type { ManualResource } from '$lib/interfaces/manual-resource';

export let ManualResources: Map<string, ManualResource> = new Map([
  [
    "Generate",
    {
      description: "Generate 1 energy",
      products: ["Energy"],
      baseProduction: [1],
      consumed: ["Time"],
      baseCost: [5],
      unlocked: true
    }
  ],
  [
    "Mine",
    {
      description: "Power a mine to produce 3 coal and 2 iron ore",
      products: ["Coal", "Iron Ore"],
      baseProduction: [3, 2],
      consumed: ["Energy"],
      baseCost: [5],
      unlocked: true
    }
  ],
  [
    "Smelt",
    {
      description: "Smelt 1 coal and 1 iron ore into 1 iron",
      products: ["Iron"],
      baseProduction: [1],
      consumed: ["Coal", "Iron Ore"],
      baseCost: [5, 5],
      unlocked: true
    }
  ]
]);