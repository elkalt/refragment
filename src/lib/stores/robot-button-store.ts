import { RobotButtons } from "$lib/definitions/robot-buttons";
import { createButtonStore } from "./generic/button-store";
import { ResourcesStore } from "./resources-store";
import { RobotStore } from "./robot-store";
import { RobotStructureStore } from "./robot-structure-store";

function createRobotButtonStore() {
  let {subscribe, update, overwrite, unlock, use, tickUpdate} = createButtonStore(
    RobotButtons,
    [ResourcesStore],
    [RobotStore]
  );

  return {
    subscribe,
    update,
    overwrite,
    unlock,
    tickUpdate,
    use: (resourceButtonName: string) => {
      use(resourceButtonName);
      RobotStructureStore.increment(resourceButtonName, 1);
    }
  }
}

export let RobotButtonStore = createRobotButtonStore();