import type { Resource } from "$lib/interfaces/resource";

export enum FabricatorEnum {
  Miner = "Miner Fab",
}

export let Fabricators: Map<string, Resource> = new Map([
  [
    FabricatorEnum.Miner,
    {
      unlocked: true,
      amount: 5
    }
  ],
]);