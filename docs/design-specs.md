# Design Specification — ETEC Eng. Agrônomo Narciso de Medeiros

> **Handoff oficial para o agente `frontend-developer`.**
> Documento autossuficiente: todos os valores (hex, px, rem, ms) já estão decididos.
> Não é necessário perguntar nada ao designer para implementar.
>
> **Versão:** 1.0 · **Data:** 2026-02-19 · **Autor:** Agente UX/UI Designer
> **Escopo:** site institucional de página principal + 2 subpáginas, HTML5 + CSS3 + JS vanilla (ES6), sem build step.

---

## Sumário

1. [Visão geral, objetivo e personas](#1-visão-geral-objetivo-e-personas)
2. [Design tokens](#2-design-tokens)
3. [Tipografia](#3-tipografia)
4. [Espaçamento, raio, sombra, breakpoints e grid](#4-espaçamento-raio-sombra-breakpoints-e-grid)
5. [Arquitetura de informação e mapa do site](#5-arquitetura-de-informação-e-mapa-do-site)
6. [Wireframes (mobile e desktop)](#6-wireframes-mobile-e-desktop)
7. [Especificação de componentes](#7-especificação-de-componentes)
8. [Diretrizes de imagens](#8-diretrizes-de-imagens)
9. [Especificação de animações](#9-especificação-de-animações)
10. [Checklist de acessibilidade](#10-checklist-de-acessibilidade-wcag-21-aa)
11. [Checklist de performance](#11-checklist-de-performance)
12. [Estrutura de arquivos final](#12-estrutura-de-arquivos-final)
13. [Restrições técnicas críticas (leia antes de codar)](#13-restrições-técnicas-críticas)

---

## 1. Visão geral, objetivo e personas

### 1.1 Objetivo da tela

O site tem **três objetivos de negócio**, nesta ordem de prioridade:

1. **Gerar inscrições no Vestibulinho** — levar o visitante (aluno do 9º ano / EM) até o CTA de inscrição no processo seletivo do Centro Paula Souza.
2. **Construir prestígio institucional** — posicionar a ETEC de Iguape como referência em ensino agrotécnico no Vale do Ribeira, com 55+ anos de história, para pais, poder público e imprensa.
3. **Abrir portas comerciais** — transmitir solidez para empresas e cooperativas do agronegócio regional (parcerias, estágios, Coop-Escola).

**Métrica de sucesso primária:** cliques no CTA "Inscreva-se no Vestibulinho" (hero + header + CTA final).
**Métrica secundária:** tempo de permanência na seção Cursos e scroll depth até a seção Processo Seletivo.

### 1.2 Tom & estilo

**Editorial-científico com raiz rural.** Referências mentais: sites de universidades agrícolas europeias (Wageningen, Rothamsted) cruzados com a densidade editorial de revistas de fotografia de natureza.

Diretrizes de tom visual:
- **Verde profundo de Mata Atlântica** como base — não é o verde-bandeira chapado, é um verde de sub-bosque, escuro e saturado.
- **Dourado de colheita** como acento — usado com parcimônia (nunca mais de 10% da tela), em badges, filetes e detalhes de foco.
- **Terracota / barro** como cor terciária — remete ao solo do Vale do Ribeira (solo argiloso, cambissolo).
- **Tipografia display com serifa de personalidade** — comunica 55 anos de história sem parecer arcaico.
- **Muito respiro.** Espaçamento vertical generoso (96–128px entre seções no desktop). O site oficial atual é denso e apertado; o nosso é arejado.
- **Zero gradiente de governo, zero azul institucional, zero vermelho de bandeira estadual.**

O que **não** fazer: hero com slider automático de 5 fotos, ícones genéricos de clipart, sombras duras cinza-preto, cantos retos, texto justificado, carrossel de logos de parceiros piscando.

### 1.3 Personas

#### Persona A — "Ana, 14 anos" (aluna do 9º ano, decisora influenciadora)
- **Contexto:** mora em Iguape ou Registro, estuda em escola municipal, acessa pelo celular (Android, 4G instável, tela 360–390px).
- **Motivação:** quer um curso que dê emprego rápido e não seja "chato"; gosta de animal, planta, rio, peixe.
- **Dores:** não sabe o que é "Ensino Médio Integrado ao Técnico"; acha o site atual confuso e feio; medo de não passar no processo seletivo.
- **O que ela precisa:** linguagem simples, fotos reais de gente da idade dela mexendo na terra/tanque, passo a passo do Vestibulinho com datas grandes, resposta "tem que pagar?" em destaque.
- **Implicação de design:** mobile-first obrigatório; CTA fixo visível; tipografia grande; nada de jargão burocrático.

#### Persona B — "Marcos, 41 anos" (pai/responsável, decisor financeiro e de segurança)
- **Contexto:** pequeno produtor rural ou trabalhador do comércio em Iguape; acessa majoritariamente do celular, mas às vezes no desktop do trabalho.
- **Motivação:** quer saber se é público e gratuito, se dá transporte/merenda, se o filho sai empregado.
- **Dores:** desconfiança de escola pública; quer ver estrutura física real (não render); quer endereço e telefone para ligar.
- **O que ele precisa:** prova social de resultado (egressos empregados, universidades), fotos reais da fazenda e dos laboratórios, endereço com mapa, telefone clicável.
- **Implicação de design:** seção "Números" com dados concretos; depoimentos com nome e rosto; footer com contato completo; selo do Centro Paula Souza visível no hero.

#### Persona C — "Dona Cleide, 58 anos" (comunidade regional / poder público / imprensa)
- **Contexto:** liderança comunitária, servidora pública, jornalista local, vereador. Acessa do desktop.
- **Motivação:** entender o papel histórico e socioeconômico da escola no Vale do Ribeira; usar como referência.
- **Dores:** não encontra a história da escola nem informação sobre o patrono.
- **O que ela precisa:** seção "Sobre" rica, texto sobre Narciso de Medeiros e a bananicultura, dados de impacto regional, Coop-Escola.
- **Implicação de design:** hierarquia tipográfica editorial, blocos de texto com medida de linha confortável (65–75ch), citação destacada do patrono.

#### Persona D — "Juliana, 34 anos" (RH / empresa parceira do agronegócio)
- **Contexto:** gerente de RH de cooperativa ou frigorífico, ou dona de piscicultura. Desktop.
- **Motivação:** captar estagiários e mão de obra técnica qualificada; propor parceria.
- **Dores:** não sabe quais competências os alunos têm; não acha canal comercial.
- **O que ela precisa:** seção Coop-Escola, competências por curso, formulário de contato com assunto "Parceria / Estágio".
- **Implicação de design:** formulário com `<select>` de assunto; seção Cursos com bullet points de competências técnicas.

---

## 2. Design tokens

Todos os tokens vão em `:root` no arquivo `assets/css/tokens.css`. Dark mode via `@media (prefers-color-scheme: dark)` **e** via atributo `[data-theme="dark"]` no `<html>` (para o botão de toggle manual).

### 2.1 Paleta primária — "Verde Mata Atlântica"

Base: verde profundo de sub-bosque do Vale do Ribeira, dessaturado em direção ao verde-azulado para evitar o verde-bandeira.

| Token | Hex | Uso principal |
|---|---|---|
| `--c-green-50` | `#eef7f0` | fundo de seção alternada clara, chips |
| `--c-green-100` | `#d5ecdb` | fundo de badge, hover de ghost button |
| `--c-green-200` | `#abd8b7` | borda de badge, fundo de badge escuro |
| `--c-green-300` | `#7cbf8f` | texto verde em dark mode, filetes |
| `--c-green-400` | `#4fa268` | links em dark mode, botão secundário dark |
| `--c-green-500` | `#2f8650` | **primária** — links em light, ícones |
| `--c-green-600` | `#226b3f` | **botão primário (default em light)** |
| `--c-green-700` | `#1b5432` | **botão primário (hover)**, títulos sobre fundo claro, focus ring light |
| `--c-green-800` | `#143f26` | botão primário (active), fundo escuro |
| `--c-green-900` | `#0f2e1d` | fundo de seção inversa (CTA, footer) |
| `--c-green-950` | `#081a10` | overlay de imagem, fundo máximo contraste |

### 2.2 Paleta de acento — "Dourado Colheita"

Acento quente, remete à palha do arroz e à casca do café. **Usar com parcimônia.**

| Token | Hex | Uso principal |
|---|---|---|
| `--c-gold-50` | `#fdf8ed` | fundo de seção de destaque |
| `--c-gold-100` | `#f9ecca` | fundo de badge dourado |
| `--c-gold-200` | `#f3d894` | badge dourado light |
| `--c-gold-300` | `#ecc25c` | **acento em dark mode**, focus ring dark, filete decorativo |
| `--c-gold-400` | `#e5ad33` | hover do botão dourado |
| `--c-gold-500` | `#d4921a` | **botão de destaque / CTA secundário** (sempre com texto escuro) |
| `--c-gold-600` | `#b0700f` | borda de destaque, ícone dourado sobre claro |
| `--c-gold-700` | `#8a5410` | **texto dourado legível em light mode** |
| `--c-gold-800` | `#6b4115` | texto dourado sobre fundo dourado claro |
| `--c-gold-900` | `#583614` | sombra dourada tonal |

### 2.3 Paleta terciária — "Terracota Vale"

Cor de solo argiloso. Usada em categorias, gráficos, tags e no curso de Meio Ambiente.

| Token | Hex | Uso principal |
|---|---|---|
| `--c-earth-50` | `#fbf5f1` | fundo de tag |
| `--c-earth-100` | `#f5e5db` | fundo de tag hover |
| `--c-earth-200` | `#e9c8b3` | borda de tag |
| `--c-earth-300` | `#dba488` | acento em dark mode |
| `--c-earth-400` | `#c97d5c` | ícone, filete |
| `--c-earth-500` | `#b55f3d` | tag ativa |
| `--c-earth-600` | `#9a4a2f` | botão terciário |
| `--c-earth-700` | `#7c3a27` | texto terracota legível |
| `--c-earth-800` | `#623022` | texto terracota forte |
| `--c-earth-900` | `#4f291e` | sombra terracota tonal |

### 2.4 Neutros — "Cinza Sub-bosque"

Cinza levemente esverdeado (não é cinza puro, não é slate azulado) para manter a temperatura da paleta coerente.

| Token | Hex | Uso principal |
|---|---|---|
| `--c-neutral-0` | `#ffffff` | superfície light máxima |
| `--c-neutral-50` | `#f7f9f7` | **fundo de página (light)** |
| `--c-neutral-100` | `#eef1ee` | fundo rebaixado, thead de tabela, skeleton |
| `--c-neutral-200` | `#e0e5e1` | borda sutil, divisória |
| `--c-neutral-300` | `#c8d0ca` | borda padrão |
| `--c-neutral-400` | `#9aa69e` | ícone decorativo, texto desabilitado |
| `--c-neutral-500` | `#6f7d75` | **borda de input (atende 1.4.11)**, placeholder |
| `--c-neutral-600` | `#55635b` | **texto secundário** |
| `--c-neutral-700` | `#404b45` | texto terciário, títulos suaves |
| `--c-neutral-800` | `#2a332e` | superfície elevada em dark |
| `--c-neutral-900` | `#18201c` | **texto primário (light)** |
| `--c-neutral-950` | `#0d1310` | **fundo de página (dark)** |

### 2.5 Cores semânticas

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--c-success-50` | `#e9f7ef` | `#0c2417` | fundo de alerta de sucesso |
| `--c-success-500` | `#1f8a4c` | `#7ed9a6` | ícone de sucesso |
| `--c-success-700` | `#167a42` | `#7ed9a6` | **texto de sucesso** |
| `--c-warning-50` | `#fdf4e3` | `#2a1c07` | fundo de alerta |
| `--c-warning-500` | `#b4700a` | `#f0c164` | ícone de alerta |
| `--c-warning-700` | `#8a5410` | `#f0c164` | **texto de alerta** |
| `--c-danger-50` | `#fdecea` | `#2b100d` | fundo de erro |
| `--c-danger-500` | `#b3261e` | `#f2a099` | ícone de erro, borda de input inválido |
| `--c-danger-700` | `#b3261e` | `#f2a099` | **texto de erro** |
| `--c-info-50` | `#e8f2f6` | `#0b2028` | fundo informativo |
| `--c-info-500` | `#1f6f8b` | `#7fc4d8` | ícone informativo |
| `--c-info-700` | `#1f6f8b` | `#7fc4d8` | **texto informativo** |

### 2.6 Tokens semânticos de superfície e texto

**Light mode (padrão):**

```css
:root {
  --bg-page:        #f7f9f7;   /* --c-neutral-50  */
  --bg-surface:     #ffffff;   /* --c-neutral-0   */
  --bg-elevated:    #ffffff;   /* cards, modais   */
  --bg-sunken:      #eef1ee;   /* --c-neutral-100 */
  --bg-inverse:     #0f2e1d;   /* --c-green-900   */
  --bg-accent-soft: #fdf8ed;   /* --c-gold-50     */
  --bg-brand-soft:  #eef7f0;   /* --c-green-50    */

  --text-primary:   #18201c;   /* --c-neutral-900 */
  --text-secondary: #55635b;   /* --c-neutral-600 */
  --text-muted:     #6f7d75;   /* --c-neutral-500 — VER REGRA ABAIXO */
  --text-disabled:  #9aa69e;   /* --c-neutral-400 — isento de 1.4.3 */
  --text-inverse:   #f7f9f7;   /* --c-neutral-50  */
  --text-on-accent: #18201c;   /* texto sobre dourado — NUNCA branco */
  --text-brand:     #1b5432;   /* --c-green-700   */
  --text-accent:    #8a5410;   /* --c-gold-700    */
  --text-earth:     #7c3a27;   /* --c-earth-700   */

  --border-subtle:  #e0e5e1;   /* divisórias decorativas */
  --border-default: #c8d0ca;   /* contorno de card */
  --border-strong:  #6f7d75;   /* contorno de input — atende 1.4.11 (4.32:1) */

  --focus-ring:          #1b5432;
  --focus-ring-inverse:  #ecc25c;
}
```

**Dark mode:**

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-page:        #0d1310;   /* --c-neutral-950 */
    --bg-surface:     #18201c;   /* --c-neutral-900 */
    --bg-elevated:    #212b25;   /* --c-neutral-800 */
    --bg-sunken:      #081a10;   /* --c-green-950   */
    --bg-inverse:     #f7f9f7;
    --bg-accent-soft: #2a1c07;
    --bg-brand-soft:  #0c2417;

    --text-primary:   #f7f9f7;
    --text-secondary: #c9d3cc;
    --text-muted:     #9aa69e;
    --text-disabled:  #6f7d75;
    --text-inverse:   #0d1310;
    --text-on-accent: #0d1310;
    --text-brand:     #7cbf8f;   /* --c-green-300 */
    --text-accent:    #ecc25c;   /* --c-gold-300  */
    --text-earth:     #dba488;   /* --c-earth-300 */

    --border-subtle:  #2a332e;
    --border-default: #404b45;
    --border-strong:  #6f7d75;

    --focus-ring:         #ecc25c;
    --focus-ring-inverse: #1b5432;
  }
}
/* Override manual: <html data-theme="dark"> repete o bloco acima */
```

> **REGRA `--text-muted`:** mede apenas **4.32:1** sobre `#ffffff`. **Proibido usar em corpo de texto.**
> Permitido somente em: placeholders de input, ícones decorativos, legendas de figura ≥24px, e texto ≥18.66px em negrito. Para qualquer texto corrido use `--text-secondary` (6.32:1) ou superior.

### 2.7 Tabela de contraste validada (WCAG 2.1)

Todas as razões abaixo foram **calculadas** com a fórmula oficial de luminância relativa (WCAG 2.1, seção 1.4.3 / 1.4.11).

**Light mode — texto sobre fundo**

| Par | Razão | AA (4.5:1) | AAA (7:1) |
|---|---|---|---|
| `--text-primary` `#18201c` sobre `#ffffff` | **16.64:1** | ✅ | ✅ |
| `--text-primary` `#18201c` sobre `#f7f9f7` | **15.72:1** | ✅ | ✅ |
| `--text-secondary` `#55635b` sobre `#ffffff` | **6.32:1** | ✅ | ❌ |
| `--text-secondary` `#55635b` sobre `#f7f9f7` | **5.97:1** | ✅ | ❌ |
| `--text-muted` `#6f7d75` sobre `#ffffff` | 4.32:1 | ❌ corpo / ✅ ≥24px | ❌ |
| `--text-brand` `#1b5432` sobre `#ffffff` | **8.90:1** | ✅ | ✅ |
| `--text-brand` `#1b5432` sobre `#eef7f0` | **7.14:1** | ✅ | ✅ |
| `#226b3f` (green-600) sobre `#eef7f0` | **5.92:1** | ✅ | ❌ |
| `--text-accent` `#8a5410` sobre `#ffffff` | **6.26:1** | ✅ | ❌ |
| `--text-accent` `#8a5410` sobre `#fdf8ed` | **5.91:1** | ✅ | ❌ |
| `#6b4115` (gold-800) sobre `#f3d894` (gold-200) | **6.30:1** | ✅ | ❌ |
| `--text-earth` `#7c3a27` sobre `#ffffff` | **8.43:1** | ✅ | ✅ |
| `--text-earth` `#7c3a27` sobre `#fbf5f1` | **7.80:1** | ✅ | ✅ |
| `#143f26` (green-800) sobre `#abd8b7` (badge verde) | **7.48:1** | ✅ | ✅ |
| `#18201c` sobre `#ecc25c` (badge dourado) | **9.85:1** | ✅ | ✅ |
| `#18201c` sobre `#f3d894` (badge dourado claro) | **11.93:1** | ✅ | ✅ |

**Light mode — texto sobre botões**

| Par | Razão | Veredito |
|---|---|---|
| Branco sobre `#2f8650` (green-500) | **4.52:1** | ✅ AA (limite — preferir green-600) |
| Branco sobre `#226b3f` (green-600, **default**) | **6.48:1** | ✅ AA |
| Branco sobre `#1b5432` (green-700, **hover**) | **8.90:1** | ✅ AA / AAA |
| Branco sobre `#143f26` (green-800, **active**) | **11.87:1** | ✅ AAA |
| `#18201c` sobre `#d4921a` (gold-500, **CTA dourado**) | **6.28:1** | ✅ AA |
| `#18201c` sobre `#e5ad33` (gold-400, hover dourado) | **8.21:1** | ✅ AA |
| Branco sobre `#d4921a` | 2.65:1 | ❌ **PROIBIDO** — nunca usar branco em dourado |
| Branco sobre `#9a4a2f` (earth-600, botão terciário) | **6.19:1** | ✅ AA |
| Branco sobre `#7c3a27` (earth-700) | **8.43:1** | ✅ AA / AAA |
| `#f7f9f7` sobre `#0f2e1d` (bg-inverse) | **13.89:1** | ✅ AAA |

**Light mode — semânticas sobre `#ffffff`**

| Par | Razão | Veredito |
|---|---|---|
| `#b3261e` (erro) | **6.54:1** | ✅ AA |
| `#b3261e` sobre `#f7f9f7` | **6.18:1** | ✅ AA |
| `#167a42` (sucesso) | **5.39:1** | ✅ AA |
| `#1f6f8b` (info) | **5.67:1** | ✅ AA |
| `#1f6f8b` sobre `#e8f2f6` | **4.98:1** | ✅ AA |
| `#b4700a` (warning-500) | 3.99:1 | ⚠️ só ícone/UI — para texto use `--c-warning-700` `#8a5410` (6.26:1) |

**Dark mode — sobre `#0d1310`**

| Par | Razão | Veredito |
|---|---|---|
| `#f7f9f7` (texto principal) | **17.76:1** | ✅ AAA |
| `#c9d3cc` (texto secundário) | **12.23:1** | ✅ AAA |
| `#9aa69e` (texto muted) | **7.45:1** | ✅ AAA |
| `#7cbf8f` (green-300, link) | **8.68:1** | ✅ AAA |
| `#4fa268` (green-400, link) | **5.99:1** | ✅ AA |
| `#ecc25c` (gold-300) | **11.13:1** | ✅ AAA |
| `#e5ad33` (gold-400) | **9.27:1** | ✅ AAA |
| `#dba488` (earth-300) | **8.66:1** | ✅ AAA |
| `#f2a099` (erro dark) | **9.18:1** | ✅ AAA |
| `#7ed9a6` (sucesso dark) | **11.06:1** | ✅ AAA |
| `#f7f9f7` sobre `--bg-surface` `#18201c` | **15.72:1** | ✅ AAA |
| `#f7f9f7` sobre `--bg-elevated` `#212b25` | **13.81:1** | ✅ AAA |
| `#4fa268` sobre `#18201c` (surface) | **5.31:1** | ✅ AA |

**Elementos não-textuais (WCAG 1.4.11, mínimo 3:1)**

| Par | Razão | Veredito |
|---|---|---|
| `--border-strong` `#6f7d75` sobre `#ffffff` (borda de input) | **4.32:1** | ✅ |
| `--border-strong` `#6f7d75` sobre `#0d1310` | **4.35:1** | ✅ |
| `--border-strong` `#6f7d75` sobre `#18201c` | **3.86:1** | ✅ |
| `--focus-ring` `#1b5432` sobre `#ffffff` | **8.90:1** | ✅ |
| `--focus-ring-inverse` `#ecc25c` sobre `#1b5432` | **5.27:1** | ✅ |
| `--focus-ring` dark `#ecc25c` sobre `#0d1310` | **11.13:1** | ✅ |
| `--border-subtle` `#e0e5e1` sobre `#ffffff` | 1.58:1 | ✅ isento (divisória decorativa, não componente) |
| `--border-default` `#c8d0ca` sobre `#ffffff` | 1.58:1 | ✅ isento (contorno decorativo de card) |

### 2.8 Tokens de foco (obrigatório)

```css
:root {
  --focus-width: 3px;
  --focus-offset: 2px;
  --focus-radius: 4px;
}

:focus-visible {
  outline: var(--focus-width) solid var(--focus-ring);
  outline-offset: var(--focus-offset);
  border-radius: var(--focus-radius);
}

/* Em superfícies verdes escuras (footer, CTA, botão primário) trocar o anel */
.on-inverse :focus-visible,
.btn-primary:focus-visible {
  outline-color: var(--focus-ring-inverse);
}

/* Nunca remover o outline sem substituto */
:focus:not(:focus-visible) { outline: none; }
```

---

## 3. Tipografia

### 3.1 Famílias (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Papel | Fonte | Motivo |
|---|---|---|
| **Display / títulos** | **Fraunces** (serif variável, eixo `opsz` 9–144) | Serifa contemporânea de "soft serif" com personalidade editorial e eixo óptico. Comunica história e ciência sem virar "Times New Roman de documento oficial". O `opsz` alto dá contraste fino nos tamanhos grandes. |
| **Texto / UI** | **Plus Jakarta Sans** | Geométrica-humanista, excelente legibilidade em 14–18px, `x-height` alta (bom no mobile), numerais claros. Contrapõe a serifa sem competir. |

**Stacks de fallback (usar exatamente):**
```css
--font-display: "Fraunces", "Iowan Old Style", "Palatino Linotype", Georgia, "Times New Roman", serif;
--font-body:    "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono:    ui-monospace, "SFMono-Regular", "Cascadia Mono", Consolas, monospace;
```

**Regra de uso:** Fraunces **apenas** em `h1`–`h4`, no número dos contadores, em blockquotes e no wordmark. Todo o resto (`h5`, `h6`, body, UI, botões, labels) usa Plus Jakarta Sans. Botões **nunca** em Fraunces.

### 3.2 Escala modular

Base: `1rem = 16px`. Razão **1.250 (terça maior)** no desktop, **1.200 (terça menor)** abaixo de 640px. Implementada com `clamp()` para fluidez real.

```css
:root {
  /* ---- Escala fluida (clamp = min, preferido, max) ---- */
  --fs-display:  clamp(2.5rem, 1.5rem + 4.2vw, 4.5rem);   /* 40px → 72px */
  --fs-h1:       clamp(2rem, 1.35rem + 2.8vw, 3.052rem);  /* 32px → 48.8px */
  --fs-h2:       clamp(1.625rem, 1.2rem + 1.9vw, 2.441rem);/* 26px → 39px */
  --fs-h3:       clamp(1.375rem, 1.12rem + 1.1vw, 1.953rem);/* 22px → 31.25px */
  --fs-h4:       clamp(1.25rem, 1.13rem + 0.5vw, 1.5625rem);/* 20px → 25px */
  --fs-h5:       clamp(1.125rem, 1.06rem + 0.28vw, 1.25rem);/* 18px → 20px */
  --fs-h6:       1.125rem;                                  /* 18px fixo */
  --fs-body-lg:  clamp(1.0625rem, 1.01rem + 0.22vw, 1.125rem); /* 17px → 18px */
  --fs-body:     1rem;                                      /* 16px fixo */
  --fs-body-sm:  0.875rem;                                  /* 14px fixo */
  --fs-caption:  0.75rem;                                   /* 12px fixo */
  --fs-overline: 0.8125rem;                                 /* 13px fixo */

  /* ---- Line-heights ---- */
  --lh-display: 1.04;
  --lh-heading: 1.14;
  --lh-subhead: 1.28;
  --lh-body:    1.65;
  --lh-tight:   1.4;

  /* ---- Letter-spacing ---- */
  --ls-display: -0.03em;
  --ls-heading: -0.02em;
  --ls-subhead: -0.01em;
  --ls-body:     0em;
  --ls-overline: 0.14em;   /* caixa alta espaçada */

  /* ---- Pesos ---- */
  --fw-regular: 400;
  --fw-medium:  500;
  --fw-semibold: 600;
  --fw-bold:    700;
}
```

### 3.3 Tabela de estilos por elemento

| Elemento | Fonte | Peso | Tamanho (px) | Line-height | Letter-spacing | Notas |
|---|---|---|---|---|---|---|
| `--fs-display` (hero H1) | Fraunces | 600 | 40 → 72 | 1.04 | -0.03em | `opsz: 120`, `max-width: 18ch` |
| `h1` | Fraunces | 600 | 32 → 48.8 | 1.14 | -0.02em | `max-width: 22ch` |
| `h2` | Fraunces | 600 | 26 → 39 | 1.14 | -0.02em | `max-width: 24ch` |
| `h3` | Fraunces | 500 | 22 → 31.25 | 1.14 | -0.02em | `max-width: 28ch` |
| `h4` | Fraunces | 500 | 20 → 25 | 1.28 | -0.01em | — |
| `h5` | Plus Jakarta Sans | 600 | 18 → 20 | 1.28 | -0.01em | — |
| `h6` | Plus Jakarta Sans | 700 | 18 | 1.4 | 0em | usar `text-transform: none` |
| `.text-body-lg` | Plus Jakarta Sans | 400 | 17 → 18 | 1.65 | 0em | lead paragraph, `max-width: 68ch` |
| `.text-body` | Plus Jakarta Sans | 400 | 16 | 1.65 | 0em | `max-width: 72ch` |
| `.text-body-sm` | Plus Jakarta Sans | 400 | 14 | 1.55 | 0em | meta, legendas de formulário |
| `.text-caption` | Plus Jakarta Sans | 400 | 12 | 1.5 | 0.01em | crédito de foto, nota legal |
| `.text-overline` | Plus Jakarta Sans | 700 | 13 | 1.2 | 0.14em | `text-transform: uppercase`, cor `--text-accent` |
| `.stat-number` | Fraunces | 700 | 48 → 80 | 1.0 | -0.04em | `font-variant-numeric: tabular-nums` |
| `.btn-label` | Plus Jakarta Sans | 600 | 16 | 1.2 | 0.005em | nunca menor que 15px |
| `.nav-link` | Plus Jakarta Sans | 500 | 15 | 1.2 | 0.01em | — |

### 3.4 Ajustes de legibilidade obrigatórios

```css
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-primary);
  background: var(--bg-page);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-variation-settings: "SOFT" 20, "WONK" 0; /* Fraunces: suaviza, sem "wonk" */
  text-wrap: balance;            /* títulos sem palavra órfã */
}

p { text-wrap: pretty; }          /* evita última linha com 1 palavra */
p, li, blockquote { max-width: 72ch; }

/* Respeitar preferência do usuário por texto maior */
@media (min-width: 1600px) { html { font-size: 17px; } }
```

> **`text-wrap: balance/pretty`** já é suportado em Chrome/Edge/Safari/Firefox atuais. É progressive enhancement — degrada para o comportamento normal sem quebrar nada.

---

## 4. Espaçamento, raio, sombra, breakpoints e grid

### 4.1 Escala de espaçamento (base 4px)

```css
:root {
  --sp-0:  0;
  --sp-1:  0.25rem;  /*  4px */
  --sp-2:  0.5rem;   /*  8px */
  --sp-3:  0.75rem;  /* 12px */
  --sp-4:  1rem;     /* 16px */
  --sp-5:  1.25rem;  /* 20px */
  --sp-6:  1.5rem;   /* 24px */
  --sp-8:  2rem;     /* 32px */
  --sp-10: 2.5rem;   /* 40px */
  --sp-12: 3rem;     /* 48px */
  --sp-16: 4rem;     /* 64px */
  --sp-20: 5rem;     /* 80px */
  --sp-24: 6rem;     /* 96px */
  --sp-32: 8rem;     /* 128px */

  /* Span vertical de seções — fluido */
  --section-py:    clamp(3.5rem, 2rem + 6vw, 8rem);   /* 56px → 128px */
  --section-py-sm: clamp(2.5rem, 1.75rem + 3vw, 4rem);/* 40px → 64px */
  --stack-sm: var(--sp-4);
  --stack-md: var(--sp-8);
  --stack-lg: var(--sp-12);
  --gap-grid: clamp(1rem, 0.5rem + 2vw, 2rem);
}
```

Uso: `padding-block: var(--section-py)` em toda `<section>`. Nunca inventar valor fora da escala.

### 4.2 Border radius

```css
:root {
  --radius-xs:  4px;     /* chips, tags */
  --radius-sm:  8px;     /* inputs, botões pequenos */
  --radius-md:  12px;    /* botões, cards pequenos */
  --radius-lg:  16px;    /* cards, imagens */
  --radius-xl:  24px;    /* cards de destaque, modais */
  --radius-2xl: 32px;    /* blocos hero, painéis */
  --radius-pill: 9999px; /* badges, avatares */
  --radius-circle: 50%;
}
```

Regra: **cards e botões = `--radius-md` ou maior.** Nada com canto reto exceto divisórias e imagens full-bleed.

### 4.3 Sombras (tonalizadas em verde, nunca preto puro)

```css
:root {
  --shadow-xs: 0 1px 2px rgba(15, 46, 29, 0.06);
  --shadow-sm: 0 1px 3px rgba(15, 46, 29, 0.08), 0 1px 2px rgba(15, 46, 29, 0.04);
  --shadow-md: 0 4px 12px rgba(15, 46, 29, 0.08), 0 2px 4px rgba(15, 46, 29, 0.04);
  --shadow-lg: 0 12px 28px rgba(15, 46, 29, 0.10), 0 4px 8px rgba(15, 46, 29, 0.05);
  --shadow-xl: 0 24px 56px rgba(15, 46, 29, 0.14), 0 8px 16px rgba(15, 46, 29, 0.06);
  --shadow-focus: 0 0 0 3px rgba(27, 84, 50, 0.18);
  --shadow-gold:  0 12px 28px rgba(138, 84, 16, 0.18);
}
@media (prefers-color-scheme: dark) {
  :root {
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.45);
    --shadow-lg: 0 12px 28px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 24px 56px rgba(0, 0, 0, 0.6);
    --shadow-focus: 0 0 0 3px rgba(236, 194, 92, 0.25);
  }
}
```

### 4.4 Breakpoints

```css
/* Mobile-first. Estes são os MIN-WIDTH. */
/* --bp-xs:  360px  → base, sem media query (suporte mínimo) */
/* --bp-sm:  480px  → celulares grandes                                  */
/* --bp-md:  640px  → tablet retrato                                     */
/* --bp-lg:  768px  → tablet paisagem                                    */
/* --bp-xl:  1024px → desktop pequeno (nav horizontal entra aqui)        */
/* --bp-2xl: 1280px → desktop padrão (grid de 3 colunas de cursos)       */
/* --bp-3xl: 1440px → wide/ultra                                         */
```

```css
@media (min-width: 480px)  { /* ... */ }
@media (min-width: 640px)  { /* ... */ }
@media (min-width: 768px)  { /* ... */ }
@media (min-width: 1024px) { /* ... */ }
@media (min-width: 1280px) { /* ... */ }
@media (min-width: 1440px) { /* ... */ }
```

**Ponto de virada crítico:** a navbar troca do menu hambúrguer para a lista horizontal **em 1024px** (`--bp-xl`), porque há 7 itens de menu.

### 4.5 Grid e container

```css
:root {
  --container-max: 1200px;
  --container-narrow: 760px;   /* blocos de texto editorial */
  --container-wide: 1360px;    /* galerias full-bleed contidas */
  --gutter: clamp(1.25rem, 0.75rem + 2.5vw, 2.5rem); /* 20px → 40px */
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--gutter);
}
.container--narrow { max-width: var(--container-narrow); }
.container--wide   { max-width: var(--container-wide); }

/* Grid utilitário de 12 colunas */
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--gap-grid); }

/* Grid de cursos: 1 → 2 → 3 colunas */
.courses-grid { display: grid; grid-template-columns: 1fr; gap: var(--gap-grid); }
@media (min-width: 768px)  { .courses-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1280px) { .courses-grid { grid-template-columns: repeat(3, 1fr); } }

/* Grid de números: 2 → 4 colunas */
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--gap-grid); }
@media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
```

**Regras de largura de leitura:** texto corrido nunca acima de **72ch**; parágrafos de destaque **68ch**; títulos **24ch** no máximo.

---

## 5. Arquitetura de informação e mapa do site

### 5.1 Estrutura de páginas

Site de **3 páginas** (não é SPA, não é multipágina fragmentada). A home concentra a narrativa de venda; as subpáginas absorvem o detalhamento.

| Arquivo | Título | Papel |
|---|---|---|
| `index.html` | ETEC de Iguape — Ensino Médio Técnico Público e Gratuito | Página principal, 13 seções, narrativa completa de conversão. |
| `cursos.html` | Cursos Técnicos — ETEC de Iguape | Detalhamento dos 3 cursos + grade curricular + competências + mercado. |
| `contato.html` | Contato e Localização — ETEC de Iguape | Formulário, mapa, telefones, horários, FAQ completo. |

Não haverá `sobre.html`, `vestibulinho.html` nem `404.html` — o conteúdo vive na home e nas âncoras.

**Exceção:** se o front-end preferir, pode criar `404.html` — mas o site pode ser aberto via `file://`, onde 404 nunca dispara. **Não criar.**

### 5.2 Menu de navegação (desktop, ≥1024px)

Ordem exata dos itens:

```
[LOGO ETEC]   A Escola · Cursos · Estrutura · Coop-Escola · Vestibulinho · Contato        [Inscreva-se →]
```

| # | Label visível | Âncora / destino | Alvo |
|---|---|---|---|
| 1 | A Escola | `index.html#sobre` | Seção Sobre |
| 2 | Cursos | `index.html#cursos` | Seção Cursos |
| 3 | Estrutura | `index.html#estrutura` | Seção Galeria |
| 4 | Coop-Escola | `index.html#coop-escola` | Seção Coop-Escola |
| 5 | Vestibulinho | `index.html#vestibulinho` | Seção Processo Seletivo |
| 6 | Contato | `contato.html` | Subpágina |
| CTA | Inscreva-se | `index.html#vestibulinho` | Botão dourado primário |

Quando o usuário está em `cursos.html` ou `contato.html`, os links âncora viram `index.html#cursos` etc. (caminho relativo completo, obrigatório por causa de `file://`).

### 5.3 Menu mobile (<1024px)

Drawer lateral direito, largura `min(88vw, 400px)`, fundo `--bg-surface`, header com logo + botão fechar. Itens em lista vertical, `--fs-h5`, 56px de altura de toque cada. CTA "Inscreva-se no Vestibulinho" fixado na base do drawer (largura total).

### 5.4 Ordem das seções na home

| # | `id` | Seção | Objetivo de conversão |
|---|---|---|---|
| 1 | — | **Navbar** | Navegação + CTA persistente |
| 2 | `#hero` | **Hero** | Promessa + CTA imediato + selo institucional |
| 3 | `#credibilidade` | **Faixa de credibilidade** | 4 selos: Centro Paula Souza, Público e Gratuito, Desde 1970, Vale do Ribeira |
| 4 | `#sobre` | **A Escola + Patrono** | História, Narciso de Medeiros, bananicultura |
| 5 | `#numeros` | **Números** | Contadores animados (4 métricas) |
| 6 | `#cursos` | **Cursos Técnicos** | 3 cards + link para `cursos.html` |
| 7 | `#estrutura` | **Estrutura e Fazenda** | Galeria de fotos + modal |
| 8 | `#metodologia` | **Como se aprende aqui** | 4 diferenciais pedagógicos |
| 9 | `#depoimentos` | **Depoimentos** | Carrossel de 4 egressos |
| 10 | `#coop-escola` | **Coop-Escola** | Diferencial institucional + CTA parceria |
| 11 | `#vestibulinho` | **Processo Seletivo** | Passo a passo + datas + CTA forte |
| 12 | `#faq` | **Perguntas frequentes** | Accordion (7 perguntas) |
| 13 | `#localizacao` | **Localização e Contato** | Mapa + endereço + telefones |
| 14 | `#cta-final` | **CTA final** | Último empurrão para inscrição |
| 15 | — | **Footer** | Contato, links, créditos, Centro Paula Souza |

**Total: 13 seções de conteúdo + navbar + footer.**

### 5.5 Estrutura de headings (hierarquia semântica — não pular níveis)

```
h1  → "Ensino médio técnico público, gratuito e com os pés na terra."   (hero)
  h2 → "Uma escola que nasceu da terra e do rio"                        (#sobre)
    h3 → "O patrono: Narciso de Medeiros"                               (#sobre)
  h2 → "A ETEC de Iguape em números"                                    (#numeros)
  h2 → "Três caminhos, um só chão"                                      (#cursos)
    h3 → "Agropecuária" | "Aquicultura e Pesca" | "Meio Ambiente"
  h2 → "Onde a aula acontece"                                           (#estrutura)
  h2 → "Como se aprende aqui"                                           (#metodologia)
    h3 → (4 títulos de diferencial)
  h2 → "Quem passou por aqui"                                           (#depoimentos)
  h2 → "Coop-Escola: a cooperativa que é sala de aula"                  (#coop-escola)
  h2 → "Como entrar na ETEC de Iguape"                                  (#vestibulinho)
    h3 → "Passo a passo" | "Datas e documentos"
  h2 → "Perguntas frequentes"                                           (#faq)
    h3 → (cada pergunta do accordion)
  h2 → "Venha nos visitar"                                              (#localizacao)
  h2 → "Sua vaga começa com uma inscrição"                              (#cta-final)
```

Apenas **um `h1`** em toda a home.

---

## 6. Wireframes (mobile e desktop)

Legenda: `▓` = imagem/mídia · `▬` = texto · `[ ]` = botão · `◯` = ícone · `≡` = divisória

---

### 6.1 Navbar

**Mobile (<1024px) — estado no topo da página**
```
┌──────────────────────────────────────────┐
│  ◯ ETEC            IGUAPE       [ ☰ ]    │  ← 64px altura
│    Eng. N. de Medeiros                   │    bg: transparente sobre hero
└──────────────────────────────────────────┘
```
**Mobile — estado scrolled**
```
┌──────────────────────────────────────────┐
│  ◯ ETEC            IGUAPE       [ ☰ ]    │  ← 64px
└──────────────────────────────────────────┘    bg: --bg-surface, shadow-md, borda inferior
                                              aparece barra de progresso de leitura 3px dourada
```

**Desktop (≥1024px)**
```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│  ◯ ETEC IGUAPE     A Escola  Cursos  Estrutura  Coop-Escola  Vestibulinho  Contato  [Inscreva-se →] │
│  85px altura                                                                      ↑ pills dourado │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.2 Hero (`#hero`)

**Mobile (<640px)**
```
┌────────────────────────────────┐
│                                │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ ← imagem full-bleed
│   ▓  (gradiente verde 88%)  ▓   │   640px altura
│   ▓                         ▓   │   object-position: center 40%
│   ▓  ┌ SELO CPS ┐           ▓   │
│   ▓  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬    ▓   │
│   ▓  H1: Ensino médio       ▓   │
│   ▓      técnico público,   ▓   │
│   ▓      gratuito e com os  ▓   │
│   ▓      pés na terra.      ▓   │
│   ▓                         ▓   │
│   ▓  ▬▬ lead (68ch) ▬▬▬▬▬    ▓   │
│   ▓                         ▓   │
│   ▓  [ Inscreva-se  → ]      ▓   │ ← botão dourado, full-width
│   ▓  [ Conheça os cursos ]   ▓   │ ← ghost branco, full-width
│   ▓                         ▓   │
│   ▓  ▬▬ 3 mini-stats ▬▬▬▬    ▓   │
│   ▓                         ▓   │
└────────────────────────────────┘
```

**Desktop (≥1024px)**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │
│      ▓  (imagem 1600x900, gradiente esquerda→direita verde 92%→45%)    ▓     │
│      ▓                                                                  ▓   │
│      ▓   ┌ Centro Paula Souza · Público ┐                               ▓   │
│      ▓   │  H1  Ensino médio técnico público,                         ▓   │
│      ▓   │      gratuito e com os pés na terra.                        ▓   │
│      ▓   │                                                             ▓   │
│      ▓   │      ▬▬▬ lead paragraph (68ch, --fs-body-lg) ▬▬▬▬▬▬▬        ▓   │
│      ▓   │                                                             ▓   │
│      ▓   │      [ Inscreva-se no Vestibulinho → ]  [ Ver os cursos ]   ▓   │
│      ▓   │                                                             ▓   │
│      ▓   │      ─────── filete dourado 48px ─────                       ▓   │
│      ▓   │      55 anos   ·   3 cursos   ·   100% gratuito            ▓   │
│      ▓   └─── coluna de conteúdo: max 620px, alinhada à esquerda ───┘   ▓   │
│      ▓                                                                  ▓   │
│      ▓                                                    ▓▓▓▓▓▓▓▓▓▓▓▓  ▓   │ ← card flutuante
│      ▓                                                    ▓ ▬▬▬▬▬▬▬▬ ▓  ▓   │   "Inscrições
│      ▓                                                    ▓ ▬▬▬▬▬▬▬▬ ▓  ▓   │    abertas"
│      ▓                                                    ▓ [  →  ]   ▓  ▓   │   (oculto <1280px)
│      ▓                                                    ▓▓▓▓▓▓▓▓▓▓▓▓  ▓   │
│      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │
│                                                                            │
│                      ⌄  indicador de scroll (animado)                      │
└────────────────────────────────────────────────────────────────────────────┘
  Altura: 100svh (min 640px, max 860px)
```

---

### 6.3 Faixa de credibilidade (`#credibilidade`)

**Mobile** — grid 2×2
```
┌────────────────────────────────┐
│  ◯          ◯          ◯    ◯  │
│  Centro     Público    55    Vale│
│  Paula      e           anos  do │
│  Souza      Gratuito    (1970) Rib.│
└────────────────────────────────┘
```
**Desktop** — 4 colunas, `--bg-brand-soft`, borda superior/inferior `--border-subtle`
```
┌────────────────────────────────────────────────────────────────────────────┐
│   ◯ Centro Paula Souza  │ ◯ Público e Gratuito │ ◯ Desde 1970 │ ◯ Vale do Ribeira │
│     Escola técnica       │   Ensino médio +      │   55 anos de │   Iguape, SP      │
│     estadual             │   técnico integrado   │   história   │   Mata Atlântica  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.4 Sobre + Patrono (`#sobre`)

**Mobile** — empilhado
```
┌────────────────────────────────┐
│  ── SOBRE ──                   │ ← overline dourado
│  H2: Uma escola que nasceu     │
│      da terra e do rio         │
│  ▬▬▬ parágrafo ▬▬▬▬▬▬▬▬▬▬▬▬     │
│                                │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ ← imagem 16:10
│                                │
│  ▬▬▬ parágrafo ▬▬▬▬▬▬▬▬▬▬▬▬     │
│                                │
│  ┌──────────────────────────┐  │ ← card do patrono
│  │ ▓▓▓▓ retrato (sepia)     │  │   --bg-accent-soft
│  │ H3: Narciso de Medeiros  │  │   --radius-lg
│  │ 1892 — engenheiro        │  │   borda esquerda 4px dourada
│  │ agrônomo, pesquisador    │  │
│  │ da bananicultura do      │  │
│  │ Vale do Ribeira.         │  │
│  │ ❝ citação do patrono ❞   │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

**Desktop** — grid 2 colunas (7/5)
```
┌────────────────────────────────────────────────────────────────────────────┐
│  ── SOBRE A ESCOLA ──                                                      │
│                                                                            │
│  ┌───────────────────────────────┐   ┌──────────────────────────────────┐  │
│  │ H2: Uma escola que nasceu     │   │                                  │  │
│  │     da terra e do rio         │   │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │  │
│  │                               │   │   ▓  imagem fazenda/viveiro   ▓   │  │
│  │ ▬▬▬ parágrafo 1 (68ch) ▬▬▬▬▬  │   │   ▓  4:5 retrato, radius-lg   ▓   │  │
│  │ ▬▬▬ parágrafo 2 ▬▬▬▬▬▬▬▬▬▬▬▬  │   │   ▓                           ▓   │  │
│  │                               │   │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │  │
│  │ ┌───────────────────────────┐ │   │                                  │  │
│  │ │★ CARD DO PATRONO          │ │   └──────────────────────────────────┘  │
│  │ │ ▓ retrato 80px circular   │ │   ┌─ badge flutuante ─┐                 │
│  │ │ H3 Narciso de Medeiros    │ │   │  desde 1970        │                 │
│  │ │ 1892 · Eng. Agrônomo      │ │   └────────────────────┘                 │
│  │ │ ❝ citação ❞               │ │                                        │
│  │ └───────────────────────────┘ │                                        │
│  └───────────────────────────────┘   └──────────────────────────────────┘  │
│      7 colunas                            5 colunas                        │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.5 Números (`#numeros`)

Fundo `--bg-inverse` (verde-900), texto claro, filete dourado.

**Mobile** — 2×2
```
┌────────────────────────────────┐
│  ▓▓▓▓ fundo verde escuro ▓▓▓▓  │
│  H2: A ETEC de Iguape em números│
│  ┌──────────┬──────────┐       │
│  │   1.200  │   55     │       │
│  │  alunos  │  anos    │       │
│  ├──────────┼──────────┤       │
│  │    3     │   98%    │       │
│  │ cursos   │ empregab.│       │
│  └──────────┴──────────┘       │
└────────────────────────────────┘
```
**Desktop** — 4 colunas divididas por filetes verticais de 1px `rgba(236,194,92,.25)`
```
┌────────────────────────────────────────────────────────────────────────────┐
│         H2: A ETEC de Iguape em números                                    │
│  ─── lead curto de apoio (52ch) ───                                        │
│                                                                            │
│      1.200        │     55        │      3        │      98%                │
│      alunos       │   anos de     │   cursos      │   de egressos          │
│      matriculados │   história    │   técnicos    │   empregados ou        │
│                   │   (desde 1970)│   integrados  │   na universidade      │
│   (Fraunces 80px, dourado-300, tabular-nums)                                │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.6 Cursos (`#cursos`)

**Mobile** — cards empilhados
```
┌────────────────────────────────┐
│  ── CURSOS TÉCNICOS ──         │
│  H2: Três caminhos, um só chão │
│  ▬▬ lead ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬    │
│                                │
│  ┌──────────────────────────┐  │
│  │ ▓▓▓▓▓ imagem 16:9 ▓▓▓▓▓  │  │
│  │ [ TÉCNICO ]  [ 3 anos ]  │  │ ← badges
│  │ H3 Agropecuária          │  │
│  │ ▬▬ descrição 3 linhas ▬▬ │  │
│  │ ✓ solo e cultivo         │  │
│  │ ✓ produção animal        │  │
│  │ ✓ gestão rural           │  │
│  │ ────────────────────     │  │
│  │ Saiba mais →             │  │
│  └──────────────────────────┘  │
│  ┌── card Aquicultura e Pesca ─┐│
│  └──────────────────────────┘  │
│  ┌── card Meio Ambiente ──────┐│
│  └──────────────────────────┘  │
└────────────────────────────────┘
```
**Desktop** — 3 colunas; o card do meio (Aquicultura) tem `--shadow-lg` e `translateY(-8px)` permanente para criar hierarquia
```
┌────────────────────────────────────────────────────────────────────────────┐
│            ── CURSOS TÉCNICOS ──        H2: Três caminhos, um só chão      │
│                     ▬▬ lead centrado, 60ch ▬▬                              │
│                                                                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │             │
│  │ [TÉCNICO][3 anos│  │ [TÉCNICO][3 anos│  │ [TÉCNICO][3 anos│             │
│  │ H3 Agropecuária │  │ H3 Aquicultura  │  │ H3 Meio Ambiente│             │
│  │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │  │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │  │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │             │
│  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │             │
│  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │             │
│  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │  │ ✓ ▬▬▬▬▬▬▬▬▬▬▬▬  │             │
│  │ ─────────────── │  │ ─────────────── │  │ ─────────────── │             │
│  │ Saiba mais →    │  │ Saiba mais →    │  │ Saiba mais →    │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                              ↑ elevado -8px                                 │
│                                                                            │
│              [ Ver detalhes dos três cursos em cursos.html → ]              │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.7 Estrutura / Galeria (`#estrutura`)

**Mobile** — carrossel horizontal com scroll-snap + dots
```
┌────────────────────────────────┐
│  ── ESTRUTURA ──               │
│  H2: Onde a aula acontece      │
│  ┌────────────────────────┐    │
│  │ ▓▓▓▓▓ foto 4:3 ▓▓▓▓▓▓▓ │→   │ ← scroll-snap-x
│  │ ▬▬ legenda ▬▬          │    │
│  └────────────────────────┘    │
│  ┌──── peek do próximo ───┐    │
│  ● ○ ○ ○ ○ ○                   │ ← dots 8px
│  [ Ver todas as fotos ]        │
└────────────────────────────────┘
```
**Desktop** — mosaico assimétrico de 6 fotos (grid 12 col), clique abre lightbox
```
┌────────────────────────────────────────────────────────────────────────────┐
│                     ── ESTRUTURA E FAZENDA ──                              │
│                     H2: Onde a aula acontece                               │
│                                                                            │
│  ┌───────────────────────────┐ ┌──────────────┐ ┌───────────────────────┐  │
│  │                           │ │              │ │                       │  │
│  │      ▓ FOTO 1 (grande)    │ │  ▓ FOTO 2    │ │      ▓ FOTO 3         │  │
│  │      6 col × 2 rows       │ │  3 col       │ │      3 col            │  │
│  │      legenda hover        │ │              │ │                       │  │
│  └───────────────────────────┘ └──────────────┘ └───────────────────────┘  │
│  ┌──────────────┐ ┌───────────────────────────┐ ┌───────────────────────┐  │
│  │  ▓ FOTO 4    │ │      ▓ FOTO 5 (grande)    │ │      ▓ FOTO 6         │  │
│  │  3 col       │ │      6 col                │ │      3 col            │  │
│  └──────────────┘ └───────────────────────────┘ └───────────────────────┘  │
│                                                                            │
│                   [ ⌕ Abrir galeria completa (6 fotos) ]                   │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.8 Metodologia (`#metodologia`)

**Mobile** — lista vertical com ícones
```
┌────────────────────────────────┐
│  ── COMO SE APRENDE AQUI ──    │
│  H2: Aprender fazendo          │
│  ◯ ▬▬ Aula na fazenda ▬▬▬▬     │
│  ◯ ▬▬ Viveiro e tanques ▬▬▬    │
│  ◯ ▬▬ Laboratórios ▬▬▬▬▬▬▬     │
│  ◯ ▬▬ Estágio obrigatório ▬▬   │
└────────────────────────────────┘
```
**Desktop** — 4 colunas em `--bg-brand-soft`, cada uma com ícone 32px dourado-700, `h3` e 2 linhas
```
┌────────────────────────────────────────────────────────────────────────────┐
│                     H2: Aprender fazendo, não só ouvindo                   │
│                                                                            │
│      ◯                    ◯                   ◯                  ◯         │
│  Aula na fazenda      Viveiro e tanques   Laboratórios      Estágio        │
│  ▬▬▬▬▬▬▬▬▬▬▬▬         ▬▬▬▬▬▬▬▬▬▬▬▬         ▬▬▬▬▬▬▬▬▬▬▬▬       ▬▬▬▬▬▬▬▬       │
│  ▬▬▬▬▬▬▬▬▬▬▬▬         ▬▬▬▬▬▬▬▬▬▬▬▬         ▬▬▬▬▬▬▬▬▬▬▬▬       ▬▬▬▬▬▬▬▬       │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.9 Depoimentos (`#depoimentos`)

**Mobile**
```
┌────────────────────────────────┐
│  H2: Quem passou por aqui      │
│  ┌──────────────────────────┐  │
│  │ ❝❝❝                       │  │
│  │ ▬▬ depoimento 4 linhas ▬▬ │  │
│  │ ◯ ▬ Nome ▬                │  │
│  │     ▬ Curso · Turma ▬     │  │
│  └──────────────────────────┘  │
│  ‹   ● ○ ○ ○   ›               │
└────────────────────────────────┘
```
**Desktop** — 1 card grande centrado + setas laterais fora do container
```
┌────────────────────────────────────────────────────────────────────────────┐
│  ‹                                                                      ›  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  ❝❝❝❝                                                                │  │
│  │  ▬▬▬▬▬▬▬▬ trecho de citação 3–4 linhas, Fraunces 25px ▬▬▬▬▬▬▬▬▬▬▬▬   │  │
│  │                                                                      │  │
│  │  ◯ ▬ Nome Completo ▬   ·   ▬ Técnico em Agropecuária · 2019 ▬       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                        ●  ○  ○  ○                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.10 Coop-Escola (`#coop-escola`)

**Mobile** — imagem ao topo, texto abaixo
```
┌────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│  ── COOP-ESCOLA ──             │
│  H2: A cooperativa que é       │
│      sala de aula              │
│  ▬▬▬ parágrafo ▬▬▬▬▬▬▬▬▬▬▬▬     │
│  ┌──────────────────────────┐  │
│  │ 📊 mini-stat  │ mini-stat│  │
│  └──────────────────────────┘  │
│  [ Quero ser parceiro → ]      │
└────────────────────────────────┘
```
**Desktop** — split 5/7 invertido (imagem à esquerda), fundo `--bg-accent-soft`
```
┌────────────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────┐   ┌────────────────────────────────────────┐    │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │   │  ── COOP-ESCOLA ──                     │    │
│  │  ▓  imagem 4:3      ▓ │   │  H2: A cooperativa que é sala de aula  │    │
│  │  ▓                  ▓ │   │                                        │    │
│  │  ▓  + card sobreposto│ │   │  ▬▬ parágrafo 1 (66ch) ▬▬▬▬▬▬▬▬▬▬▬▬   │    │
│  │  └─ "30 alunos-       │   │  ▬▬ parágrafo 2 ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬   │    │
│  │     cooperados" ─┘    │   │                                        │    │
│  └───────────────────────┘   │  ┌──────────┬──────────┬──────────┐     │    │
│                              │  │  120     │   8      │   R$ 42k │     │    │
│                              │  │ cooperad.│ cadeias  │ faturam. │     │    │
│                              │  └──────────┴──────────┴──────────┘     │    │
│                              │                                        │    │
│                              │  [ Quero ser parceiro → ]              │    │
│                              └────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.11 Processo Seletivo / Vestibulinho (`#vestibulinho`)

**Mobile**
```
┌────────────────────────────────┐
│  ── VESTIBULINHO ──            │
│  H2: Como entrar na ETEC       │
│  ┌── TIMELINE VERTICAL ─────┐  │
│  │ ① ▬ Inscrição online ▬▬  │  │
│  │  │   ▬ 15/04 a 15/05 ▬   │  │
│  │ ② ▬ Prova ▬▬▬▬▬▬▬▬▬▬▬    │  │
│  │  │   ▬ data e local ▬    │  │
│  │ ③ ▬ Resultado ▬▬▬▬▬▬▬    │  │
│  │ ④ ▬ Matrícula ▬▬▬▬▬▬▬    │  │
│  └──────────────────────────┘  │
│  ┌── CARD "O QUE LEVAR" ────┐  │
│  │ 📄 RG  📄 CPF  📄 histórico│  │
│  └──────────────────────────┘  │
│  [ Inscreva-se agora → ]       │ ← dourado, full-width
│  ▬ link "Ver edital oficial" ▬ │
└────────────────────────────────┘
```
**Desktop** — timeline horizontal de 4 passos com linha conectora dourada
```
┌────────────────────────────────────────────────────────────────────────────┐
│                     ── PROCESSO SELETIVO ──                                │
│                     H2: Como entrar na ETEC de Iguape                      │
│                                                                            │
│     ①───────────────────②───────────────────③───────────────────④          │
│  Inscrição online     Prova objetiva      Resultado         Matrícula      │
│  ▬▬▬▬▬▬▬▬▬▬▬▬         ▬▬▬▬▬▬▬▬▬▬▬▬        ▬▬▬▬▬▬▬▬▬▬       ▬▬▬▬▬▬▬▬▬       │
│  15/04 – 15/05        ▬ data ▬            ▬ data ▬          ▬ data ▬       │
│                                                                            │
│  ┌─────────────────────────────┐  ┌──────────────────────────────────┐   │
│  │ 📄 DOCUMENTOS NECESSÁRIOS    │  │ ⚠️  IMPORTANTE                    │   │
│  │ • RG e CPF                  │  │ Inscrição é gratuita. A ETEC é    │   │
│  │ • Histórico escolar        │  │ 100% pública e não cobra         │   │
│  │ • Comprovante de residência│  │ mensalidade.                      │   │
│  └─────────────────────────────┘  └──────────────────────────────────┘   │
│                                                                            │
│                  [ Inscreva-se no Vestibulinho → ]  ▬ Ver edital ▬         │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.12 FAQ (`#faq`)

**Mobile e Desktop** — accordion, container estreito (760px)
```
┌────────────────────────────────────────────────────────────────────────────┐
│                       H2: Perguntas frequentes                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ H3 ▬ A ETEC é gratuita?                                          [+] │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ H3 ▬ Preciso ter feito curso técnico antes?                      [+] │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ H3 ▬ Como funciona o Vestibulinho?                               [−] │  │
│  │    ▬▬▬ resposta expandida (68ch) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬     │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ H3 ▬ Tem transporte e merenda?                                   [+] │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ H3 ▬ O curso tem estágio?                                        [+] │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ H3 ▬ Posso fazer faculdade depois?                              [+] │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ H3 ▬ Moro em outra cidade, consigo estudar aqui?                 [+] │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.13 Localização (`#localizacao`)

**Mobile**
```
┌────────────────────────────────┐
│  H2: Venha nos visitar         │
│  ┌──────────────────────────┐  │
│  │ ◯ Endereço               │  │
│  │ ▬▬ Rua ..., Iguape/SP ▬  │  │
│  ├──────────────────────────┤  │
│  │ ◯ Telefone               │  │
│  │ ▬ (13) 3841-xxxx ▬       │  │  ← tel: clicável
│  ├──────────────────────────┤  │
│  │ ◯ E-mail                 │  │
│  │ ▬ eteciguape@cps... ▬    │  │
│  ├──────────────────────────┤  │
│  │ ◯ Horário                │  │
│  │ ▬ seg–sex, 7h–22h ▬      │  │
│  └──────────────────────────┘  │
│  ▓▓▓▓ mapa ▓▓▓▓ 4:3 ▓▓▓▓▓▓▓▓   │
│  [ Abrir no Google Maps → ]    │
└────────────────────────────────┘
```
**Desktop** — 5/7, card de contato à esquerda, mapa à direita em `--radius-xl`
```
┌────────────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────┐   ┌──────────────────────────────────────┐  │
│  │ H2: Venha nos visitar     │   │                                      │  │
│  │                           │   │        ▓▓ mapa embed estático ▓▓     │  │
│  │ ◯ Endereço                │   │        ▓▓  (imagem ou iframe  ▓▓     │  │
│  │   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬     │   │        ▓▓  Google Maps, lazy)  ▓▓    │  │
│  │ ◯ Telefone                │   │        ▓▓                      ▓▓    │  │
│  │   ▬ (13) ▬▬▬▬-▬▬▬▬        │   │        ▓▓                      ▓▓    │  │
│  │ ◯ E-mail                  │   │        ▓▓                      ▓▓    │  │
│  │   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬        │   │        ▓▓                      ▓▓    │  │
│  │ ◯ Horário de atendimento  │   │        ▓▓                      ▓▓    │  │
│  │   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬        │   │                                      │  │
│  │                           │   │   ┌─ card flutuante ─┐               │  │
│  │ [ Abrir no Google Maps → ]│   │   │ ETEC de Iguape   │               │  │
│  └───────────────────────────┘   │   └──────────────────┘               │  │
│                                   └──────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.14 CTA final (`#cta-final`)

**Mobile**
```
┌────────────────────────────────┐
│  ▓▓ fundo verde-900 + foto ▓▓  │
│  H2: Sua vaga começa com       │
│      uma inscrição             │
│  ▬▬ 2 linhas ▬▬▬▬▬▬▬▬▬▬▬▬▬     │
│  [ Inscreva-se agora → ]       │ ← dourado, full-width
│  ▬ link secundário ▬           │
└────────────────────────────────┘
```
**Desktop**
```
┌────────────────────────────────────────────────────────────────────────────┐
│         ▓▓▓▓▓▓▓ overlay verde 90% sobre foto de campo ▓▓▓▓▓▓▓              │
│                                                                            │
│                  H2: Sua vaga começa com uma inscrição                     │
│                  ▬▬▬ subtítulo centrado, 54ch ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬              │
│                                                                            │
│              [ Inscreva-se no Vestibulinho → ]   ▬ Falar com a escola ▬    │
│                                                                            │
│              ◯ Inscrição gratuita  ◯ Escola pública  ◯ Desde 1970          │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 6.15 Footer

**Mobile**
```
┌────────────────────────────────┐
│  ◯ ETEC IGUAPE                 │
│  ▬▬ endereço ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬   │
│  ───────                       │
│  NAVEGAR                       │
│  A Escola                      │
│  Cursos                        │
│  Estrutura                     │
│  Coop-Escola                   │
│  Vestibulinho                  │
│  ───────                       │
│  CURSOS                        │
│  Agropecuária                  │
│  Aquicultura e Pesca           │
│  Meio Ambiente                 │
│  ───────                       │
│  CONTATO                       │
│  ◯ (13) 3841-xxxx              │
│  ◯ eteciguape@cps.sp.gov.br    │
│  ◯ [Instagram] [Facebook]      │
│  ───────                       │
│  ▬ © 2026 ETEC ... ▬           │
│  ▬ Centro Paula Souza ▬        │
└────────────────────────────────┘
```
**Desktop** — 4 colunas + barra inferior
```
┌────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐ ┌──────────┐ ┌──────────────┐ ┌──────────────────┐  │
│  │ ◯ ETEC IGUAPE    │ │ NAVEGAR  │ │ CURSOS       │ │ CONTATO          │  │
│  │ Eng. N. de Medeiros│ A Escola │ │ Agropecuária │ │ ◯ (13) 3841-xxxx │  │
│  │                  │ │ Cursos   │ │ Aquicultura  │ │ ◯ eteciguape@... │  │
│  │ ▬▬ endereço ▬▬   │ │ Estrutura│ │ Meio Ambiente│ │ ◯ Iguape, SP     │  │
│  │ ▬▬ Iguape/SP ▬▬  │ │ Coop-Esc.│ │              │ │                  │  │
│  │                  │ │ Vestibul.│ │              │ │ [◯] [◯] [◯]      │  │
│  │ [SELO Centro     │ │ Contato  │ │              │ │                  │  │
│  │  Paula Souza]    │ │          │ │              │ │                  │  │
│  └──────────────────┘ └──────────┘ └──────────────┘ └──────────────────┘  │
│  ══════════════════════════════════════════════════════════════════════════│
│  ▬ © 2026 ETEC Eng. Agrônomo Narciso de Medeiros ▬   ▬ Política de privacidade ▬ │
└────────────────────────────────────────────────────────────────────────────┘
   Fundo: --bg-inverse (#0f2e1d) · Texto: rgba(247,249,247,.78) · Links: #ecc25c
```

---

## 7. Especificação de componentes

> Convenção: todos os componentes usam a metodologia **BEM simplificada** — bloco `.nome-componente`, elemento `.nome-componente__parte`, modificador `.nome-componente--variante`. Estado via atributo (`[aria-expanded]`, `[disabled]`, `.is-open`, `.is-loading`).

### 7.1 `navbar`

**HTML semântico obrigatório**
```html
<header class="navbar" id="navbar">
  <a class="navbar__skip" href="#main">Pular para o conteúdo</a>
  <div class="container navbar__inner">
    <a class="navbar__brand" href="index.html" aria-label="ETEC de Iguape — página inicial">
      <!-- SVG inline do wordmark -->
    </a>
    <nav class="navbar__nav" id="nav-menu" aria-label="Navegação principal">
      <ul class="navbar__list">
        <li><a class="navbar__link" href="index.html#sobre">A Escola</a></li>
        <!-- ... -->
      </ul>
    </nav>
    <a class="btn btn--accent btn--sm navbar__cta" href="index.html#vestibulinho">Inscreva-se</a>
    <button class="navbar__toggle" type="button"
            aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menu">
      <span class="navbar__toggle-bar"></span>
      <span class="navbar__toggle-bar"></span>
      <span class="navbar__toggle-bar"></span>
    </button>
  </div>
  <div class="navbar__progress" aria-hidden="true"></div>
</header>
```

**Classes e valores**

| Classe | Estilo |
|---|---|
| `.navbar` | `position: sticky; top: 0; z-index: 100; height: 64px` (mobile) / `85px` (≥1024px). `transition: background-color .28s, box-shadow .28s, height .28s` |
| `.navbar` (topo, sobre hero) | `background: transparent; color: #f7f9f7;` — links claros |
| `.navbar.is-scrolled` | `background: var(--bg-surface); box-shadow: var(--shadow-md); border-bottom: 1px solid var(--border-subtle); height: 68px` (mobile) / `72px` (≥1024px). Texto passa a `--text-primary` |
| `.navbar__inner` | `display:flex; align-items:center; gap: var(--sp-6); height:100%` |
| `.navbar__brand` | `display:flex; align-items:center; gap: var(--sp-3); flex-shrink:0` |
| `.navbar__list` | desktop: `display:flex; gap: var(--sp-1); list-style:none` |
| `.navbar__link` | `font: 500 15px/1.2 var(--font-body); padding: 10px 14px; border-radius: var(--radius-sm); color: inherit; transition: background-color .18s ease` |
| `.navbar__link:hover` | `background: var(--c-green-100)` (light) / `rgba(124,191,143,.14)` (dark) |
| `.navbar__link:active` | `background: var(--c-green-200)`; `transform: scale(.97)` |
| `.navbar__link:focus-visible` | `outline: 3px solid var(--focus-ring); outline-offset: 2px` |
| `.navbar__link[aria-current="page"]` | `color: var(--text-brand); font-weight: 600`; pseudo-elemento `::after` filete dourado 2px, `width: 20px` |
| `.navbar__progress` | `position:absolute; bottom:0; left:0; height:3px; width:0%; background: linear-gradient(90deg, var(--c-green-500), var(--c-gold-400)); transition: width .1s linear` |

**Microinterações**
- **Altura encolhe** de 85px → 72px no `is-scrolled`, `transition: height .28s cubic-bezier(.4,0,.2,1)`.
- **Underline animado** no `__link`: `::before` com `transform: scaleX(0)` → `scaleX(1)`, `transform-origin: left`, `180ms ease-out`.
- **Blur de fundo:** `.navbar.is-scrolled { backdrop-filter: blur(12px); background: color-mix(in srgb, var(--bg-surface) 88%, transparent); }` — fallback sólido quando `backdrop-filter` não é suportado.
- **Barra de progresso de leitura** atualiza via `scroll` com `requestAnimationFrame` (não no evento direto).

**Menu mobile (`navbar__toggle`)**
- `.navbar__toggle { width:48px; height:48px; display:grid; place-items:center }` — **48×48px mínimo de alvo de toque.**
- 3 barras de `24px × 2px`, `gap: 5px`, `background: currentColor`, `border-radius: 2px`.
- `[aria-expanded="true"]`: barra 1 rotaciona `45deg` e translada `+7px`; barra 2 vira `opacity:0; scaleX(.4)`; barra 3 rotaciona `-45deg` e translada `-7px`. Duração `260ms`, easing `cubic-bezier(.4,0,.2,1)`.
- **Drawer:** `.navbar__nav` vira `position: fixed; inset: 0 0 0 auto; width: min(88vw,400px); transform: translateX(100%)` → `translateX(0)` com `320ms cubic-bezier(.32,.72,0,1)`. Backdrop `rgba(8,26,16,.55)` com `opacity 0→1` em `240ms`.
- **Scroll lock:** `body.is-menu-open { overflow: hidden; }` + compensar scrollbar com `padding-right: var(--scrollbar-width)`.
- **Focus trap:** ao abrir, mover foco para o primeiro link; `Esc` fecha e devolve foco ao toggle; `Tab` circula dentro do drawer.
- **Fecha automaticamente** ao clicar em qualquer link ou ao redimensionar para ≥1024px.

---

### 7.2 Botões

**Base**
```html
<button class="btn btn--primary" type="button">Inscreva-se no Vestibulinho</button>
<a class="btn btn--accent" href="#vestibulinho">Inscreva-se<span class="btn__icon" aria-hidden="true"><svg>…</svg></span></a>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  min-height: 48px;              /* 48px = alvo de toque confortável */
  padding: 14px var(--sp-6);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: var(--fw-semibold);
  line-height: 1.2;
  letter-spacing: 0.005em;
  text-decoration: none;
  cursor: pointer;
  transition: background-color .18s ease, border-color .18s ease,
              color .18s ease, box-shadow .22s ease, transform .12s ease;
  -webkit-tap-highlight-color: transparent;
}
```

**Variante `btn--primary`** (verde — ação principal neutra)

| Estado | Estilo |
|---|---|
| Default | `background: var(--c-green-600); color: #ffffff; border-color: var(--c-green-600); box-shadow: var(--shadow-sm)` |
| Hover | `background: var(--c-green-700); border-color: var(--c-green-700); box-shadow: var(--shadow-lg); transform: translateY(-2px)` |
| Active | `background: var(--c-green-800); transform: translateY(0) scale(.98); box-shadow: var(--shadow-xs); transition-duration: 60ms` |
| Focus-visible | `outline: 3px solid var(--focus-ring-inverse); outline-offset: 2px` |
| Disabled | `background: var(--c-neutral-200); color: var(--c-neutral-400); border-color: transparent; cursor: not-allowed; box-shadow: none; transform: none; pointer-events: none` |
| Loading | `color: transparent; pointer-events: none;` + `::after` spinner: `16px` círculo, `border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: spin .7s linear infinite`; manter `aria-busy="true"` e `aria-live="polite"` no texto |

**Variante `btn--accent`** (dourado — CTA de conversão). **Texto sempre `#18201c`, nunca branco.**

| Estado | Estilo |
|---|---|
| Default | `background: var(--c-gold-500); color: var(--text-on-accent); border-color: var(--c-gold-500); box-shadow: var(--shadow-gold)` |
| Hover | `background: var(--c-gold-400); border-color: var(--c-gold-400); transform: translateY(-2px); box-shadow: 0 16px 32px rgba(138,84,16,.26)` |
| Active | `background: var(--c-gold-600); color: #ffffff; transform: translateY(0) scale(.98)` |
| Focus-visible | `outline: 3px solid var(--focus-ring); outline-offset: 3px` |
| Disabled | `background: var(--c-neutral-200); color: var(--c-neutral-400)` |

**Variante `btn--secondary`** (contorno verde)

| Estado | Estilo |
|---|---|
| Default | `background: transparent; color: var(--text-brand); border-color: var(--c-green-600)` |
| Hover | `background: var(--c-green-50); border-color: var(--c-green-700); transform: translateY(-2px)` |
| Active | `background: var(--c-green-100); transform: translateY(0)` |
| Focus-visible | `outline: 3px solid var(--focus-ring); outline-offset: 2px` |
| Disabled | `color: var(--c-neutral-400); border-color: var(--c-neutral-300); background: transparent` |

**Variante `btn--ghost-light`** (sobre fundo escuro/foto)

| Estado | Estilo |
|---|---|
| Default | `background: rgba(247,249,247,.10); color: #f7f9f7; border-color: rgba(247,249,247,.42); backdrop-filter: blur(6px)` |
| Hover | `background: rgba(247,249,247,.20); border-color: rgba(247,249,247,.80); transform: translateY(-2px)` |
| Active | `background: rgba(247,249,247,.30); transform: translateY(0)` |
| Focus-visible | `outline: 3px solid var(--focus-ring-inverse); outline-offset: 2px` |

**Modificadores**
- `.btn--sm { min-height: 40px; padding: 10px var(--sp-5); font-size: 15px; border-radius: var(--radius-sm) }` — **nunca usar em CTA principal no mobile.**
- `.btn--lg { min-height: 56px; padding: 16px var(--sp-8); font-size: 17px }`
- `.btn--block { width: 100%; }` — automático em `<640px` para os CTAs de hero e CTA-final.
- `.btn__icon` — `display:inline-flex; width:20px; height:20px; flex-shrink:0; transition: transform .2s cubic-bezier(.4,0,.2,1)`. No `:hover` do pai: `transform: translateX(4px)`.

**Microinteração de clique:** `ripple` é opcional e **não recomendado** (custo/benefício ruim em vanilla). Usar apenas o `translateY(-2px)` no hover e o `scale(.98)` no active.

---

### 7.3 `course-card`

```html
<article class="course-card">
  <div class="course-card__media">
    <img src="…" alt="…" width="800" height="450" loading="lazy" decoding="async">
    <span class="course-card__badge course-card__badge--type">Técnico</span>
    <span class="course-card__badge course-card__badge--duration">3 anos</span>
  </div>
  <div class="course-card__body">
    <h3 class="course-card__title">Agropecuária</h3>
    <p class="course-card__desc">…</p>
    <ul class="course-card__list">
      <li class="course-card__item">…</li>
    </ul>
    <a class="course-card__link" href="cursos.html#agropecuaria">
      Saiba mais <span class="course-card__arrow" aria-hidden="true">→</span>
    </a>
  </div>
</article>
```

| Parte | Estilo |
|---|---|
| `.course-card` | `background: var(--bg-elevated); border: 1px solid var(--border-default); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s, border-color .3s` |
| `.course-card:hover` | `transform: translateY(-6px); box-shadow: var(--shadow-xl); border-color: var(--c-green-300)` |
| `.course-card:focus-within` | `border-color: var(--c-green-600); box-shadow: var(--shadow-lg), var(--shadow-focus)` |
| `.course-card--featured` | `transform: translateY(-8px)` permanente (só ≥1280px); `border-color: var(--c-gold-500); box-shadow: var(--shadow-lg)`. No hover: `translateY(-14px)` |
| `.course-card__media` | `position: relative; aspect-ratio: 16/9; overflow: hidden; background: var(--bg-sunken)` |
| `.course-card__media img` | `width:100%; height:100%; object-fit: cover; transition: transform .5s cubic-bezier(.4,0,.2,1)`. No hover do card: `transform: scale(1.06)` |
| `.course-card__badge` | `position:absolute; top: var(--sp-3); padding: 6px 12px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; backdrop-filter: blur(8px)` |
| `--type` | `left: var(--sp-3); background: rgba(15,46,29,.82); color: #f7f9f7; border: 1px solid rgba(247,249,247,.22)` |
| `--duration` | `right: var(--sp-3); background: var(--c-gold-300); color: #18201c` |
| `.course-card__body` | `padding: var(--sp-6); display:flex; flex-direction:column; gap: var(--sp-3); flex:1` |
| `.course-card__title` | `font-family: var(--font-display); font-size: var(--fs-h3); font-weight: 600; letter-spacing: var(--ls-heading); color: var(--text-primary)` |
| `.course-card__desc` | `font-size: var(--fs-body-sm); line-height: 1.6; color: var(--text-secondary)` |
| `.course-card__list` | `list-style:none; display:flex; flex-direction:column; gap: var(--sp-2); margin-top: var(--sp-2)` |
| `.course-card__item` | `display:flex; gap: var(--sp-2); font-size: var(--fs-body-sm); color: var(--text-secondary); padding-left: 26px; position: relative`. `::before` = check dourado `content:"✓"; position:absolute; left:0; color: var(--c-gold-600); font-weight:700` |
| `.course-card__link` | `margin-top: auto; padding-top: var(--sp-4); border-top: 1px solid var(--border-subtle); font-weight: 600; font-size: 15px; color: var(--text-brand); display:inline-flex; align-items:center; gap: var(--sp-2); min-height: 44px` |
| `.course-card__arrow` | `transition: transform .2s ease`. No hover: `transform: translateX(4px)` |

**Desabilitado / indisponível:** `.course-card--disabled { opacity: .55; filter: grayscale(.6); pointer-events: none }` + badge `--type` trocado por "Em breve".

---

### 7.4 `stat` (card de número com contador)

```html
<div class="stat">
  <span class="stat__number" data-count-to="1200" data-count-duration="1600">0</span>
  <span class="stat__label">alunos matriculados</span>
  <span class="stat__hint">no ensino médio integrado</span>
</div>
```

| Parte | Estilo |
|---|---|
| `.stat` | `display:flex; flex-direction:column; gap: var(--sp-1); text-align:center; padding-block: var(--sp-2)` |
| `.stat__number` | `font-family: var(--font-display); font-weight: 700; font-size: clamp(3rem, 1.5rem + 5vw, 5rem); line-height: 1; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; color: var(--c-gold-300)` (sobre verde escuro) |
| `.stat__label` | `font-size: var(--fs-h5); font-weight: 600; color: var(--text-inverse); line-height: 1.28` |
| `.stat__hint` | `font-size: var(--fs-body-sm); color: rgba(247,249,247,.72); max-width: 24ch; margin-inline: auto` |
| `.stat + .stat` (desktop) | `border-left: 1px solid rgba(236,194,92,.25); padding-left: var(--gap-grid)` |

**Microinteração — contador:** ver seção 9.2. Estado final do número é sempre o valor real no HTML após a primeira execução (`textContent` reescrito), para não quebrar com `Ctrl+F` nem com leitor de tela.

---

### 7.5 `accordion` (FAQ)

```html
<div class="accordion" data-accordion>
  <div class="accordion__item">
    <h3 class="accordion__heading">
      <button class="accordion__trigger" type="button"
              aria-expanded="false" aria-controls="faq-1" id="faq-1-btn">
        <span>A ETEC é gratuita?</span>
        <span class="accordion__icon" aria-hidden="true"></span>
      </button>
    </h3>
    <div class="accordion__panel" id="faq-1" role="region" aria-labelledby="faq-1-btn" hidden>
      <p>…</p>
    </div>
  </div>
</div>
```

| Parte | Estilo |
|---|---|
| `.accordion` | `border-top: 1px solid var(--border-subtle)` |
| `.accordion__item` | `border-bottom: 1px solid var(--border-subtle)` |
| `.accordion__heading` | `margin: 0; font-size: inherit` |
| `.accordion__trigger` | `width:100%; display:flex; align-items:center; justify-content:space-between; gap: var(--sp-4); padding: var(--sp-5) var(--sp-2); min-height: 64px; text-align:left; background: transparent; border: 0; cursor: pointer; font-family: var(--font-display); font-size: var(--fs-h4); font-weight: 500; letter-spacing: -0.01em; color: var(--text-primary); transition: color .18s ease, background-color .18s ease` |
| `.accordion__trigger:hover` | `color: var(--text-brand); background: var(--bg-brand-soft)` |
| `.accordion__trigger:active` | `background: var(--c-green-100)` |
| `.accordion__trigger:focus-visible` | `outline: 3px solid var(--focus-ring); outline-offset: -3px; border-radius: var(--radius-sm)` |
| `.accordion__trigger[aria-expanded="true"]` | `color: var(--text-brand)` |
| `.accordion__icon` | `position: relative; width: 24px; height: 24px; flex-shrink:0`. Barras via `::before`/`::after`: `position:absolute; top:50%; left:50%; width:14px; height:2px; background: var(--c-gold-600); border-radius:2px; transform: translate(-50%,-50%)`. `::after` recebe `rotate(90deg)` no estado fechado |
| `[aria-expanded="true"] .accordion__icon::after` | `transform: translate(-50%,-50%) rotate(0deg); opacity: 0` — vira "menos" |
| `.accordion__panel` | `overflow: hidden; padding: 0 var(--sp-2) var(--sp-6); color: var(--text-secondary); font-size: var(--fs-body)` |
| `.accordion__panel[hidden]` | `display: none` |

**Microinteração de abertura (altura real, sem `max-height` chumbado):**
```js
panel.hidden = false;
const h = panel.scrollHeight;
panel.animate(
  [{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }],
  { duration: 320, easing: 'cubic-bezier(.4,0,.2,1)' }
).onfinish = () => { panel.style.height = ''; };
```
Com `prefers-reduced-motion: reduce`, trocar por `panel.hidden = false` direto, sem `animate`.

**Comportamento:** apenas **1 item aberto por vez** (`data-accordion` com `data-single="true"`). O primeiro item já vem aberto por padrão (`aria-expanded="true"`, `hidden` removido) para mostrar que é interativo.

---

### 7.6 `carousel` (depoimentos)

```html
<div class="carousel" data-carousel aria-roledescription="carrossel" aria-label="Depoimentos de egressos">
  <div class="carousel__viewport" id="depoimentos-track">
    <article class="testimonial" role="group" aria-roledescription="slide" aria-label="1 de 4">…</article>
    …
  </div>
  <div class="carousel__controls">
    <button class="carousel__btn carousel__btn--prev" type="button" aria-label="Depoimento anterior">‹</button>
    <div class="carousel__dots" role="tablist" aria-label="Escolher depoimento">…</div>
    <button class="carousel__btn carousel__btn--next" type="button" aria-label="Próximo depoimento">›</button>
  </div>
</div>
```

| Parte | Estilo |
|---|---|
| `.carousel__viewport` | `display:flex; gap: var(--gap-grid); overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; -ms-overflow-style:none; scrollbar-width:none` + `::-webkit-scrollbar { display:none }`. **Não usar `transform: translateX`** — usar scroll nativo, que funciona com swipe e teclado de graça |
| `.carousel__viewport > *` | `flex: 0 0 100%; scroll-snap-align: center` (mobile) / `flex: 0 0 min(720px, 78%)` (≥1024px) |
| `.carousel__btn` | `width:48px; height:48px; border-radius: var(--radius-circle); background: var(--bg-elevated); border: 1px solid var(--border-default); box-shadow: var(--shadow-sm); display:grid; place-items:center; font-size:20px; color: var(--text-primary); cursor:pointer; transition: background-color .18s, transform .12s, box-shadow .2s` |
| `.carousel__btn:hover` | `background: var(--c-green-50); box-shadow: var(--shadow-md); transform: scale(1.06)` |
| `.carousel__btn:active` | `transform: scale(.94)` |
| `.carousel__btn:focus-visible` | `outline: 3px solid var(--focus-ring); outline-offset: 2px` |
| `.carousel__btn[disabled]` | `opacity: .38; cursor: not-allowed; pointer-events: none` (nas extremidades, com `loop` desligado) |
| `.carousel__dots` | `display:flex; gap: var(--sp-2); justify-content:center; margin-top: var(--sp-6)` |
| `.carousel__dot` | `width:10px; height:10px; border-radius: var(--radius-circle); background: var(--c-neutral-300); border:0; padding:0; cursor:pointer; transition: background-color .22s, width .28s cubic-bezier(.4,0,.2,1)` — **área de toque ampliada** para 44×44px com `::after { position:absolute; inset:-17px; content:'' }` |
| `.carousel__dot[aria-selected="true"]` | `background: var(--c-gold-500); width: 28px; border-radius: var(--radius-pill)` |
| `.carousel__dot:focus-visible` | `outline: 3px solid var(--focus-ring); outline-offset: 3px` |

**Interações:** `scroll-snap` + `scrollend`/debounce para recalcular o dot ativo; setas ← → quando o carrossel tem foco; swipe nativo; autoplay **proibido** (WCAG 2.2.2). Navegação por dots usa `scrollTo({ left, behavior: 'smooth' })` e respeita `prefers-reduced-motion` (troca para `behavior: 'auto'`).

---

### 7.7 `gallery` + `lightbox` (modal de imagem)

```html
<div class="gallery" data-gallery>
  <button class="gallery__item gallery__item--wide" type="button"
          data-lightbox-src="…/foto-1.jpg" data-lightbox-caption="Viveiro de mudas">
    <img src="…" alt="Viveiro de mudas da ETEC" width="1200" height="800" loading="lazy" decoding="async">
    <span class="gallery__caption">Viveiro de mudas</span>
  </button>
</div>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Galeria de fotos" hidden>
  <div class="lightbox__backdrop" data-lightbox-close></div>
  <figure class="lightbox__figure">
    <img class="lightbox__img" alt="">
    <figcaption class="lightbox__caption"></figcaption>
  </figure>
  <button class="lightbox__close" type="button" aria-label="Fechar galeria" data-lightbox-close>✕</button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Foto anterior">‹</button>
  <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Próxima foto">›</button>
</div>
```

| Parte | Estilo |
|---|---|
| `.gallery` | `display:grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-3)`. ≥768px: 12 colunas com `grid-template-areas` do mosaico 6/3/3 |
| `.gallery__item` | `position: relative; overflow: hidden; border: 0; padding: 0; cursor: zoom-in; border-radius: var(--radius-lg); background: var(--bg-sunken); display: block; aspect-ratio: 4/3` |
| `.gallery__item img` | `width:100%; height:100%; object-fit:cover; transition: transform .6s cubic-bezier(.4,0,.2,1), filter .3s` |
| `.gallery__item:hover img` | `transform: scale(1.05)` |
| `.gallery__item:focus-visible` | `outline: 3px solid var(--focus-ring-inverse); outline-offset: 3px` |
| `.gallery__caption` | `position:absolute; inset: auto 0 0 0; padding: var(--sp-4); background: linear-gradient(to top, rgba(8,26,16,.88), transparent); color: #f7f9f7; font-size: var(--fs-body-sm); font-weight: 600; text-align:left; opacity: 0; transform: translateY(8px); transition: opacity .28s, transform .28s` |
| `.gallery__item:hover .gallery__caption`, `:focus-visible` | `opacity: 1; transform: translateY(0)` |
| `.lightbox` | `position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; padding: var(--sp-4)` |
| `.lightbox__backdrop` | `position:absolute; inset:0; background: rgba(8,26,16,.92); backdrop-filter: blur(8px)` |
| `.lightbox__img` | `max-width: min(92vw, 1200px); max-height: 82vh; object-fit: contain; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); animation: lightbox-in .3s cubic-bezier(.4,0,.2,1)` |
| `.lightbox__close` | `position:absolute; top: var(--sp-4); right: var(--sp-4); width:48px; height:48px; border-radius: var(--radius-circle); background: rgba(247,249,247,.12); border:1px solid rgba(247,249,247,.3); color:#f7f9f7` |
| `.lightbox__nav` | `position:absolute; top:50%; transform: translateY(-50%); width:52px; height:52px` (mesmo tratamento do close) |

**Comportamento e acessibilidade do modal:**
- Abrir: `hidden` removido, `body.is-modal-open { overflow: hidden }`, foco vai para `.lightbox__close`, `inert` (ou `aria-hidden="true"`) aplicado no `<main>` e no `<footer>`.
- Fechar: clique no backdrop, `Esc`, botão ✕. Foco **devolvido ao `.gallery__item` que abriu**.
- Focus trap circular dentro do modal. `←`/`→` navegam entre fotos, `Home`/`End` vão à primeira/última.
- Pré-carregar as imagens vizinhas com `new Image()` ao abrir.
- Alternativa textual: cada `<img>` do modal herda o `alt` do thumbnail; a `figcaption` vem de `data-lightbox-caption`.

---

### 7.8 `form` (contato) — com estados de erro e sucesso

```html
<form class="form" id="contact-form" novalidate>
  <div class="form__field">
    <label class="form__label" for="nome">Nome completo <span class="form__required" aria-hidden="true">*</span></label>
    <input class="form__input" id="nome" name="nome" type="text"
           autocomplete="name" required aria-required="true"
           aria-describedby="nome-error">
    <p class="form__error" id="nome-error" role="alert" hidden></p>
  </div>

  <div class="form__field">
    <label class="form__label" for="email">E-mail <span class="form__required" aria-hidden="true">*</span></label>
    <input class="form__input" id="email" name="email" type="email"
           autocomplete="email" required aria-required="true"
           aria-describedby="email-hint email-error">
    <p class="form__hint" id="email-hint">Usaremos apenas para responder você.</p>
    <p class="form__error" id="email-error" role="alert" hidden></p>
  </div>

  <div class="form__field">
    <label class="form__label" for="assunto">Assunto</label>
    <select class="form__input form__select" id="assunto" name="assunto">
      <option value="vestibulinho">Vestibulinho e matrícula</option>
      <option value="parceria">Parceria, estágio ou empresa</option>
      <option value="visita">Agendar visita à escola</option>
      <option value="outro">Outro assunto</option>
    </select>
  </div>

  <div class="form__field">
    <label class="form__label" for="mensagem">Mensagem <span class="form__required" aria-hidden="true">*</span></label>
    <textarea class="form__input form__textarea" id="mensagem" name="mensagem"
              rows="5" required aria-required="true" aria-describedby="mensagem-error"></textarea>
    <p class="form__error" id="mensagem-error" role="alert" hidden></p>
  </div>

  <button class="btn btn--primary btn--block" type="submit" id="form-submit">Enviar mensagem</button>

  <p class="form__status form__status--success" role="status" hidden>
    Mensagem enviada! Responderemos em até 2 dias úteis.
  </p>
  <p class="form__status form__status--error" role="alert" hidden>
    Não foi possível enviar. Verifique os campos destacados.
  </p>
</form>
```

| Parte | Estilo |
|---|---|
| `.form` | `display:flex; flex-direction:column; gap: var(--sp-5); max-width: 620px` |
| `.form__field` | `display:flex; flex-direction:column; gap: var(--sp-2)` |
| `.form__label` | `font-size: var(--fs-body-sm); font-weight: 600; color: var(--text-primary)` |
| `.form__required` | `color: var(--c-danger-500)` |
| `.form__input` | `width:100%; min-height: 48px; padding: 12px var(--sp-4); background: var(--bg-surface); color: var(--text-primary); border: 1.5px solid var(--border-strong); border-radius: var(--radius-sm); font-family: var(--font-body); font-size: 16px` (**16px evita zoom automático no iOS**); `transition: border-color .18s, box-shadow .18s, background-color .18s` |
| `.form__input::placeholder` | `color: var(--text-muted)` |
| `.form__input:hover` | `border-color: var(--c-green-600)` |
| `.form__input:focus` | `outline: none; border-color: var(--c-green-600); box-shadow: var(--shadow-focus)` |
| `.form__input:focus-visible` | `outline: 3px solid var(--focus-ring); outline-offset: 2px` |
| `.form__input[aria-invalid="true"]` | `border-color: var(--c-danger-500); background: var(--c-danger-50)` |
| `.form__input:disabled` | `background: var(--c-neutral-100); color: var(--text-disabled); cursor: not-allowed; border-color: var(--border-default)` |
| `.form__textarea` | `min-height: 140px; resize: vertical; line-height: 1.6` |
| `.form__select` | `appearance: none` + seta SVG inline como `background-image` com `background-position: right 14px center`, `padding-right: 44px` |
| `.form__hint` | `font-size: var(--fs-caption); color: var(--text-secondary)` |
| `.form__error` | `font-size: var(--fs-body-sm); font-weight: 500; color: var(--c-danger-700); display:flex; gap: 6px; align-items:flex-start` + ícone `⚠` via `::before`. Entrada: `animation: shake .3s` |
| `.form__status--success` | `background: var(--c-success-50); border-left: 4px solid var(--c-success-700); color: var(--c-success-700); padding: var(--sp-4); border-radius: var(--radius-sm); font-weight: 500` |
| `.form__status--error` | análogo com `--c-danger-*` |

**Microinterações e validação**
1. **Validação no `blur`** (não a cada tecla) e **revalidação no `input`** apenas se o campo já estiver marcado como inválido. Nunca validar no primeiro `input`.
2. Ao falhar: `aria-invalid="true"`, texto do erro com `role="alert"`, foco vai para o **primeiro campo inválido**, `animation: shake .3s cubic-bezier(.36,.07,.19,.97)` (8px de amplitude, 2 ciclos).
3. Ao corrigir: erro some com `opacity` + `height` em `200ms`; `aria-invalid` removido.
4. **Botão de envio:** entra em `is-loading` (`aria-busy="true"`, texto oculto, spinner branco visível), `pointer-events: none`.
5. **Sucesso:** esconde o formulário com fade `260ms`, exibe `.form__status--success`, move o foco para ele. Campos são limpos.
6. **Fallback `file://`:** como não há backend, o `submit` faz `preventDefault()`, valida, e:
   - se o `form` tiver `action` de serviço externo (Formspree/Netlify), faz `fetch` normal com `try/catch`;
   - em `file://` (`location.protocol === 'file:'`), monta um `mailto:` com os campos e dispara `window.location.href = mailto`, exibindo a mensagem de sucesso adaptada: *"Abrimos seu aplicativo de e-mail com a mensagem preenchida."*
7. **`prefers-reduced-motion`:** sem `shake`, sem fade — troca instantânea.

---

### 7.9 `footer`

```html
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">…</div>
    <nav class="footer__col" aria-label="Navegação do rodapé">…</nav>
    <nav class="footer__col" aria-label="Cursos">…</nav>
    <div class="footer__col footer__col--contact">…</div>
  </div>
  <div class="container footer__bottom">
    <p class="footer__legal">© 2026 ETEC Eng. Agrônomo Narciso de Medeiros · Centro Paula Souza</p>
    <ul class="footer__legal-links">…</ul>
  </div>
</footer>
```

| Parte | Estilo |
|---|---|
| `.footer` | `background: var(--bg-inverse); color: rgba(247,249,247,.78); padding-block: var(--sp-16) var(--sp-8)` |
| `.footer__inner` | `display:grid; grid-template-columns: 1fr; gap: var(--sp-10)`. ≥768px: `repeat(2, 1fr)`. ≥1024px: `1.4fr 1fr 1fr 1.2fr` |
| `.footer__col-title` | `font-size: var(--fs-caption); font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--c-gold-300); margin-bottom: var(--sp-4)` |
| `.footer__link` | `color: rgba(247,249,247,.78); font-size: 15px; line-height: 2; min-height: 44px; display: inline-flex; align-items: center; transition: color .18s ease` |
| `.footer__link:hover` | `color: var(--c-gold-300)`; sublinhado animado com `background-size` 0%→100% |
| `.footer__link:focus-visible` | `outline: 3px solid var(--focus-ring-inverse); outline-offset: 2px; border-radius: var(--radius-xs)` |
| `.footer__bottom` | `margin-top: var(--sp-12); padding-top: var(--sp-6); border-top: 1px solid rgba(247,249,247,.16); display:flex; flex-wrap:wrap; gap: var(--sp-4); justify-content:space-between; font-size: var(--fs-caption)` |
| `.footer__social` | links de 44×44px com ícone SVG inline 20px |
| `.footer__badge` (selo CPS) | caixa com `border: 1px solid rgba(247,249,247,.22); border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4)` |

---

### 7.10 Componentes auxiliares

| Componente | Especificação resumida |
|---|---|
| `.badge` | `display:inline-flex; padding: 6px 12px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase`. Variantes: `--brand` (`bg: var(--c-green-100); color: #143f26` = 7.48:1), `--accent` (`bg: var(--c-gold-200); color: #18201c` = 11.93:1), `--earth`, `--outline` |
| `.section-header` | `display:flex; flex-direction:column; gap: var(--sp-4); max-width: 68ch; margin-bottom: var(--sp-12)`. Centrado por padrão; `.section-header--start` alinha à esquerda |
| `.overline` | `font-size: var(--fs-overline); font-weight: 700; letter-spacing: var(--ls-overline); text-transform: uppercase; color: var(--text-accent)` + filete `::before` de 32px × 2px dourado |
| `.timeline` | Mobile: `border-left: 2px solid var(--c-gold-300); padding-left: var(--sp-6)`, marcadores numerados de 44px. Desktop: `display:grid; grid-template-columns: repeat(4,1fr)` com conector `::after` horizontal de 2px dourado |
| `.skeleton` | `background: linear-gradient(90deg, var(--c-neutral-100) 25%, var(--c-neutral-200) 37%, var(--c-neutral-100) 63%); background-size: 400% 100%; animation: shimmer 1.4s ease infinite; border-radius: var(--radius-sm)` — desativado em `prefers-reduced-motion` |
| `.empty-state` | Bloco centrado com ícone 48px `--c-neutral-400`, `h3` e CTA secundário. Usado quando um filtro de cursos não retorna resultado |
| `.skip-link` | `position:absolute; top:-100px; left:var(--sp-4); z-index:300; background: var(--c-gold-500); color:#18201c; padding: 12px 20px; border-radius: 0 0 var(--radius-sm) var(--radius-sm)`. `:focus { top: 0 }` |

---

## 8. Diretrizes de imagens

### 8.1 Regras gerais

- **Formato de entrega:** usar as URLs do Unsplash durante o desenvolvimento. Na entrega final, o front-end deve baixar os arquivos para `assets/img/` e servir em **AVIF + WebP** com fallback `<picture>`. Manter as URLs remotas só como comentário no HTML.
- **Todas as `<img>`** precisam de `width`, `height`, `alt`, `loading="lazy"` e `decoding="async"` — exceto a **imagem do hero**, que leva `loading="eager"`, `fetchpriority="high"` e **não** leva `loading="lazy"`.
- **`alt`:** descritivo e funcional. Nunca "imagem de", nunca repetir a legenda. Se a imagem for puramente decorativa, `alt=""`.
- **`sizes`** obrigatório junto com `srcset` quando houver mais de um candidato.
- **Tratamento tonal:** todas as fotos passam por `filter: saturate(0.92) contrast(1.04)` para unificar a temperatura com a paleta verde. Imagens sobre fundo verde escuro recebem overlay `linear-gradient(rgba(15,46,29,.62), rgba(15,46,29,.78))`.
- **Retratos do patrono:** aplicar `filter: sepia(0.45) contrast(1.05)` para leitura de documento histórico.
- **Fotos de pessoas:** usar apenas imagens com pessoas em contexto de trabalho/estudo, nunca banco de imagem "sorriso de terno".

### 8.2 Slots de imagem — URLs validadas (HTTP 200)

Todas as URLs abaixo foram testadas com `curl -sI -o /dev/null -w "%{http_code}"` e retornaram **200**. Formato completo: `https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1600&q=80`.

| # | Slot | ID validado | Composição e tom desejados |
|---|---|---|---|
| 1 | **Hero** (`#hero`) | `photo-1500382017468-9049fed747ef` | Campo aberto em luz dourada de fim de tarde, horizonte alto, muito espaço negativo no terço superior esquerdo para o texto. Tom quente, terroso. `w=1920&h=1280&fit=crop` |
| 2 | **Sobre — imagem principal** | `photo-1574943320219-553eb213f72d` | Paisagem rural com vegetação densa e área cultivada; leitura de "Vale do Ribeira". Formato 4:5 retrato no desktop. |
| 3 | **Sobre — retrato do patrono** | `photo-1500648767791-00dcc994a43e` | Retrato masculino em meio-corpo, olhar fora de câmera, tratamento sépia. **Substituir por foto de arquivo real de Narciso de Medeiros antes da entrega final** — este é apenas o placeholder visual. |
| 4 | **Curso — Agropecuária** | `photo-1592982537447-7440770cbfc9` | Maquinário agrícola em operação em área de cultivo, luz natural, tom verde-terra. 16:9. |
| 5 | **Curso — Aquicultura e Pesca** | `photo-1544551763-46a013bb70d5` | Ambiente aquático com peixes em tanque/viveiro, água verde-azulada, boa profundidade de campo. 16:9. |
| 6 | **Curso — Meio Ambiente** | `photo-1441974231531-c6227db76b6e` | Interior de mata com raios de luz atravessando a copa; transmite Mata Atlântica preservada. 16:9. |
| 7 | **Galeria 1 — viveiro/estufa** | `photo-1583212292454-1fe6229603b7` | Estufa agrícola com mudas em bandejas, luz difusa. 4:3. |
| 8 | **Galeria 2 — mudas** | `photo-1530836369250-ef72a3f5cda8` | Close de mãos segurando muda com torrão de terra. 4:3. |
| 9 | **Galeria 3 — laboratório** | `photo-1579154204601-01588f351e67` | Microscópio em bancada de laboratório, luz lateral. 4:3. |
| 10 | **Galeria 4 — trabalho de campo** | `photo-1580894732444-8ecded7900cd` | Pessoas trabalhando em campo agrícola, plano médio, ação real. 4:3. |
| 11 | **Galeria 5 — barco/pesca** | `photo-1445264718234-a623be589d37` | Embarcação de pesca em água calma, luz de manhã. 4:3. |
| 12 | **Galeria 6 — alunos em grupo** | `photo-1523240795612-9a054b0db644` | Grupo de jovens estudantes em atividade colaborativa, plano médio, diversidade. 4:3. |
| 13 | **Coop-Escola** | `photo-1552664730-d307ca884978` | Reunião de trabalho com jovens em torno de mesa, pranchetas e anotações. 4:3. |
| 14 | **Metodologia (4 ícones)** | — | **Sem imagem.** Ícones SVG inline (ver 8.3). |
| 15 | **Depoimento 1 (avatar)** | `photo-1494790108377-be9c29b29330` | Retrato frontal, plano fechado, fundo neutro desfocado. 1:1, `w=400&h=400`. |
| 16 | **Depoimento 2 (avatar)** | `photo-1507003211169-0a1dd7228f2d` | Idem. 1:1, `w=400&h=400`. |
| 17 | **Depoimento 3 (avatar)** | `photo-1573497019940-1c28c88b4f3e` | Idem. 1:1, `w=400&h=400`. |
| 18 | **Depoimento 4 (avatar)** | `photo-1472099645785-5658abf4ff4e` | Idem. 1:1, `w=400&h=400`. |
| 19 | **Localização — mapa (placeholder estático)** | `photo-1439405326854-014607f694d7` | Vista aérea/panorâmica de água e terra. Usar como poster do mapa enquanto o iframe não carrega. |
| 20 | **CTA final — fundo** | `photo-1470071459604-3b5ec3a7fe05` | Floresta com neblina, camadas de profundidade, baixo contraste (vai receber overlay verde 90%). `w=1920` |
| 21 | **OG image / compartilhamento** | `photo-1500382017468-9049fed747ef` | Mesma do hero, 1200×630. `w=1200&h=630&fit=crop` |
| 22 | **Favicon / logo** | — | SVG próprio (ver 8.4). |

**Total: 20 URLs de imagem validadas com HTTP 200.**

> **Nota de honestidade para o front-end:** todas as 20 URLs foram verificadas por HTTP 200, mas **o conteúdo visual de cada uma não pôde ser inspecionado por este agente**. Antes de fechar a entrega, abra cada imagem no navegador e confirme que a composição corresponde à descrição da tabela. Se alguma não servir, troque por `https://picsum.photos/seed/<slug>/1600/900` (ex.: `https://picsum.photos/seed/etec-hero/1600/900`), que não precisam de validação.

### 8.3 Ícones — SVG inline

Todos os ícones são **SVG inline no HTML ou injetados via JS**, com `stroke="currentColor"`, `stroke-width="1.75"`, `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, viewBox `0 0 24 24`. **Não usar CDN de biblioteca de ícones, não usar sprite externo (bloqueado em `file://`).**

Estratégia recomendada: `assets/js/icons.js` exporta um objeto de strings SVG; o main.js percorre `[data-icon]` e injeta via `innerHTML` no carregamento.

| Uso | Ícone (nome no estilo Lucide) | Tamanho |
|---|---|---|
| Cursos / técnico | `graduation-cap` | 20px (badge), 32px (metodologia) |
| Duração | `calendar-days` | 16px |
| Agropecuária | `sprout` | 32px |
| Aquicultura | `fish` | 32px |
| Meio Ambiente | `leaf` | 32px |
| Aula na fazenda | `tractor` | 32px |
| Viveiro / tanques | `droplets` | 32px |
| Laboratórios | `flask-conical` | 32px |
| Estágio | `briefcase` | 32px |
| Coop-Escola | `users` / `handshake` | 32px |
| Endereço | `map-pin` | 20px |
| Telefone | `phone` | 20px |
| E-mail | `mail` | 20px |
| Horário | `clock` | 20px |
| Sucesso (form) | `check-circle-2` | 20px |
| Erro (form) | `alert-circle` | 20px |
| Alerta (aviso) | `alert-triangle` | 20px |
| Seta de link | `arrow-right` | 20px |
| Seta de carrossel | `chevron-left` / `chevron-right` | 24px |
| Fechar modal | `x` | 24px |
| Zoom / galeria | `maximize-2` | 20px |
| Menu | `menu` (três barras desenhadas em CSS, não SVG) | 24px |
| Instagram / Facebook / YouTube | `instagram`, `facebook`, `youtube` | 20px |
| Documento | `file-text` | 20px |

### 8.4 Logo / wordmark

Criar `assets/img/logo-etec.svg` — **SVG inline no HTML**, não `<img src>`, para permitir troca de cor via `currentColor`.

Composição: à esquerda um símbolo circular de 40px — um broto/folha estilizado em duas folhas desenhado com traço de 2px, dentro de um círculo de `--c-green-700`, com um filete dourado interno. À direita, o texto em duas linhas:
- Linha 1: `ETEC` em Fraunces 700, 20px, `letter-spacing: -0.02em`
- Linha 2: `Eng. Agrônomo Narciso de Medeiros` em Plus Jakarta Sans 500, 11px, `letter-spacing: 0.02em`

Quando a navbar está no topo (sobre o hero), o wordmark usa `currentColor` branco; no estado `.is-scrolled`, `--text-primary`. O círculo mantém `--c-green-700` sempre.

---

## 9. Especificação de animações

### 9.1 Princípios

1. **Animação serve à orientação, não à decoração.** Cada movimento informa algo (entrou na tela, mudou de estado, avançou).
2. **Durações:** micro `120–200ms` · transição `220–320ms` · entrada de seção `500–700ms`. Nada acima de `800ms`.
3. **Easing padrão:** `cubic-bezier(.4, 0, .2, 1)` (ease-out acentuado). Entradas: `cubic-bezier(.16, 1, .3, 1)` (expo-out suave). Saídas: `cubic-bezier(.4, 0, 1, 1)`.
4. **Animar somente `transform` e `opacity`.** Nunca `width`, `height`, `top`, `left`, `margin` em loops. (Exceção: abertura de accordion, que é uma transição única e curta, e a barra de progresso.)
5. **Tudo respeita `prefers-reduced-motion`** — ver 9.7.

```css
:root {
  --ease-standard: cubic-bezier(.4, 0, .2, 1);
  --ease-entrance: cubic-bezier(.16, 1, .3, 1);
  --ease-exit:     cubic-bezier(.4, 0, 1, 1);
  --dur-micro: 140ms;
  --dur-fast:  220ms;
  --dur-base:  320ms;
  --dur-slow:  560ms;
  --dur-reveal: 640ms;
}
```

### 9.2 Entradas por scroll (IntersectionObserver)

**Efeito:** elementos com `[data-reveal]` começam em `opacity: 0; transform: translateY(24px)` e vão para `opacity: 1; transform: none`.

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--dur-reveal) var(--ease-entrance),
              transform var(--dur-reveal) var(--ease-entrance);
  will-change: opacity, transform;
}
[data-reveal].is-revealed {
  opacity: 1;
  transform: none;
}
/* Remove will-change depois de revelar (evita camadas GPU presas) */
[data-reveal].is-revealed { will-change: auto; }
```

**Variantes por atributo:**
| Atributo | Deslocamento inicial |
|---|---|
| `data-reveal="up"` (padrão) | `translateY(24px)` |
| `data-reveal="left"` | `translateX(-32px)` |
| `data-reveal="right"` | `translateX(32px)` |
| `data-reveal="scale"` | `scale(.94)` + `translateY(16px)` |
| `data-reveal="fade"` | apenas `opacity` |

**Escalonamento (stagger):** elementos com `data-reveal-stagger` no container recebem `transition-delay` incremental de **90ms** por índice, limitado a **6 itens** (máximo `540ms` de atraso). Aplicado via `style.transitionDelay` no JS, não em CSS fixo.

**Configuração do observer:**
```js
const io = new IntersectionObserver(callback, {
  rootMargin: '0px 0px -12% 0px',
  threshold: 0.12
});
```
- **Disparo único:** ao revelar, `io.unobserve(el)`. Não reanimar ao rolar para cima (evita "pisca-pisca" e melhora performance).
- **Fallback:** se `!('IntersectionObserver' in window)`, revelar tudo imediatamente no `DOMContentLoaded`.
- **Guard de borda:** revelar imediatamente qualquer elemento cujo `getBoundingClientRect().top < window.innerHeight` no carregamento (conteúdo acima da dobra não deve esperar scroll).

### 9.3 Contadores (`data-count-to`)

**Efeito:** o número sobe de `0` até o valor final com desaceleração.

```js
function animateCount(el) {
  const target = Number(el.dataset.countTo);
  const duration = Number(el.dataset.countDuration || 1600);
  const suffix = el.dataset.countSuffix || '';
  const prefix = el.dataset.countPrefix || '';
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);        // easeOutCubic
    const value = Math.round(target * eased);
    el.textContent = prefix + value.toLocaleString('pt-BR') + suffix;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = prefix + target.toLocaleString('pt-BR') + suffix; // garante exatidão
  }
  requestAnimationFrame(frame);
}
```

- **Duração:** `1600ms` padrão. Números menores usam `1200ms`.
- **Easing:** `easeOutCubic` (`1 - (1-t)³`).
- **Disparo:** via `IntersectionObserver` no `.stat`, `threshold: 0.5`, uma única vez.
- **Acessibilidade:** o `<span>` do número recebe `aria-hidden="true"`; um `<span class="sr-only">` irmão contém o valor final em texto ("1.200 alunos matriculados"). Assim o leitor de tela lê o valor correto sem ouvir o número mudando.
- **`prefers-reduced-motion`:** escrever o valor final direto, sem `requestAnimationFrame`.

### 9.4 Hover e interações de ponteiro

| Elemento | Efeito | Duração | Easing |
|---|---|---|---|
| `.btn` | `translateY(-2px)` + sombra cresce | `220ms` | `--ease-standard` |
| `.btn:active` | `translateY(0) scale(.98)` + sombra encolhe | `60ms` | `linear` |
| `.btn__icon` | `translateX(4px)` | `200ms` | `--ease-standard` |
| `.course-card` | `translateY(-6px)` + `--shadow-xl` | `300ms` | `--ease-standard` |
| `.course-card img` | `scale(1.06)` | `500ms` | `--ease-standard` |
| `.gallery__item img` | `scale(1.05)` + caption `translateY(8px)→0`, `opacity 0→1` | `280ms` / `600ms` | `--ease-standard` |
| `.navbar__link` | `background-color` + filete `scaleX(0→1)` | `180ms` | `ease-out` |
| `.accordion__trigger` | `background-color` + `color` | `180ms` | `--ease-standard` |
| `.carousel__dot[aria-selected="true"]` | `width: 10px → 28px` + cor | `280ms` | `--ease-standard` |
| `.footer__link` | sublinhado `background-size: 0% → 100%` | `220ms` | `ease-out` |
| `.stat` (na seção, hover) | filete dourado `scaleY(0→1)` à esquerda | `240ms` | `--ease-standard` |

**Regra de contenção:** usar `@media (hover: hover) and (pointer: fine)` em todos os `:hover` que mudam layout, para não deixar estado "grudado" no toque em mobile.

### 9.5 Parallax leve

**Aplicar em exatamente 2 lugares**, nunca no site inteiro:

1. **Imagem do hero:** a `<img>` recebe `transform: translate3d(0, calc(var(--scroll-y) * 0.12), 0) scale(1.08)`. Máximo de deslocamento: **60px**. Atualizado via `requestAnimationFrame` com `passive: true` no listener de `scroll`.
2. **Fundo do CTA final:** deslocamento de `0.08` (ainda mais sutil), máximo 40px.

```js
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--scroll-y', String(scrollY));
    ticking = false;
  });
}, { passive: true });
```

- **Desligar** o parallax quando `prefers-reduced-motion: reduce`, em telas `<768px` (custo de bateria/CPU) e quando `navigator.connection?.saveData === true`.
- Aplicar `overflow: clip` no container do hero para o `scale(1.08)` não gerar scroll lateral.
- Não usar parallax em `<img>` com `loading="lazy"` (causa reposicionamento enquanto carrega).

### 9.6 Feedback de estado

| Situação | Animação |
|---|---|
| Botão em loading | spinner `rotate 360°` em `700ms linear infinite`; largura do botão **não muda** (reservar espaço com `min-width`) |
| Erro de validação | `shake`: `translateX(0 → -8px → 8px → -5px → 5px → 0)` em `300ms`, `ease-in-out`, 1 execução. Não repetir em reenvios do mesmo erro |
| Sucesso do formulário | `fade-in + translateY(8px→0)` em `260ms` |
| Abertura de modal/lightbox | `scale(.96) → 1` + `opacity 0 → 1` em `300ms`, `--ease-entrance` |
| Fechamento de modal | `scale(1) → .98` + `opacity 1 → 0` em `180ms`, `--ease-exit`. **Sair é sempre mais rápido que entrar** |
| Backdrop do modal | `opacity 0 → 1` em `240ms` |
| Drawer mobile | `translateX(100%) → 0` em `320ms`, `cubic-bezier(.32,.72,0,1)` (curva de "objeto físico") |
| Skeleton | `shimmer` de `1.4s ease infinite` |

### 9.7 `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1; transform: none; }
  .navbar { transition: none; }
}

/* Parallax e contadores: checar em JS também */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  document.documentElement.style.setProperty('--scroll-y', '0');
}
```

Com `reduce-motion`: contadores escrevem o valor final instantaneamente; o carrossel usa `behavior: 'auto'`; nenhum parallax; nenhum `reveal`; o accordion abre sem `animate`. Estados de hover/focus **permanecem** (são feedback de estado, não decoração).

---

## 10. Checklist de acessibilidade (WCAG 2.1 AA)

### 10.1 Perceptível

- [x] **1.1.1** Toda `<img>` tem `alt` significativo; imagens decorativas com `alt=""`; padrões `aria-hidden="true"`.
- [x] **1.2.2 / 1.2.5** Se houver vídeo institucional: `<track kind="captions">` em pt-BR e transcrição textual completa abaixo do player.
- [x] **1.3.1** HTML semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Apenas um `<main id="main">` e um `<h1>`.
- [x] **1.3.2** Ordem de leitura do DOM = ordem visual. Nenhum `order` do flex/grid invertendo conteúdo.
- [x] **1.3.5** Campos com `autocomplete` correto (`name`, `email`, `tel`).
- [x] **1.4.1** **Cor nunca é o único indicador.** Erro de formulário = borda vermelha **+** ícone **+** texto. Item ativo do carrossel = cor **+** largura **+** `aria-selected`.
- [x] **1.4.3** Todos os pares texto/fundo ≥ 4.5:1 (calculados na seção 2.7). `--text-muted` **proibido em corpo de texto**.
- [x] **1.4.4** Texto redimensionável até 200% sem perda de conteúdo: usar `rem`/`clamp()`, nunca `px` fixo em containers de texto.
- [x] **1.4.5** Layout não depende de imagem de texto (wordmark existe como SVG com texto real dentro).
- [x] **1.4.10** Reflow a 320px de largura sem scroll horizontal, exceto em conteúdo com scroll próprio (galeria/carrossel).
- [x] **1.4.11** Componentes de UI e indicadores ≥ 3:1: borda de input `#6f7d75` (4.32:1 sobre branco, 4.35:1 sobre `#0d1310`); focus ring `#1b5432` (8.90:1) / `#ecc25c` (11.13:1).
- [x] **1.4.12** `line-height ≥ 1.5` em corpo de texto; espaçamento entre parágrafos ≥ 2× o tamanho da fonte.
- [x] **1.4.13** Nenhum conteúdo depende de hover: as legendas da galeria também aparecem no `:focus-visible`.
- [x] **1.4.3 modo escuro** Todos os pares dark mode validados (seção 2.7), mínimo 5.31:1.

### 10.2 Operável

- [x] **2.1.1** Tudo acessível por teclado. Nenhum `onclick` em `<div>`: usar `<button>` e `<a>`.
- [x] **2.1.2** Nenhuma armadilha de foco. O modal e o drawer prendem o foco **deliberadamente**, e `Esc` sempre libera.
- [x] **2.2.2** **Nenhum carrossel com autoplay.** Nenhum conteúdo que pisca. O spinner de loading é permitido (é feedback de ação com duração < 5s).
- [x] **2.3.1** Nenhum flash acima de 3 Hz. Nenhuma animação estroboscópica.
- [x] **2.4.1** `skip-link` "Pular para o conteúdo" é o primeiro elemento focável.
- [x] **2.4.2** `<title>` único e descritivo em cada página.
- [x] **2.4.3** Ordem de foco segue a ordem visual. No drawer mobile, o toggle vem **depois** dos links no DOM mas tem `order` visual correto sem alterar a ordem de tabulação final.
- [x] **2.4.4** Texto de link compreensível fora de contexto. Nunca "clique aqui" ou "saiba mais" solto — usar `Saiba mais sobre Agropecuária` com `<span class="sr-only">` para a parte estendida.
- [x] **2.4.6** Headings e labels descritivos.
- [x] **2.4.7** **Foco visível em 100% dos elementos focáveis:** `outline: 3px solid var(--focus-ring); outline-offset: 2px`. Nunca `outline: none` sem substituto.
- [x] **2.5.1** Nenhum gesto multiponto (sem pinch, sem swipe de dois dedos).
- [x] **2.5.2** Ações disparam no `pointerup`/`click`, não no `pointerdown`.
- [x] **2.5.3** Em modo de acessibilidade, o drawer mobile e o accordion não usam `drag` como única forma.
- [x] **2.5.5** **Alvos de toque ≥ 44×44px** em mobile: botões (48px min-height), `.navbar__toggle` (48px), `.carousel__dot` (10px visual, 44px de área real), links de footer (44px), itens do drawer (56px).
- [x] **2.5.4** Nenhum conteúdo depende de movimento do dispositivo.

### 10.3 Compreensível

- [x] **3.1.1** `lang="pt-BR"` no `<html>`.
- [x] **3.2.1** Nenhuma mudança de contexto no `focus`. Âncoras rolam, não abrem modal.
- [x] **3.2.2** Nenhum campo de formulário envia no `change`.
- [x] **3.2.3** Navegação idêntica em todas as páginas.
- [x] **3.3.1** Erros identificam o campo (`id` referenciado em `aria-describedby`) e descrevem a correção ("Informe um e-mail válido, ex.: nome@dominio.com").
- [x] **3.3.2** Labels e instruções presentes. `<label for>` sempre explícito — **nunca placeholder como label**.
- [x] **3.3.3** Sugestão de correção em erros de formato.
- [x] **3.3.4** Se houver envio financeiro ou jurídico: confirmação reversível. **Não se aplica** (o formulário é apenas contato).

### 10.4 Robusto

- [x] **4.1.1** HTML válido. Sem `id` duplicado. Rodar validador W3C.
- [x] **4.1.2** Componentes com nome, papel e valor: `aria-expanded` no accordion e no menu; `aria-selected` nos dots; `aria-current="page"` no link ativo; `aria-invalid` nos campos.
- [x] **4.1.3** Mensagens de status com `role="status"` (sucesso) e `role="alert"` (erro); `aria-live="polite"` no contador de resultados de filtro.

### 10.5 Checklist de testes obrigatórios antes da entrega

- [ ] Navegar o site **inteiro** só com `Tab` / `Shift+Tab` / `Enter` / `Space` / `Esc` / setas.
- [ ] Testar com **NVDA + Firefox** (Windows) e **VoiceOver + Safari** (macOS/iOS): hero, accordion, carrossel, formulário.
- [ ] Zoom de **200%** e **400%** no navegador sem scroll horizontal inesperado.
- [ ] Simular **protanopia, deuteranopia e tritanopia** — nenhuma informação deve se perder.
- [ ] Modo escuro do sistema operacional ligado: revisar as 13 seções.
- [ ] `prefers-reduced-motion: reduce` ativado: nenhuma animação de entrada, contadores instantâneos.
- [ ] Largura de **360px** no DevTools: nenhum scroll horizontal, nenhum alvo de toque < 44px.
- [ ] Rodar **axe DevTools** e **Lighthouse Accessibility**: meta 100. Zero violações críticas.
- [ ] Validar HTML no `validator.w3.org` (via upload, não URL).

---

## 11. Checklist de performance

### 11.1 Metas (Lighthouse mobile, 4G simulado)

| Métrica | Meta | Limite aceitável |
|---|---|---|
| **LCP** | < 2.0s | < 2.5s |
| **CLS** | < 0.05 | < 0.1 |
| **INP** | < 150ms | < 200ms |
| **FCP** | < 1.2s | < 1.8s |
| **TBT** | < 150ms | < 300ms |
| **Peso total da home** | < 1.2 MB | < 1.8 MB |
| **Lighthouse Performance** | ≥ 95 | ≥ 90 |
| **Lighthouse Accessibility / Best Practices / SEO** | 100 | ≥ 95 |

### 11.2 LCP (Largest Contentful Paint)

- [x] **O LCP da home é a imagem do hero.** Ela leva `loading="eager"`, `fetchpriority="high"`, `decoding="sync"` — e **nenhum** `loading="lazy"`.
- [x] A imagem do hero é servida em **AVIF** (com fallback WebP e JPEG via `<picture>`) e **não passa de 180 KB**.
- [x] `<link rel="preload" as="image" href="assets/img/hero.avif" type="image/avif" fetchpriority="high">` no `<head>`, **antes** do link das fontes.
- [x] O CSS crítico (tokens + base + navbar + hero) fica **inline** no `<head>`, em um `<style>` de no máximo **8 KB**. O restante do CSS é carregado com `<link rel="stylesheet">` normalmente (bloqueia, mas é pequeno).
- [x] **Nada de JavaScript bloqueante no `<head>`.** Todos os `<script>` vão no fim do `<body>` com `defer`.
- [x] As fontes usam `&display=swap` e apenas os pesos realmente usados: Fraunces 500/600/700 + Plus Jakarta Sans 400/500/600/700. Reduzir Fraunces para 600/700 se o 500 não for usado.
- [x] `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com` (com `crossorigin`).
- [x] A `<img>` do hero tem `width` e `height` explícitos + `aspect-ratio` no CSS.

### 11.3 Lazy loading

- [x] `loading="lazy"` em **todas** as imagens abaixo da dobra (cursos, galeria, coop-escola, avatares, mapa poster).
- [x] `loading="lazy"` + `decoding="async"` sempre juntos.
- [x] O **iframe do Google Maps** só é injetado quando o container entra no viewport (via `IntersectionObserver`), ou ao clique em "Carregar mapa". Antes disso, exibir a imagem poster + botão. Isso evita ~600 KB de JS de terceiros na carga inicial.
- [x] Nenhuma imagem dentro de um container `display:none` que depois é revelado — usar `srcset` para carregar só o necessário.
- [x] `srcset` + `sizes` em todas as imagens com mais de 800px de largura de exibição:
```html
<img src="assets/img/curso-agro-800.webp"
     srcset="assets/img/curso-agro-400.webp 400w,
             assets/img/curso-agro-800.webp 800w,
             assets/img/curso-agro-1200.webp 1200w"
     sizes="(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 380px"
     width="800" height="450" alt="…" loading="lazy" decoding="async">
```

### 11.4 CLS (Cumulative Layout Shift)

- [x] **Toda `<img>` tem `width` e `height`** (ou `aspect-ratio` no CSS) — zero shift ao carregar.
- [x] Os avatares dos depoimentos têm `aspect-ratio: 1/1` e `border-radius: var(--radius-circle)`.
- [x] O container do mapa tem `aspect-ratio: 4/3` (mobile) / `16/10` (desktop) reservado antes do iframe carregar.
- [x] **A navbar não muda de altura no scroll de forma que empurre conteúdo:** ela é `position: sticky` com altura explícita. A redução de 85px → 72px ocorre por dentro, sem reflow do conteúdo (usar `padding-top` no `<main>` igual à altura inicial).
- [x] **Fontes com `display: swap` + `size-adjust`** para reduzir o shift do fallback:
```css
@font-face { font-family: 'Fraunces Fallback'; src: local('Georgia'); size-adjust: 96%; ascent-override: 92%; }
@font-face { font-family: 'PJS Fallback'; src: local('Arial'); size-adjust: 105%; ascent-override: 90%; }
```
- [x] Nenhum banner, pop-up ou barra de cookies que insira conteúdo **acima** do conteúdo existente. Se houver barra de cookies, ela é `position: fixed; bottom: 0` e não desloca nada.
- [x] Contadores não alteram a largura do container: `.stat__number` usa `font-variant-numeric: tabular-nums` e o container tem `min-width` reservado.
- [x] Nenhum `animation` que dispare mudança de `height` no carregamento.

### 11.5 JavaScript e CSS

- [x] **Sem frameworks, sem bundler.** Scripts clássicos com `defer` (não `type="module"` — **bloqueado em `file://` por CORS**).
- [x] **Total de JS < 25 KB não minificado.** Se passar, dividir funcionalidades por seção e inicializar sob demanda.
- [x] CSS total < 45 KB não minificado, em **um único arquivo** além do crítico inline. Evitar `@import` (bloqueia em cascata).
- [x] Listeners de scroll/resize com `{ passive: true }` e throttle por `requestAnimationFrame`.
- [x] Nenhuma biblioteca externa de terceiros além das Google Fonts e, opcionalmente, o iframe do Google Maps (carregado sob demanda).
- [x] Usar `content-visibility: auto` + `contain-intrinsic-size` nas seções muito abaixo da dobra (`#faq`, `#localizacao`, `#cta-final`) para adiar renderização.

### 11.6 SEO e metadados (impacta a percepção de qualidade na venda)

- [x] `<title>` único por página, até 60 caracteres.
- [x] `<meta name="description">` único por página, 150–160 caracteres.
- [x] Open Graph completo: `og:title`, `og:description`, `og:image` (1200×630), `og:type`, `og:locale="pt_BR"`, `og:url`.
- [x] `<link rel="canonical">` em cada página.
- [x] **JSON-LD** com `@type: "EducationalOrganization"`:
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ETEC Engenheiro Agrônomo Narciso de Medeiros",
  "alternateName": "ETEC de Iguape",
  "foundingDate": "1970",
  "address": { "@type": "PostalAddress", "addressLocality": "Iguape", "addressRegion": "SP", "addressCountry": "BR" },
  "parentOrganization": { "@type": "Organization", "name": "Centro Paula Souza" },
  "areaServed": "Vale do Ribeira"
}
```
- [x] `<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">` + `<link rel="apple-touch-icon">`.
- [x] `<meta name="theme-color" content="#1b5432">` (light) e variante com `media="(prefers-color-scheme: dark)" content="#0d1310"`.
- [x] `<html lang="pt-BR">` e `<meta charset="UTF-8">`.

---

## 12. Estrutura de arquivos final

```
projeto-teste/
├── docs/
│   └── design-specs.md            ← este documento
├── site/
│   ├── index.html                 ← home, 13 seções + navbar + footer
│   ├── cursos.html                ← detalhamento dos 3 cursos técnicos
│   ├── contato.html               ← formulário, mapa, FAQ completo, horários
│   ├── assets/
│   │   ├── css/
│   │   │   ├── tokens.css         ← :root, paletas, tipografia, espaçamento, dark mode
│   │   │   ├── base.css           ← reset, tipografia base, utilitários (.container, .sr-only, .skip-link)
│   │   │   ├── layout.css         ← grids de seção, section-header, espaçamentos verticais
│   │   │   ├── components.css     ← navbar, btn, card, stat, accordion, carousel, gallery, form, footer, badge, timeline
│   │   │   ├── animations.css     ← [data-reveal], keyframes (spin, shimmer, shake, lightbox-in), prefers-reduced-motion
│   │   │   └── styles.css         ← ÚNICO arquivo linkado no HTML; contém @import? NÃO.
│   │   │                             Em vez disso: os 5 arquivos acima são linkados
│   │   │                             individualmente em ordem, no <head>.
│   │   ├── js/
│   │   │   ├── icons.js           ← objeto { nome: '<svg …>' } com os ~26 ícones SVG inline
│   │   │   ├── content.js         ← TODO o conteúdo dinâmico embutido (depoimentos, FAQ, cursos). NUNCA usar fetch()
│   │   │   ├── nav.js             ← navbar scrolled, drawer mobile, focus trap, scroll lock, barra de progresso
│   │   │   ├── reveal.js          ← IntersectionObserver de [data-reveal] + stagger
│   │   │   ├── counters.js        ← animação dos [data-count-to]
│   │   │   ├── accordion.js       ← FAQ acessível
│   │   │   ├── carousel.js        ← depoimentos (scroll-snap + dots + setas)
│   │   │   ├── gallery.js         ← lightbox de fotos com focus trap e teclado
│   │   │   ├── form.js            ← validação, estados de erro/sucesso, fallback mailto em file://
│   │   │   └── main.js            ← bootstrap: injeta ícones, inicializa módulos, parallax, theme toggle
│   │   ├── img/
│   │   │   ├── logo-etec.svg      ← wordmark (também inline no HTML)
│   │   │   ├── favicon.svg
│   │   │   ├── og-cover.jpg       ← 1200×630
│   │   │   ├── hero.avif / hero.webp / hero.jpg
│   │   │   ├── curso-agropecuaria-{400,800,1200}.{avif,webp}
│   │   │   ├── curso-aquicultura-{400,800,1200}.{avif,webp}
│   │   │   ├── curso-meio-ambiente-{400,800,1200}.{avif,webp}
│   │   │   ├── sobre-fazenda.{avif,webp}
│   │   │   ├── patrono-narciso.{avif,webp}
│   │   │   ├── galeria-{1..6}.{avif,webp}
│   │   │   ├── coop-escola.{avif,webp}
│   │   │   ├── mapa-poster.{avif,webp}
│   │   │   ├── cta-fundo.{avif,webp}
│   │   │   └── avatar-{1..4}.{avif,webp}
│   │   └── icon/                  ← (vazio; ícones são inline por causa de file://)
│   └── README.md                  ← como abrir, como publicar, lista de pendências de conteúdo
└── (nenhum package.json, nenhum node_modules, nenhum build step)
```

### 12.1 Ordem exata dos `<link>` no `<head>`

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ETEC de Iguape — Ensino Médio Técnico Público e Gratuito</title>
<meta name="description" content="…">
<style>/* CSS CRÍTICO inline: tokens, reset, tipografia base, navbar, hero. Máx 8 KB */</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="assets/img/hero.avif" type="image/avif" fetchpriority="high">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/layout.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/animations.css">
```

### 12.2 Ordem exata dos `<script>` no fim do `<body>`

```html
<script src="assets/js/icons.js" defer></script>
<script src="assets/js/content.js" defer></script>
<script src="assets/js/nav.js" defer></script>
<script src="assets/js/reveal.js" defer></script>
<script src="assets/js/counters.js" defer></script>
<script src="assets/js/accordion.js" defer></script>
<script src="assets/js/carousel.js" defer></script>
<script src="assets/js/gallery.js" defer></script>
<script src="assets/js/form.js" defer></script>
<script src="assets/js/main.js" defer></script>
```

---

## 13. Restrições técnicas críticas (leia antes de codar)

Estas quatro armadilhas quebram o site silenciosamente. São **obrigatórias**.

### 13.1 `type="module"` NÃO funciona em `file://`

Navegadores aplicam CORS a ES modules, e o protocolo `file://` é tratado como origem opaca. `<script type="module">` falha com erro de CORS.

**Solução:** usar scripts clássicos com `defer` (como no item 12.2). Se precisar de escopo isolado, envolver cada arquivo numa IIFE:

```js
// assets/js/counters.js
(function () {
  'use strict';
  window.ETEC = window.ETEC || {};
  window.ETEC.counters = { init };
  function init() { /* … */ }
})();
```

### 13.2 `fetch()` de arquivos locais NÃO funciona em `file://`

`fetch('data/cursos.json')` falha com `TypeError: Failed to fetch` (CORS, origem `null`).

**Solução:** todo conteúdo dinâmico (depoimentos, FAQ, cursos, números, datas do vestibulinho) fica **embutido como objeto JavaScript** em `assets/js/content.js`:

```js
window.ETEC_CONTENT = {
  depoimentos: [
    { nome: '…', curso: 'Técnico em Agropecuária', ano: '2019', texto: '…', avatar: 'assets/img/avatar-1.webp' }
  ],
  faq: [ { pergunta: '…', resposta: '…' } ],
  cursos: [ { slug: 'agropecuaria', nome: '…', resumo: '…', competencias: ['…'] } ]
};
```

O HTML pode (e deve) já conter o conteúdo principal **estático**, e o JS apenas melhorá-lo — assim o site funciona mesmo com JS desabilitado.

### 13.3 Sprite SVG externo NÃO funciona em `file://`

`<use href="sprite.svg#icone">` falha por CORS na mesma origem opaca.

**Solução:** ícones como strings SVG em `js/icons.js`, injetadas via `innerHTML` em elementos `[data-icon]`. Exceção: ícones críticos acima da dobra (logo, ícones do hero) ficam **inline no HTML** para não depender de JS.

### 13.4 Google Maps embed em `file://`

O `<iframe>` do Google Maps funciona, mas com `src` remoto carrega ~600 KB de terceiros. Além disso, alguns bloqueadores o impedem.

**Solução:** poster estático + botão "Ver no mapa". Ao clique, injetar o `<iframe>` com `loading="lazy"` e `title="Mapa da localização da ETEC de Iguape"`. Sempre oferecer o link direto `https://www.google.com/maps/search/?api=1&query=...` como alternativa textual.

### 13.5 Checklist de verificação do `file://`

- [ ] Abrir `site/index.html` com **duplo-clique** (não via servidor).
- [ ] Console **sem nenhum erro** de CORS, rede ou JS.
- [ ] Navegação entre as 3 páginas funciona com caminhos relativos.
- [ ] Âncoras (`index.html#cursos`) rolam corretamente a partir das subpáginas.
- [ ] Google Fonts carregam (requer internet — documentar isso no README como única dependência externa).
- [ ] Com JavaScript desabilitado, o conteúdo principal continua legível (princípio de aprimoramento progressivo).

---

## Apêndice A — Resumo executivo para o front-end

| Decisão | Valor |
|---|---|
| Primária | `#226b3f` (botão), `#1b5432` (hover/texto) |
| Acento | `#d4921a` (botão CTA, **sempre com texto `#18201c`**) |
| Terciária | `#7c3a27` (terracota) |
| Fundo light | `#f7f9f7` / superfície `#ffffff` |
| Fundo dark | `#0d1310` / superfície `#18201c` |
| Texto light | `#18201c` (primário), `#55635b` (secundário) |
| Texto dark | `#f7f9f7` (primário), `#c9d3cc` (secundário) |
| Focus ring | `#1b5432` (light), `#ecc25c` (dark), `3px` + `offset 2px` |
| Display | Fraunces 500/600/700 |
| Body | Plus Jakarta Sans 400/500/600/700 |
| Base tipográfica | `1rem = 16px`, escala 1.250 |
| Container | `1200px`, gutter `20→40px` |
| Breakpoint da navbar | `1024px` |
| Raio padrão | `12px` (botões) / `16px` (cards) / `24px` (modais) |
| Seções na home | **13** |
| Páginas | **3** (`index.html`, `cursos.html`, `contato.html`) |
| URLs de imagem validadas (HTTP 200) | **20** |
| Alvo de toque mínimo | `44×44px` (botões usam `48px`) |
| Alvo Lighthouse | Perf ≥ 95, A11y 100 |

---

*Fim do documento. Dúvidas de implementação devem ser resolvidas consultando as seções 6 (wireframes), 7 (componentes) e 13 (restrições). Qualquer desvio das cores ou dos pares de contraste da seção 2.7 deve ser revalidado com cálculo de contraste antes de ir para produção.*
