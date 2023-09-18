import type { ButtonData } from "$lib/interfaces/button-data";
import { ResourceEnum } from "./resources";

export enum RobotButtonEnum {
  CoalMiner = "Coal Miner",
  IronMiner = "Iron Miner",
}

export let RobotButtons: Map<string, ButtonData> = new Map<string, ButtonData>([
  [
    RobotButtonEnum.CoalMiner,
    {
      description: "Build a coal miner",
      inputs: [{input: ResourceEnum.Energy, amount: 5}, {input: ResourceEnum.Iron, amount: 5}],
      outputs: [{output: ResourceEnum.Coal, amount: 2}],
      sustain: {interval: 100, totalTime: 2400},
      disabled: false,
      unlocked: true
    }
  ],
  [
    RobotButtonEnum.IronMiner,
    {
      description: "Build an iron ore miner",
      inputs: [{input: ResourceEnum.Energy, amount: 5}, {input: ResourceEnum.Iron, amount: 5}],
      outputs: [{output: ResourceEnum.IronOre, amount: 2}],
      sustain: {interval: 100, totalTime: 2400},
      disabled: false,
      unlocked: true
    }
  ],
]);