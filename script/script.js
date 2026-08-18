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

// Dados dos diferenciais/pilares (abaixo do Carrossel)
const diferenciais = [
  {
    titulo: "Rigor no Cumprimento de Prazos",
    descricao: "Pontualidade garantida na entrega dos casos para manter a rotina das suas consultas sem imprevistos.",
    icone: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  },
  {
    titulo: "Padrão de Qualidade e Ajuste Fino",
    descricao: "Peças com adaptação marginal precisa, reduzindo expressivamente o tempo de desgaste na cadeira.",
    icone: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`
  },
  {
    titulo: "Integração ao Fluxo Digital",
    descricao: "Compatibilidade total com arquivos de escaneamento intraoral para reabilitações ágeis e previsíveis.",
    icone: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
  },
  {
    titulo: "Parceria e Suporte Técnico Direto",
    descricao: "Atendimento próximo ao cirurgião-dentista na discussão e planejamento dos casos mais complexos.",
    icone: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  }
];

let indiceAtual = 0;
const tempoTotal = 5000; // 5 segundos
const intervaloTick = 50; // Atualização da barra de progresso
let tempoDecorrido = 0;
let temporizador = null;
let estaPausado = false;

// Elementos DOM
const elTitulo = document.getElementById("diferencialTitulo");
const elDescricao = document.getElementById("diferencialDescricao");
const elIcone = document.getElementById("diferencialIcone");
const elBarra = document.getElementById("barraProgresso");
const elDots = document.querySelectorAll(".dot");
const cardElemento = document.getElementById("cardDiferencial");

// Renderiza o card atual com transição suave
function renderizarCard(index) {
  const conteudo = document.querySelector(".diferencial-conteudo");
  conteudo.classList.add("fading");

  setTimeout(() => {
    elTitulo.textContent = diferenciais[index].titulo;
    elDescricao.textContent = diferenciais[index].descricao;
    elIcone.innerHTML = diferenciais[index].icone;

    elDots.forEach((dot, idx) => {
      dot.classList.toggle("ativo", idx === index);
    });

    conteudo.classList.remove("fading");
  }, 200);
}

// Inicia o ciclo de rotação
function iniciarCiclo() {
  clearInterval(temporizador);
  tempoDecorrido = 0;

  temporizador = setInterval(() => {
    if (!estaPausado) {
      tempoDecorrido += intervaloTick;
      const porcentagem = (tempoDecorrido / tempoTotal) * 100;
      elBarra.style.width = `${porcentagem}%`;

      if (tempoDecorrido >= tempoTotal) {
        indiceAtual = (indiceAtual + 1) % diferenciais.length;
        renderizarCard(indiceAtual);
        tempoDecorrido = 0;
      }
    }
  }, intervaloTick);
}

// Controle Manual ao Clicar nos Dots
function mudarCardManual(index) {
  indiceAtual = index;
  renderizarCard(indiceAtual);
  iniciarCiclo();
}

// Pausa ao passar o mouse por cima
cardElemento.addEventListener("mouseenter", () => { estaPausado = true; });
cardElemento.addEventListener("mouseleave", () => { estaPausado = false; });

// Inicialização
renderizarCard(indiceAtual);
iniciarCiclo();

// ANTES E DEPOIS

document.querySelectorAll('.card-antes-depois').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('virado');
  });
});