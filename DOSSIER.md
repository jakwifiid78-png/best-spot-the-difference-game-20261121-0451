# Dossier — Pasar Malam Kembar

Entry for make.fun competition **best-spot-the-difference-game-20261121-0451**
("Make the best spot the difference game", $50, top 10 share).
Repo: https://github.com/jakwifiid78-png/best-spot-the-difference-game-20261121-0451

## What it is

A complete, original spot-the-difference game. One night-market street scene,
drawn twice procedurally on HTML canvas (no images, no external assets, no
network requests): string lights, three stalls (satay, fruit, lanterns), a black
cat, balloons, stars, moon and a moonlit puddle. The right picture hides
8 differences from the left one.

## How to play

1. Open `game/index.html` in desktop Chrome (serve `game/` with any static
   server; no build step).
2. Look at the two pictures side by side and click a difference on EITHER
   picture. A correct click draws a green circle on both pictures, plays a
   ding, and adds 100 points. A wrong click shows a red X and costs 10 points.
3. The counter at the top shows "Ditemukan X dari 8 • Sisa Y". The chip list
   under the boards names every difference and ticks off the ones found.
4. Stuck? The Hint button (keyboard H) pulses a yellow ring around one
   unfound difference for 3 seconds (−50 points, max 3 hints).
5. Find all 8 to win: a win card shows time, score, mistakes and a star
   rating (★★★ with zero mistakes). R restarts, M toggles sound.

## The 8 differences (left → right)

| # | Difference | Where (scene coords) |
|---|------------|----------------------|
| 1 | Moon turns ember orange (was pale yellow) | (565, 58) |
| 2 | Middle paper lantern disappears | (540, 186) |
| 3 | Black cat disappears | (300, 362) |
| 4 | Yellow balloon disappears | (265, 100) |
| 5 | Satay-stall awning stripes turn teal (were red) | (135, 150) |
| 6 | One apple fewer on the fruit cart (5 → 4) | (352, 298) |
| 7 | Bright four-point star disappears | (180, 45) |
| 8 | Stall sign changes from "SATE" to "SOTO" | (110, 102) |

Differences mix colour changes, missing objects, a count change and a text
change, spread across the whole scene so no single glance finds them all.

## Files

- `main.ts` — entry program (Node 22, stdlib only): validates the hand-in,
  copies `game/` + `screenshots/` to `/output`, writes `dossier.json` via
  `vendor/makefun-game.ts` (kit copy, unchanged).
- `game/index.html` — page shell. `game/style.css` — layout. `game/game.js` —
  all scene drawing, difference data, clicks, hints, timer, sounds, win logic.
- `screenshots/` — 4 real renders of the game's own code in headless Chrome:
  `1-play.png` (cover: 3 found, 5 remain), `2-start.png` (0 found),
  `3-play.png` (5 found, 3 remain), `4-win.png` (8/8 + win card).
  Screenshot presets are built into the game (`?shot=start|play|play2|end`).
- `vendor/makefun-game.ts` — kit file, unchanged.
- `LICENSE` — MIT.

## Originality

All art, names, text and sounds are original to this entry, drawn and written
by the builder in this session. No commercial game, character, image, font or
sound is copied. No library is vendored.
