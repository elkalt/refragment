export interface ButtonData {
  description: string;
  disabled: boolean;
  inputs: {input: string, amount: number}[];
  outputs: {output: string, amount: number}[];
  sustain?: {interval: number; totalTime: number;};
  unlocked: boolean;
  cooldown?: number;
}