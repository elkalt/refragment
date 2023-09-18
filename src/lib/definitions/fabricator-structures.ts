import type { StructureListData } from "$lib/interfaces/structure-list-data";
import { FabricatorEnum } from "./fabricators";
import { ResourceEnum } from "./resources";

export enum FabricatorListEnum {
  Coal = "Coal Miner Fab",
  Iron = "Iron Miner Fab",
}

export let FabricatorStructureData: Map<string, StructureListData> = new Map([
  [
    FabricatorListEnum.Coal,
    {
      unlocked: true,
      structure: FabricatorEnum.Miner,
      created: [],
      inputs: [{input: ResourceEnum.Energy, amount: 1}],
      outputs: [{output: ResourceEnum.Coal, amount: 1}],
      interval: 150
    }
  ],
  [
    FabricatorListEnum.Iron,
    {
      unlocked: true,
      structure: FabricatorEnum.Miner,
      created: [],
      inputs: [{input: ResourceEnum.Energy, amount: 1}],
      outputs: [{output: ResourceEnum.Iron, amount: 1}],
      interval: 150
    }
  ]
]);