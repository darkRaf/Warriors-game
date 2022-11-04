document.addEventListener('DOMContentLoaded', () => {
  const inputName = document.querySelector('[name=name]');
  const inputs = document.querySelectorAll('.warrior-num');
  const btn = document.querySelector('.btn-save-warrior');

  const addClass = (item, className) => item.classList.add(className);
  const removeClass = (item, className) => item.classList.remove(className);

  const checkUniqueName = async () => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    options.body = JSON.stringify({ name: inputName.value });

    const data = await fetch('http://localhost:3000/is-unique-name', options);

    return await data.json();
  };

  const checkName = async () => {
    const warriorName = inputName.value.trim();
    inputName.value = warriorName;

    if (warriorName.length < 3 || warriorName.length > 20) {
      addClass(inputName, 'error');
      return;
    }

    if (await checkUniqueName()) {
      removeClass(inputName, 'error');
      addClass(inputName, 'success');
    } else {
      removeClass(inputName, 'success');
      addClass(inputName, 'error');
    }

    checkCorrectness();
  };

  const checkSum = () => {
    let minOne = true;

    for (const input of inputs) if (Number(input.value) < 1) minOne = false;

    const sum = [...inputs].reduce((prev, curr) => prev + Number(curr.value ?? 0), 0);

    if (sum === 10 && minOne) {
      inputs.forEach(input => {
        addClass(input, 'success');
        removeClass(input, 'error');
      });
    } else {
      inputs.forEach(input => {
        addClass(input, 'error');
        removeClass(input, 'success');
      });
    }

    checkCorrectness();
  };

  const checkCorrectness = () => {
    let isCorrect = true;

    if (!inputName.classList.contains('success')) isCorrect = false;
    for (const input of inputs) if (!input.classList.contains('success')) isCorrect = false;

    if (!isCorrect) return;

    btn.disabled = false;
    removeClass(btn, 'btn-disbled');
  };

  inputName.addEventListener('change', checkName);
  inputs.forEach(input => {
    input.addEventListener('change', checkSum);
  });
});
