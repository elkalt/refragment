import type { Robot } from "$lib/interfaces/robot";

export let Robots: Map<string, Robot> = new Map<string, Robot>([
  [
    "Coal Miner",
    {
      description: "Build a miner with 10 energy and 5 iron to mine 1 coal every 5 seconds for 60 seconds",
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