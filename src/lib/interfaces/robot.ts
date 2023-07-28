export interface Robot {
  description: string;
  products: string[];
  baseProduction: number[];
  baseProductionInterval: number;
  baseProductionTime: number;
  inputs: string[];
  baseCost: number[];
  disabled: boolean;
  unlocked: boolean;
}