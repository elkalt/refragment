import type { ManualResource } from '$lib/interfaces/manual-resource';

export let ManualResources: Map<string, ManualResource> = new Map([
  ["Energy", {costIdentifier: "Time", baseCost: 10, baseProduction: 1}],
  ["Circuits", {costIdentifier: "Time", baseCost: 10, baseProduction: 1}],
  ["Circuits2", {costIdentifier: "Time", baseCost: 10, baseProduction: 1}],
  ["Circuits3", {costIdentifier: "Time", baseCost: 10, baseProduction: 1}],
  ["Circuits4", {costIdentifier: "Time", baseCost: 10, baseProduction: 1}],
]);