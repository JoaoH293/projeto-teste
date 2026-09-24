import { writeFile } from 'node:fs/promises';

const TEMAS = [
  { slug: 'bananal', q: 'banana plantation' },
  { slug: 'bananicultura', q: 'banana harvest farm' },
  { slug: 'rio-ribeira', q: 'Ribeira river' },
  { slug: 'iguape', q: 'Iguape' },
  { slug: 'pesca', q: 'artisanal fishing boat' },
  { slug: 'aquicultura', q: 'fish farming aquaculture' },
  { slug: 'agropecuaria', q: 'cattle farm pasture' },
  { slug: 'estudantes-lab', q: 'students laboratory science' },
  { slug: 'sala-aula', q: 'classroom students teacher' },
  { slug: 'mata-atlantica', q: 'atlantic forest brazil' },
  { slug: 'gastronomia', q: 'culinary kitchen chef' },
  { slug: 'turismo', q: 'ecotourism nature trail' },
  { slug: 'trator', q: 'tractor agriculture field' },
  { slug: 'horta', q: 'vegetable garden farm' },
];

const UA = 'EtecIguapeSiteBuilder/1.0 (contato: dev@example.com)';

async function openverse(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=8&license_type=commercial&mature=false`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`openverse ${r.status}`);
  const j = await r.json();
  return (j.results || []).map((x) => ({
    fonte: 'openverse',
    titulo: x.title || 'sem titulo',
    url: x.url,
    thumb: x.thumbnail,
    w: x.width,
    h: x.height,
    licenca: `${x.license || '?'} ${x.license_version || ''}`.trim(),
    autor: x.creator || 'desconhecido',
    pagina: x.foreign_landing_url || x.url,
  }));
}

async function commons(q) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&generator=search' +
    `&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=8` +
    '&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1600&format=json';
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`commons ${r.status}`);
  const j = await r.json();
  const pages = Object.values(j?.query?.pages || {});
  return pages
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return null;
      const m = ii.extmetadata || {};
      const strip = (s) => String(s || '').replace(/<[^>]*>/g, '').trim();
      return {
        fonte: 'commons',
        titulo: p.title.replace(/^File:/, ''),
        url: ii.thumburl || ii.url,
        thumb: ii.thumburl || ii.url,
        w: ii.thumbwidth || ii.width,
        h: ii.thumbheight || ii.height,
        licenca: strip(m.LicenseShortName?.value) || 'ver licenca',
        autor: strip(m.Artist?.value) || 'desconhecido',
        pagina: ii.descriptionurl,
      };
    })
    .filter(Boolean);
}

function pontuar(img) {
  if (!img.w || !img.h) return -1;
  const ar = img.w / img.h;
  const paisagem = ar >= 1.2 && ar <= 2.4 ? 40 : 0;
  const grande = img.w >= 1200 ? 20 : 0;
  const lic = /^(cc0|cc by|pd|public)/i.test(img.licenca) ? 20 : 0;
  const svg = /\.svg($|\?)/i.test(img.url) ? -100 : 0;
  const fonte = img.fonte === 'commons' ? 10 : 0;
  return paisagem + grande + lic + svg + fonte;
}

const saida = {};
for (const t of TEMAS) {
  const got = [];
  for (const fn of [commons, openverse]) {
    try {
      got.push(...(await fn(t.q)));
    } catch (e) {
      console.error(`! ${t.slug} ${fn.name}: ${e.message}`);
    }
  }
  const vistas = new Set();
  saida[t.slug] = got
    .filter((i) => {
      if (!i.url || vistas.has(i.url)) return false;
      vistas.add(i.url);
      return true;
    })
    .map((i) => ({ ...i, score: pontuar(i) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  console.error(`✓ ${t.slug}: ${saida[t.slug].length}`);
}

await writeFile(
  'C:/Users/User/Desktop/projeto-teste/docs/imagens-candidatas.json',
  JSON.stringify(saida, null, 2),
  'utf8'
);
console.error('gravado docs/imagens-candidatas.json');
