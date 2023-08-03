import { RobotButtons } from "$lib/definitions/robot-buttons";
import { writable } from "svelte/store";
import { ResourceStore } from "./resource-store";
import { RobotStore } from "./robot-store";

function createRobotButtonStore() {
  let {subscribe, update} = writable(RobotButtons);

  return {
    subscribe,
    unlock: (robotButtonName: string) => {
      let robotButton = RobotButtons.get(robotButtonName);
      if (!robotButton) throw new Error("Resource does not exist: " + robotButtonName);

      robotButton!.unlocked = true;
      update(() => RobotButtons);
    },

    use: (robotButtonName: string) => {
      let robotButton = RobotButtons.get(robotButtonName);
      
      if (robotButton) {
        for (let input of robotButton.inputs) {
          if (input.input === "Time") {
            robotButton.disabled = true;
            robotButton.cooldown = input.amount;
            update(() => RobotButtons);
          } else {
            ResourceStore.decrement(input.input, input.amount);
          }
        }
        RobotStore.increment(robotButtonName, 1);
      } else {
        throw new Error("Robot does not exist: " + robotButtonName);
      }
    },

    getSustainInfo: (robotButtonName: string) => {
      let robotResource = RobotButtons.get(robotButtonName);
      if (!robotResource) throw new Error("Resource does not exist: " + robotButtonName);

      return {sustain: robotResource.sustain, outputs: robotResource.outputs};
    }
  }
}

export let RobotButtonStore = createRobotButtonStore();