import type { StructureListData } from "$lib/interfaces/structure-list-data";
import type { ResourceStore } from "./resource-store";
import { TickManager } from "../tick-manager";
import { writable } from "svelte/store";

export interface StructureStore {
  subscribe: (run: (value: Map<string, StructureListData>) => void, invalidate?: (value?: Map<string, StructureListData>) => void) => () => void;
  increment: (structureName: string, amount: number) => void;
  decrement: (structureName: string, amount: number) => void;
  tickUpdate: (currentTick: number) => void;
}

export function createStructureStore(
  StructureListData: Map<string, StructureListData>,
  StructureData: ResourceStore,
  inputStores: ResourceStore[],
  outputStores: ResourceStore[])
{
  let {subscribe, update} = writable(StructureListData);

  function inputsSatisfied(inputs: {input: string, amount: number}[]) {
    for (let inputStore of inputStores) {  
      for (let input of inputs) {
        if (inputStore.contains(input.input) && input.amount > inputStore.getAmount(input.input)) return false;
      }
    }
    return true;
  }

  return {
    subscribe,
    increment: (structureName: string, amount: number) => {
      let structure = StructureListData.get(structureName);
      if (!structure) throw new Error("structure does not exist: " + structureName);

      let toPush = Math.min(amount, StructureData.getAmount(structureName) - structure.created.length);
      let currentTick = TickManager.getCurrentTick();
      for (let i = 0; i < toPush; i++) {
        structure.created.push(currentTick);
      }
      update(() => StructureListData);
    },
    decrement: (structureName: string, amount: number) => {
      let structure = StructureListData.get(structureName);
      if (!structure) throw new Error("Structure does not exist: " + structureName);

      let toPop = Math.min(Math.abs(amount), structure.created.length);
      console.log(toPop)
      for (let i = 0; i < toPop; i++) {
        structure.created.pop();
      }
      update(() => StructureListData);
    },
    tickUpdate: (currentTick: number) => {
      for (let [structureName, structure] of StructureListData) {
        for (let startTick of structure.created) {
          let elapsedTicks = currentTick - startTick;
          if (elapsedTicks !== 0 && elapsedTicks % structure.interval === 0 && inputsSatisfied(structure.inputs)) {
            for (let inputStore of inputStores) {
              for (let input of structure.inputs) {
                inputStore.decrement(input.input, input.amount);
              }
            }
            for (let outputStore of outputStores) {
              for (let output of structure.outputs) {
                outputStore.increment(output.output, output.amount);
              }
            }
          }
        }
      }
    }
  };
}