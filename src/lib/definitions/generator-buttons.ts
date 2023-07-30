import type { ManualResource } from "$lib/interfaces/manual-resource";

export let ResourceButtons: Map<string, ManualResource> = new Map([
  ["Steam Engine",
    {
      description: "Burns coal to produce power",
      products: ["Steam Engine"],
      baseProduction: [1],
      inputs: ["Energy", "Iron"],
      baseCost: [10, 20],
      disabled: false,
      unlocked: true,
    }
  ],
]);