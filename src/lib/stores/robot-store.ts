import { RobotButtons } from "$lib/definitions/robots-buttons";
import { writable } from "svelte/store";
import { ResourceStore } from "./resource-store";

function createRobotStore() {
  let {subscribe, update} = writable(RobotButtons);

  return {
    subscribe,
    unlock: (robot: string) => {
      if (!RobotButtons.has(robot)) throw new Error("Resource does not exist: " + robot);

      RobotButtons.get(robot)!.unlocked = true;
      update(() => RobotButtons);
    },
    use: (robot: string) => {
      let robotResource = RobotButtons.get(robot);
      
      if (robotResource) {
        let i = robotResource.inputs.indexOf("Time");
        if (i !== -1) {
          robotResource.disabled = true;
          update(() => RobotButtons);
          setTimeout(() => {
            robotResource!.disabled = false;
            update(() => RobotButtons);
          }, robotResource.baseCost[i] * 1000);
        }
        for (let i = 0; i < robotResource.inputs.length; i++) {
          if (robotResource.inputs[i] !== "Time") {
            ResourceStore.decrement(robotResource.inputs[i], robotResource.baseCost[i]);
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