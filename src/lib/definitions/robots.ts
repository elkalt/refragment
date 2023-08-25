import type { Resource } from "$lib/interfaces/resource";

export enum RobotEnum {
  CoalMiner = "Coal Miner",
  IronMiner = "Iron Miner",
}

export let Robots: Map<string, Resource> = new Map([
  [RobotEnum.CoalMiner, {unlocked: true, amount: 0, created: []}],
  [RobotEnum.IronMiner, {unlocked: true, amount: 0, created: []}],
]);