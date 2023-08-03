import type { ButtonData } from "$lib/interfaces/button-data";

export let RobotButtons: Map<string, ButtonData> = new Map<string, ButtonData>([
  [
    "Coal Miner",
    {
      description: "Build a coal miner",
      inputs: [{input: "Energy", amount: 5}, {input: "Iron", amount: 5}],
      outputs: [{output: "Coal", amount: 2}],
      sustain: {interval: 500, totalTime: 6000},
      disabled: false,
      unlocked: true
    }
  ],
  [
    "Iron Miner",
    {
      description: "Build an iron ore miner",
      inputs: [{input: "Energy", amount: 5}, {input: "Iron", amount: 5}],
      outputs: [{output: "Iron Ore", amount: 2}],
      sustain: {interval: 500, totalTime: 6000},
      disabled: false,
      unlocked: true
    }
  ],
]);