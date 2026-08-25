// ==========================================
// 1. SELEÇÃO ÚNICA DE ELEMENTOS
// ==========================================
const header = document.querySelector('header');
const secoesEscuras = document.querySelectorAll('.secao-escura');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuIcon = menuBtn ? menuBtn.querySelector('.material-symbols-outlined') : null;

// ==========================================
// 2. CONTROLE DO MENU SIDEBAR (MOBILE)
// ==========================================
function abrirMenu() {
  if (sidebar) sidebar.classList.add('active');
  if (overlay) overlay.classList.add('active');
  if (header) header.classList.add('menu-aberto'); // Escurece o header ao fundo
  if (menuIcon) menuIcon.textContent = 'close';
}

function fecharMenu() {
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  if (header) header.classList.remove('menu-aberto'); // Volta a cor original
  if (menuIcon) menuIcon.textContent = 'menu';
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    if (sidebar && sidebar.classList.contains('active')) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  });
}

if (closeBtn) closeBtn.addEventListener('click', fecharMenu);
if (overlay) overlay.addEventListener('click', fecharMenu);

const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => link.addEventListener('click', fecharMenu));

// ==========================================
// 3. MUDANÇA DE COR DO HEADER NA ROLAGEM
// ==========================================
function checarPosicaoHeader() {
  if (!header) return;
  // Se o menu estiver aberto, NÃO altera a cor do header na rolagem
  if (sidebar && sidebar.classList.contains('active')) return;

  const headerHeight = header.offsetHeight;
  let sobreSecaoEscura = false;

  secoesEscuras.forEach(secao => {
    const rect = secao.getBoundingClientRect();
    if (rect.top <= headerHeight && rect.bottom >= 0) {
      sobreSecaoEscura = true;
    }
  });

  if (sobreSecaoEscura) {
    header.classList.add('header-escuro');
  } else {
    header.classList.remove('header-escuro');
  }
}

window.addEventListener('scroll', () => window.requestAnimationFrame(checarPosicaoHeader));
window.addEventListener('DOMContentLoaded', checarPosicaoHeader);
window.addEventListener('resize', checarPosicaoHeader);

// ==========================================
// 4. LÓGICA DE FILTRAGEM POR ABAS
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const trabalhoCards = document.querySelectorAll('.trabalho-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const categoriaSelecionada = btn.getAttribute('data-categoria');

    trabalhoCards.forEach(card => {
      const attr = card.getAttribute('data-categoria');
      const categoriasDoCard = attr ? attr.split(' ') : [];

      if (categoriasDoCard.includes(categoriaSelecionada)) {
        card.classList.remove('escondido');
      } else {
        card.classList.add('escondido');
      }
    });

    if (carrossel) carrossel.scrollTo({ left: 0, behavior: 'smooth' });
  });
});

// ==========================================
// 5. CARROSSEL DE TRABALHOS
// ==========================================
const carrossel = document.getElementById('carrossel');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

if (btnNext && carrossel) {
  btnNext.addEventListener('click', () => {
    const scrollAmount = carrossel.clientWidth * 0.8;
    carrossel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

if (btnPrev && carrossel) {
  btnPrev.addEventListener('click', () => {
    const scrollAmount = carrossel.clientWidth * 0.8;
    carrossel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}

// ==========================================
// 6. CARROSSEL DE DIFERENCIAIS / PILARES
// ==========================================
const diferenciais = [
  {
    titulo: "Atendimento e Envio para Todo o Brasil",
    descricao: "Logística ágil para envio de modelos físicos e arquivos digitais (STL) para todo o Brasil.",
    icone: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.7 5.2c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/></svg>`
  },
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
const tempoTotal = 5000;
const intervaloTick = 50;
let tempoDecorrido = 0;
let temporizador = null;
let estaPausado = false;

const elTitulo = document.getElementById("diferencialTitulo");
const elDescricao = document.getElementById("diferencialDescricao");
const elIcone = document.getElementById("diferencialIcone");
const elBarra = document.getElementById("barraProgresso");
const elDots = document.querySelectorAll(".dot");
const cardElemento = document.getElementById("cardDiferencial");

function renderizarCard(index) {
  if (!elTitulo || !elDescricao || !elIcone) return;
  const conteudo = document.querySelector(".diferencial-conteudo");
  if (conteudo) conteudo.classList.add("fading");

  setTimeout(() => {
    elTitulo.textContent = diferenciais[index].titulo;
    elDescricao.textContent = diferenciais[index].descricao;
    elIcone.innerHTML = diferenciais[index].icone;

    elDots.forEach((dot, idx) => {
      dot.classList.toggle("ativo", idx === index);
    });

    if (conteudo) conteudo.classList.remove("fading");
  }, 200);
}

function iniciarCiclo() {
  if (!elBarra) return;
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

if (cardElemento) {
  cardElemento.addEventListener("mouseenter", () => { estaPausado = true; });
  cardElemento.addEventListener("mouseleave", () => { estaPausado = false; });
  renderizarCard(indiceAtual);
  iniciarCiclo();
}

// ==========================================
// 8. CARDS ANTES E DEPOIS
// ==========================================
document.querySelectorAll('.card-antes-depois').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('virado');
  });
});

// ==========================================
// 9. SUAVIDADE DE ROLAGEM
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = 80; // Altura do seu header em pixels
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// 10. ANIMAÇÕES
// ==========================================

// ANIMAÇÃO MÉTRICAS

// Seleciona a seção das métricas
const secaoMetricas = document.getElementById("metricas");

// Cria o observador para detectar quando você rola até a seção
const observadorMetricas = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Quando a seção entra na tela
    if (entry.isIntersecting) {
      secaoMetricas.classList.add("animar"); // Adiciona a classe que ativa o CSS
      observer.unobserve(entry.target);     // Para de observar para rodar só uma vez
    }
  });
}, {
  threshold: 0.3 // Dispara a animação quando 30% da faixa estiver visível
});

// Ativa a observação se o elemento existir
if (secaoMetricas) {
  observadorMetricas.observe(secaoMetricas);
}

// ANIMAÇÃO CARDS

document.addEventListener("DOMContentLoaded", () => {
  let executado = false;

  function verificarVisualizacaoTexto() {
    if (executado) return;

    // Seleciona o elemento de texto inferior da segunda linha de cards
    const textoReferencia = document.querySelector("#cards-baixo .quarto-card .subtitulo-card");
    const caminhao = document.querySelector(".cards .fa-truck");
    const estrela = document.querySelector(".cards .fa-star");

    if (textoReferencia && caminhao && estrela) {
      const rect = textoReferencia.getBoundingClientRect();
      const alturaJanela = window.innerHeight || document.documentElement.clientHeight;

      // Dispara somente quando a linha de texto entrar no campo de visão (com folga de 50px)
      if (rect.top <= alturaJanela - 50 && rect.bottom >= 0) {
        caminhao.classList.add("animar-icone");
        estrela.classList.add("animar-icone");

        executado = true;
        window.removeEventListener("scroll", verificarVisualizacaoTexto);
      }
    }
  }

  window.addEventListener("scroll", verificarVisualizacaoTexto);
  verificarVisualizacaoTexto(); // Checa se já está visível logo ao carregar
});

// ANIMAÇÃO QUEM SOMOS?

const articleNos = document.querySelector("#nos");

const observadorNos = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visivel");
      observer.unobserve(entry.target); // Anima apenas uma vez
    }
  });
}, {
  threshold: 0.15 // Dispara quando 15% do article aparecer no scroll
});

if (articleNos) {
  observadorNos.observe(articleNos);
}