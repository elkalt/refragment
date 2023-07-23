import type { Resource } from "$lib/interfaces/resource";

export let Resources: Map<string, Resource> = new Map([
  ["Energy", {unlocked: true, amount: 0}],
  ["Coal", {unlocked: true, amount: 0}],
  ["Iron Ore", {unlocked: true, amount: 0}],
  ["Iron", {unlocked: true, amount: 0}],
]);