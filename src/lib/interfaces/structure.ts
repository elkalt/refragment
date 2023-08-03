import type { Resource } from "./resource";

export interface Structure extends Resource {
  activated: number[];
  inputs: {input: string, amount: number}[];
  outputs: {output: string, amount: number}[];
  interval: number;
}