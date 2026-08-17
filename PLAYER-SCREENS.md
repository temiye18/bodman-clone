# Boadman · Player screens

**A map of every screen a signed-in player can reach, and what each one shows.** Written
for designing them, so it stays at the level of "what is on this page and what can you do
here" rather than how it is built.

Fifteen screens plus one public page. The player's whole world is: find a competition,
put coins into it, play, get paid.

---

## The shell every screen sits in

- **Navigation rail** down the left, with the Boadman mark at the top of it. The mark
  lives in the rail, never in the page header.
- **Header** across the top: search, a notification bell that shows a dot when something
  is unread, and the player's avatar.
- **Wallet balance** is visible in the rail, so a player always knows what they have to
  spend.

Two conditions can take over any screen:

- **Cash-out frozen.** A compliance banner appears and cash-out is blocked. The rest of
  the product still works — they can play, they just cannot take money out.
- **Account suspended or banned.** The player is bounced to a dedicated page and cannot
  reach the app at all.

---

# The screens

## 1 · Dashboard

*The landing pad after signing in. "What needs me, and what's happening?"*

- **Greeting hero** — their name, their coin balance, and two calls to action: buy coins,
  find a competition.
- **Attention queue** — the things waiting on them: a challenge to accept, a result to
  submit, a prize matured. *(Not yet wired to real data.)*
- **In-flight competitions** — what they are currently in.
- **Recent activity** — their last four wallet movements.
- **Quick play** — a shortcut to start something.
- **Top live pools** — the three biggest prize pools open right now.

Design for the **brand-new player** as the default: no competitions, no activity, empty
attention queue. That is what most people see on day one, and it is the state that
decides whether they stay.

## 2 · Games

*Browse the titles you can compete on.*

A grid of game cards. Each shows the **game's artwork**, the **formats supported** on it
(1v1, tournaments), **two live counts** — how many tournaments and how many challenges
are running on it right now — and a button through to that game's competitions.

**Important:** the catalogue is **currently empty**, and games only appear once a
publisher registers a title. Cards also have **no artwork** until a publisher supplies
it. So the art-free card and the empty grid are the states to design first, not the
afterthought.

## 3 · Tournaments hub

*The main place to find something to enter.*

- **Hero** — title, a line of explanation, and buttons to host one or see your own.
- **Filter row 1** — game chips.
- **Filter row 2** — status chips (open, live now, brand-hosted, joinable for me), plus
  entry-fee and sort controls.
- **Card grid**, one to three columns depending on width.
- **Load more** at the foot.

Every filter is in the URL, so any view is a shareable link.

### What a tournament card shows

| | |
|---|---|
| Artwork | The game's cover, or a neutral brand fill when there is none |
| State | Open · Live · Starting soon |
| Game | The title it is played on |
| Name | The competition's own name |
| Host | Player-hosted, brand-hosted, or Boadman, with the host's name |
| Prize pool | What is in the pot now |
| Guaranteed | What the host put up before anyone entered |
| Entry | The fee, or **Free** |
| Players | Entered against capacity, e.g. 24/32 |

The card needs to survive: **no artwork**, **no cap** (uncapped entry), **free entry**,
and **a very large prize** — a pool can run to seven figures and is never abbreviated.

## 4 · Tournament detail

*The deepest screen in the product. Everything about one competition, and every action.*

Sections, top to bottom:

- **Breadcrumb** back to the hub.
- **Hero** — artwork, name, game, host, and the current state.
- **Schedule strip** — when registration closes, when it starts, when it ends.
- **Key numbers** — prize pool, what the host guaranteed, entry fee, players entered.
- **Prize breakdown** — how the pot splits across places.
- **Roster** — who has entered.
- **Podium** — the winners once it is over, with empty places before then.

**Five states, and they change the page substantially:**

| State | What it feels like |
|---|---|
| Registration open | Join, see who's in, watch the pool grow |
| Starting soon | Registration closed, minimum met, waiting to begin |
| Live | In progress, lobby details visible to entrants |
| Completed | Podium, final placings, prizes in their 48-hour hold |
| Cancelled | A notice explaining why, and what happened to the money |

**What a player can do here:** join, check in once it starts, withdraw before it locks,
sponsor the prize pool, and file a complaint during the hold window after it finishes.

**If they are the host, they get a control panel instead:** publish lobby details,
message everyone entered, record the winners, extend the deadline once, cancel.

## 5 · Host a tournament

*A five-step wizard.*

1. Game and name
2. Stakes — entry fee, minimum and maximum players
3. Schedule — when registration closes, when it ends
4. Prize pool — what they are putting up
5. Review and submit

The review step must show the **flat creation fee** and note that identity verification is
required. There is also a **"I want to compete in this"** option, which enters the host
into their own competition.

Costs are charged **on top** of the prize, never taken out of it — so the prize the host
advertises is exactly what players compete for.

## 6 · Challenges hub

*1v1. Both players stake coins, winner takes the pot minus commission.*

- **Hero** with a "new challenge" call to action.
- **Four tabs** — Received, Sent, Active, Completed. The tab is in the URL.
- **Rows**, each showing the **opponent**, the **game**, the **wager**, and actions that
  change by tab: accept or decline an incoming one, cancel one you sent, open an active
  match, view a finished one.

Design all four empty states. "Received" being empty is the normal state for most players
most of the time.

## 7 · New challenge

Pick an opponent, pick the game, set the wager, send it. The wager is locked out of the
challenger's balance the moment they send it, so the form should make that consequence
obvious before they commit.

*Opponent search is still being wired, so design a graceful state for it.*

## 8 · Match room

*Where a 1v1 actually happens. The most emotionally loaded screen in the product.*

- **Versus hero** — both players, their avatars, and the amount each has staked. The
  centre divider carries the state: neutral while playing, red if disputed, green with
  the final score when it is done.
- **A body that changes with state**, below.

| State | What is on screen |
|---|---|
| Active | Play the match, submit your score, deadline counting down |
| Awaiting result | You have submitted, waiting on your opponent |
| Under review | Both submitted, an admin is confirming |
| Disputed | Submissions disagreed. Banner explaining what happens next |
| Completed | Final score, the pot, what was deducted, prize in its 48-hour hold |

Two things must always be honest here: **the pot** (if the amount is not known, show a
dash, never a zero), and **what the winner actually receives** after commission.

## 9 · Wallet

*The money screen.*

- **Vault card** — the balance, presented as the hero of the page.
- **Stats column** — held, spendable, and other key figures.
- **Prize holds** — a stack of prizes in their 48-hour window, each with time remaining.
- **Activity table** — the full ledger, every movement typed and dated.

**Frozen variant:** when cash-out is frozen, a compliance banner sits at the top and the
cash-out route is disabled. Everything else still renders, so the player can see what
they would normally be able to do. The copy is deliberately plain — "cash-out frozen
pending review", not "temporarily unavailable".

## 10 · Buy coins

Currently a **"coming soon"** notice while the payment provider is settled. The full
purchase flow is built behind it and will return. Design the eventual flow, but know that
what ships today is the notice.

## 11 · Cash out

Three panes:

1. **Amount**, with a live fee preview
2. **Destination** — pick from verified payout methods
3. **Confirmation** — a receipt, noting that payouts are dispatched manually

**Frozen variant:** the form is replaced by the AML banner. The rest of the page stays
visible so the player can still see the process they are locked out of.

## 12 · Payout methods

Manage where money can go. List of verified destinations, add a new one, remove one.
**Limit three.**

The rule that shapes this screen: **money only leaves to an account in the player's own
legal name.** The form needs to make that unmissable, because a name mismatch means the
payout does not happen.

## 13 · Disputes and complaints

*One inbox, two kinds of case.*

- A **dispute** contests a 1v1 result, raised within 48 hours of submission.
- A **complaint** contests a held prize during its 48-hour window, and can only be raised
  by someone else who was in that competition.

Screen has: a heading with a "file a complaint" action, **filter chips** (all open,
disputes, complaints, resolved), **case rows** with state and time remaining, an **empty
state per filter**, and an **explainer card** at the foot describing how both processes
work.

Worth designing carefully — a player arrives here annoyed, and the explainer is doing real
work.

## 14 · Notifications

Title row with an unread count and a "mark all read" action, **filter chips**, and a list
of messages with per-category tone and a deep link into whatever the message is about.

On failure it shows an empty state rather than sample messages.

## 15 · Profile

**Four tabs, one page:**

1. **Profile settings** — display name, phone, the details that are locked, and
   communication preferences
2. **Identity verification** — current level, the steps, what each outcome means
3. **Rectification** — request a correction to a locked field
4. **Data rights** — export everything, or delete the account

Tab 2 is the one to design most carefully. Verification is a gate on cashing out, so the
player needs to understand where they are, what is next, and why.

---

## Public tournament page

`/p/tournament/{id}` — the same competition, seen by someone with no account. **This is
the page that gets shared**, so it is often a player's first ever view of Boadman.

Same content, minus the navigation rail, header, wallet, and every action. Join, manage
and settle are replaced by a single **sign up to compete**.

---

# Notes that apply everywhere

**Design the empty and absent states first.** A brand-new player has no competitions, no
activity, no notifications and no history. The catalogue is empty until publishers arrive.
Sections can vanish entirely when data cannot be fetched. These are not edge cases here —
they are the default, and a layout that only works when full will look broken in
production.

**Never show a zero where the answer is unknown.** A real zero and a missing value must
look different — show a dash. This came from a match room that once displayed "0 COIN
POT" over a pot holding real money.

**Money has rules.** Figures line up in columns, always carry their unit, and prizes are
never shortened — `12,400 coins`, not `12.4k`. Fees and commission are shown separately
from the prize, never blended into it.

**Time matters and should feel like it.** The 48-hour hold, the registration deadline, the
result deadline, the check-in window. Countdowns need a designed expired state, not a
frozen or negative number.

**Say the real thing.** Anything about money being frozen, held, reviewed or suspended is
written plainly. No softening.

**Non-players get bounced.** Brand and admin accounts are redirected out of these screens
entirely — every screen here is for players only.
