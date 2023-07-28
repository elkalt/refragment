import type { Robot } from "$lib/interfaces/robot";

export let Robots: Map<string, Robot> = new Map<string, Robot>([
  [
    "Coal Miner",
    {
      description: "Build a coal miner",
      products: ["Coal"],
      baseProduction: [2],
      baseProductionInterval: 5,
      baseProductionTime: 60,
      inputs: ["Energy", "Iron"],
      baseCost: [10, 5],
      unlocked: true
    }
  ],
  [
    "Iron Miner",
    {
      description: "Build an iron ore miner",
      products: ["Iron Ore"],
      baseProduction: [2],
      baseProductionInterval: 5,
      baseProductionTime: 60,
      inputs: ["Energy", "Iron"],
      baseCost: [10, 5],
      unlocked: true
    }
  ],
]);