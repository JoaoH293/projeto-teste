/* gallery.js — lightbox da galeria. Sem JS os itens continuam sendo imagens
   com legenda visível; o lightbox é só um realce. */
(function () {
  'use strict';

  var ETEC = window.ETEC = window.ETEC || {};

  function iniciar() {
    var raiz = document.querySelector('[data-galeria]');
    if (!raiz) return;

    var itens = Array.prototype.slice.call(raiz.querySelectorAll('[data-galeria-item]'));
    if (!itens.length) return;

    var caixa = document.createElement('div');
    caixa.className = 'lightbox';
    caixa.hidden = true;
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    caixa.setAttribute('aria-label', 'Imagem ampliada');
    caixa.innerHTML =
      '<div class="lightbox__topo">'
      + '<button type="button" class="lightbox__fechar" data-lightbox-fechar'
      + ' aria-label="Fechar imagem ampliada"></button></div>'
      + '<figure class="lightbox__figura">'
      + '<img alt="" data-lightbox-img>'
      + '<figcaption data-lightbox-legenda></figcaption></figure>'
      + '<div class="lightbox__nav">'
      + '<button type="button" class="botao botao--contorno-claro botao--pequeno"'
      + ' data-lightbox-anterior>Anterior</button>'
      + '<button type="button" class="botao botao--contorno-claro botao--pequeno"'
      + ' data-lightbox-proximo>Próxima</button></div>';

    document.body.appendChild(caixa);

    var img = caixa.querySelector('[data-lightbox-img]');
    var legenda = caixa.querySelector('[data-lightbox-legenda]');
    var botaoFechar = caixa.querySelector('[data-lightbox-fechar]');
    var anterior = caixa.querySelector('[data-lightbox-anterior]');
    var proximo = caixa.querySelector('[data-lightbox-proximo]');

    if (ETEC.svg) {
      botaoFechar.innerHTML = ETEC.svg('fechar');
    }

    var atual = 0;
    var ultimoFoco = null;

    function dados(indice) {
      var el = itens[indice];
      var fonte = el.querySelector('img');
      var maior = el.getAttribute('data-ampliada') || (fonte ? fonte.currentSrc || fonte.src : '');
      return {
        src: maior,
        alt: fonte ? fonte.getAttribute('alt') || '' : '',
        legenda: el.getAttribute('data-legenda') || (fonte ? fonte.getAttribute('alt') || '' : '')
      };
    }

    function mostrar(indice) {
      atual = (indice + itens.length) % itens.length;
      var d = dados(atual);
      img.src = d.src;
      img.alt = d.alt;
      legenda.textContent = d.legenda;
    }

    function abrir(indice) {
      ultimoFoco = document.activeElement;
      mostrar(indice);
      caixa.hidden = false;
      document.body.style.overflow = 'hidden';
      botaoFechar.focus();
    }

    function fechar() {
      caixa.hidden = true;
      document.body.style.overflow = '';
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    itens.forEach(function (el, indice) {
      var botao = el.querySelector('button') || el;
      if (botao.tagName === 'BUTTON') {
        botao.addEventListener('click', function () { abrir(indice); });
      }
    });

    botaoFechar.addEventListener('click', fechar);
    anterior.addEventListener('click', function () { mostrar(atual - 1); });
    proximo.addEventListener('click', function () { mostrar(atual + 1); });

    caixa.addEventListener('click', function (ev) {
      if (ev.target === caixa) fechar();
    });

    document.addEventListener('keydown', function (ev) {
      if (caixa.hidden) return;
      if (ev.key === 'Escape') { ev.preventDefault(); fechar(); }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); mostrar(atual - 1); }
      else if (ev.key === 'ArrowRight') { ev.preventDefault(); mostrar(atual + 1); }
      else if (ev.key === 'Tab') {
        /* Mantém o foco dentro do diálogo. */
        var focaveis = [botaoFechar, anterior, proximo];
        var pos = focaveis.indexOf(document.activeElement);
        ev.preventDefault();
        var passo = ev.shiftKey ? -1 : 1;
        focaveis[(pos + passo + focaveis.length) % focaveis.length].focus();
      }
    });
  }

  ETEC.iniciarGaleria = iniciar;
})();
