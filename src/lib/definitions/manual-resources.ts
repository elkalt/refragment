import type { ManualResource } from '$lib/interfaces/manual-resource';

export let ManualResources: Map<string, ManualResource> = new Map([
  [
    "Generate",
    {
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
      products: ["Iron"],
      baseProduction: [1],
      consumed: ["Coal", "Iron Ore"],
      baseCost: [5, 5],
      unlocked: true
    }
  ]
]);