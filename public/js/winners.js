document.addEventListener('DOMContentLoaded', () => {
  const allSectionWinners = document.querySelectorAll('.section-winner');

  allSectionWinners.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('show-winner');
    }, 200 * index);
  });
});
