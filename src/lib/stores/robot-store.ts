import { Robots } from "$lib/definitions/robots";
import { RobotButtonStore } from "./robot-button-store";
import { TickManager } from "./tick-manager";
import { ResourcesStore } from "./resources-store";
import { createResourceStore, type ResourceStore } from "./generic/resource-store";

export interface RobotStore extends ResourceStore {
  tickUpdate: (currentTick: number) => void
}

function createRobotStore() {
  let {subscribe, update, dump, overwrite, getAmount, contains} = createResourceStore(Robots);

  return {
    subscribe,
    update,
    dump,
    overwrite,
    getAmount,
    contains,
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
        // TODO: Find a way to refactor this to remove the circular dependency
        let sustainInfo = RobotButtonStore.getSustainInfo(robotName)!;
        if (sustainInfo) {
          for (let startTick of Robots.get(robotName)!.created!) {
            let elapsedTicks = currentTick - startTick;
            if (elapsedTicks !== 0 && elapsedTicks % sustainInfo.sustain!.interval === 0) {
              for (let output of sustainInfo.outputs) {
                ResourcesStore.increment(output.output, output.amount);
              }
            }
            if (elapsedTicks === sustainInfo.sustain!.totalTime) {
              Robots.get(robotName)!.created!.splice(Robots.get(robotName)!.created!.indexOf(startTick), 1);
            }
          }
        }
      }
      update(() => Robots);
    },
  }
}

export let RobotStore = createRobotStore();