export interface ManualResource {
  description: string;
  products: string[];
  baseProduction: number[];
  consumed: string[];
  baseCost: number[];
  unlocked: boolean;
}