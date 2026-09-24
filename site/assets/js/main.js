/* main.js — ponto de entrada. Roda por último e chama os inicializadores.
   O HTML já traz o conteúdo; este arquivo apenas realça o comportamento. */
(function () {
  'use strict';

  var ETEC = window.ETEC = window.ETEC || {};

  /* Marca que o JS está ativo: só então o CSS de animação se aplica. */
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  /* Mapa: sob file:// um iframe do Google Maps é bloqueado até o clique.
     O HTML traz um pôster estático; o botão troca por um iframe de verdade. */
  function ligarMapa() {
    var bloco = document.querySelector('[data-mapa]');
    if (!bloco) return;

    var botao = bloco.querySelector('[data-mapa-carregar]');
    if (!botao) return;

    botao.addEventListener('click', function () {
      var fonte = bloco.getAttribute('data-mapa-fonte');
      if (!fonte) return;
      var moldura = document.createElement('iframe');
      moldura.src = fonte;
      moldura.loading = 'lazy';
      moldura.title = 'Mapa da localização da Etec em Iguape';
      moldura.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      moldura.setAttribute('allowfullscreen', '');
      bloco.innerHTML = '';
      bloco.appendChild(moldura);
    });
  }

  /* Rolagem suave para âncoras internas, respeitando movimento reduzido.
     O CSS já cobre isso; aqui apenas garantimos o foco correto no destino. */
  function ligarAncoras() {
    Array.prototype.forEach.call(
      document.querySelectorAll('a[href^="#"]:not([href="#"])'),
      function (a) {
        a.addEventListener('click', function () {
          var id = a.getAttribute('href').slice(1);
          var alvo = document.getElementById(id);
          if (!alvo) return;
          if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
          alvo.focus({ preventScroll: true });
        });
      }
    );
  }

  function iniciar() {
    if (ETEC.iniciarIcones) ETEC.iniciarIcones();
    if (ETEC.iniciarNav) ETEC.iniciarNav();
    if (ETEC.iniciarReveal) ETEC.iniciarReveal();
    if (ETEC.iniciarContadores) ETEC.iniciarContadores();
    if (ETEC.iniciarAcordeao) ETEC.iniciarAcordeao();
    if (ETEC.iniciarGaleria) ETEC.iniciarGaleria();
    if (ETEC.iniciarFormulario) ETEC.iniciarFormulario();
    ligarMapa();
    ligarAncoras();

    /* Ano corrente no rodapé. */
    Array.prototype.forEach.call(document.querySelectorAll('[data-ano]'), function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
