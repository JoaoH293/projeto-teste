/* nav.js — menu móvel acessível, estado de rolagem da navbar e destaque do
   link da página atual. */
(function () {
  'use strict';

  var ETEC = window.ETEC = window.ETEC || {};

  function iniciar() {
    var navbar = document.querySelector('[data-navbar]');
    var painel = document.querySelector('[data-menu-movel]');
    if (!navbar) return;

    /* Sombra da navbar ao rolar. */
    var ultimo = 0;
    function aoRolar() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if ((y > 8) !== (ultimo > 8)) {
        navbar.setAttribute('data-rolado', y > 8 ? 'true' : 'false');
      }
      ultimo = y;
    }
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });

    if (!painel) return;

    var abridor = navbar.querySelector('[data-abrir-menu]');
    var fechadores = painel.querySelectorAll('[data-fechar-menu]');
    var ultimoFoco = null;

    function focaveis() {
      return Array.prototype.filter.call(
        painel.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ),
        function (el) {
          return el.offsetParent !== null || el === document.activeElement;
        }
      );
    }

    function abrir() {
      ultimoFoco = document.activeElement;
      painel.hidden = false;
      document.body.style.overflow = 'hidden';
      if (abridor) abridor.setAttribute('aria-expanded', 'true');
      var alvos = focaveis();
      if (alvos.length) alvos[0].focus();
    }

    function fechar() {
      painel.hidden = true;
      document.body.style.overflow = '';
      if (abridor) abridor.setAttribute('aria-expanded', 'false');
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    if (abridor) {
      abridor.addEventListener('click', function () {
        if (painel.hidden) abrir(); else fechar();
      });
    }

    Array.prototype.forEach.call(fechadores, function (el) {
      el.addEventListener('click', fechar);
    });

    /* Fechar ao escolher um destino. */
    Array.prototype.forEach.call(painel.querySelectorAll('a[href]'), function (a) {
      a.addEventListener('click', function () {
        if (!painel.hidden) fechar();
      });
    });

    document.addEventListener('keydown', function (ev) {
      if (painel.hidden) return;
      if (ev.key === 'Escape') {
        ev.preventDefault();
        fechar();
        return;
      }
      if (ev.key !== 'Tab') return;
      var alvos = focaveis();
      if (!alvos.length) return;
      var primeiro = alvos[0];
      var ultimo = alvos[alvos.length - 1];
      if (ev.shiftKey && document.activeElement === primeiro) {
        ev.preventDefault();
        ultimo.focus();
      } else if (!ev.shiftKey && document.activeElement === ultimo) {
        ev.preventDefault();
        primeiro.focus();
      }
    });

    /* Se a viewport crescer para o layout de desktop, o painel deve sumir. */
    var consulta = window.matchMedia('(min-width: 1024px)');
    function aoMudar(e) {
      if (e.matches && !painel.hidden) fechar();
    }
    if (consulta.addEventListener) consulta.addEventListener('change', aoMudar);
    else if (consulta.addListener) consulta.addListener(aoMudar);

    /* Marca o link da página atual quando o HTML não traz aria-current. */
    var arquivo = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    Array.prototype.forEach.call(
      document.querySelectorAll('.navbar__link[href], .menu-movel__link[href]'),
      function (a) {
        var destino = a.getAttribute('href').split('#')[0].toLowerCase();
        if (!destino) return;
        if (destino === arquivo) a.setAttribute('aria-current', 'page');
      }
    );
  }

  ETEC.iniciarNav = iniciar;
})();
