import type { StructureListData } from "$lib/interfaces/structure-list-data";
import { GeneratorEnum } from "./generators";
import { ResourceEnum } from "./resources";

export enum GeneratorListEnum {
  Boiler = "Boiler",
}

export let GeneratorStructureData: Map<string, StructureListData> = new Map([
  [
    GeneratorListEnum.Boiler,
    {
      unlocked: true,
      structure: GeneratorEnum.Boiler,
      created: [],
      inputs: [{input: ResourceEnum.Coal, amount: 1}],
      outputs: [{output: ResourceEnum.Energy, amount: 2}],
      interval: 150
    }
  ],
]);