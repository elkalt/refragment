import { createResourceStore } from "./generic/resource-store";
import { Fabricators } from "$lib/definitions/fabricators";

export let FabricatorStore = createResourceStore(Fabricators);