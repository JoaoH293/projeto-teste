// Gera os derivados WebP/AVIF do site a partir das fontes em src/assets/img/.
// Uso: node scripts/gerar-derivados.mjs
// Requer sharp fora do projeto: veja SHARP_HOME abaixo.
import { createRequire } from 'node:module';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SHARP_HOME = process.env.SHARP_HOME
  || 'C:/Users/User/AppData/Local/Temp/imgtools';
const require = createRequire(path.join(SHARP_HOME, 'noop.js'));
const sharp = require('sharp');

const SRC = 'src/assets/img';
const OUT = 'site/assets/img';
const WIDTHS = [400, 800, 1200];

// stem de saída -> { src, cropBottom } ; cropBottom remove a faixa de calibração
// do postal histórico do Museu Paulista.
const MANIFEST = [
  { out: 'manguezal', src: 'manguezal.jpg' },
  { out: 'bananal', src: 'bananal-02.jpg' },
  { out: 'bananal-historico', src: 'bananal-historico.jpg', cropBottom: 0.08 },
  { out: 'pesca-barcos', src: 'pesca-barcos.jpg' },
  { out: 'pesca-redes', src: 'pesca-redes.jpg' },
  { out: 'aquicultura', src: 'aquicultura-circular.jpg' },
  { out: 'escola-predio', src: 'escola-predio.jpg' },
  { out: 'horta-escolar', src: 'horta-escolar.jpg' },
  { out: 'laboratorio-informatica', src: 'laboratorio-informatica.jpg' },
  { out: 'laboratorio-solo', src: 'laboratorio-solo.jpg' },
];

// horta-alunos.jpg fica de fora: mostra pessoa identificável em primeiro plano.
// horta-alunos.jpg e laboratorio-*.jpg podem exibir pessoas; ver docs/creditos-imagens.md.

const kb = (n) => `${(n / 1024).toFixed(0)}kB`;

async function baseBuffer(entry) {
  let img = sharp(path.join(SRC, entry.src)).rotate();
  if (entry.cropBottom) {
    const { width, height } = await img.metadata();
    const keep = Math.round(height * (1 - entry.cropBottom));
    img = sharp(await img.toBuffer()).extract({
      left: 0, top: 0, width, height: keep,
    });
  }
  return img;
}

async function emit(sharpImg, stem, width, format) {
  const file = path.join(OUT, `${stem}-${width}.${format}`);
  const pipeline = sharpImg.resize({ width, withoutEnlargement: true });
  if (format === 'avif') {
    await pipeline.avif({ quality: 52, effort: 6 }).toFile(file);
  } else {
    await pipeline.webp({ quality: 78, effort: 5 }).toFile(file);
  }
  return (await stat(file)).size;
}

// hero: recorte 16:9 do manguezal, usado com scrim verde e texto sobreposto.
// og-cover: 1200x630 para compartilhamento.
async function specials() {
  const heroSrc = sharp(path.join(SRC, 'manguezal.jpg')).rotate();
  const hero = await heroSrc.resize({ width: 1600, height: 900, fit: 'cover', position: 'centre' });
  const hbuf = await hero.toBuffer();
  const heroOut = [];
  for (const [fmt, opts] of [['avif', { quality: 52, effort: 6 }], ['webp', { quality: 78, effort: 5 }]]) {
    const f = path.join(OUT, `hero.${fmt}`);
    await sharp(hbuf)[fmt](opts).toFile(f);
    heroOut.push([fmt, (await stat(f)).size]);
  }
  const hj = path.join(OUT, 'hero.jpg');
  await sharp(hbuf).jpeg({ quality: 80, mozjpeg: true }).toFile(hj);
  heroOut.push(['jpg', (await stat(hj)).size]);

  const og = path.join(OUT, 'og-cover.jpg');
  await sharp(path.join(SRC, 'manguezal.jpg')).rotate()
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(og);
  heroOut.push(['og-cover.jpg', (await stat(og)).size]);

  return heroOut;
}

async function run() {
  await mkdir(OUT, { recursive: true });
  let total = 0;
  let count = 0;

  for (const entry of MANIFEST) {
    const source = await baseBuffer(entry);
    const { width: srcW } = await sharp(
      await sharp(path.join(SRC, entry.src)).toBuffer(),
    ).metadata();
    const meta = await source.clone().metadata();
    const usable = WIDTHS.filter((w) => w <= Math.max(srcW, meta.width));
    const sizes = [];

    for (const w of usable) {
      // Reabre do buffer a cada formato para não reutilizar pipeline consumido.
      const buf = await source.clone().toBuffer();
      sizes.push([`${w}w`, await emit(sharp(buf), entry.out, w, 'avif'),
        await emit(sharp(buf), entry.out, w, 'webp')]);
    }

    // Fallback JPEG na maior largura, para <picture> em navegadores antigos.
    const maxW = usable[usable.length - 1];
    const fallback = path.join(OUT, `${entry.out}-fallback.jpg`);
    await sharp(await source.clone().toBuffer())
      .resize({ width: maxW, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(fallback);
    const fsize = (await stat(fallback)).size;

    for (const [label, a, w] of sizes) {
      total += a + w; count += 2;
      console.log(`${entry.out.padEnd(22)} ${label.padEnd(6)} avif ${kb(a).padStart(7)}  webp ${kb(w).padStart(7)}`);
    }
    total += fsize; count++;
    console.log(`${entry.out.padEnd(22)} ${String(maxW + 'w').padEnd(6)} jpg  ${kb(fsize).padStart(7)}  (fallback)`);
  }

  const extras = await specials();
  for (const [name, size] of extras) {
    total += size; count++;
  }
  console.log(`\nhero/og: ${extras.map(([n, s]) => `${n} ${kb(s)}`).join(' · ')}`);
  console.log(`${count} arquivos, ${(total / 1024 / 1024).toFixed(2)} MB em ${OUT}`);
}

run().catch((err) => { console.error(err); process.exit(1); });
