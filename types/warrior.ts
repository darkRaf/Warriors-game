import { FieldPacket } from "mysql2";
import { Warrior } from "../records/warior.record";

export interface Winners {
  name: string;
  victories: number;
}

export interface WarriorName {
  id?: string;
  name: string;
}

export type WarriorResults = [Warrior[], FieldPacket[]];
export type WinnersResults = [Winners[], FieldPacket[]];
export type WarriorNameResults = [WarriorName[], FieldPacket[]];