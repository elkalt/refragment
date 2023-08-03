import { writable } from "svelte/store";
import { ResourceButtonStore } from "./resource-button-store";
import { TickState } from "$lib/definitions/tick-state";
import { RobotStore } from "./robot-store";
import { GeneratorStore } from "./generator-store";

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
    getTickSpeed: () => {
      return TickState.tickSpeed;
    },
    getCurrentTick: () => {
      return TickState.currentTick;
    },
    updateTick: () => {
      ResourceButtonStore.tickUpdate();
      RobotStore.tickUpdate(TickState.currentTick);
      GeneratorStore.tickUpdate(TickState.currentTick);

      update((tickStore) => {
        tickStore.currentTick++;
        return tickStore;
      });
    }
  }
}

export let TickManager = createTickManager();