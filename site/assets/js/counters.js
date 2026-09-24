/* counters.js — anima a contagem dos números. O valor final já está no HTML,
   então sem JS o número correto é lido normalmente. */
(function () {
  'use strict';

  var ETEC = window.ETEC = window.ETEC || {};

  function animar(el, destino, duracao) {
    var inicio = null;
    /* Mantém a formatação do HTML (separador de milhar) durante a contagem. */
    var modelo = el.getAttribute('data-formato') || '';

    function quadro(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / duracao, 1);
      var suavizado = 1 - Math.pow(1 - p, 3);
      var atual = Math.round(destino * suavizado);
      el.textContent = modelo.indexOf('milhar') !== -1
        ? atual.toLocaleString('pt-BR')
        : String(atual);
      if (p < 1) requestAnimationFrame(quadro);
      else el.textContent = modelo.indexOf('milhar') !== -1
        ? destino.toLocaleString('pt-BR')
        : String(destino);
    }

    requestAnimationFrame(quadro);
  }

  function iniciar() {
    var alvos = document.querySelectorAll('[data-contador]');
    if (!alvos.length) return;

    var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (semMovimento || !('IntersectionObserver' in window)) return;

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var el = entrada.target;
        observador.unobserve(el);
        var destino = parseInt(el.getAttribute('data-contador'), 10);
        if (isNaN(destino)) return;
        animar(el, destino, 1400);
      });
    }, { threshold: 0.4 });

    Array.prototype.forEach.call(alvos, function (el) { observador.observe(el); });
  }

  ETEC.iniciarContadores = iniciar;
})();
