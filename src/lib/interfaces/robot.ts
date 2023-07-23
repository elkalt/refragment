export interface Robot {
  description: string;
  products: string[];
  baseProduction: number[];
  baseProductionInterval: number;
  baseProductionTime: number;
  consumed: string[];
  baseCost: number[];
  unlocked: boolean;
}