# IMAGES_PROMPT.md — Boadman art brief

Generate each image below, name it **exactly** as the `File` line says, and drop them into an
`images/` folder next to `index.html`. The page already references these paths and shows a
HUD placeholder until the real file exists, so you can add them one at a time.

## Global art direction (paste into every prompt)
> Dark cyber-military esports key art. Near-black arena background (#0A0A0C). Rim and volumetric
> lighting in ember tones: coral-red (#FF3D1F), orange (#FF8A00), deep amber. Cinematic, high
> contrast, moody atmosphere with fine airborne embers and thin haze. Photoreal-meets-game-render,
> sharp detail, subtle film grain. Composition leaves the stated negative-space area darker for
> text/UI overlay. No text, no logos, no watermarks, no UI, no captions.

**Hard bans (do not include):** casino/gambling motifs (dice, playing cards, poker chips, slot
machines, roulette, gold coin piles, jackpot glow), real brand logos, real celebrity likeness,
gore, anything implying under-18 players.

**Consistency:** same lighting language and ember palette across all five so the page reads as one
world. Prefer one strong subject per image over a busy crowd.

---

## 1 — Hero key art
- **File:** `images/hero-squad.png`
- **Aspect / size:** 4:5 portrait, ≥ 1200 × 1500 px (PNG).
- **Placement:** right-hand HUD frame in the hero. The frame clips the bottom-right corner and
  a status panel overlaps the lower-right, so keep the lower-right ~30% darker and unbusy.
- **Prompt:**
  > [Global art direction] + Three armored competitive gamers standing ready in a dark arena,
  > heroic low-angle group shot. Center figure: a bald, battle-worn veteran in matte tactical
  > armor, intense forward stare. Behind/beside: a determined woman with an undercut in a
  > carbon-fiber jacket, and a masked operative whose visor glows coral-red. Ember particles
  > drifting, smoke haze, coral rim-light separating them from the black background. Strong
  > negative space on the left and lower-right for text. Cinematic, photoreal game-render.
- **Alt text (already set in HTML):** "Three armored competitors standing ready in a dark arena lit by ember light"

## 2 — Tournament card: Racing
- **File:** `images/tournament-racing.png`
- **Aspect / size:** 16:10 landscape, ≥ 1200 × 750 px.
- **Prompt:**
  > [Global art direction] + A hypercar mid-drift on a wet neon night circuit, tail sliding,
  > spray and sparks lit by coral and magenta reflections on the tarmac. Motion blur, rain haze,
  > shallow depth of field. Dynamic three-quarter rear angle. No text.

## 3 — Tournament card: Shooter
- **File:** `images/tournament-shooter.png`
- **Aspect / size:** 16:10 landscape, ≥ 1200 × 750 px.
- **Prompt:**
  > [Global art direction] + A lone armored marksman crouched and taking aim through a scoped
  > rifle inside a smoke-filled concrete ruin, coral muzzle-side rim light, dust motes and haze,
  > tense cinematic angle from the side. Face partly obscured by helmet. No text.

## 4 — Tournament card: Fighting
- **File:** `images/tournament-fighting.png`
- **Aspect / size:** 16:10 landscape, ≥ 1200 × 750 px.
- **Prompt:**
  > [Global art direction] + Two hand-to-hand fighters clashing at the center of a fire-lit
  > combat arena, one throwing a decisive strike, embers and sparks bursting on impact, dramatic
  > backlight, silhouetted crowd far behind in darkness. Frozen high-energy moment. No text.

## 5b — Cinematic band (full-bleed divider)
- **File:** `images/arena-wide.png`
- **Aspect / size:** ultra-wide, ≥ 2400 × 1000 px (PNG). This is a full-bleed parallax band
  behind the giant "SKILL // STAKE // STATUS" text, so keep the left third darker and the subject
  toward the right/center.
- **Prompt:**
  > [Global art direction] + A packed esports arena from behind the players: silhouetted crowd,
  > a massive glowing stage, coral and amber stage lights raking across haze, lens flares, deep
  > perspective. Epic, cinematic, wide. Left third falls into near-black for text overlay. No text.
- **Note:** if this file is absent the band still looks intentional (it falls back to a lit-arena
  gradient), so it is the most optional of the set.

## 5 — Social / Open Graph cover
- **File:** `images/og-cover.png`
- **Aspect / size:** 1.91:1 landscape, exactly 1200 × 630 px.
- **Placement:** link-preview thumbnail (Slack, iMessage, X, etc.). Keep the center clear; the
  headline and logo may be composited later.
- **Prompt:**
  > [Global art direction] + Wide cinematic banner: the hero veteran in tactical armor on the
  > right third, coral ember light, deep black arena on the left two-thirds for headline space.
  > Balanced, premium, poster-like. No text.

---

## Reused, no new asset needed
- The **"Why Boadman" section wash** reuses `images/tournament-shooter.png` as a faint parallax
  background. No separate file required.

## Already provided (no generation needed)
- `boadman-logo.svg` — existing Spartan-helmet + wordmark logo. Ships as-is.
- `favicon.svg` — created in this build (coral helmet mark on near-black). Replace only if you
  want it to match final brand art.

## After you add the images
Nothing else to wire up: filenames match the `<img>` `src` values in `index.html`. If a file is
missing or misnamed, the page falls back to its HUD placeholder (showing the expected path), so
broken links never ship as ugly broken-image icons.
