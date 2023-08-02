import { RobotButtons } from "$lib/definitions/robot-buttons";
import { writable } from "svelte/store";
import { ResourceStore } from "./resource-store";

function createRobotButtonStore() {
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
        for (let input of robotResource.inputs) {
          if (input.input === "Time") {
            robotResource.disabled = true;
            update(() => RobotButtons);
          
            setTimeout(() => {
              robotResource!.disabled = false;
              update(() => RobotButtons);
            }, input.amount * 1000);
          } else {
            ResourceStore.decrement(input.input, input.amount);
          }
        }
        let elapsedTime = 0;
        let interval = setInterval(() => {
          for (let output of robotResource!.outputs) {
            ResourceStore.increment(output.output, output.amount);
          }
          elapsedTime += robotResource!.sustain!.interval;
          if (elapsedTime >= robotResource!.sustain!.totalTime) {
            clearInterval(interval);
          }
        }, robotResource.sustain!.interval * 1000);
      } else {
        throw new Error("Robot does not exist: " + robot);
      }
    }
  }
}

export let RobotButtonStore = createRobotButtonStore();