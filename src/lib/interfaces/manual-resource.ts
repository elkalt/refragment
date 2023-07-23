export interface ManualResource {
  products: string[];
  baseProduction: number[];
  consumed: string[];
  baseCost: number[];
  cooldown: number;
  unlocked: boolean;
}