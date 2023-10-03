import { writable } from "svelte/store";
import { ResourcesButtonStore } from "./resources-button-store";
import { TickState } from "$lib/definitions/tick-state";
import { RobotStore } from "./robot-store";
import { GeneratorStructureStore } from "./generator-structure-store";

function createTickManager() {
  let {subscribe, update } = writable(TickState);

  return {
    subscribe,
    setTickSpeed: (tickSpeed: number) => {
      update((tickStore) => {
        tickStore.tickSpeed = tickSpeed;
        return tickStore;
      });
    },
    convertTicksToSeconds: (ticks: number) => {
      return ticks / (1000 / TickState.tickSpeed);
    },
    getCurrentTick: () => {
      return TickState.currentTick;
    },
    updateTick: () => {
      ResourcesButtonStore.tickUpdate();
      RobotStore.tickUpdate(TickState.currentTick);
      GeneratorStructureStore.tickUpdate(TickState.currentTick);

      update((tickStore) => {
        tickStore.currentTick++;
        return tickStore;
      });
    }
  }
}

export let TickManager = createTickManager();