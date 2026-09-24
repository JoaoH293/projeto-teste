import { readFile, writeFile } from 'node:fs/promises';

const UA = 'EtecIguapeSiteBuilder/1.0 (contato: dev@example.com)';

const CONSULTAS = [
  { slug: 'aula-br', cat: 'Category:Classrooms in Brazil' },
  { slug: 'aula-sp', cat: 'Category:Schools in São Paulo (state)' },
  { slug: 'alunos-br', q: 'alunos escola técnica Brasil' },
  { slug: 'lab-moderno', q: 'students laboratory experiment modern college' },
  { slug: 'lab-agro', q: 'agriculture laboratory analysis soil' },
  { slug: 'informatica-lab', q: 'computer lab students school' },
  { slug: 'biblioteca', q: 'school library students reading' },
  { slug: 'aquicultura-br', cat: 'Category:Aquaculture in Brazil' },
  { slug: 'pesca-br', cat: 'Category:Fishing in Brazil' },
  { slug: 'agro-sp', cat: 'Category:Agriculture in São Paulo (state)' },
  { slug: 'banana-br2', cat: 'Category:Bananas in Brazil' },
  { slug: 'formatura', q: 'graduation students diploma ceremony' },
  { slug: 'biblioteca2', cat: 'Category:Libraries in São Paulo (state)' },
  { slug: 'turismo-br', q: 'turismo rural Brasil fazenda' },
];

const EXCLUIR = /bahia|portugal|ribeira grande|piquin|galicia|espanha|spain/i;

async function api(params) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo' +
    '&iiprop=url|size|extmetadata&iiurlwidth=1600&' +
    new URLSearchParams(params).toString();
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

function mapPages(j) {
  const strip = (s) => String(s || '').replace(/<[^>]*>/g, '').trim();
  return Object.values(j?.query?.pages || {})
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return null;
      const m = ii.extmetadata || {};
      return {
        titulo: p.title.replace(/^File:/, ''),
        url: ii.thumburl || ii.url,
        w: ii.thumbwidth || ii.width,
        h: ii.thumbheight || ii.height,
        licenca: strip(m.LicenseShortName?.value) || '?',
        autor: strip(m.Artist?.value).slice(0, 80) || 'desconhecido',
        pagina: ii.descriptionurl,
      };
    })
    .filter(Boolean);
}

function ok(i) {
  if (!i.url) return false;
  if (/\.(svg|tif|tiff|pdf|gif)($|\?)/i.test(i.url)) return false;
  if (i.w < 1000) return false;
  const ar = i.w / i.h;
  if (ar < 1.15 || ar > 2.5) return false;
  const alvo = `${i.titulo} ${i.pagina}`;
  if (EXCLUIR.test(alvo) && !/brasil|brazil/i.test(alvo)) return false;
  return true;
}

const saida = {};
for (const c of CONSULTAS) {
  let itens = [];
  try {
    if (c.cat) {
      const j = await api({
        generator: 'categorymembers',
        gcmtitle: c.cat,
        gcmtype: 'file',
        gcmlimit: '40',
      });
      itens = mapPages(j);
      if (!itens.length) {
        const j2 = await api({
          list: 'categorymembers',
          cmtitle: c.cat,
          cmtype: 'subcat',
          cmlimit: '6',
        });
        for (const sc of j2?.query?.categorymembers || []) {
          const j3 = await api({
            generator: 'categorymembers',
            gcmtitle: sc.title,
            gcmtype: 'file',
            gcmlimit: '12',
          });
          itens.push(...mapPages(j3));
        }
      }
    } else {
      const j = await api({
        generator: 'search',
        gsrsearch: c.q,
        gsrnamespace: '6',
        gsrlimit: '30',
      });
      itens = mapPages(j);
    }
  } catch (e) {
    console.error(`! ${c.slug}: ${e.message}`);
  }
  const vistas = new Set();
  saida[c.slug] = itens.filter((i) => ok(i) && !vistas.has(i.url) && vistas.add(i.url)).slice(0, 6);
  console.error(`✓ ${c.slug}: ${saida[c.slug].length}`);
}

const anterior = JSON.parse(
  await readFile('C:/Users/User/Desktop/projeto-teste/docs/imagens-candidatas.json', 'utf8')
);
await writeFile(
  'C:/Users/User/Desktop/projeto-teste/docs/imagens-candidatas.json',
  JSON.stringify({ ...anterior, ...saida }, null, 2),
  'utf8'
);
console.error('gravado (merge)');
