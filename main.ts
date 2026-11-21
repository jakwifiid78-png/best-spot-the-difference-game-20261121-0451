// Pasar Malam Kembar — entry program for the make.fun spot-the-difference bounty.
//
// What this program does, in plain terms:
//   1. Checks that the deliverable is actually here (game/index.html, the
//      game files, and 3-4 screenshots) and refuses to hand in a broken set.
//   2. Copies game/ and screenshots/ into the output directory the grader
//      reads (either /output, or $MAKEFUN_OUTPUT_DIR when set locally).
//   3. Asks the kit's dossier builder (vendor/makefun-game.ts, copied
//      unchanged from the kit) to write /output/dossier.json describing
//      everything that was handed in.
//
// Node 22, standard library only. No network, no extra dependencies.
// Run locally with:  MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const REPO_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)));
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// --- 1. Sanity-check the deliverable before handing anything in. ---------
const gameDir = join(REPO_ROOT, 'game');
const shotsDir = join(REPO_ROOT, 'screenshots');

function fail(message) {
  console.error('main.ts: refusing to hand in — ' + message);
  process.exit(1);
}

if (!existsSync(join(gameDir, 'index.html'))) fail('game/index.html is missing');
if (!existsSync(join(gameDir, 'game.js'))) fail('game/game.js is missing');
if (!existsSync(join(gameDir, 'style.css'))) fail('game/style.css is missing');
if (!existsSync(shotsDir)) fail('screenshots/ is missing');

const shots = readdirSync(shotsDir)
  .filter((name) => /\.(png|jpe?g)$/i.test(name))
  .sort();
if (shots.length < 3 || shots.length > 4) {
  fail('expected 3 or 4 screenshots, found ' + shots.length);
}
for (const shot of shots) {
  const bytes = statSync(join(shotsDir, shot)).size;
  if (bytes > 262144) fail('screenshot ' + shot + ' is ' + bytes + ' bytes (cap 256 KiB)');
}

// --- 2. Copy the game and its screenshots into the output directory. -----
mkdirSync(OUT_DIR, { recursive: true });
cpSync(gameDir, join(OUT_DIR, 'game'), { recursive: true });
mkdirSync(join(OUT_DIR, 'screenshots'), { recursive: true });
cpSync(shotsDir, join(OUT_DIR, 'screenshots'), { recursive: true });

// --- 3. Let the kit's dossier builder describe the hand-in. --------------
const dossier = buildDossier(OUT_DIR, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(OUT_DIR, 'dossier.json'), dossier);

console.log('Pasar Malam Kembar handed in:');
console.log('  game files : game/index.html, game/game.js, game/style.css');
console.log('  screenshots: ' + shots.join(', '));
console.log('  output     : ' + OUT_DIR);
