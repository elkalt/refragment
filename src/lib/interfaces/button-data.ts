export interface ButtonData {
  name: string;
  inputs: {input: string, amount: number}[];
  outputs: {output: string, amount: number}[];
  sustain?: {interval: number, totalTime: number};
}