import { writable } from "svelte/store";
import { ResourceButtonStore } from "./resource-button-store";
import { TickState } from "$lib/definitions/tick-state";
import { RobotStore } from "./robot-store";

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
    getCurrentTick: () => {
      return TickState.currentTick;
    },
    updateTick: () => {
      ResourceButtonStore.update();
      RobotStore.update(TickState.currentTick);

      update((tickStore) => {
        tickStore.currentTick++;
        return tickStore;
      });
    }
  }
}

export let TickManager = createTickManager();