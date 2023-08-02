import type { Resource } from "$lib/interfaces/resource";

export let Robots: Map<string, Resource> = new Map([
  ["Coal Miner", {unlocked: true, amount: 0, created: []}],
  ["Iron Miner", {unlocked: true, amount: 0, created: []}],
]);