import { AnimationFigth } from './AnimationFight.js';

document.addEventListener('DOMContentLoaded', () => {
  const btnNewGame = document.querySelector('.new-game');
  const btnStartFight = document.querySelector('.btn-start-fight');
  const modal = document.querySelector('.modal');
  const elLogDispalay = document.querySelector('.log-game');

  const selectWarrior1 = document.querySelector('.warrior1');
  const selectWarrior2 = document.querySelector('.warrior2');

  const animateFight = new AnimationFigth();

  // functions
  const blockWarriorInSelect = e => {
    const parent = e.target;
    const idWarrior = parent.options[parent.selectedIndex].value;
    const hp = Number(parent.options[parent.selectedIndex].dataset.hp);
    const options = parent.classList.contains('warrior1')
      ? selectWarrior2.querySelectorAll('option')
      : selectWarrior1.querySelectorAll('option');

    for (const option of options) {
      if (option.value === idWarrior && option.value !== '0') {
        selectWarrior2.disabled = false;
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }

    selectWarrior1.selectedIndex ? animateFight.addWarrior(1, selectWarrior1.value, hp) : '';
    selectWarrior2.selectedIndex ? animateFight.addWarrior(2, selectWarrior2.value, hp) : '';

    if (selectWarrior1.selectedIndex && selectWarrior2.selectedIndex) {
      btnStartFight.classList.add('btn-start-fight-show');
    } else {
      btnStartFight.classList.remove('btn-start-fight-show');
      elLogDispalay.classList.remove('log-game-show');
    }
  };

  const getFigthLog = async () => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id1: selectWarrior1.value, id2: selectWarrior2.value }),
    };

    const data = await fetch('http://localhost:3000/fight', options);

    return await data.json();
  };

  const oneLog = el => {
    const p = document.createElement('p');

    if (el.log.id === selectWarrior1.value) {
      p.classList.add('log-warrior1');
      p.innerText = el.msg;
    } else {
      p.classList.add('log-warrior2');
      p.innerText = el.msg;
    }

    elLogDispalay.append(p);

    const { id, type, hp } = el.log;
    animateFight.moveWarrior(id, type, hp);
  };

  const displayLog = log => {
    log.forEach((el, index) => {
      setTimeout(() => oneLog(el), index * 1500);

      if (log.length - 1 === index) {
        
      }
    });
  };

  const startFight = async () => {
    btnStartFight.classList.remove('btn-start-fight-show');
    elLogDispalay.classList.add('log-game-show');
    selectWarrior1.disabled = 'true';
    selectWarrior2.disabled = 'true';

    displayLog(await getFigthLog());
  };

  const modalHide = () => modal.classList.add('modal-hide');

  // Events
  btnNewGame.addEventListener('click', modalHide);
  btnStartFight.addEventListener('click', startFight);
  selectWarrior1.addEventListener('change', blockWarriorInSelect);
  selectWarrior2.addEventListener('change', blockWarriorInSelect);

  // Start Animate
  animateFight.startGame();
});
