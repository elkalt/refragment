import { GeneratorButtons } from "$lib/definitions/generator-buttons";
import { ResourcesStore } from "./resources-store";
import { createButtonStore } from "./generic/button-store";

export let GeneratorButtonStore = createButtonStore(GeneratorButtons, [ResourcesStore], [ResourcesStore]);