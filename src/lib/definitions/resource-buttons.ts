import type { ButtonData } from '$lib/interfaces/button-data';
import { ResourceEnum } from '$lib/definitions/resources';

export enum ResourceButtonEnum {
  Generate = "Generate",
  Mine = "Mine",
  Smelt = "Smelt",
}

export let ResourceButtons: Map<string, ButtonData> = new Map([
  [
    ResourceButtonEnum.Generate,
    {
      description: "Hand crank the generator",
      inputs: [{input: ResourceEnum.Time, amount: 100}],
      outputs: [{output: ResourceEnum.Energy, amount: 5}],
      disabled: false,
      unlocked: true,
      cooldown: 0
    }
  ],
  [
    ResourceButtonEnum.Mine,
    {
      description: "Power a stationary mine",
      inputs: [{input: ResourceEnum.Energy, amount: 5}],
      outputs: [{output: ResourceEnum.Coal, amount: 3}, {output: ResourceEnum.IronOre, amount: 2}],
      disabled: false,
      unlocked: true
    }
  ],
  [
    ResourceButtonEnum.Smelt,
    {
      description: "Power an iron smelter",
      inputs: [{input: ResourceEnum.Coal, amount: 5}, {input: ResourceEnum.IronOre, amount: 4}],
      outputs: [{output: ResourceEnum.Iron, amount: 1}],
      disabled: false,
      unlocked: true
    }
  ]
]);