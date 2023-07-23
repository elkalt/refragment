import type { Resource } from "$lib/interfaces/resource";

export let Resources: Map<string, Resource> = new Map([
  ["Energy", {unlocked: true, amount: 0}],
  ["Research", {unlocked: false, amount: 0}],
]);