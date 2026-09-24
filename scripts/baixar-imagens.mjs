import { readFile, writeFile, mkdir } from 'node:fs/promises';

const RAIZ = 'C:/Users/User/Desktop/projeto-teste';
const IMG = `${RAIZ}/src/assets/img`;
const UA = 'EtecIguapeSiteBuilder/1.0 (contato: dev@example.com)';

// slug final -> { topico, titulo, alt }
const PICKS = [
  { slug: 'hero-bananal', topico: 'banana-br2', titulo: 'Plantação de banana 11', alt: 'Plantação de bananeiras em encosta, cultura símbolo do Vale do Ribeira' },
  { slug: 'bananal-02', topico: 'banana-br2', titulo: 'Plantação de banana 01', alt: 'Bananeiras carregadas de cachos em plantação' },
  { slug: 'bananal-03', topico: 'banana-br2', titulo: 'Plantação de banana 16', alt: 'Fileiras de bananeiras vistas de cima' },
  { slug: 'bananal-historico', topico: 'banana-brasil', titulo: 'Santos. Plantação de Bananas', alt: 'Plantação de bananas em registro histórico do acervo do Museu Paulista' },
  { slug: 'lagamar-iguape', topico: '_manual', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Iguape-lagamar.jpg', alt: 'Margem do Lagamar em Iguape, litoral sul paulista' },

  { slug: 'manguezal', topico: 'manguezal', titulo: 'Mangrove swamp', alt: 'Raízes de manguezal em área alagada' },
  { slug: 'igarape', topico: 'manguezal', titulo: 'Igarapé 2.0', alt: 'Igarapé cercado de vegetação ribeirinha' },

  { slug: 'pesca-sp', topico: 'pesca-br', titulo: 'Pesca Arandu sp REFON', alt: 'Pescador lançando rede em rio do interior paulista' },
  { slug: 'pesca-barcos', topico: 'pesca-br', titulo: 'Fishermen and Boats at Armacao', alt: 'Barcos de pesca artesanal ancorados no litoral brasileiro' },
  { slug: 'pesca-redes', topico: 'pesca-br', titulo: 'Fisherman Repairs His Nets', alt: 'Pescador consertando as redes de pesca' },

  { slug: 'aquicultura-tanque', topico: 'aquicultura-br', titulo: 'Pesqueiro Peron', alt: 'Tanque de piscicultura em pesqueiro brasileiro' },
  { slug: 'aquicultura-circular', topico: 'aquicultura-tanque', titulo: 'Circular Tanks in a Medium size Fish Farm', alt: 'Tanques circulares de criação de peixes' },

  { slug: 'gado-nelore', topico: 'gado-brasil', titulo: 'Nelore cattle.jpg', alt: 'Rebanho de gado Nelore em pastagem' },
  { slug: 'trator', topico: 'trator', titulo: 'Tractor in field - geograph.org.uk - 1201434', alt: 'Trator agrícola trabalhando na lavoura' },

  { slug: 'mata-atlantica', topico: 'mata-atlantica', titulo: 'Pico Cabeça do Leão - Vale do Matutu', alt: 'Vista de Mata Atlântica preservada em encosta' },
  { slug: 'araucarias', topico: 'mata-atlantica', titulo: 'AraucariasPiraquara', alt: 'Araucárias nativas em paisagem do Sul e Sudeste' },

  { slug: 'sala-ciencias', topico: 'aula-br', titulo: 'Aula de Ciencias na escola a', alt: 'Aula de ciências com estudantes em sala de aula' },
  { slug: 'laboratorio-informatica', topico: 'aula-br', titulo: 'Laboratorio aula Infnet', alt: 'Estudantes trabalhando em laboratório de informática' },
  { slug: 'laboratorio-solo', topico: 'lab-agro', titulo: 'Soil fertility analysis 8 Measuring pH', alt: 'Análise de fertilidade do solo: medição de pH em laboratório' },
  { slug: 'laboratorio-analise', topico: 'lab-agro', titulo: 'Soil fertility analysis 2 Sample density', alt: 'Amostras de solo preparadas para análise laboratorial' },

  { slug: 'horta-escolar', topico: 'horta-escolar', titulo: 'Vegetable Garden (8685908417)', alt: 'Horta cultivada em canteiros' },
  { slug: 'horta-alunos', topico: 'horta-escolar', titulo: 'Bethesda student Charles feeds the chickens', alt: 'Estudante cuidando da criação no espaço escolar' },
  { slug: 'escola-predio', topico: 'biblioteca2', titulo: 'Biblioteca São Paulo', alt: 'Espaço de leitura e estudo com estantes e mesas' },
];

const banco = JSON.parse(await readFile(`${RAIZ}/docs/imagens-candidatas.json`, 'utf8'));

function buscar(topico, titulo) {
  const lista = banco[topico] || [];
  return (
    lista.find((i) => i.titulo === titulo) ||
    lista.find((i) => i.titulo.startsWith(titulo)) ||
    lista.find((i) => i.titulo.includes(titulo))
  );
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

async function buscarNoCommons(titulo) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `intitle:${titulo}`,
    gsrnamespace: '6',
    gsrlimit: '5',
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '1600',
  });
  const r = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': UA },
  });
  if (!r.ok) return null;
  const j = await r.json();
  const paginas = Object.values(j?.query?.pages || {});
  for (const p of paginas) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    if (/\.(svg|tif|tiff|pdf|gif)($|\?)/i.test(ii.thumburl || ii.url)) continue;
    const m = ii.extmetadata || {};
    const strip = (s) => String(s || '').replace(/<[^>]*>/g, '').trim();
    return {
      titulo: p.title.replace(/^File:/, ''),
      url: ii.thumburl || ii.url,
      licenca: strip(m.LicenseShortName?.value) || '?',
      autor: strip(m.Artist?.value).slice(0, 80) || 'desconhecido',
      pagina: ii.descriptionurl,
    };
  }
  return null;
}

// O Wikimedia devolve 403 para a URL do arquivo original; é preciso pedir um thumbnail.
function paraThumb(url, largura = 1600) {
  const limpa = url.split('?')[0];
  const m = limpa.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/);
  if (!m) return null;
  const [, a, ab, arquivo] = m;
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${ab}/${arquivo}/${largura}px-${arquivo}`;
}

async function baixar(url) {
  let ultimoErro = 'sem tentativa';
  const limpa = url.split('?')[0];
  const variantes = [
    paraThumb(url),
    limpa,
    url,
    url.replace('thumb.wikimedia.org', 'upload.wikimedia.org'),
  ].filter(Boolean);
  for (let tentativa = 0; tentativa < 4; tentativa += 1) {
    for (const u of variantes) {
      try {
        const r = await fetch(u, {
          headers: { 'User-Agent': UA, Referer: 'https://commons.wikimedia.org/' },
        });
        if (!r.ok) {
          ultimoErro = `HTTP ${r.status}`;
          continue;
        }
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length < 5000) {
          ultimoErro = `arquivo pequeno (${buf.length}b)`;
          continue;
        }
        return buf;
      } catch (e) {
        ultimoErro = e.message;
      }
    }
    await dormir(800 * 2 ** tentativa);
  }
  throw new Error(ultimoErro);
}

await mkdir(IMG, { recursive: true });

const creditos = [];
const falhas = [];

for (const p of PICKS) {
  let alvo = null;
  if (p.topico === '_manual') {
    alvo = { url: p.url, titulo: p.slug, licenca: 'ver Commons', autor: 'ver Commons', pagina: p.url };
  } else {
    alvo = buscar(p.topico, p.titulo);
    if (!alvo) {
      alvo = await buscarNoCommons(p.titulo);
      if (alvo) console.error(`  ~ ${p.slug}: obtido por busca direta`);
    }
  }
  if (!alvo) {
    falhas.push(`${p.slug}: não encontrado em ${p.topico} :: ${p.titulo}`);
    console.error(`✗ ${p.slug}`);
    continue;
  }
  const destino = `${IMG}/${p.slug}.jpg`;
  try {
    const buf = await baixar(alvo.url);
    await writeFile(destino, buf);
    console.error(`✓ ${p.slug} (${(buf.length / 1024).toFixed(0)} KB)`);
    creditos.push({
      slug: p.slug,
      alt: p.alt,
      titulo: alvo.titulo,
      autor: alvo.autor,
      licenca: alvo.licenca,
      pagina: alvo.pagina,
    });
  } catch (e) {
    falhas.push(`${p.slug}: ${e.message}`);
    console.error(`✗ ${p.slug}: ${e.message}`);
  }
}

let md = `# Créditos das imagens\n\nTodas as imagens são de licença livre (Wikimedia Commons) e foram baixadas para \`src/assets/img/\`.\n\n`;
md += `| Arquivo | Descrição (alt) | Obra original | Autor | Licença |\n|---|---|---|---|---|\n`;
for (const c of creditos) {
  md += `| \`${c.slug}.jpg\` | ${c.alt} | ${c.titulo.replace(/\|/g, '/')} | ${c.autor.replace(/\|/g, '/')} | ${c.licenca} |\n`;
}
md += `\nFonte: [Wikimedia Commons](${creditos[0]?.pagina || 'https://commons.wikimedia.org'}).\n`;
if (falhas.length) md += `\n## Falhas\n\n${falhas.map((f) => `- ${f}`).join('\n')}\n`;

await writeFile(`${RAIZ}/docs/creditos-imagens.md`, md, 'utf8');
console.error(`\nOK: ${creditos.length} imagens, ${falhas.length} falhas`);
