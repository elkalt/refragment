import { createResourceStore } from "./generic/resource-store";
import { Robots } from "$lib/definitions/robots";

export let RobotStore = createResourceStore(Robots);