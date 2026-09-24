import { writeFile } from 'node:fs/promises';

const UA = 'EtecIguapeSiteBuilder/1.0 (contato: dev@example.com)';

const CONSULTAS = [
  { slug: 'iguape-lagamar', cat: 'Category:Iguape' },
  { slug: 'vale-ribeira', cat: 'Category:Vale do Ribeira' },
  { slug: 'rio-ribeira', cat: 'Category:Ribeira de Iguape River' },
  { slug: 'cananeia', cat: 'Category:Cananéia' },
  { slug: 'mata-atlantica', cat: 'Category:Atlantic Forest' },
  { slug: 'banana-brasil', q: 'banana plantation Brazil' },
  { slug: 'banana-colheita', q: 'banana harvest Brazil' },
  { slug: 'pesca-artesanal-br', q: 'pesca artesanal Brasil' },
  { slug: 'pesca-barco-br', q: 'fishing boat Brazil coast' },
  { slug: 'aquicultura-tanque', q: 'fish pond aquaculture farm' },
  { slug: 'estudantes-tec', q: 'vocational students workshop technical' },
  { slug: 'laboratorio-escola', q: 'school science laboratory students experiment' },
  { slug: 'sala-aula-br', q: 'classroom Brazil school students' },
  { slug: 'horta-escolar', q: 'school garden vegetable students' },
  { slug: 'gado-brasil', q: 'Nelore cattle Brazil' },
  { slug: 'gastronomia-br', q: 'Brazilian food cooking kitchen' },
  { slug: 'turismo-natureza', q: 'trail rainforest hiking nature Brazil' },
  { slug: 'manguezal', q: 'mangrove Brazil' },
];

const EXCLUIR = /bahia|portugal|portugal|ribeira grande|piquin|galicia|espanha|spain|bahia/i;

async function commonsApi(params) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo' +
    '&iiprop=url|size|extmetadata&iiurlwidth=1600' +
    '&' +
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
  if (i.w < 900) return false;
  const ar = i.w / i.h;
  if (ar < 1.1 || ar > 2.6) return false;
  const alvo = `${i.titulo} ${i.pagina}`;
  if (EXCLUIR.test(alvo) && !/brasil|brazil/i.test(alvo)) return false;
  return true;
}

const saida = {};
for (const c of CONSULTAS) {
  let itens = [];
  try {
    if (c.cat) {
      const j = await commonsApi({
        generator: 'categorymembers',
        gcmtitle: c.cat,
        gcmtype: 'file',
        gcmlimit: '40',
      });
      itens = mapPages(j);
      // tenta subcategorias se vazio
      if (!itens.length) {
        const j2 = await commonsApi({
          list: 'categorymembers',
          cmtitle: c.cat,
          cmtype: 'subcat',
          cmlimit: '6',
        });
        for (const sc of j2?.query?.categorymembers || []) {
          const j3 = await commonsApi({
            generator: 'categorymembers',
            gcmtitle: sc.title,
            gcmtype: 'file',
            gcmlimit: '12',
          });
          itens.push(...mapPages(j3));
        }
      }
    } else {
      const j = await commonsApi({
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

await writeFile(
  'C:/Users/User/Desktop/projeto-teste/docs/imagens-candidatas.json',
  JSON.stringify(saida, null, 2),
  'utf8'
);
console.error('gravado');
