import type { ButtonData } from '$lib/interfaces/button-data';
import { ResourceEnum } from '$lib/definitions/resources';
import { GeneratorEnum } from './generators';

export enum GeneratorButtonTypes {
  Boiler = "Boiler",
}

export let GeneratorButtons: Map<string, ButtonData> = new Map([
  [
    GeneratorButtonTypes.Boiler,
    {
      description: "A boiler that burns coal to generate energy",
      inputs: [{input: ResourceEnum.Coal, amount: 10}, {input: ResourceEnum.Iron, amount: 10}],
      outputs: [{output: GeneratorEnum.Boiler, amount: 1}],
      disabled: false,
      unlocked: true
    }
  ]
]);