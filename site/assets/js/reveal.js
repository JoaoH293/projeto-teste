/* reveal.js — revela elementos [data-revelar] quando entram na viewport.
   Sem IntersectionObserver, mostra tudo (o CSS já cobre o caso sem JS). */
(function () {
  'use strict';

  var ETEC = window.ETEC = window.ETEC || {};

  function iniciar() {
    var alvos = document.querySelectorAll('[data-revelar]');
    if (!alvos.length) return;

    var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (semMovimento || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(alvos, function (el) {
        el.setAttribute('data-visivel', 'true');
      });
      return;
    }

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.setAttribute('data-visivel', 'true');
        observador.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(alvos, function (el) { observador.observe(el); });
  }

  ETEC.iniciarReveal = iniciar;
})();
