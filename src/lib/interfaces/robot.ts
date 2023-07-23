export interface Robot {
  products: string[];
  baseProduction: number[];
  baseProductionInterval: number;
  baseProductionTime: number;
  consumed: string[];
  baseCost: number[];
  unlocked: boolean;
}