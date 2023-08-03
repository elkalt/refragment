import { writable } from "svelte/store";
import { Robots } from "$lib/definitions/robots";
import { RobotButtonStore } from "./robot-button-store";
import { TickManager } from "./tick-manager";
import { ResourceStore } from "./resource-store";

function createRobotStore() {
  let {subscribe, update} = writable(Robots);

  return {
    subscribe,
    increment: (robotName: string, amount: number) => {
      let robot = Robots.get(robotName);
      if (!robot) throw new Error("Generator does not exist: " + robotName);

      robot.amount += amount;
      robot.created?.push(TickManager.getCurrentTick());
      update(() => Robots);
    },
    decrement: (robotName: string, amount: number) => {
      let robot = Robots.get(robotName);
      if (!robot) throw new Error("Generator does not exist: " + robotName);

      robot!.amount -= amount;
      update((Robots) => Robots);
    },

    tickUpdate: (currentTick: number) => {
      for (let robotName of Robots.keys()) {
        let sustainInfo = RobotButtonStore.getSustainInfo(robotName)!;
        if (sustainInfo) {
          for (let startTick of Robots.get(robotName)!.created!) {
            let elapsedTicks = currentTick - startTick;
            if (elapsedTicks !== 0 && elapsedTicks % sustainInfo.sustain!.interval === 0) {
              for (let output of sustainInfo.outputs) {
                ResourceStore.increment(output.output, output.amount);
              }
            }
            if (elapsedTicks === sustainInfo.sustain!.totalTime) {
              Robots.get(robotName)!.created!.splice(Robots.get(robotName)!.created!.indexOf(startTick), 1);
            }
          }
        }
      }
      update(() => Robots);
    }
  }
}

export let RobotStore = createRobotStore();