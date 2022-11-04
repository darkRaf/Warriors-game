export type TypesFight = 'attack' | 'defense' | 'winn' | 'dea';

export interface LogRecord {
  msg: string;
  log: {
    id: string;
    type: TypesFight;
    hp: number;
  }
}