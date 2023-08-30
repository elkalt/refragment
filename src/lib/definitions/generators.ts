import type { Structure } from "$lib/interfaces/structure";
import { ResourceEnum } from "./resources";

export enum GeneratorEnum {
  Boiler = "Boiler",
}

export let Generators: Map<string, Structure> = new Map([
  [
    GeneratorEnum.Boiler,
    {
      unlocked: true,
      amount: 0,
      inputs: [{input: ResourceEnum.Coal, amount: 1}],
      outputs: [{output: ResourceEnum.Energy, amount: 1}],
      interval: 150,
      created: [],
    }
  ],
]);