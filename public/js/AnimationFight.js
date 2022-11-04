import { Warrior } from "./Warrior.js";

export class AnimationFigth {
  constructor() {
    this.ctx = document.querySelector('.canvas-arena').getContext('2d');
    this.width = 800;
    this.height = 200;
    this.showWarrior1 = false;
    this.warrior1 = new Warrior(this, '/img/vicking1.png');
    this.showWarrior2 = false;
    this.warrior2 = new Warrior(this, '/img/vicking2.png');
  }

  addWarrior(num, id, hp) {
    if (num === 1) {
      this.showWarrior1 = true;
      this.warrior1.createWarrior(id, hp, 'L')
    }
    if (num === 2) {
      this.showWarrior2 = true;
      this.warrior2.createWarrior(id, hp, 'R')
    }
  }

  hideWarrior(num) {
    if (num === 1) this.showWarrior1 = false
    if (num === 2) this.showWarrior2 = false
  }

  moveWarrior(id, type, hp) {
    if (this.warrior1.id === id) {
      if (type === 'attack') {
        this.warrior1.isAttack = true;
        this.warrior1.attack();
      }

      if (type === 'defense') {
        this.warrior1.isdefense = true;
        this.warrior1.hp = hp
        this.warrior1.defense();
      }

      if (type === 'dea') {
        this.warrior1.isDea = true;
        this.warrior1.dea();
      }
    }

    if (this.warrior2.id === id) {
      if (type === 'attack') {
        this.warrior2.isAttack = true;
        this.warrior2.attack();
      }

      if (type === 'defense') {
        this.warrior2.isdefense = true;
        this.warrior2.hp = hp;
        this.warrior2.defense();
      }

      if (type === 'dea') {
        this.warrior2.isDea = true;
        this.warrior2.dea();
      }
    }
  }

  startGame() {
    this.animate();
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.showWarrior1) this.warrior1.draw();
    if (this.showWarrior2) this.warrior2.draw();

    requestAnimationFrame(this.animate);
  };
}