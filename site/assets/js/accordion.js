/* accordion.js — acordeão acessível. Sem JS todos os painéis ficam abertos;
   o JS é que os recolhe na inicialização, então o conteúdo nunca some. */
(function () {
  'use strict';

  var ETEC = window.ETEC = window.ETEC || {};

  function iniciar() {
    var acordeoes = document.querySelectorAll('[data-acordeao]');
    if (!acordeoes.length) return;

    Array.prototype.forEach.call(acordeoes, function (raiz) {
      var itens = raiz.querySelectorAll('[data-acordeao-item]');
      var multiplo = raiz.getAttribute('data-acordeao') === 'multiplo';

      Array.prototype.forEach.call(itens, function (item, indice) {
        var gatilho = item.querySelector('[data-acordeao-gatilho]');
        var painel = item.querySelector('[data-acordeao-painel]');
        if (!gatilho || !painel) return;

        if (!painel.id) painel.id = 'acordeao-painel-' + indice + '-' + Math.random().toString(36).slice(2, 7);
        if (!gatilho.id) gatilho.id = 'acordeao-gatilho-' + indice + '-' + Math.random().toString(36).slice(2, 7);

        gatilho.setAttribute('aria-controls', painel.id);
        painel.setAttribute('role', 'region');
        painel.setAttribute('aria-labelledby', gatilho.id);

        /* Estado inicial: recolhido, já que o JS assumiu o controle. */
        painel.hidden = true;
        gatilho.setAttribute('aria-expanded', 'false');

        gatilho.addEventListener('click', function () {
          var aberto = gatilho.getAttribute('aria-expanded') === 'true';
          if (!multiplo && !aberto) {
            Array.prototype.forEach.call(itens, function (outro) {
              var g = outro.querySelector('[data-acordeao-gatilho]');
              var p = outro.querySelector('[data-acordeao-painel]');
              if (!g || !p || g === gatilho) return;
              g.setAttribute('aria-expanded', 'false');
              p.hidden = true;
            });
          }
          gatilho.setAttribute('aria-expanded', aberto ? 'false' : 'true');
          painel.hidden = aberto;
        });

        /* Navegação por setas dentro do acordeão. */
        gatilho.addEventListener('keydown', function (ev) {
          var passo = 0;
          if (ev.key === 'ArrowDown') passo = 1;
          else if (ev.key === 'ArrowUp') passo = -1;
          else if (ev.key === 'Home') passo = -itens.length;
          else if (ev.key === 'End') passo = itens.length;
          else return;
          ev.preventDefault();

          var gatilhos = [];
          Array.prototype.forEach.call(itens, function (outro) {
            var g = outro.querySelector('[data-acordeao-gatilho]');
            if (g) gatilhos.push(g);
          });
          var atual = gatilhos.indexOf(gatilho);
          if (atual === -1) return;
          var destino = (atual + passo + gatilhos.length) % gatilhos.length;
          gatilhos[destino].focus();
        });
      });
    });
  }

  ETEC.iniciarAcordeao = iniciar;
})();
