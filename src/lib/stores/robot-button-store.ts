import { RobotButtons } from "$lib/definitions/robot-buttons";
import { createButtonStore, type ButtonStore } from "./generic/button-store";
import { ResourcesStore } from "./resources-store";
import { RobotStore } from "./robot-store";

export interface RobotButtonStore extends ButtonStore {
  getSustainInfo: (robotButtonName: string) => {sustain: {interval: number, totalTime: number}, outputs: {output: string, amount: number}[]}
}

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