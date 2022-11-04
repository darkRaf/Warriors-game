import { pool } from '../utils/db';
import { v4 as uuid } from 'uuid';
import {
  WarriorName,
  WarriorNameResults,
  WarriorResults,
  Winners,
  WinnersResults,
} from '../types/warrior';

export class Warrior {
  public id?: string | null;
  public readonly name: string;
  public readonly power: number;
  public protection: number;
  public readonly strength: number;
  public readonly agility: number;
  public hp: number;

  public constructor(obj: Warrior) {
    this.id = obj.id ?? null;
    this.name = obj.name;
    this.power = obj.power;
    this.protection = obj.protection;
    this.strength = obj.strength;
    this.agility = obj.agility;
    this.hp = obj.strength * 10;
  }

  public static async getWarrior(id: string): Promise<Warrior | null> {
    const sql =
      'SELECT `id`, `name`, `power`, `protection`, `strength`, `agility` FROM `warrior` WHERE `id` = :id';

    const [result] = (await pool.execute(sql, {
      id,
    })) as WarriorResults;

    return result.length === 0 ? null : new Warrior(result[0]);
  }

  public static async getAllName(): Promise<WarriorName[] | null> {
    const sql = 'SELECT `id`, `name`, `strength` FROM `warrior` WHERE 1';

    const [result] = (await pool.execute(sql)) as WarriorNameResults;

    return result;
  }

  public async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    let sql =
      'INSERT INTO `warrior`(`id`, `name`, `power`, `protection`, `strength`, `agility`) VALUES (:id, :name, :power, :protection, :strength, :agility)';

    await pool.execute(sql, {
      id: this.id,
      name: this.name,
      power: this.power,
      protection: this.protection,
      strength: this.strength,
      agility: this.agility,
    });

    sql = 'INSERT INTO `winners` (`id`, `victories`) VALUES (:id, 0)';

    await pool.execute(sql, {
      id: this.id,
    });

    return this.id;
  }

  static async getWinners(): Promise<Winners[]> {
    const sql =
      'SELECT `warrior`.`name`, `winners`.`victories` FROM winners LEFT JOIN `warrior` ON `winners`.`id` = `warrior`.`id` ORDER BY `winners`.`victories` DESC , `warrior`.`name` ASC LIMIT 10';

    const [results] = (await pool.execute(sql)) as WinnersResults;

    return results;
  }

  public async addVictory(): Promise<void> {
    const sql = 'UPDATE `winners` SET `victories`= `victories` + 1 WHERE  `id` = :id';

    await pool.execute(sql, { id: this.id });
  }

  static async checkUniqueName(name: string): Promise<boolean> {
    const sql = 'SELECT `name` FROM `warrior` WHERE `name` LIKE :name';

    const [results] = (await pool.execute(sql, { name })) as WarriorNameResults;

    return results.length > 0 ? false : true;
  }
}
