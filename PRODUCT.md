# PRODUCT.md — Boadman

**Register:** brand (landing page — the design *is* the product).

## What it is
Boadman is an AML-compliant, skill-based esports competition platform (18+). Players stake a
closed-loop coin (1 coin = 10p) on 1v1 challenges and single-match tournaments. Every stake is
escrowed, prizes sit in a mandatory 48-hour hold for disputes, and redemptions pay out only to a
verified bank account in the player's legal name. Regulated under the Money Laundering
Regulations as a financial-services operation, not a gambling licensee.

## Thesis
**Built like a bank. Plays like an arena.** Financial-grade rigor wearing a cyber-military
esports face. The design must feel trustworthy to a compliance officer and thrilling to a
ranked player at the same time.

## Audience
- Primary: 18+ competitive PC/console players burned by unpaid wagers elsewhere; they want proof of payout.
- Secondary: brands/sponsors running competitions; regulators/partners doing diligence.

## Emotion to land
Relief that this one is legit, delivered with adrenaline. Trust with an edge. Not casino hype.

## Design direction (this revamp)
Futuristic, interactive, game-like HUD. Dark "arena" base, coral/ember accent from the logo,
heavy industrial display type, animated system-status chrome, live countdowns, sound.
Reference direction: `reference_1..3.png` (cyber-military esports HUD) — match and exceed.

## Brand assets
- Logo: `boadman-logo.svg` (Spartan-helmet emblem + heavy industrial "BOADMAN" wordmark;
  coral `#FF5733`, ember gradient `#FFA700 → #FF3F00 → #A30300`).
- Full identity + tokens: `BRANDING.md`.
- Image generation spec: `IMAGES_PROMPT.md`.

## Type (committed)
- Display / body: **Saira** (heavy weights for headlines — matches the wordmark).
- HUD labels / data / countdowns: **Chakra Petch** (squared cut-corner cyber face).
- IBM Plex is explicitly NOT used (reflex-reject; superseded by the logo-matched pair).

## Color strategy
Committed dark. Near-black arena base + coral/ember accent + a functional status set
(green = operational/cleared, amber = starting-soon/hold, red = live/frozen). See BRANDING.md §Color.

## Hard constraints
- No casino/gambling visual language (no dice, chips, jackpot glow, gold coin rain).
- 18+ and responsible-play messaging present and dignified.
- Accessibility floor: WCAG AA contrast, visible focus, `prefers-reduced-motion` respected, sound off by default.
- All numeric values (coins, £, countdowns, fees, thresholds) set in Chakra Petch tabular figures.

## Verified content facts
Coin = 10p · 1v1 12% · player tournament 12% · brand tournament 15% · frivolous dispute 5% ·
KYC L1 (>£200/30d deposit or any cash-out) · KYC L2 (>£2,000 single or >£5,000/rolling year) ·
48-hour prize hold · 5-year audit retention · © 2026 Boadman Ltd.
Launch-stage stats (kept honest): 0 tournaments live · £45 prizes paid (30d) · 9 active players (30d) · 1 game.
