import type { Resource } from "$lib/interfaces/resource";

export enum ResourceEnum {
  Time = "Time",
  Energy = "Energy",
  Coal = "Coal",
  IronOre = "Iron Ore",
  Iron = "Iron",
}

export let Resources: Map<string, Resource> = new Map([
  [ResourceEnum.Energy, {unlocked: true, amount: 10000}],
  [ResourceEnum.Coal, {unlocked: true, amount: 10000}],
  [ResourceEnum.IronOre, {unlocked: true, amount: 10000}],
  [ResourceEnum.Iron, {unlocked: true, amount: 10000}],
]);