import { Robots } from "$lib/definitions/robots";
import { writable } from "svelte/store";
import { ResourceStore } from "./resource-store";
import type { Robot } from "$lib/interfaces/robot";

function createRobotStore() {
  let {subscribe, update} = writable(Robots);

  return {
    subscribe,
    unlock: (robot: string) => {
      if (!Robots.has(robot)) throw new Error("Resource does not exist: " + robot);

      Robots.get(robot)!.unlocked = true;
      update(() => Robots);
    },
    use: (robot: string) => {
      let robotResource = Robots.get(robot);
      
      if (robotResource) {
        for (let i = 0; i < robotResource.consumed.length; i++) {
          if (robotResource.consumed[i] !== "Time") {
            ResourceStore.decrement(robotResource.consumed[i], robotResource.baseCost[i]);
          }
        }
        let elapsedTime = 0;
        let interval = setInterval(() => {
          for (let i = 0; i < robotResource!.products.length; i++) {
            ResourceStore.increment(robotResource!.products[i], robotResource!.baseProduction[i]);
          }
          elapsedTime += robotResource!.baseProductionInterval;
          if (elapsedTime >= robotResource!.baseProductionTime) {
            clearInterval(interval);
          }
        }, robotResource.baseProductionInterval * 1000);
      } else {
        throw new Error("Robot does not exist: " + robot);
      }
    }
  }
}

export let RobotStore = createRobotStore();