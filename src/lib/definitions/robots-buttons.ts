import type { SustainedResource } from "$lib/interfaces/sustained-resource";

export let RobotButtons: Map<string, SustainedResource> = new Map<string, SustainedResource>([
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
      disabled: false,
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
      disabled: false,
      unlocked: true
    }
  ],
]);