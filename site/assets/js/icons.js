/* icons.js — ícones SVG embutidos como strings.
   Sob file:// um sprite externo não carrega; por isso os ícones vivem aqui e
   são injetados em elementos [data-icon]. Ícones críticos acima da dobra
   ficam inline no HTML. */
(function () {
  'use strict';

  window.ETEC = window.ETEC || {};

  var TRACO = 'fill="none" stroke="currentColor" stroke-width="1.75" '
    + 'stroke-linecap="round" stroke-linejoin="round"';

  var ICONES = {
    'menu': '<path ' + TRACO + ' d="M4 7h16M4 12h16M4 17h16"/>',
    'fechar': '<path ' + TRACO + ' d="M6 6l12 12M18 6L6 18"/>',
    'seta-direita': '<path ' + TRACO + ' d="M5 12h14M13 6l6 6-6 6"/>',
    'seta-baixo': '<path ' + TRACO + ' d="M12 5v14M6 13l6 6 6-6"/>',
    'chevron-baixo': '<path ' + TRACO + ' d="M6 9l6 6 6-6"/>',
    'chevron-esquerda': '<path ' + TRACO + ' d="M15 6l-6 6 6 6"/>',
    'chevron-direita': '<path ' + TRACO + ' d="M9 6l6 6-6 6"/>',
    'check': '<path ' + TRACO + ' d="M4 12.5l5 5L20 6.5"/>',
    'check-circulo': '<circle cx="12" cy="12" r="9" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M8 12.5l2.5 2.5L16 9.5"/>',
    'alerta': '<path ' + TRACO + ' d="M12 4l9 16H3z"/><path ' + TRACO
      + ' d="M12 10v4"/><circle cx="12" cy="17.5" r="0.9" fill="currentColor"/>',
    'telefone': '<path ' + TRACO + ' d="M6 3h3l2 5-2.5 1.5a13 13 0 0 0 6 6L16 13l5 2v3'
      + 'a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
    'email': '<rect x="3" y="5" width="18" height="14" rx="2" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M3.5 7l8.5 6 8.5-6"/>',
    'local': '<path ' + TRACO + ' d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/>'
      + '<circle cx="12" cy="10" r="2.5" ' + TRACO + '/>',
    'relogio': '<circle cx="12" cy="12" r="9" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M12 7v5.2l3.2 2"/>',
    'externo': '<path ' + TRACO + ' d="M14 4h6v6"/><path ' + TRACO
      + ' d="M20 4l-9 9"/><path ' + TRACO
      + ' d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    'aspas': '<path fill="currentColor" d="M9.6 6C6.5 7.4 4.8 10 4.8 13.4c0 2.7 1.5 4.6 3.8 4.6'
      + ' 2 0 3.4-1.4 3.4-3.3 0-1.8-1.2-3.1-3-3.1-.3 0-.7 0-1 .2.4-1.5 1.6-2.8 3.2-3.7L9.6 6z'
      + 'm9 0c-3.1 1.4-4.8 4-4.8 7.4 0 2.7 1.5 4.6 3.8 4.6 2 0 3.4-1.4 3.4-3.3'
      + ' 0-1.8-1.2-3.1-3-3.1-.3 0-.7 0-1 .2.4-1.5 1.6-2.8 3.2-3.7L18.6 6z"/>',
    'folha': '<path ' + TRACO + ' d="M20 4c0 8-4.5 13-11 13H5c0-7 4.5-11 11-11"/>'
      + '<path ' + TRACO + ' d="M5 20c2-5 5-8 9-10"/>',
    'pecuaria': '<path ' + TRACO + ' d="M4 9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H8'
      + 'a4 4 0 0 1-4-4z"/><path ' + TRACO + ' d="M9 6V4M15 6V4"/>'
      + '<circle cx="9.5" cy="10.5" r="0.9" fill="currentColor"/>'
      + '<circle cx="14.5" cy="10.5" r="0.9" fill="currentColor"/>',
    'gestao': '<rect x="3" y="7" width="18" height="13" rx="2" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/>'
      + '<path ' + TRACO + ' d="M3 12h18"/>',
    'computador': '<rect x="3" y="4" width="18" height="12" rx="2" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M8 20h8M12 16v4"/>',
    'laboratorio': '<path ' + TRACO + ' d="M10 3v6.5L5.5 17A2 2 0 0 0 7.3 20h9.4a2 2 0 0 0 1.8-3'
      + 'L14 9.5V3"/><path ' + TRACO + ' d="M9 3h6M7.5 14h9"/>',
    'pessoas': '<circle cx="9" cy="8" r="3.2" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M3.5 20a5.5 5.5 0 0 1 11 0"/>'
      + '<path ' + TRACO + ' d="M16 5.5a3 3 0 0 1 0 5.6M17.5 20a5.4 5.4 0 0 0-1.6-3.9"/>',
    'livro': '<path ' + TRACO + ' d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"/>'
      + '<path ' + TRACO + ' d="M4 18.5A2.5 2.5 0 0 1 6.5 16H19"/>',
    'medalha': '<circle cx="12" cy="14.5" r="5.5" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M8.5 9L6 3h12l-2.5 6"/>'
      + '<path ' + TRACO + ' d="M12 12.2l1 2h2l-1.6 1.3.6 2-2-1.2-2 1.2.6-2L9 14.2h2z"'
      + ' fill="currentColor"/>',
    'alvo': '<circle cx="12" cy="12" r="8.5" ' + TRACO + '/>'
      + '<circle cx="12" cy="12" r="4.5" ' + TRACO + '/>'
      + '<circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    'broto': '<path ' + TRACO + ' d="M12 21v-8"/>'
      + '<path ' + TRACO + ' d="M12 13c0-3.9 2.6-6.5 7-6.5 0 3.9-2.6 6.5-7 6.5z"/>'
      + '<path ' + TRACO + ' d="M12 15C12 11.6 9.8 9.4 6 9.4 6 12.8 8.2 15 12 15z"/>',
    'agua': '<path ' + TRACO + ' d="M12 3s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0C6.5 9 12 3 12 3z"/>',
    'mapa': '<path ' + TRACO + ' d="M9 4.5L3.5 6.8v13.2L9 17.7l6 2.3 5.5-2.3V4.5L15 6.8z"/>'
      + '<path ' + TRACO + ' d="M9 4.5v13.2M15 6.8V20"/>',
    'calendario': '<rect x="3.5" y="5.5" width="17" height="15" rx="2" ' + TRACO + '/>'
      + '<path ' + TRACO + ' d="M3.5 10h17M8 3.5v4M16 3.5v4"/>',
    'documento': '<path ' + TRACO + ' d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z"/>'
      + '<path ' + TRACO + ' d="M13.5 3v5.5H19M8.5 13h7M8.5 16.5h4.5"/>',
    'predio': '<path ' + TRACO + ' d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21"/>'
      + '<path ' + TRACO + ' d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21M3 21h18"/>'
      + '<path ' + TRACO + ' d="M7 8h4M7 12h4M7 16h4M17 14h1M17 18h1"/>',
    'estrela': '<path fill="currentColor" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8'
      + '-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z"/>'
  };

  window.ETEC.icones = ICONES;

  window.ETEC.svg = function (nome, extra) {
    var corpo = ICONES[nome];
    if (!corpo) return '';
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"'
      + (extra ? ' ' + extra : '') + '>' + corpo + '</svg>';
  };

  function injetar(raiz) {
    var alvos = (raiz || document).querySelectorAll('[data-icon]');
    Array.prototype.forEach.call(alvos, function (el) {
      if (el.getAttribute('data-icon-pronto') === 'true') return;
      var nome = el.getAttribute('data-icon');
      var corpo = ICONES[nome];
      if (!corpo) return;
      el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
        + corpo + '</svg>';
      el.setAttribute('data-icon-pronto', 'true');
    });
  }

  window.ETEC.injetarIcones = injetar;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { injetar(); });
  } else {
    injetar();
  }
})();
