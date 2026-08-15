# Boadman for Brands and Publishers

**A marketing brief for whoever is designing these two pages.** It gives you the
proposition, the proof behind it, the numbers you can put on screen, and the few things
we cannot say. Everything here was verified against the product.

Boadman is in active development. **Sell what Boadman offers** — the mechanics below are
real and specified, and describing them is ordinary marketing. The one hard line is
evidence: no invented metrics, no partner or studio logos, no case studies, no
testimonials. Nobody has onboarded yet, so all of that would be fiction. Everything else
is fair game.

---

# Part 1 · Brands

## Who you are writing for

A marketing lead with a budget, deciding whether esports is a real channel or a money
pit. They have been pitched "reach" before and got a screenshot of a Twitch stream. They
are asking three questions: **can I measure it, is it safe to be next to, and where does
my money actually go?**

Boadman happens to have unusually good answers to all three.

## The proposition

> **Put your money in the prize pool, not in an agency's pocket.**

A brand funds a competition, and players compete for that money. There is no
impression-buying, no ad inventory, no interpretive dance about reach. The spend *is*
the prize.

Two ways to do it:

**Host your own.** A branded competition, your name on it, your prize, your rules. You
choose the prize, the entry fee, the format and the size.

**Back someone else's.** Sponsor a competition that already exists and put your money
into its pool.

## The four things worth building the page around

**1 · Sponsor a competition and we take nothing.**

When a brand sponsors, **100% of the contribution goes into the prize pool.** Boadman
takes no commission on sponsorship at all. Every coin a brand puts in is a coin a player
can win.

This is the strongest, most unusual fact in the entire offering and it is currently
stated nowhere. It should probably be the headline.

**2 · Every coin is a line item.**

A brand gets a complete, typed, referenced ledger: prize escrowed, commission charged,
creation fee, releases, refunds, entry-fee share. Not a dashboard of soft metrics — an
auditable financial record you could hand to finance.

For a marketing lead who has to justify spend internally, this is worth more than
impressions, and almost nobody in this category offers it.

**3 · The money is locked before anyone plays.**

A brand funds the whole prize upfront, before a single player joins. It sits in escrow.
Players can see the pool is real, which is exactly why they enter — and the brand's money
is doing visible work from the moment it lands.

**4 · Your competitors cannot buy their way in either.**

Every brand passes full business verification — company registry, directors, beneficial
owners — before a single coin moves. There is no fast lane, no advisory mode, no bypass.

Frame this as the quality bar, not as friction. A brand's real fear is being on a
platform next to something embarrassing. The honest answer is that everyone in here was
checked, and that checking is why onboarding takes a moment.

## The numbers you can put on a page

Commission is charged **on top**, never taken out of the prize. What the brand advertises
is exactly what the winner competes for.

| | |
|---|---|
| Platform commission, brand-hosted | **15%**, on top of the prize |
| Competition creation fee | **10 coins**, flat |
| Commission on sponsorship | **Zero** |
| Coin rate | 1 coin = **10p** |

**Worked example.** A £1,000 prize costs **11,510 coins ≈ £1,151** — the prize, plus 15%,
plus the flat fee. Nothing is deducted from the £1,000 the players see.

**Cancel before it starts** and the prize and commission both come back. **Cancel after
it has started** and the prize returns but the commission does not.

Rates are read live from platform config, so quote them **qualified in the same
sentence** ("commission is currently 15%") rather than as a fixed number in a headline.

One thing to be straight about rather than bury: **brand wallets are closed-loop.** Money
that goes in is spent on Boadman; there is no cash-out. A brand should know that before
funding, not after.

## The journey, and how to sequence the CTA

Sign up → verify email → company details → declare your directors and owners → business
verification → approved.

Approval is a human decision and nothing is auto-approved. So the CTA is **"Apply"**, not
"Get started in minutes". Set the expectation that this is a vetted onboarding, because
that is the same fact as selling point 4.

**Route:** `/signup-brand`

## What a brand gets after a competition runs

The ledger, the competition's public page, and a list of everything they have hosted with
status and entrant counts.

**Do not design campaign analytics.** No reach, no impressions, no audience demographics,
no exportable reports. Designing a metrics dashboard would be designing a promise nobody
can keep. The auditable ledger is the honest and genuinely stronger story.

---

# Part 2 · Publishers

## Who you are writing for

Someone at a game studio deciding whether to let competitive wagering happen on their
title. They are weighing a revenue line against brand safety, and their instinctive
objection is *"you will put my game next to something embarrassing and I will find out
from Twitter."*

## The proposition

> **Your game earns while other people run the competitions. It costs you nothing, and
> one switch stops it.**

A studio registers a title and takes a share of what Boadman earns on every competition
played on it. No listing fee, no revenue share paid to us, no minimum commitment, no
work.

## The four things worth building the page around

**1 · It pays out of our cut, not yours.**

The royalty is **15% of Boadman's commission** — our own revenue line. It does not come
out of the prize pool, the entry fees, or anything a player pays. The studio is not
taxing its own community.

Be precise here, because the distinction is the whole point: it is a share of *our
commission*, not of the pot.

**2 · Zero cost, zero work.**

No fee to list. No revenue share to us. No minimum. No integration, no SDK, no build.
Register the title and it is live in the catalogue.

**3 · One switch. New competitions stop.**

Two independent kill switches per title — one for tournaments, one for 1v1 — and the
studio holds them. Flip one and no new competition starts on that title.

Be straight about the boundary: it stops **new** competitions; anything already running
finishes. That is honest and still reassuring, and it is the direct answer to the brand
safety objection.

**4 · One publisher per title, permanently, first come.**

Registering a title makes that account its publisher of record — one owner, permanent.
That is real, it is a genuine reason to move early, and it is worth saying plainly.

## The numbers

| | |
|---|---|
| Royalty | **15% of Boadman's commission** |
| Cost to publisher | **Nothing** |
| Minimum before a payout | **500 coins (£50)** |
| Coin rate | 1 coin = **10p** |

**Worked example.** A tournament with a £100 prize: the host pays £100 plus £12
commission plus the flat fee. Boadman's commission is £12. **The publisher earns £1.80.**

Use a realistic example rather than a flattering one. The pitch is a passive, zero-cost,
zero-effort line on titles a studio already owns — not a windfall — and a studio will do
this arithmetic in about four seconds. Getting caught inflating it costs more than the
honesty does.

Two mechanics worth mentioning: **tournament royalty accrues when the competition is
created**, before anyone plays, and it is not clawed back if the tournament is cancelled.
Challenge royalty accrues at settlement.

## The journey

**You do not need a new account.** Publisher is a capability, not a separate account type
— a verified player account or an approved brand registers a title and becomes its
publisher. Royalty accrues into a separate balance on the wallet they already have.

That is a genuinely lower-friction pitch than "create a publisher account" and it should
be leaned into.

**Route:** `/waitlist/publishers` — the only publisher door that exists today.

## Two things to design around

**There is no publisher dashboard yet.** No royalty screen, no kill-switch toggle, no
game management page. The mechanics all work through the API; the studio-facing surface
is deferred. So describe the deal in full, and let the CTA be the waitlist. **Do not mock
up a studio console** as though someone could log into one this week.

**Do not say a licence has been granted.** Describe the money and the switches — both
real, both checkable. The rights relationship has no instrument behind it yet, so the
page must not state or imply that registering a title grants Boadman a licence. This one
is not negotiable and is with counsel.

Also absent, so do not promise them: royalty statements, per-competition breakdowns,
publisher credit anywhere a player can see, cover-art upload, and multi-seat access.

---

# Part 3 · House rules for both pages

- **No fabricated proof.** No partner or studio logos, case studies, campaign results,
  testimonials, or named companies. Nobody has onboarded; all of it would be invented.
- **No regulatory claims.** No registration, licensing or supervision claim — the licence
  position is unresolved. No self-classification against gambling law, including the
  favourable one.
- **No earnings framing.** Royalty and entry-fee share are mechanics, not income. Nothing
  presented as typical, achievable or projected.
- **Rates qualified in the same sentence.** They are server-configured and can move.
- **18+, a risk-of-loss line beside the first money figure, and the responsible-play
  block** still apply. These are public pages.
- **Real routes only.** `/signup-brand` for brands, `/waitlist/publishers` for
  publishers. There is no publisher signup route.
- **No game titles or game artwork.** We hold rights to no game. Genre language (FPS,
  strategy, racing, fighting, sports, puzzle) and genuinely unbranded games such as Chess
  are fine. Original commissioned creatives are in `design-alternatives/genre/`.

## The line to hold

Both pages sell a proposition backed by real mechanics. Escrow, the ledger, the
zero-commission sponsorship, the royalty share, the kill switch — every one of those is
specified and checkable, and together they are a stronger pitch than reach numbers
nobody believes.

What we do not do is manufacture evidence that someone has already taken the deal.
