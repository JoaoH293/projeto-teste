/* form.js — validação do formulário de contato. Não há servidor: o site é
   estático e aberto por file://, então ao validar o script monta um e-mail
   para a secretaria com os dados preenchidos. */
(function () {
  'use strict';

  var ETEC = window.ETEC = window.ETEC || {};

  var DESTINO = 'e089acad@cps.sp.gov.br';

  var REGRAS = {
    nome: {
      obrigatorio: true,
      validar: function (v) {
        if (v.trim().length < 3) return 'Informe seu nome completo.';
        return '';
      }
    },
    email: {
      obrigatorio: true,
      validar: function (v) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Informe um e-mail válido.';
        return '';
      }
    },
    telefone: {
      obrigatorio: false,
      validar: function (v) {
        var digitos = v.replace(/\D/g, '');
        if (!digitos) return '';
        if (digitos.length < 10 || digitos.length > 11) return 'Informe DDD + número.';
        return '';
      }
    },
    assunto: {
      obrigatorio: true,
      validar: function (v) {
        if (!v.trim()) return 'Escolha um assunto.';
        return '';
      }
    },
    mensagem: {
      obrigatorio: true,
      validar: function (v) {
        if (v.trim().length < 20) return 'Escreva ao menos 20 caracteres.';
        return '';
      }
    }
  };

  function mensagemDe(campo, texto) {
    var alvo = campo.querySelector('.erro');
    alvo.textContent = texto;
    campo.setAttribute('data-invalido', texto ? 'true' : 'false');
    var controle = campo.querySelector('input, select, textarea');
    if (controle) {
      if (texto) controle.setAttribute('aria-invalid', 'true');
      else controle.removeAttribute('aria-invalid');
    }
  }

  function validarCampo(campo) {
    var controle = campo.querySelector('input, select, textarea');
    if (!controle) return true;
    var regra = REGRAS[controle.name];
    if (!regra) return true;
    var texto = regra.validar(controle.value || '');
    mensagemDe(campo, texto);
    return !texto;
  }

  function iniciar() {
    var form = document.querySelector('[data-formulario]');
    if (!form) return;

    var retorno = form.querySelector('[data-retorno]');
    var campos = Array.prototype.slice.call(form.querySelectorAll('.campo'))
      .filter(function (c) { return c.querySelector('input, select, textarea'); });

    /* Valida ao sair do campo, não a cada tecla. */
    campos.forEach(function (campo) {
      var controle = campo.querySelector('input, select, textarea');
      controle.addEventListener('blur', function () { validarCampo(campo); });
      controle.addEventListener('input', function () {
        if (campo.getAttribute('data-invalido') === 'true') validarCampo(campo);
      });
    });

    function mostrarRetorno(texto, tipo) {
      if (!retorno) return;
      retorno.className = 'retorno retorno--' + tipo;
      retorno.textContent = texto;
      retorno.hidden = false;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var primeiroErro = null;
      campos.forEach(function (campo) {
        if (!validarCampo(campo) && !primeiroErro) primeiroErro = campo;
      });

      if (primeiroErro) {
        mostrarRetorno('Confira os campos destacados antes de enviar.', 'erro');
        var controle = primeiroErro.querySelector('input, select, textarea');
        if (controle) controle.focus();
        return;
      }

      var dados = new FormData(form);
      var linhas = [
        'Nome: ' + (dados.get('nome') || ''),
        'E-mail: ' + (dados.get('email') || '')
      ];
      if (dados.get('telefone')) linhas.push('Telefone: ' + dados.get('telefone'));
      linhas.push('', 'Assunto: ' + (dados.get('assunto') || ''), '',
        (dados.get('mensagem') || ''));

      var assunto = 'Contato pelo site — ' + (dados.get('assunto') || 'assunto geral');
      var url = 'mailto:' + DESTINO
        + '?subject=' + encodeURIComponent(assunto)
        + '&body=' + encodeURIComponent(linhas.join('\n'));

      window.location.href = url;
      mostrarRetorno(
        'Abrimos seu programa de e-mail com a mensagem pronta para envio. '
        + 'Se nada abrir, escreva direto para ' + DESTINO + '.',
        'ok'
      );
    });

    /* Botão de limpar, se houver. */
    var limpar = form.querySelector('[data-limpar]');
    if (limpar) {
      limpar.addEventListener('click', function () {
        form.reset();
        campos.forEach(function (campo) { mensagemDe(campo, ''); });
        if (retorno) retorno.hidden = true;
      });
    }
  }

  ETEC.iniciarFormulario = iniciar;
})();
