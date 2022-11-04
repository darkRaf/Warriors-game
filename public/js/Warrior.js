export class Warrior {
  constructor(animationFight, urlImg) {
    this.animationFight = animationFight;
    this.ctx = animationFight.ctx;
    this.id;
    this.side;
    this.warrior = new Image();
    this.warrior.src = urlImg;
    this.frameWidth = 160;
    this.frameHeight = 140;
    this.frameX = 0;
    this.frameY = 1;
    this.moveX = 5;
    this.x;
    this.y = 60;
    this.fullPower = 0;
    this.hp = 0;
    this.isAttack = false;
    this.isdefense = false;
    this.isDea = false;
    this.lastTime = 0;
    this.lastTimeFrame = 0;
    this.timeDelay = 30;
    this.step = 0;
  }

  setSide(side) {
    // only 'L' or 'R'
    this.side = side;
    if (side === 'L') {
      this.moveX *= 1;
      this.startMove = 250;
      this.x = 250;
    } else {
      if (this.moveX > 0) this.moveX *= -1;
      this.startMove = 450;
      this.x = 450;
    }
  }

  createWarrior(id, hp, side) {
    this.fullPower = hp * 10;
    this.hp = hp * 10;
    this.id =id ;
    this.setSide(side);
  }

  draw() {
    if (!this.isDea) this.lifeline()
    if (Date.now() > this.lastTime + this.timeDelay) {
      this.attack();
      this.defense();
      this.dea();

      this.lastTime = Date.now();
    }

    this.ctx.drawImage(
      this.warrior,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    );
  }

  lifeline() {
    if (this.hp < 0) this.hp = 0;

    const px = (this.hp * 40) / this.fullPower;
    const percent = (px / 40) * 100;

    this.ctx.beginPath();
    this.ctx.lineWidth = 0.5;
    this.ctx.fillStyle = 'rgb(78, 108, 241)';
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = 'rgb(78, 108, 241)';

    if (percent < 50) this.ctx.fillStyle = 'rgb(255, 238, 49)';
    if (percent < 30) this.ctx.fillStyle = 'rgb(221, 45, 45)';

    this.ctx.rect(this.x + 30, this.y + 10, px, 4);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  attack() {
    if (this.isAttack) {
      if (Date.now() > this.lastTimeFrame + this.timeDelay) {
        this.frameY = 1;
        this.x += this.moveX;
        let widthWarrior = 0;

        if (this.side === 'R') widthWarrior = 80;

        if (Math.abs(this.x - this.startMove) > 0 + widthWarrior) this.frameX = 1;
        if (Math.abs(this.x - this.startMove) > 30 + widthWarrior) this.frameX = 2;
        if (Math.abs(this.x - this.startMove) > 60 + widthWarrior) this.frameX = 3;
        if (Math.abs(this.x - this.startMove) > 90 + widthWarrior) this.frameX = 4;
        if (Math.abs(this.x - this.startMove) > 110 + widthWarrior) this.frameX = 5;

        if (this.frameX === 5) {
          this.x = this.startMove;
          this.isAttack = false;
          this.frameX = 0;
        }

        this.lastTimeFrame = Date.now();
      }
    }
  }

  defense() {
    if (this.isdefense) {
      if (Date.now() > this.lastTimeFrame + this.timeDelay * 3) {
        if (this.step++ % 2) {
          this.frameX = 1;
          this.frameY = 0;
        } else {
          this.frameX = 0;
          this.frameY = 0;
        }

        if (this.step ===10) {
          this.frameX = 0;
          this.frameY = 1;
          this.isdefense = false;
          this.step = 0;
        }

        this.lastTimeFrame = Date.now();
      }
    }
  }

  dea() {
    if (this.isDea) {
      if (Date.now() > this.lastTimeFrame + this.timeDelay * 5) {
        if (this.frameX !== 4) {
          this.frameX++;
          this.frameY = 0;
        }

        this.lastTimeFrame = Date.now();
      }
    }
  }
}
