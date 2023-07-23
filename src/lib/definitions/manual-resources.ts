import type { ManualResource } from '$lib/interfaces/manual-resource';

export let ManualResources: Map<string, ManualResource> = new Map([
  [
    "Generator",
    {
      products: ["Energy"],
      baseProduction: [1],
      consumed: ["Time"],
      baseCost: [5]
    }
  ],
  [
    "Mine",
    {
      products: ["Coal", "Iron Ore"],
      baseProduction: [3, 2],
      consumed: ["Energy"],
      baseCost: [5]
    }
  ],
]);