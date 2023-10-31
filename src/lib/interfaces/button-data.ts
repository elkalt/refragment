export interface ButtonData {
  description: string;
  disabled: boolean;
  unlocked: boolean;
  cooldown?: number;
  inputs: {input: string, amount: number}[];
  outputs: {output: string, amount: number}[];
}