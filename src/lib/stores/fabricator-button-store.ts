import { FabricatorButtons } from "$lib/definitions/fabricator-buttons";
import { FabricatorStore } from "./fabricator-store";
import { ResourcesStore } from "./resources-store";
import { createButtonStore } from "./generic/button-store";

export let FabricatorButtonStore = createButtonStore(FabricatorButtons, [ResourcesStore], [FabricatorStore]);