import { RobotButtons } from "$lib/definitions/robot-buttons";
import { createButtonStore } from "./generic/button-store";
import { ResourcesStore } from "./resources-store";
import { RobotStore } from "./robot-store";

function createRobotButtonStore() {
  let {subscribe, dump, overwrite, unlock, use, tickUpdate} = createButtonStore(RobotButtons, [ResourcesStore], [RobotStore]);

  return {
    subscribe,
    dump,
    overwrite,
    unlock,
    use,
    tickUpdate,

    getSustainInfo: (robotButtonName: string) => {
      let robotResource = RobotButtons.get(robotButtonName);
      if (!robotResource) throw new Error("Resource does not exist: " + robotButtonName);

      return {sustain: robotResource.sustain, outputs: robotResource.outputs};
    }
  }
}

export let RobotButtonStore = createRobotButtonStore();