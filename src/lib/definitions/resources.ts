import type { Resource } from "$lib/interfaces/resource";

export let Resources: Map<string, Resource> = new Map([
  ["Energy", {unlocked: true, amount: 0}],
  ["Circuits", {unlocked: true, amount: 0}],
  ["Circuits2", {unlocked: true, amount: 0}],
  ["Circuits3", {unlocked: true, amount: 0}],
  ["Circuits4", {unlocked: true, amount: 0}],
  ["Research", {unlocked: false, amount: 0}],
]);