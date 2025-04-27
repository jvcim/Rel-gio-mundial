// script.js

function atualizarRelogios() {
  const agoraUTC = new Date();

  const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const cidades = [
    { idHora: 'hora-brasilia', idData: 'data-brasilia', idIcone: 'icone-brasilia', fuso: -3 },
    { idHora: 'hora-londres', idData: 'data-londres', idIcone: 'icone-londres', fuso: 0 },
    { idHora: 'hora-washington', idData: 'data-washington', idIcone: 'icone-washington', fuso: -4 },
    { idHora: 'hora-toquio', idData: 'data-toquio', idIcone: 'icone-toquio', fuso: 9 },
    { idHora: 'hora-paris', idData: 'data-paris', idIcone: 'icone-paris', fuso: 2 },
    { idHora: 'hora-sydney', idData: 'data-sydney', idIcone: 'icone-sydney', fuso: 10 }
  ];

  cidades.forEach(cidade => {
    const horaCidade = new Date(agoraUTC.getTime() + cidade.fuso * 60 * 60 * 1000);

    const horas = horaCidade.getUTCHours().toString().padStart(2, '0');
    const minutos = horaCidade.getUTCMinutes().toString().padStart(2, '0');
    const segundos = horaCidade.getUTCSeconds().toString().padStart(2, '0');

    const diaSemana = diasSemana[horaCidade.getUTCDay()];
    const dia = horaCidade.getUTCDate().toString().padStart(2, '0');
    const mes = (horaCidade.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = horaCidade.getUTCFullYear();

    const horaElemento = document.getElementById(cidade.idHora);
    const dataElemento = document.getElementById(cidade.idData);
    const iconeElemento = document.getElementById(cidade.idIcone);
    const card = horaElemento.closest(".card");

    // Atualizar hora
    horaElemento.textContent = `${horas}:${minutos}:${segundos}`;

    // Forçar animação flip
    horaElemento.classList.remove('flip');
    void horaElemento.offsetWidth; // Força reflow
    horaElemento.classList.add('flip');

    // Atualizar data
    dataElemento.textContent = `${diaSemana}, ${dia}/${mes}/${ano}`;

    // Atualizar ícone e tema do card
    const horaNum = parseInt(horas);
    if (horaNum >= 6 && horaNum < 18) {
      card.classList.add('card-dia');
      card.classList.remove('card-noite');
      iconeElemento.textContent = "☀️";
    } else {
      card.classList.add('card-noite');
      card.classList.remove('card-dia');
      iconeElemento.textContent = "🌙";
    }
  });
}

// Atualizar o fundo da página conforme horário em Brasília
function atualizarFundo() {
  const agora = new Date();
  const horaBrasilia = new Date(agora.getTime() + (-3 * 60 * 60 * 1000)); // UTC-3
  const hora = horaBrasilia.getUTCHours();

  const body = document.body;

  if (hora >= 6 && hora < 12) {
    // Manhã
    body.style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb)";
  } else if (hora >= 12 && hora < 18) {
    // Tarde
    body.style.background = "linear-gradient(135deg, #fbc2eb, #a6c1ee)";
  } else {
    // Noite
    body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
  }
}

// Atualizar relógios e fundo a cada segundo
setInterval(() => {
  atualizarRelogios();
  atualizarFundo();
}, 1000);

// Atualizar imediatamente ao carregar a página
atualizarRelogios();
atualizarFundo();
