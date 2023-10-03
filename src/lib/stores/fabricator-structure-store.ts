import { FabricatorStructureData } from "$lib/definitions/fabricator-structures";
import { ResourcesStore } from "./resources-store";
import { FabricatorStore } from "./fabricator-store";
import { createStructureStore } from "./generic/structure-store";

export let FabricatorStructureStore = createStructureStore(
  FabricatorStructureData,
  FabricatorStore,
  [ResourcesStore],
  [ResourcesStore]
);