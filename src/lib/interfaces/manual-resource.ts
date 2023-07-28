export interface ManualResource {
  description: string;
  products: string[];
  baseProduction: number[];
  inputs: string[];
  baseCost: number[];
  disabled: boolean;
  unlocked: boolean;
}