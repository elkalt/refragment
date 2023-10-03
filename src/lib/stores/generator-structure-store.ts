import { GeneratorStructureData } from "$lib/definitions/generator-structures";
import { ResourcesStore } from "./resources-store";
import { GeneratorStore } from "./generator-store";
import { createStructureStore } from "./generic/structure-store";

export let GeneratorStructureStore = createStructureStore(
  GeneratorStructureData,
  GeneratorStore,
  [ResourcesStore],
  [ResourcesStore]
);