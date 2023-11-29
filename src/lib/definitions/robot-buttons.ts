import type { ButtonData } from "$lib/interfaces/button-data";
import { ResourceEnum } from "./resources";
import { RobotStructureEnum } from "./robot-structures";

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
      outputs: [{output: RobotStructureEnum.CoalMiner, amount: 1}],
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
      outputs: [{output: RobotStructureEnum.IronMiner, amount: 1}],
      sustain: {interval: 100, totalTime: 2400},
      disabled: false,
      unlocked: true
    }
  ],
]);