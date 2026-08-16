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

// LÓGICA DE FILTRAGEM POR ABAS
const tabBtns = document.querySelectorAll('.tab-btn');
const trabalhoCards = document.querySelectorAll('.trabalho-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove a classe 'active' de todos os botões e adiciona no clicado
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const categoriaSelecionada = btn.getAttribute('data-categoria');

    // Filtra os cards
    trabalhoCards.forEach(card => {
    // Transforma a lista de categorias em um array de palavras
    const categoriasDoCard = card.getAttribute('data-categoria').split(' ');

    // Verifica se a categoria clicada está na lista do card
    if (categoriasDoCard.includes(categoriaSelecionada)) {
      card.classList.remove('escondido');
    } else {
      card.classList.add('escondido');
    }
    });

    // Reseta a rolagem do carrossel para o início ao trocar de aba
    carrossel.scrollTo({ left: 0, behavior: 'smooth' });
  });
});

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

// ANTES E DEPOIS

document.querySelectorAll('.card-antes-depois').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('virado');
  });
});