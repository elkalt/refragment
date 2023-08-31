import type { Resource } from "$lib/interfaces/resource";

export enum GeneratorEnum {
  Boiler = "Boiler",
}

export let Generators: Map<string, Resource> = new Map([
  [
    GeneratorEnum.Boiler,
    {
      unlocked: true,
      amount: 0
    }
  ],
]);