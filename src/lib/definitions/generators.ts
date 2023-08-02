import type { Resource } from "$lib/interfaces/resource";

export let Generators: Map<string, Resource> = new Map([
  ["Boiler", {unlocked: true, amount: 0}],
]);