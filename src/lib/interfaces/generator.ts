export interface Generator {
  unlocked: boolean;
  amount: number;
  enabled: number;
  inputs: string[];
  baseCost: number[];
  products: string[];
  baseProduction: number[];
  interval: number;
}