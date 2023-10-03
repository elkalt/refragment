import { ResourceButtons } from "$lib/definitions/resource-buttons";
import { ResourcesStore } from "./resources-store";
import { createButtonStore } from "./generic/button-store";

export let ResourcesButtonStore = createButtonStore(ResourceButtons, [ResourcesStore], [ResourcesStore]);