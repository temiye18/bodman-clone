# Boadman — Brand Identity & Design System

> **Status:** v4 · Updated 2026-08-13 · Immersive rebuild + impeccable animate/delight/polish passes.
> This document now describes what was built, not just what was proposed. Tokens, type, motion,
> and sound below match the code. Companion files: `PRODUCT.md` (positioning), `IMAGES_PROMPT.md`
> (art brief), `boadman-logo.svg` (logo), `favicon.svg`.

---

## 1. Thesis

**Built like a bank. Plays like an arena.**

Boadman's own line, and the engine of every decision. The design resolves two worlds at once:
financial-services rigor (escrow, ledgers, audit trails, named payouts) wearing a cyber-military
esports HUD (live feeds, countdowns, targeting brackets, ember light). It must reassure a
compliance officer and thrill a ranked player in the same frame.

**Discipline is the brand.** Heat (coral) is earned and rare: it marks what is live, staked, or a
primary action. Everything else stays bank-grade calm so the live things actually read as live.

---

## 2. Positioning & voice
See `PRODUCT.md` for full positioning. Voice in one line: **the disciplined competitor** — plain,
specific, names the mechanism instead of selling the vibe. Compliance is stated as a feature, not
a disclaimer. Honest about launch stage (real low numbers, framed as transparency).

Copy rules enforced in the build: no em dashes, no marketing buzzwords, active voice, sentence
case for prose, caps only for short HUD labels/headlines. Words we use: stake, escrow, hold,
mature, clear, redeem, verify, dispute, arena, named. Words we avoid: bet, gamble, jackpot,
guaranteed, seamless.

---

## 3. Typography (shipped)

Two families on a real contrast axis, chosen to echo the heavy industrial `BOADMAN` wordmark.
**IBM Plex is deliberately not used** (it was in the v1 proposal; the brand register flags it as a
default, and the logo calls for something more industrial).

| Role | Family | Weights | Used for |
| --- | --- | --- | --- |
| Display / body | **Saira** | 400–900 | Headlines (800–900), section titles, body copy. Wide industrial grotesque; structural match to the wordmark. |
| HUD / data | **Chakra Petch** | 400–700 | Eyebrows, labels, stats, coin amounts, countdowns, nav, chips, buttons. Squared cut-corner cyber face; carries all tabular numerals. |

- Loaded from Google Fonts. `--f-display` / `--f-body` = Saira; `--f-hud` = Chakra Petch.
- Hero display: `clamp(2.9rem, 8.5vw, 6rem)`, weight 900, letter-spacing `-.03em`, line-height .94.
- Every numeric value (coins, £, timers, fees, thresholds) is Chakra Petch with `tabular-nums`.
- Body text ≥ 4.5:1 on the dark base; headings use warm off-white `--bone`, not pure white.

---

## 4. Color system (shipped tokens)

Committed dark strategy. Near-black arena base + coral/ember accent + a functional status set.
Exact tokens as coded in `:root`:

### Neutrals — the arena
| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#0A0A0C` | Page base |
| `--ink-2` | `#0C0C10` | Ticker, recessed bands |
| `--panel` | `#131319` | Cards, stat grid, steps |
| `--panel-2` | `#17171F` | Raised/hover surface |
| `--panel-3` | `#1E1E28` | Deep hover, outline number fill |
| `--line` | `#26262F` | Hairlines, grid, dividers |
| `--line-2` | `#34343F` | Brighter borders, ghost buttons |
| `--bone` | `#F5F3EC` | Headings, high-contrast text |
| `--text` | `#C7C7D1` | Body |
| `--muted` | `#8C8C97` | Labels, secondary |
| `--faint` | `#5A5A65` | Fine print, ticker dividers |

### Arena accent — heat
| Token | Hex | Use |
| --- | --- | --- |
| `--coral` | `#FF3D1F` | THE accent: primary CTAs, live dots, hot figures, focus of the eye |
| `--coral-2` | `#FF6038` | Hover/lift |
| `--coral-deep` | `#C7301A` | Gradient base under white button text (keeps AA) |
| `--coral-ghost` | `rgba(255,61,31,.12)` | Tint washes |
| `--ember-a/b/c` | `#FFA700` / `#FF3F00` / `#A30300` | Logo ember gradient; the "Join Boadman" ember CTA |

### Status ledger
| Token | Hex | Meaning |
| --- | --- | --- |
| `--open` | `#34E39B` | Operational / open / cleared (system-status pulse) |
| `--soon` | `#F5B53D` | Starting soon / hold / responsible-play note |
| `--live` | `#FF3D1F` | Live / heat |
| `--escrow` | `#5B8DEF` | In-transit; also the focus-ring color |

**Contrast note:** primary buttons use a `--coral → --coral-deep` gradient with white text so the
effective ratio clears AA for large bold text. The ember CTA uses near-black text on hot ember
(high ratio). Status colors always pair with an icon or text label, never color alone.

---

## 5. Signature system — the HUD

The page is dressed as a live operations console. Recurring devices (defined once, reused):
- **Corner brackets** (`.bracket`) on the hero media, status panel, and CTA — targeting-reticle framing.
- **Chamfered clips** (`clip-path` cut corners) on buttons, media, and the CTA box.
- **System-status panel** with an animated `<svg>` EKG waveform reading "Operational".
- **Live ticker** marquee of tournaments under the hero.
- **Ember particle canvas** drifting behind the hero.
- **HUD labels** in Chakra Petch with wide tracking and `//` separators.
- **Custom reticle cursor** (desktop, pointer:fine) that grows over interactive elements.

The v1 "Stake Ticket" concept evolved into the **tournament cards + status chrome**, which carry
the same bank-meets-arena reading (ledger rows of coins/entrants + live countdowns and chips).

---

## 6. Layout
- Container `--maxw: 1280px`, fluid gutter `clamp(1.15rem, 4.5vw, 4.5rem)`, section rhythm
  `--sec-y: clamp(4.5rem, 9vw, 8rem)`.
- Hairline-driven structure: bordered grids (stats, how-it-works, features) rather than drop shadows.
- **Layered / asymmetric radius** is the signature shape: panels use a diagonal
  `var(--r-a) var(--r-b) var(--r-a) var(--r-b)` (≈`22px 5px 22px 5px`) so opposite corners are soft
  and the others tight. Buttons keep chamfer *cut* corners. Key panels carry a `.layered` offset
  accent frame behind them for depth. HUD corner brackets (`.bracket > .br`) on the CTA.
- Sections shipped, top to bottom: nav → full-bleed hero → live ticker → stats → how-it-works
  (4 steps) → live tournaments (carousel) → **cinematic "SKILL // STAKE // STATUS" band** → why
  Boadman + 5 features → 48-hour hold timeline → FAQ (accordion) → CTA → footer.
- Responsive: 4-col grids collapse to 2 then 1; nav links hide < 860px; sound label hides < 560px.

---

## 7. Motion (GSAP + ScrollTrigger + Lenis)
- **Lenis smooth scroll** (`lerp .09`) drives the whole page and is wired into GSAP's ticker +
  ScrollTrigger for the "another world" inertia feel. Anchor links use `lenis.scrollTo`. Disabled
  under reduced-motion (falls back to native/instant).
- **Full-bleed hero:** the squad art is the hero background, blended into `--ink` by layered
  gradient scrims (left for text, bottom to hand off to the next section). It parallaxes on scroll
  (scrub) and drifts on mouse for depth. A thin **scroll-progress bar** sits at the very top.
- **Cinematic band:** a full-bleed `arena-wide.png` divider ("SKILL // STAKE // STATUS") with its
  own scrub parallax and word-by-word reveal; falls back to a lit-arena gradient if the image is absent.
- **Section wash:** a faint, parallaxing image behind "Why Boadman" (reuses the shooter art), kept
  low-opacity so text stays AA.
- **Boot sequence:** "BOADMAN OS" overlay (progress bar + status log) wipes up and the hero does a
  slow camera-push (`scale 1.12 → 1`). Click-to-skip. `.js`-gated; never blocks no-JS users.
- **Hero intro timeline:** bg push + scrim fade, eyebrow → headline lines slide up from clipped
  rows → sub → CTAs → trust → status panel, then the headline words **scramble/decode**.
- **Scroll-scrub parallax** on hero bg, band bg, section wash, and each tournament card image.
- **Reveals:** per-section fade/slide + staggered children; **scramble** on section titles;
  **count-up** on the four stats; **magnetic** primary/ember buttons; **reticle** cursor; **ember
  canvas** + animated status waveform; **live countdowns** every second.
- **State-conveying motion** (impeccable `animate` pass): press feedback on every button
  (`:active` brightness), a **scroll-spy** that lights the current section's nav link, and an
  animated **sequence connector** (pulsing chevrons) between the how-it-works steps to make the
  01→02→03→04 flow legible.
- Every effect has a `prefers-reduced-motion` path: no Lenis, boot hidden instantly, no
  scramble/parallax/particles/marquee, content shown in place. Reveals use `gsap.from` so content
  is visible if JS or the CDN fails.

### 7b. Delight (earned, gaming-register appropriate)
- **Konami code** (↑↑↓↓←→←→ B A) triggers **Overdrive**: the ember field surges, the vignette
  flares coral, a HUD toast reads "⚡ Overdrive engaged", and a fanfare plays if sound is on.
  Auto-reverts after 6s. A discovery reward, not a blocker.
- **Sound-enable power-up:** enabling sound plays a rising power-up cue and shows a one-time toast.
- **Coin burst:** clicking "Join Boadman" scatters spinning `◈` coin particles (the only place it
  fires, so it stays special). Skipped under reduced motion.
- **Logo ember-flicker** on hover; **custom reticle cursor**; a **styled dev-console greeting**
  (brand voice, hints at the Konami code).

---

## 8. Sound (Web Audio, off by default)
- A synthesized sound engine (no audio files): SFX for hover, click, coin, and a UI tick, plus a
  generative **ambient music** bed (slow saw pad on a lowpass + sparse triangle arpeggio in a
  minor scale).
- **Off by default.** The nav "Sound off/on" toggle is the only thing that starts audio (respects
  autoplay policy and accessibility). When on, the toggle shows an animated EQ and `aria-pressed`
  flips. Master gain ramps in/out; SFX only fire while enabled.

---

## 9. Imagery
The page is deliberately image-heavy. Photoreal cyber-military key art: hero squad (full-bleed
background), three tournament scenes, a full-bleed cinematic band (`arena-wide.png`), a reused
section wash, and an OG cover. All briefed in `IMAGES_PROMPT.md`. Every `<img>` has an `onerror`
fallback (HUD placeholder or gradient), so a missing/renamed file never ships as a broken icon.
No casino/gambling imagery.

---

## 10. Accessibility floor (built in)
- WCAG AA contrast on body text and large UI text; status never color-only.
- Visible focus ring (`--escrow` blue, 2px, offset) on all interactive elements.
- `prefers-reduced-motion` fully respected (see §7).
- Sound off by default; toggle is keyboard-reachable with `aria-pressed`.
- Semantic landmarks, single `<h1>`, `aria-expanded` on FAQ, alt text on all images, reticle is
  decorative (`aria-hidden`, additive to the native cursor rather than replacing it).
- External scripts (GSAP, ScrollTrigger, Lenis) pinned with SRI (`integrity` + `crossorigin`).
- **Polish pass:** a keyboard **skip-to-content** link, press/hover/focus states on every control,
  legibility text-shadows over the hero photo, `loading="lazy"` + `decoding="async"` on all
  below-fold images (protects LCP/CLS), and a single console-greeting (no stray debug logs).

---

## 11. Verified content facts (in the build)
Coin = 10p · 1v1 12% · player tournament 12% · brand tournament 15% · frivolous dispute 5% ·
KYC L1 (>£200/30d deposit or any cash-out) · KYC L2 (>£2,000 single or >£5,000/rolling year) ·
48-hour prize hold · 5-year audit retention · © 2026 Boadman Ltd · 18+ only.
Launch-stage stats kept honest: 0 tournaments live · £45 prizes paid (30d) · 9 active players (30d) · 1 game.
Headline "Compete with discipline" · CTA band "SKILL. STAKE. STATUS. This is where competition lives."

---

## 12. Known follow-ups
- Visual QA in a browser was not run this session (Chrome extension was disconnected). Recommend a
  screenshot pass at desktop / tablet / mobile widths and a reduced-motion check.
- Generate and drop the five images from `IMAGES_PROMPT.md` into `images/`.
- Wire real destinations for nav/auth/tournament links (currently `#` placeholders).
- Optional: self-host the two fonts + GSAP for a fully offline, single-origin bundle.
