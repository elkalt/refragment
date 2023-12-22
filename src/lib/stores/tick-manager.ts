import { writable } from "svelte/store";
import { ResourcesButtonStore } from "./resources-button-store";
import { TickState } from "$lib/definitions/tick-state";
import { GeneratorStructureStore } from "./generator-structure-store";
import { FabricatorStructureStore } from "./fabricator-structure-store";
import { RobotStructureStore } from "./robot-structure-store";

function createTickManager() {
  let { subscribe, update } = writable(TickState);

  return {
    subscribe,
    convertTicksToSeconds: (ticks: number) => {
      return ticks / TickState.tps;
    },

    getCurrentTick: () => {
      return TickState.currentTick;
    },

    updateTick: () => {
      ResourcesButtonStore.tickUpdate();
      RobotStructureStore.tickUpdate(TickState.currentTick);
      GeneratorStructureStore.tickUpdate(TickState.currentTick);
      FabricatorStructureStore.tickUpdate(TickState.currentTick);

      update((tickStore) => {
        tickStore.currentTick++;
        return tickStore;
      });
    },

    dump: (): any => {
      return TickState;
    },

    overwrite: (newTickState: any) => {
      TickState.currentTick = newTickState.currentTick;
      TickState.tps = 20;
      update(() => TickState);
    }
  }
}

export let TickManager = createTickManager();