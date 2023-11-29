import type { ButtonData } from '$lib/interfaces/button-data';
import { ResourceEnum } from '$lib/definitions/resources';
import { FabricatorEnum } from './fabricators';

export enum FabricatorButtonTypes {
  Miner = "Miner Fab",
}

export let FabricatorButtons: Map<string, ButtonData> = new Map([
  [
    FabricatorButtonTypes.Miner,
    {
      description: "A fabricator that can make various miners",
      inputs: [{input: ResourceEnum.Coal, amount: 10}, {input: ResourceEnum.Iron, amount: 10}],
      outputs: [{output: FabricatorEnum.Miner, amount: 1}],
      disabled: false,
      unlocked: true
    }
  ]
]);