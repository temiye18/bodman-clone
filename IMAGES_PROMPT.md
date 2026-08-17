# IMAGES_PROMPT.md — Boadman art brief

Generate each image below, name it **exactly** as the `File` line says, and drop them into an
`images/` folder next to `index.html`. The page already references these paths and shows a
HUD placeholder until the real file exists, so you can add them one at a time.

## Brands & Publishers pages (added 2026-08-14)

Same global art direction below. **No game titles, no game artwork, no real logos or company names**
(house rule). Genre and abstract concepts only. Each `<img>` has an `onerror` fallback, so the page
works before these exist. Absolute `og:image` URLs already point at `images/og-brands.png` and
`images/og-publishers.png` on the deployed origin.

- **File:** `images/brands-hero.png` · 4:5-to-16:9 hero, ≥ 1600 × 1200 px. Also reused as the mid-page
  band and the landing "For brands" teaser wash, so keep it strong on the right, darker on the left.
  - **Prompt:** [Global art direction] + A brand's money becoming a glowing prize pool: stacks of
    abstract coral-lit coins/energy pouring into a bright escrowed vault or arena podium, a sponsor's
    empty banner space (blank, no logo) lit by ember light, boardroom-meets-arena mood. Confident,
    premium, financial-grade. Left third falls to near-black for a headline. No text, no logos.
- **File:** `images/publishers-hero.png` · same sizing. Reused as band + landing "For publishers" wash.
  - **Prompt:** [Global art direction] + A studio's catalogue as glowing abstract genre tiles
    (shooter, strategy, racing, fighting, chess) floating in a dark server-room / arcade hall, a
    single prominent kill-switch lever throwing coral light, sense of many competitions running on
    one platform. No recognisable game characters, no real titles, no logos. Left third darker for text.
- **File:** `images/og-brands.png` · exactly 1200 × 630 px.
  - **Prompt:** [Global art direction] + Wide cinematic banner: coral coins flowing into a bright
    prize vault on the right, deep black on the left two-thirds for a headline. Premium, poster-like. No text.
- **File:** `images/og-publishers.png` · exactly 1200 × 630 px.
  - **Prompt:** [Global art direction] + Wide cinematic banner: abstract genre tiles and a glowing
    kill-switch lever on the right, deep black on the left two-thirds for a headline. No text, no logos.

## Player dashboard / app pages (added 2026-08-17)

These are the tournament **cover** and **detail-hero** images for `dashboard.html`,
`tournaments.html`, and `tournament-detail.html`. **Deliberately different rule from the marketing
pages: these do NOT have to be coral/ember.** Tournament art should be varied and vivid — each game
gets its own palette so the grid reads like a real games library (see the reference: a wall of
distinct, colourful covers). The near-black Boadman shell frames them, so the colour lives inside
the artwork and the UI stays disciplined.

Every `<img>` has an `onerror` that falls back to the existing coral `tournament-*.png`, so the
pages already look finished — generate these to upgrade the covers to their own palettes, one at a
time. **Still house-safe:** invented game names only, no real titles/characters/logos, no
casino/gambling motifs, no under-18 implication. Landscape **16:9**, ≥ 1600 × 900 px unless noted.

### App art direction (paste into the four cover prompts)
> Vivid competitive-gaming key art, cinematic and high-contrast, photoreal-meets-game-render with
> fine haze and airborne particles, subtle film grain. One strong subject, dramatic rim lighting in
> THIS cover's own palette (stated per image). Composition works as a 16:9 card that will be topped
> by a dark gradient scrim (bottom ~45% darkens for the title), so keep the subject in the upper two
> thirds and avoid important detail along the very bottom edge. No text, no logos, no watermarks, no UI.

- **File:** `images/cover-rocket-fury.png` · 16:9. Game: *Rocket Fury* (rocket-powered arena combat).
  - **Palette:** molten coral-and-gold with deep charcoal — the one cover that stays close to house colour.
  - **Prompt:** [App art direction] + Two armoured brawlers colliding mid-air above a fire-lit combat
    arena, jet-thrust trails and sparks bursting on impact, silhouetted crowd far below in darkness,
    dramatic backlight. Frozen high-energy moment. Molten coral and gold rim light.
- **File:** `images/cover-neon-circuit.png` · 16:9. Game: *Neon Circuit* (night-street racing).
  - **Palette:** electric **teal + magenta** on wet black tarmac (intentionally NOT coral).
  - **Prompt:** [App art direction] + A hypercar mid-drift on a wet neon night circuit, tail sliding,
    spray and sparks streaking, teal and magenta reflections rippling across the tarmac, motion blur,
    rain haze, shallow depth of field, dynamic three-quarter rear angle.
- **File:** `images/cover-iron-vanguard.png` · 16:9. Game: *Iron Vanguard* (mech / tactical warfare).
  - **Palette:** cold **steel-blue + cyan** with warm amber cockpit glow for contrast.
  - **Prompt:** [App art direction] + A towering battle-mech striding through a rain-soaked industrial
    warzone at dusk, floodlights raking through smoke, cyan targeting glow, sparks off its armour,
    heavy cinematic scale, low heroic angle. Cold steel-blue palette, one warm amber cockpit light.
- **File:** `images/cover-shadow-protocol.png` · 16:9. Game: *Shadow Protocol* (stealth tactical shooter).
  - **Palette:** deep **violet + acid-green** night-vision accents on near-black.
  - **Prompt:** [App art direction] + A lone armoured operative moving through a dark rain-slick alley
    lit by a single sign, silenced weapon low, thin haze catching violet backlight and faint
    acid-green tech glow, tense cinematic side angle, face obscured by a helmet. Moody, quiet, precise.

### Detail hero (wide)
- **File:** `images/detail-continental-clash.png` · **21:9 ultra-wide**, ≥ 2200 × 950 px.
  - **Placement:** the tournament-detail hero banner. A left-to-right scrim fades the **left ~45%**
    into near-black for the title, badges, and buttons — so keep the subject in the **right half**
    and let the left fall dark. This is the *Rocket Fury* flagship "Continental Clash", so match
    `cover-rocket-fury` (molten coral-and-gold).
  - **Prompt:** [App art direction] + Wide cinematic banner of a champion brawler in matte tactical
    armour standing victorious on a fire-lit arena stage, embers and light-shafts behind, distant
    silhouetted crowd, molten coral-and-gold rim light. Subject on the right third; left half falls
    into near-black for a headline. Epic, poster-like, premium. No text.

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
- **Spectate Mode** (the full-screen arena broadcast) reuses the three `tournament-*.png` images.
  It already works. The stills below are an OPTIONAL upgrade only.

## 6 — OPTIONAL: Spectate Mode broadcast stills (only if you want extra polish)
These are full-screen, so they want a **16:9 landscape** crop with the subject high/centered and
**darker negative space along the bottom third** (the live HUD, scoreboard, and title sit there).
Generate them only if you want the broadcast to look sharper than the reused card crops; the tell
me and I'll repoint the scenes. If a file is missing, the scene falls back to its gradient.

### 6a — Racing
- **File:** `images/spectate-racing.png` · 16:9, ≥ 1920 × 1080 px.
- **Prompt:**
  > [Global art direction] + Wide cinematic shot of a hypercar mid-drift on a wet neon night
  > circuit, sparks and spray trailing, coral and magenta reflections streaking the tarmac, motion
  > blur, deep track perspective. Car in the upper-center; bottom third falls into near-black for a
  > broadcast overlay. No text, no logos.

### 6b — Shooter
- **File:** `images/spectate-shooter.png` · 16:9, ≥ 1920 × 1080 px.
- **Prompt:**
  > [Global art direction] + Wide cinematic shot of an armored operative advancing through a
  > smoke-filled ruin, coral rim light and muzzle glow, dust and haze, dramatic side angle.
  > Subject upper-center; bottom third darker for a broadcast overlay. No text, no logos.

### 6c — Fighting
- **File:** `images/spectate-fighting.png` · 16:9, ≥ 1920 × 1080 px.
- **Prompt:**
  > [Global art direction] + Wide cinematic shot of two fighters clashing at the center of a
  > fire-lit arena, embers and sparks bursting on impact, dramatic backlight, silhouetted crowd far
  > behind in darkness. Action upper-center; bottom third darker for a broadcast overlay. No text.

## Already provided (no generation needed)
- `boadman-logo.svg` — existing Spartan-helmet + wordmark logo. Ships as-is.
- `favicon.svg` — created in this build (coral helmet mark on near-black). Replace only if you
  want it to match final brand art.

## After you add the images
Nothing else to wire up: filenames match the `<img>` `src` values in `index.html`. If a file is
missing or misnamed, the page falls back to its HUD placeholder (showing the expected path), so
broken links never ship as ugly broken-image icons.
