# Pasar Malam Kembar — Spot the Difference

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/jakwifiid78-png/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/jakwifiid78-png/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

Entry for the make.fun competition **best-spot-the-difference-game-20261121-0451** — "Make the best spot the difference game" ($50, top 10 share $5 each).

## The game

**Pasar Malam Kembar** (Twin Night Market): two hand-drawn night-market street scenes side by side, painted procedurally on canvas — string lights, a satay stall, a fruit cart, a lantern stall, a black cat, balloons, and a moonlit puddle. The twin picture hides **8 differences**. Click a difference on either picture to mark it with a green circle.

- 🖱️ Mouse + ⌨️ keyboard: **H** hint, **R** restart, **M** mute
- 💡 Hint button (max 3, −50 pts) pulses a ring around one unfound difference
- ⏱ Timer, score (+100 per find, −10 per wrong click), win screen with star rating
- 🔊 WebAudio beeps (no sound files) — ding for a find, buzz for a miss, fanfare for the win
- 📸 Screenshot presets: `?shot=start` (0 found), `?shot=play` (3 found), `?shot=play2` (5 found), `?shot=end` (all 8 found + win screen)

## The 8 differences

1. Bulan berubah warna (kuning pucat → oranye)
2. Lentera tengah di kios lentera hilang
3. Kucing hitam hilang
4. Balon kuning hilang
5. Atap kios sate berubah warna (merah → teal)
6. Satu apel di gerobak buah berkurang
7. Bintang terang hilang
8. Tulisan papan "SATE" jadi "SOTO"

## Play it

Serve `game/` with any static server and open `index.html` in desktop Chrome — no build step, no network requests, every pixel drawn by `game/game.js`.

## Hand-in

`main.ts` (Node 22, standard library only) validates the deliverable, copies `game/` and `screenshots/` to `/output` (or `$MAKEFUN_OUTPUT_DIR`), and writes `dossier.json` with the kit's `vendor/makefun-game.ts` (copied unchanged). See `DOSSIER.md` for the full dossier.
