import { Warrior } from '../records/warior.record';
import { LogRecord, TypesFight } from '../types/figth';

export class Fight {
  public figthLog: LogRecord[] = [];
  private attacker: Warrior;
  private defender: Warrior;
  private next: Boolean;

  constructor(public warrior1: Warrior, public warrior2: Warrior) {
    this.fight();
    this.next = true;
  }

  public fight = async (): Promise<LogRecord[]> => {
    let attackFirst = Math.round(Math.random() + 1);

    while (this.next) {
      attackFirst === 1 ? (this.attacker = this.warrior1) : (this.attacker = this.warrior2);
      attackFirst === 2 ? (this.defender = this.warrior1) : (this.defender = this.warrior2);

      this.addLog(
        this.attacker.id,
        'attack',
        this.attacker.hp,
        `${this.attacker.name} atakuje ${this.defender.name} z siłą: ${this.attacker.power}.`
      );

      if (this.attacker.power === this.defender.protection) {
        this.addLog(
          this.defender.id,
          'defense',
          this.defender.hp,
          `${this.defender.name} obronił się przed atakiem: Życie: ${this.defender.hp}`
        );
      }

      if (this.defender.protection + this.defender.agility > this.attacker.power) {
        const tempProtection = this.defender.protection;

        this.defender.protection -= this.attacker.power;

        if (this.defender.protection < 0) {
          this.addLog(this.defender.id, 'defense', this.defender.hp, `${this.defender.name} traci tarczę.`);
          this.defender.protection = 0;
        }

        if (this.attacker.power > tempProtection) {
          this.defender.hp -= this.attacker.power - tempProtection;

          this.addLog(
            this.defender.id,
            'defense',
            this.defender.hp,
            `${this.defender.name} broni się przed atakiem i ponosi obrażenia. Życie: ${this.defender.hp}`
          );
        }
      } else {
        this.defender.hp -= this.attacker.power;

        this.addLog(
          this.defender.id,
          'defense',
          this.defender.hp,
          `${this.defender.name} broni się przed atakiem i ponosi obrażenia. Życie: ${this.defender.hp}`
        );
      }

      if (this.defender.hp <= 0) {
        this.next = false;
        this.addLog(this.defender.id,'dea' , this.defender.hp, `${this.defender.name} ginie w walce!!!`);

        this.addLog(this.attacker.id,'winn', this.attacker.hp, `${this.attacker.name} wygrywa pojedynek!!!.`);
        await this.attacker.addVictory();
      } else {
        attackFirst === 1 ? (attackFirst = 2) : (attackFirst = 1);
      }
    }

    return this.figthLog;
  };

  private addLog = (id: string, type: TypesFight, hp: number, msg: string): void => {
    this.figthLog.push({ msg, log: { id, type, hp } });
  };
}
