import type { StructureListData } from "$lib/interfaces/structure-list-data"
import { ResourceEnum } from "./resources"

export enum RobotStructureEnum {
  CoalMiner = "Coal Miner",
  IronMiner = "Iron Miner",
}

export let RobotStructureData: Map<string, StructureListData> = new Map<string, StructureListData>([
  [
    RobotStructureEnum.CoalMiner,
    {
      unlocked: true,
      structure: RobotStructureEnum.CoalMiner,
      created: [],
      inputs: [],
      outputs: [{output: ResourceEnum.Coal, amount: 2}],
      interval: 100,
      totalTime: 2400
    }
  ],
  [
    RobotStructureEnum.IronMiner,
    {
      unlocked: true,
      structure: RobotStructureEnum.IronMiner,
      created: [],
      inputs: [],
      outputs: [{output: ResourceEnum.IronOre, amount: 2}],
      interval: 100,
      totalTime: 2400
    }
  ],
]);