import { createStructureStore } from "./generic/structure-store";
import { RobotStructureData } from "$lib/definitions/robot-structures";
import { ResourcesStore } from "./resources-store";
import { RobotStore } from "./robot-store";

function createRobotStructureStore() {
  let {subscribe, update, overwrite, increment, decrement} = createStructureStore(
    RobotStructureData,
    RobotStore,
    [],
    [ResourcesStore]
  );

  return {
    subscribe,
    update,
    overwrite,
    increment,
    decrement,
    tickUpdate: (currentTick: number) => {
      for (let [structureName, structure] of RobotStructureData) {
        for (let startTick of structure.created) {
          let elapsedTicks = currentTick - startTick;
          if (elapsedTicks !== 0 && elapsedTicks % structure.interval === 0) {
            for (let output of structure.outputs) {
              ResourcesStore.increment(output.output, output.amount);
            }
          }
          if (structure.totalTime && elapsedTicks >= structure.totalTime) {
            structure.created.splice(structure.created.indexOf(startTick), 1);
            update(() => RobotStructureData);
            RobotStore.decrement(structure.structure, 1);
          }
        }
      }
    }
  }
}

export let RobotStructureStore = createRobotStructureStore();