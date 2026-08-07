// MENU
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// CARROSSEL

// 1. Seleciona os elementos no HTML
const carrossel = document.getElementById('carrossel');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

btnNext.addEventListener('click', () => {
  // Rola quase a largura inteira que está aparecendo na tela no momento
  const scrollAmount = carrossel.clientWidth * 0.8; 

  carrossel.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

btnPrev.addEventListener('click', () => {
  const scrollAmount = carrossel.clientWidth * 0.8;

  carrossel.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});