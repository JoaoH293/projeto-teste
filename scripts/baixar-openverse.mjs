import { writeFile } from 'node:fs/promises';

const IMG = 'C:/Users/User/Desktop/projeto-teste/src/assets/img';
const UA = 'EtecIguapeSiteBuilder/1.0 (contato: dev@example.com)';
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

const ALVOS = [
  { slug: 'hero-bananal', q: 'banana plantation' },
  { slug: 'bananal-02', q: 'banana trees farm tropical' },
  { slug: 'lagamar-iguape', q: 'coastal lagoon mangrove boat' },
  { slug: 'mata-atlantica', q: 'atlantic forest brazil rainforest' },
  { slug: 'sala-ciencias', q: 'high school classroom students' },
  { slug: 'laboratorio-solo', q: 'soil laboratory analysis science' },
  { slug: 'gado-nelore', q: 'cattle brazil farm pasture' },
  { slug: 'trator', q: 'tractor farming field agriculture' },
  { slug: 'aquicultura-tanque', q: 'fish pond farm aquaculture' },
  { slug: 'horta-alunos2', q: 'students gardening school' },
];

async function buscar(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(
    q
  )}&page_size=20&license_type=commercial&mature=false&size=large`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`openverse ${r.status}`);
  const j = await r.json();
  return (j.results || [])
    .filter((x) => x.url && x.width && x.height)
    .filter((x) => !/\.(svg|gif)($|\?)/i.test(x.url))
    .map((x) => ({
      titulo: x.title || 'sem titulo',
      url: x.url,
      w: x.width,
      h: x.height,
      licenca: `${x.license || '?'} ${x.license_version || ''}`.trim(),
      autor: x.creator || 'desconhecido',
      pagina: x.foreign_landing_url || x.url,
      score:
        (x.width / x.height >= 1.3 && x.width / x.height <= 2.2 ? 50 : 0) +
        (x.width >= 1600 ? 30 : x.width >= 1000 ? 15 : 0),
    }))
    .sort((a, b) => b.score - a.score);
}

async function baixar(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 8000) throw new Error(`pequeno ${buf.length}b`);
  if (!(buf[0] === 0xff && buf[1] === 0xd8) && !(buf[0] === 0x89 && buf[1] === 0x50)) {
    throw new Error('não é imagem');
  }
  return buf;
}

const creditos = [];
const falhas = [];

for (const a of ALVOS) {
  try {
    const cands = await buscar(a.q);
    let salvo = null;
    for (const c of cands.slice(0, 6)) {
      try {
        const buf = await baixar(c.url);
        await writeFile(`${IMG}/${a.slug}.jpg`, buf);
        salvo = c;
        console.error(`✓ ${a.slug} (${(buf.length / 1024).toFixed(0)} KB) ${c.w}x${c.h}`);
        break;
      } catch (e) {
        console.error(`  · descartado: ${e.message}`);
      }
      await dormir(400);
    }
    if (!salvo) throw new Error('nenhum candidato baixável');
    creditos.push({ slug: a.slug, ...salvo });
  } catch (e) {
    falhas.push(`${a.slug}: ${e.message}`);
    console.error(`✗ ${a.slug}: ${e.message}`);
  }
  await dormir(600);
}

let md = `\n## Imagens complementares (Openverse)\n\n| Arquivo | Obra | Autor | Licença | Origem |\n|---|---|---|---|---|\n`;
for (const c of creditos) {
  md += `| \`${c.slug}.jpg\` | ${c.titulo.replace(/\|/g, '/')} | ${c.autor.replace(/\|/g, '/')} | ${c.licenca} | ${c.pagina} |\n`;
}
if (falhas.length) md += `\n## Não obtidas\n\n${falhas.map((f) => `- ${f}`).join('\n')}\n`;

await writeFile('C:/Users/User/Desktop/projeto-teste/docs/creditos-openverse.md', md, 'utf8');
console.error(`\nOK: ${creditos.length} | falhas: ${falhas.length}`);
