import type { Robot } from "$lib/interfaces/robot";

export let Robots: Map<string, Robot> = new Map<string, Robot>([
  [
    "Coal Miner",
    {
      products: ["Coal"],
      baseProduction: [2],
      baseProductionInterval: 5,
      baseProductionTime: 60,
      consumed: ["Energy", "Iron"],
      baseCost: [10, 5],
      unlocked: true
    }
  ],
]);