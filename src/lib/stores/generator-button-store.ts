import { GeneratorButtons } from "$lib/definitions/generator-buttons";
import { ResourcesStore } from "./resources-store";
import { createButtonStore } from "./generic/button-store";
import { GeneratorStore } from "./generator-store";

export let GeneratorButtonStore = createButtonStore(GeneratorButtons, [ResourcesStore], [GeneratorStore]);