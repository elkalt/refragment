export interface StructureListData {
  unlocked: boolean;
  structure: string;
  created: number[];
  inputs: {input: string, amount: number}[];
  outputs: {output: string, amount: number}[];
  interval: number;
  totalTime?: number;
}