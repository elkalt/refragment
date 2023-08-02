export interface ButtonData {
  description: string;
  disabled: boolean;
  unlocked: boolean;
  inputs: {input: string, amount: number}[];
  outputs: {output: string, amount: number}[];
  sustain?: {interval: number, totalTime: number};
}