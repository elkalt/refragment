import type { ManualResource } from '$lib/interfaces/manual-resource';

export let ManualResources: Map<string, ManualResource> = new Map([
  ["Energy", {costIdentifier: "Time", baseCost: 10, baseProduction: 1}],
]);