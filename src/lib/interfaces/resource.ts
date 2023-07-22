export interface Resource {
  identifier: string;
  unlocked: boolean;
  name: string;
  description?: string;
  amount: number;
}