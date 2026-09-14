# Product Requirements Document
## Personal portfolio website — Md. Zulqarnain Anjum, Data Analyst

| | |
|---|---|
| **Owner** | Md. Zulqarnain Anjum |
| **Version** | 1.0 |
| **Date** | 14 September 2026 |
| **Status** | Ready for build |
| **Target URL** | `sadatanjum.github.io` (custom domain optional, see §9.8) |
| **Design reference** | Dark-navy / amber personal site (5 screenshots supplied) |
| **Content source** | CV, September 2026 |

**How to use this document.** Sections 1–8 are the product and design brief. Section 9 is the technical specification. Section 12 contains copy-paste prompts for an AI coding assistant. Anything marked **`[CONFIRM]`** is a placeholder that needs a real number or asset from you before launch — do not let the site ship with invented figures.

---

## 1. Summary

A single, fast, static portfolio site that does two jobs at once: convince a hiring manager that you can own the reporting layer of a business, and convince a freelance client that you can be handed a messy dataset and come back with something useful.

The visual language is taken directly from the supplied reference — dark navy surfaces, a single amber accent, large low-contrast type, asymmetric two-column blocks, staggered project cards. The **content model is completely rebuilt**, because the reference sells a product designer and you are selling an analyst. A designer's portfolio proves itself with beautiful screens. An analyst's portfolio proves itself with a question, a method, and a measurable change. Section 5 maps every reference section onto its analyst equivalent.

---

## 2. Goals, non-goals, success metrics

### 2.1 Goals

| # | Goal |
|---|---|
| G1 | A recruiter can understand what you do and download your résumé within 15 seconds of landing. |
| G2 | A technical interviewer can reach real code (GitHub) and a real write-up for at least three projects. |
| G3 | A freelance prospect can understand what you sell, and start a conversation, without emailing blind. |
| G4 | Enquiries arrive pre-labelled as *job* or *freelance* so you know how to reply. |
| G5 | You can add a project or a note in under 10 minutes without touching layout code. |
| G6 | Loads fast and works on a mid-range Android phone on 4G — most of your Bangladesh-based traffic will be mobile. |

### 2.2 Non-goals (v1)

- No CMS, no login, no database, no server runtime.
- No dark/light theme toggle. The dark theme *is* the brand.
- No multi-language version.
- No blog comments, newsletter, or RSS-driven community features. (A plain RSS feed is fine and cheap — see §9.7.)
- No client dashboard, no gated content, no payment integration.

### 2.3 Success metrics

Instrument these from day one (§9.6). As a data analyst, being able to say *"I track conversion on my own site"* in an interview is itself a credential.

| Metric | Definition | Target (first 90 days) |
|---|---|---|
| Résumé downloads | Clicks on any `Download résumé` CTA | ≥ 40 |
| Work engagement | Sessions reaching a project detail page | ≥ 25% of sessions |
| Contact starts | Contact form field focused | ≥ 8% of sessions |
| Contact submits | Successful form submissions | ≥ 3% of sessions |
| Bounce on mobile | Sessions with no scroll past hero | ≤ 45% |
| LCP (mobile, p75) | Largest Contentful Paint | ≤ 2.0s |

---

## 3. Audiences and user stories

Three people arrive at this site. They want different things and they arrive at different speeds.

### P1 — Recruiter / HR screener (fastest, least technical)
Arrives from LinkedIn. Skims. Wants: job title, location, availability, years, tools, résumé PDF.

- As a recruiter, I want the résumé as a one-click PDF so I can attach it to an internal system.
- As a recruiter, I want to see "Dhaka, Bangladesh" and current availability so I can rule you in or out on logistics.
- As a recruiter, I want a scannable tool list so I can keyword-match against a job spec.

### P2 — Hiring manager / senior analyst (slower, technical, sceptical)
Arrives from the recruiter's shortlist or from GitHub. Wants: evidence you can reason about data, not just operate tools.

- As a hiring manager, I want one project explained end-to-end — the question, the data, the method, what changed — so I can judge your thinking.
- As a hiring manager, I want to see real code so I can check whether the work is yours.
- As a hiring manager, I want to know what you actually did at CarryBee versus what the team did.

### P3 — Freelance client / small business owner (least technical, most transactional)
Arrives from a referral, a marketplace profile, or a WhatsApp link. Wants: can you fix my specific mess, how long, how much, how do I start.

- As a client, I want to see named services in plain language so I can tell whether my problem is one you solve.
- As a client, I want to describe my problem in a short form rather than compose an email.
- As a client, I want some signal on engagement size and timeline before I commit to a call.

### 3.1 The dual-audience strategy — one site, two doors

The temptation is to build two sites, or a global "I'm hiring / I'm a client" toggle. **Do neither.** A global toggle doubles your content maintenance, splits your SEO, and forces a decision on a visitor before they know anything about you. Instead, segment at exactly three points:

1. **Hero** — two CTAs of unequal weight: `See my work` (primary) and `Download résumé` (secondary). A small availability pill states both modes in one line: *"Open to analyst roles · Taking freelance projects."*
2. **Work-with-me band** (§5.5) — two side-by-side cards, `For employers` and `For clients`, each with its own three bullets and its own CTA. This is the one place where the two audiences are addressed separately and explicitly.
3. **Contact form** — a required `What's this about?` selector (Job opportunity / Freelance project / Something else) that changes the follow-up fields and tags the submission in your inbox. This satisfies G4 at zero design cost.

Everything else — projects, experience, tools, notes — serves both audiences unchanged. Good project write-ups are equally persuasive to a hiring manager and a client.

**Optional enhancement (build last, cut if time-constrained):** in the Services section only (§5.3), a two-state segmented control that swaps the three card descriptions between an employment framing and a services framing. Scoped to one section, this is cheap. Do not extend it site-wide.

---

## 4. Information architecture

```
/                     Home (single scrolling page, all sections below)
├── #work             anchors into the featured project grid
├── #about
├── #notes
└── #contact

/work/                All projects (grid, filterable by tag)
/work/[slug]/         Project detail — the case study template (§5.6)
/notes/               All notes
/notes/[slug]/        Note detail
/404/                 Not found
/resume.pdf           Served from /public, direct download
```

**Navigation bar** (top right, matching the reference): `Work` · `About` · `Notes` · `Contact`, plus a `Résumé` link styled as a quiet outlined button. The active section carries the amber dot indicator from the reference. If Notes has fewer than two published posts at launch, remove it from the nav and hide the section — an empty section is worse than no section.

**Scroll order on home** (this is the narrative, and the order matters):

```
1  Hero                      who you are, what you do, two doors
2  Positioning + stats       the one-paragraph argument, three numbers
3  Services / capability      three cards, one highlighted
4  Tool wall                  logos, greyscale
5  Featured work              four staggered project cards
6  Work-with-me band          employers | clients
7  Experience timeline        CarryBee, Nexvix, Udvash, contracts
8  Testimonial                one quote  [conditional — see §5.9]
9  Notes                      three most recent  [conditional]
10 Contact                    split: pitch left, form right
11 Footer                     "Thanks for scrolling." + socials
```

---

## 5. Section specifications

Each subsection gives: **purpose**, **layout** (referenced to the supplied screenshots), **content** (drafted from your CV — edit the voice, keep the structure), and **acceptance criteria**.

---

### 5.1 Hero — *reference: screenshot 1*

**Purpose.** Establish name, discipline, location, and both availability modes in one screen. This is the only section where you may be bold; everything below it stays disciplined.

**Layout.** Full viewport height, minimum 640px. Three-part asymmetric composition:
- **Left third** — your name set very large across two lines, terminated with a full stop. Beneath it, a 64px × 4px amber rule. Below that, a vertical or horizontal row of social icons (GitHub, LinkedIn, Email).
- **Centre** — a cut-out portrait of you, bottom-anchored, bleeding off the bottom edge of the viewport, overlapping the name block. The overlap is what makes the reference hero work; do not place the photo in a neat box beside the text.
- **Right third** — eyebrow label, a three-line headline, a short paragraph, and the CTA pair.

**Content.**

- Eyebrow: `— Introduction`
- Name: `Zulqarnain` / `Anjum.` (two lines)
- Headline: **`Data analyst turning messy operations data into daily decisions. Based in Dhaka.`**
- Paragraph: *"I build the reporting layer that operations teams actually run on — SQL extracts, automated spreadsheets, and dashboards that answer the question before someone has to ask it. Currently analysing last-mile logistics at CarryBee Express, and reading for an MSc in Data Science at Jahangirnagar University."*
- Availability pill: `Open to analyst roles · Taking freelance projects`
- Primary CTA: `See my work` → `#work`
- Secondary CTA: `Download résumé` → `/resume.pdf`

**Portrait — this is a hard dependency.** The reference hero collapses without the cut-out figure. You need a photograph shot against a plain background, background removed, saved as a transparent PNG or WebP at ≥ 1600px tall. Shoot it in something with a little colour so you don't disappear into the navy. If you cannot produce this in time, use **Plan B** rather than a weak photo: drop the portrait, let the name run wider across two-thirds of the viewport, and place a single quiet visual to the right — a small animated line chart drawing itself once on load, built from one of your real datasets. This is arguably a stronger hero for an analyst anyway, and it is the one place a data-native visual earns its keep.

**Motion.** Exactly one orchestrated entrance on page load: name lines rise and fade in sequence (60ms stagger), amber rule draws left-to-right, right column fades. Total under 900ms. Nothing after that. Respect `prefers-reduced-motion: reduce` by rendering the final state immediately.

**Acceptance criteria.**
- Name, headline, both CTAs, and the availability pill are visible without scrolling at 390×844 (iPhone) and 1440×900.
- Résumé CTA downloads a PDF named `Zulqarnain-Anjum-Data-Analyst.pdf`.
- Portrait does not obscure any text at any breakpoint.
- Page load motion completes in ≤ 900ms and is fully suppressed under reduced-motion.

---

### 5.2 Positioning + stats — *reference: screenshot 2, top half*

**Purpose.** The reference uses this slot for a decorative creativity quote. Replace it with your actual argument, plus three numbers that a sceptic can check.

**Layout.** Two columns. Left: eyebrow `— What I do`, a short heading, a paragraph, and a mailto link with a trailing arrow. Right: a wider paragraph, then a horizontal row of three stats, each a large amber number with a two-line label beneath.

**Content.**

- Left heading: `Any type of data question, from a messy export to a live dashboard.`
- Left body: *"Send me the spreadsheet everyone's afraid of. I'll tell you what's in it, what's wrong with it, and what it's worth knowing."*
- Left link: `anjumsadat09082@gmail.com →`
- Right body: *"Most reporting problems aren't analysis problems. They're plumbing problems — the same numbers pulled by hand, reconciled by hand, and pasted into a deck by hand every morning. I fix the plumbing first, then the analysis gets interesting."*

**Stats — replace every value below before launch.**

| Slot | Proposed value | Label | Source | Status |
|---|---|---|---|---|
| 1 | `20+` | Distribution hubs monitored daily | Hub Transport Dashboard | Verified from CV |
| 2 | **`[CONFIRM]`** | % less manual reporting time | CarryBee / Hub Dashboard | **You must supply a real figure** |
| 3 | `4` | Analytics projects shipped | GitHub | Verified from CV |

Alternative third stat if you prefer a people-facing number: `3 yrs` / *Teaching and presenting to large groups* (Udvash, Feb 2022–Oct 2025).

> **Do not copy the reference's "14 years of experience / 187 satisfied clients."** Inflated numbers are the single fastest way to lose a technical reader, and a hiring manager who does the arithmetic against your graduation year will discard the whole site. Three honest, specific, checkable numbers beat six impressive ones.

**Acceptance criteria.**
- No stat renders if its value is missing — the component omits empty slots rather than showing a placeholder.
- Stat numbers use tabular figures so they align optically.
- The row becomes a 3-across scrollable strip, not a stack, at mobile widths.

---

### 5.3 Services / capability cards — *reference: screenshot 2, lower half*

**Purpose.** Name what you sell, in language a non-technical buyer recognises. The first card is highlighted in amber exactly as in the reference.

**Layout.** Three equal cards in a row. Card one has the amber fill; cards two and three use the elevated surface colour. Each card: icon (top-left), title on two lines, and a small meta line at the bottom.

**Critical accessibility correction to the reference.** The reference sets **white text on the amber card**, which measures **1.84:1** against `#FFAF29` — a clear WCAG failure and genuinely hard to read on a phone in daylight. Set the amber card's text in the deep ink colour `#242734` instead, which measures **8.07:1**. It looks equally sharp and it is legible. This applies to every amber-filled surface on the site, including buttons.

**Content.**

| Card | Title | Meta line | Icon |
|---|---|---|---|
| 1 (amber) | `Analytics & Reporting.` | SQL · daily reporting packs · KPI definition | bar chart |
| 2 | `Dashboards & Visualisation.` | Power BI · Tableau · Looker Studio · Apps Script | monitor |
| 3 | `Automation & Data Plumbing.` | n8n · Apps Script · advanced spreadsheets | workflow / zap |

Longer descriptions, shown on hover as a tooltip or simply as body text beneath the meta line — pick one, do not do both:

1. *"Pulling the numbers, checking them, and getting them in front of the people who decide. Recurring reports that don't need a human every morning."*
2. *"Dashboards people actually open. SLA tracking, drill-downs, and alert thresholds — built so the answer is one glance, not one query."*
3. *"Connecting the tools you already pay for. Forms to sheets to alerts to warehouse, without the copy-paste step in the middle."*

**Optional fourth card** if you want the applied-statistics work represented: `Applied Statistics & ML.` / *hypothesis testing · logistic regression · NLP*. Four cards break the reference's three-across rhythm — use a 2×2 grid at desktop if you add it, and drop the fourth on mobile.

**Optional audience switch.** A two-state segmented control above the cards, labelled `For employers` / `For clients`, swapping only the three longer descriptions. Employer framing emphasises ownership and collaboration ("I own the daily reporting pack for a 20-hub network"); client framing emphasises outcome and delivery ("You get a dashboard and a handover doc, typically in 2–3 weeks"). State is not persisted and is not reflected in the URL.

**Acceptance criteria.**
- Amber card text measures ≥ 4.5:1 against the amber fill.
- Cards are keyboard-focusable with a visible focus ring if they link anywhere; if they do not link, they are not focusable.
- Cards stack to a single column below 768px with the amber card first.

---

### 5.4 Tool wall — *reference: screenshot 2, logo row*

**Purpose.** Keyword-matching fuel for recruiters (G1) and instant credibility for clients. The reference shows client logos (IBM, BBC, Medium) — you do not have those clients, and inventing them is disqualifying. **Repurpose the same visual pattern for tools.** It reads honestly and serves the same scanning behaviour.

**Layout.** Two rows of greyscale logos at reduced opacity, centred, generously spaced. Opacity ~55%; no hover effect — these are not interactive.

**Content.** Row 1: Python, SQL / PostgreSQL, Power BI, Tableau, Excel. Row 2: Google Apps Script, n8n, Google Workspace, Git, Looker Studio.

Only include a tool you would be comfortable being tested on in an interview. If Tableau is a familiarity rather than a strength, move it to a "also worked with" line in the About section instead of the wall.

**Acceptance criteria.**
- Every logo is an SVG with a text `alt` attribute (`alt="Power BI"`).
- Logos wrap gracefully to three or four rows on mobile; no horizontal overflow.
- Total weight of the logo set ≤ 25KB.

---

### 5.5 Work-with-me band — *new section, no reference equivalent*

**Purpose.** The explicit dual-audience split (§3.1, point 2). This is the section that makes one site serve two goals without a toggle.

**Layout.** Two cards side by side, visually equal, separated by a hairline. Neither is amber — this is a fork, not a recommendation.

**Content.**

**For employers**
- Looking for: Data Analyst · Business Analyst · MIS / Reporting Analyst roles
- Based in Dhaka, Bangladesh · open to hybrid and remote
- Currently: Data Analyst Intern at CarryBee Express, MSc in progress
- CTA: `Download résumé` (secondary CTA: `Connect on LinkedIn`)

**For clients**
- Typical projects: reporting automation, dashboard build, one-off analysis with a written recommendation
- Engagements usually run 1–4 weeks; fixed scope, fixed fee
- Rates on request — send the problem, get a quote within two working days
- CTA: `Start a project` → scrolls to contact form with the *Freelance project* option pre-selected

On rates: publishing a number filters out low-budget enquiries but also caps you, and the Bangladeshi and international rates you can command differ substantially. *"Rates on request"* plus a fast turnaround promise is the right call for v1. Revisit once you have five completed freelance projects and know your floor.

**Acceptance criteria.**
- The `Start a project` CTA both scrolls to `#contact` and sets the form's subject selector to `Freelance project`.
- Cards are equal height regardless of content length.

---

### 5.6 Featured work — *reference: screenshot 3*

**Purpose.** The heart of the site. Everything above it is a claim; this is the evidence.

**Layout.** Copy the reference's staggered two-column arrangement: a left intro block (eyebrow, two-line heading, short paragraph, `Explore more →` link), then project cards placed in an offset grid so the right column sits lower than the left. Four cards.

**Adaptation from the reference — important.** The reference shows perspective-skewed device mockups floating on dark panels. That treatment flatters a designer and actively harms an analyst: a rotated dashboard is an *unreadable* dashboard, and your reader's instinct will be to squint at the numbers. **Present dashboard screenshots flat, straight-on, and cropped to the most interesting region** — a KPI row, a trend chart, an SLA table. Keep the reference's dark panel, generous padding, and title-plus-tags overlay. You keep the composition; you lose the skew.

**Card anatomy.**

```
┌──────────────────────────────────────┐
│  Hub Transport Dashboard.   Logistics, Dashboards │  ← title + tags
│                                      │
│   ┌────────────────────────────┐     │
│   │  flat dashboard screenshot │     │  ← cover image, straight-on
│   └────────────────────────────┘     │
│                                      │
│  20+ hubs · 3-tier SLA · [CONFIRM]% less manual time │  ← metric chips
└──────────────────────────────────────┘
```

**The four projects.**

| # | Title | Tags | Headline outcome |
|---|---|---|---|
| 1 | Hub Transport Dashboard | Logistics, Dashboards | Real-time performance across 20+ distribution hubs with 3-tier SLA tracking |
| 2 | Marketing Campaign Performance | Analytics, Statistics | What actually drove conversion across Facebook and Google Ads, tested not guessed |
| 3 | Consumer Spending Trends | Research, Visualisation | Consumer behaviour patterns compiled into a market-intelligence dashboard |
| 4 | Stance Detection in Mental Health Discourse | NLP, Research | Undergraduate thesis — classifying stance in Reddit mental-health conversations |

Make project 1 the visually largest card. It is your strongest asset: production software, real users, a measurable operational effect.

**Project detail page template.** Every featured project needs a detail page. This is the single highest-leverage part of the whole site and it has no equivalent in the reference, which links straight to images. Use this six-part structure, 600–900 words, at `/work/[slug]/`:

1. **Context** — whose problem, what was happening before. Two or three sentences.
2. **The question** — stated as an actual question. *"Which hubs are at risk of breaching SLA today, and can we see it before the breach rather than after?"*
3. **The data** — sources, volume, grain, and the things that were wrong with it. Be specific about the mess; every experienced analyst will trust you more for it.
4. **Approach** — what you built and, crucially, what you rejected and why. One or two code or query snippets, syntax-highlighted, short.
5. **What changed** — the outcome, with a number if you have one and an honest qualitative statement if you do not.
6. **Artefacts** — links to the GitHub repo, a live demo if one exists, and 2–4 screenshots.

Two rules for these pages. First, **be explicit about scope** — for CarryBee work, state what you built versus what the team built. Overclaiming is the most common way portfolios fail a reference check. Second, **respect confidentiality**: CarryBee's operational data is your employer's. Show structure, methodology, and relative changes; anonymise hub names, scale or index absolute volumes, and get sign-off from your manager before publishing anything that shows real figures. Note this on the page itself — *"Figures indexed; hub names anonymised"* — which reads as professionalism, not evasion.

**Acceptance criteria.**
- Each card links to a detail page; no card is a dead end.
- Cover images ship as AVIF with WebP fallback, ≤ 180KB each, with explicit `width`/`height` to prevent layout shift.
- `/work/` lists all projects with tag filtering.
- Every detail page contains all six sections; the build fails if a required frontmatter field is missing.
- Any client or employer data displayed carries a confidentiality note.

---

### 5.7 Experience timeline — *new section*

**Purpose.** Recruiters need the chronology that project cards don't give. Keeps the résumé PDF from being the only place your history lives.

**Layout.** Vertical list, left column for dates, right column for role and bullets. A thin vertical rule with an amber dot marking the current role. No numbered markers — this is a chronology, and the dates already sequence it.

**Content** (condensed from the CV — two bullets per role maximum on the site; the full detail lives in the PDF):

- **May 2026 – Present · CarryBee Express Ltd. (a concern of US-Bangla) — Data Analyst Intern.** Daily operational reporting from SQL extracts, feeding management decisions. Built and maintained KPI dashboards and automated workflows across Google Workspace.
- **Nov 2025 – Feb 2026 · Nexvix — AI Developer Intern.** Documented technical requirements and translated business demands into implementable specs in an early-stage startup.
- **Feb 2022 – Oct 2025 · Udvash Academic & Admission Care — Teacher & Academic Material Developer.** Taught and presented to large groups; managed guardian and management communication.
- **Turing & micro1 — Project-based contractor.** Short-term technical assignments delivered to external deadlines.

Add a compact education block beneath: MSc Data Science & Applied Statistics, Jahangirnagar University (2026–present) · BSc Computer Science & Engineering, BRAC University (2021–2025).

**Acceptance criteria.**
- Current role is visually distinguished.
- Timeline collapses to a single column with dates above role titles below 768px.

---

### 5.8 Notes — *reference: screenshot 4, upper half* **[conditional]**

**Purpose.** Demonstrates you can communicate in writing — the skill that separates an analyst from a report generator.

**Layout.** Exactly as the reference: left column with eyebrow and a two-line heading, right column with a list of three rows. Each row: date and category on the left, title in the centre, amber arrow on the right. Hairline dividers between rows.

**Content.** `What's new?` / `Notes on data and work.` Three suggested seed posts, each of which you can genuinely write from work you have already done:

1. *"Why your daily report should be boring"* — on designing reporting that nobody has to think about.
2. *"Reading a logistics SLA breach backwards"* — the analytical method behind the hub dashboard.
3. *"What logistic regression actually told us about ad spend"* — accessible write-up of the marketing campaign analysis.

**Conditional rule.** If fewer than two notes are published, hide this section and remove `Notes` from the navigation. A section reading "coming soon" signals abandonment. Build the section, gate it on content count.

---

### 5.9 Testimonial — *reference: screenshot 4, lower half* **[conditional]**

**Layout.** Left: a portrait in greyscale. Right: an oversized amber quote mark, the quote in large light type, then name and title. Carousel dots beneath if more than one quote exists.

**Content.** Your natural first quote is **Najeefa Nikhat Choudhury**, Senior Lecturer at BRAC University and your thesis supervisor. Your CarryBee reporting manager is the second, once your internship converts or concludes.

**Three requirements before this ships.**
1. Get the quote in writing — email or LinkedIn recommendation — and keep the record.
2. Get explicit permission to publish the name, title, and photograph.
3. **Remove the referee's phone number from every public surface.** Your CV lists `01705741042` for Ms. Choudhury. That is fine in a PDF sent to a specific employer; publishing it on an indexed web page exposes her to spam and is a real discourtesy. Referee contact details go to employers on request, never on the site. For the same reason, consider whether your own mobile number belongs in the page source — email and LinkedIn are sufficient, though a WhatsApp click-to-chat link is genuinely useful for local freelance enquiries if you want it (see §9.9).

**Conditional rule.** If no approved quote exists at launch, omit the section entirely. Do not use a placeholder quote, and do not fabricate one.

---

### 5.10 Contact — *reference: screenshot 5*

**Purpose.** Convert. This is where G3 and G4 are satisfied.

**Layout.** Two columns. Left: heading, short paragraph, email link with arrow, social icons. Right: an underline-style form — no boxes, just a label, an input, and a hairline beneath, exactly as the reference.

**Content.**

- Left heading: `Got a problem in a spreadsheet? Let's talk.`
- Left body: *"Tell me what you're trying to find out and what you've got to work with. I'll reply within two working days."*
- Right heading: `Start here.`

**Form fields.**

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text | Yes | Placeholder: `What's your name?` |
| Email | email | Yes | Placeholder: `Your email` · validated on blur |
| What's this about? | select | Yes | `Job opportunity` / `Freelance project` / `Something else` — **drives G4** |
| Company / organisation | text | No | Shown only when subject = Job opportunity |
| Budget range | select | No | Shown only when subject = Freelance project. Options: `Under $250` / `$250–1,000` / `$1,000+` / `Not sure yet` |
| Message | textarea | Yes | Placeholder: `Tell me about your project` · min 20 characters |
| Link to data or brief | url | No | Replaces file upload — static form services handle attachments poorly |
| Honeypot | hidden | — | Named innocuously, e.g. `website`; submissions with it filled are silently dropped |

**States.** Idle · validating · submitting (button label `Sending…`, disabled) · success · error. Success replaces the form with: *"Sent. I'll reply within two working days — check your spam folder if you don't hear back."* Error keeps every entered value, states what failed and what to do: *"Couldn't send that. Email anjumsadat09082@gmail.com directly and I'll pick it up."* Never lose a user's typed message on error.

**Acceptance criteria.**
- Fully keyboard-operable; labels bound to inputs via `for`/`id`.
- Errors announced to screen readers via `aria-live="polite"` and associated with fields via `aria-describedby`.
- Conditional fields animate in without shifting the fields below them jarringly.
- Honeypot submissions are dropped without a visible error.
- Submission succeeds with JavaScript enabled; if JS fails, the `mailto:` link remains a working fallback.

---

### 5.11 Footer — *reference: screenshot 5, bottom*

Centred logo mark, the line **`Thanks for scrolling,`** *`that's all folks.`* (amber first clause, muted second — keep it, it's charming and it's the only joke on the site), then three social icons: GitHub, LinkedIn, Email. Below: `© 2026 Md. Zulqarnain Anjum · Dhaka, Bangladesh`.

**Logo mark.** The reference uses an abstract amber shape. Commission or draw a simple mark — a monogram `ZA` in the display face, or a minimal amber glyph suggesting a bar or a distribution curve. Deliver as SVG. Do not copy the reference's mark; it belongs to that site.

---

## 6. Design system

All colour values below were sampled directly from your reference screenshots, so the result will match the theme exactly.

### 6.1 Colour tokens

```css
:root {
  /* surfaces */
  --surface:        #323647;  /* primary page background */
  --surface-deep:   #242734;  /* alternating band, footer, contrast sections */
  --surface-raised: #424657;  /* cards, elevated panels */
  --hairline:       rgba(255,255,255,0.10);

  /* accent */
  --accent:         #FFAF29;  /* the single accent — use it sparingly */
  --accent-hover:   #FFC25B;
  --on-accent:      #242734;  /* text on amber fills — NEVER white */

  /* text */
  --text:           #FFFFFF;  /* headings */
  --text-body:      #C8CADA;  /* paragraphs */
  --text-muted:     #A1A3B2;  /* eyebrows, meta, dates */
}
```

**Verified contrast ratios** (WCAG 2.2 AA needs 4.5:1 for body text, 3:1 for large text and UI components):

| Foreground | on `--surface` | on `--surface-deep` | on `--surface-raised` |
|---|---|---|---|
| `--text` #FFFFFF | 11.97 ✅ | 14.84 ✅ | 9.35 ✅ |
| `--text-body` #C8CADA | 7.36 ✅ | 9.13 ✅ | 5.75 ✅ |
| `--text-muted` #A1A3B2 | 4.79 ✅ | 5.94 ✅ | **3.74 ⚠️** |
| `--accent` #FFAF29 | 6.51 ✅ | 8.07 ✅ | 5.08 ✅ |
| `--on-accent` #242734 on amber fill | — | — | **8.07 ✅** |

**Two rules that follow from this table.**
1. Never use `--text-muted` on `--surface-raised` (3.74:1, fails for body copy). On raised cards, step muted text up to `--text-body`.
2. Never use white on an amber fill (1.84:1, fails badly). Always `--on-accent`. This corrects the reference.

**Accent discipline.** Amber appears in at most six places per viewport: the hero rule, the active nav dot, one filled card, stat numbers, link arrows, and the primary button. The moment it's everywhere, it stops meaning anything.

### 6.2 Typography

Two families, clearly distinct in role.

| Role | Family | Fallback | Weights |
|---|---|---|---|
| Display & headings | **General Sans** (Fontshare, free, geometric — closest free match to the reference) | Poppins → system sans | 500, 600 |
| Body, UI, forms | **Inter** | system sans | 400, 500 |

Self-host both as subsetted `woff2` (Latin only) in `/public/fonts` with `font-display: swap`. Do not load from Google Fonts — it costs a DNS lookup and a connection on every visit, and matters on 4G.

**Type scale.**

```css
--step-display: clamp(3.25rem, 9vw, 7.5rem);   /* hero name */
--step-h1:      clamp(2rem, 4vw, 3rem);
--step-h2:      clamp(1.75rem, 3.2vw, 2.5rem); /* section headings */
--step-h3:      1.25rem;                        /* card titles */
--step-body:    0.9375rem;                      /* 15px */
--step-small:   0.8125rem;                      /* eyebrows, meta */
--step-stat:    clamp(2.5rem, 5vw, 3.75rem);
```

| Element | Weight | Line height | Letter spacing |
|---|---|---|---|
| Hero name | 600 | 0.92 | −0.035em |
| Section heading | 600 | 1.18 | −0.02em |
| Card title | 500 | 1.3 | −0.01em |
| Body | 400 | **1.85** | 0 |
| Eyebrow | 500 | 1.4 | 0.02em |
| Stat number | 600 | 1 | −0.02em · tabular figures |

The generous 1.85 body line-height and small body size are what give the reference its airy, expensive feel. Do not tighten them.

**Eyebrows** are sentence case with a leading em dash — `— Introduction`, `— Portfolio` — as in the reference. Not all caps.

**Measure.** Body paragraphs cap at 62 characters (`max-width: 34ch` at this size). The reference's short, narrow paragraphs are doing real work; long lines will break the composition.

### 6.3 Spacing, grid, shape

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
--space-9: 96px;  --space-10: 128px; --space-11: 160px;

--container: 1200px;
--gutter-desktop: 40px;
--gutter-mobile: 20px;

--radius-card: 4px;
--radius-input: 2px;
--radius-pill: 999px;
```

Grid: 12 columns, 24px gutters. Section vertical padding: 160px desktop / 96px tablet / 64px mobile. The reference is generous with whitespace — that generosity is 80% of the aesthetic, and it's the first thing that gets compromised when a section fills up. Don't let it.

### 6.4 Components

| Component | Specification |
|---|---|
| Primary button | Amber fill, `--on-accent` text, 4px radius, 14px/28px padding. Hover: `--accent-hover`. Active: 1px translate down. |
| Secondary button | Transparent, 1px `--hairline` border, `--text` label. Hover: border → `--accent`, label → `--accent`. |
| Text link | `--accent`, 1px underline offset 4px, trailing `→` **only where the reference uses one** — hero, contact, note rows. Not on every link. |
| Availability pill | `--surface-raised` fill, pill radius, 6px/14px padding, small amber dot before the text, `--text-body` label. |
| Card | `--surface-raised`, 4px radius, 32px padding, no shadow. Hover (linked cards only): border-top amber rule grows from 0 to full width over 240ms. |
| Form input | Transparent background, no border except a 1px `--hairline` bottom rule. Focus: rule → `--accent`, 2px thick. Label sits above at `--step-small`. |
| Focus ring | `2px solid var(--accent)`, `outline-offset: 3px`, on every interactive element. Never `outline: none` without a replacement. |
| Nav active indicator | 4px amber dot centred beneath the active item. |

### 6.5 Motion

Restraint is the point. Four permitted moments, and no others:

1. Hero entrance on first load (§5.1) — once per session.
2. Project grid reveal on first scroll into view — a single 200ms opacity fade, **no slide**, no per-card stagger.
3. Hover and focus feedback on interactive elements — 160–240ms, `ease-out`.
4. Form state transitions — conditional fields, success and error states.

Global `prefers-reduced-motion: reduce` handling: all transitions to 0.01ms, all entrance animations render in their end state.

Avoid the fade-and-slide-up-on-every-section pattern. It's the most recognisable tell of a generated page and it makes a site feel slow on a mid-range phone.

---

## 7. Content inventory

Everything the site needs, with its current state.

| Asset | Source | Status |
|---|---|---|
| Bio paragraph, headline | Drafted in §5.1 | Ready — edit voice |
| Role descriptions | CV | Ready |
| Project 1 write-up (Hub Dashboard) | To write | **You** — 600–900 words, §5.6 template |
| Project 2 write-up (Marketing Campaign) | To write | **You** |
| Project 3 write-up (Consumer Spending) | To write | **You** |
| Project 4 write-up (Thesis) | Adapt thesis abstract | **You** |
| Project cover images ×4 | To produce | **You** — flat screenshots, 1600×1000, ≤180KB |
| Project detail screenshots, 2–4 each | To produce | **You** |
| Hero portrait, background removed | To shoot | **You** — hard dependency, see §5.1 Plan B |
| Résumé PDF | Existing CV — remove referee phone first | **You** |
| Logo mark (SVG) | To design | **You** |
| Tool logos ×10 (SVG) | simpleicons.org | Ready to download |
| Testimonial quote + permission | To request | **You** — §5.9 |
| Note posts ×2–3 | To write | **You** — optional at launch |
| OG share image 1200×630 | To produce | **You** |
| Favicon set | From logo mark | Derived |

**Voice guidelines.** Sentence case throughout. Plain verbs. No "leveraging," no "passionate about," no "results-driven." Specific beats impressive: *"20+ hubs, 3-tier SLA"* lands harder than *"enterprise-scale logistics analytics."* Where you have a number, use it; where you don't, say what happened plainly rather than dressing it up.

---

## 8. Responsive behaviour

| Breakpoint | Width | Key changes |
|---|---|---|
| Wide | ≥ 1280px | Full design as specified. Container 1200px centred. |
| Desktop | 1024–1279px | Gutters → 32px. Section padding → 128px. Hero portrait scales down; name stays two lines. |
| Tablet | 768–1023px | Two-column sections → single column. Services cards → 2+1 layout. Project grid loses its stagger, becomes an even 2-up. Section padding → 96px. |
| Mobile | 480–767px | Everything single column. Nav → hamburger opening a full-screen panel with amber active dots. Hero: name → portrait → intro → CTAs, stacked. Portrait max 45vh. Stats → horizontal scroll strip. Section padding → 64px. |
| Small | < 480px | Hero name clamps to 3.25rem. CTAs go full-width stacked. Gutters 16px. |

**Mobile-specific requirements.** Minimum touch target 44×44px. No horizontal scroll at any width — test at 320px. Hero must not use `100vh` alone (mobile browser chrome causes jump); use `100svh` with a `100vh` fallback. Test on a real mid-range Android device, not just a desktop emulator.

---

## 9. Technical specification

### 9.1 Stack

**Recommended: Astro 5 + TypeScript + plain CSS with custom properties.**

Rationale: ships zero JavaScript by default (which is most of your performance budget won for free), Markdown content collections mean adding a project is adding a `.md` file (satisfying G5), first-class image optimisation, and static output that deploys to GitHub Pages without a server. The design is token-driven, so plain CSS with custom properties is a better fit than Tailwind here — Tailwind would scatter your design tokens across class strings and make the palette harder to adjust.

**Alternative if you want zero build tooling:** hand-written `index.html` + `styles.css` + `main.js`, deployed by pushing to the repo. Faster to start, but every new project means editing HTML by hand, and you lose image optimisation. Acceptable for v1 only if you plan to ship fewer than six projects ever.

Interactive pieces (mobile nav, form logic, tag filter, optional audience switch) are vanilla JS in Astro islands or plain `<script>`. **No React.** Nothing on this site needs it, and it would roughly triple your JS payload.

### 9.2 Project structure

```
portfolio/
├── public/
│   ├── fonts/                     GeneralSans-{Medium,Semibold}.woff2, Inter-{Regular,Medium}.woff2
│   ├── images/                    og-default.png, logos/*.svg
│   ├── resume/Zulqarnain-Anjum-Data-Analyst.pdf
│   ├── favicon.svg
│   ├── robots.txt
│   └── CNAME                      only if using a custom domain
├── src/
│   ├── assets/
│   │   ├── portrait.png           transparent PNG, processed at build
│   │   └── projects/              source images, optimised at build
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Positioning.astro
│   │   ├── StatBand.astro
│   │   ├── ServiceCards.astro
│   │   ├── ToolWall.astro
│   │   ├── WorkWithMe.astro
│   │   ├── ProjectGrid.astro
│   │   ├── ProjectCard.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── Testimonial.astro
│   │   ├── NotesList.astro
│   │   ├── ContactForm.astro
│   │   ├── Footer.astro
│   │   └── SEO.astro
│   ├── content/
│   │   ├── config.ts              Zod schemas — see §9.3
│   │   ├── projects/*.md
│   │   └── notes/*.md
│   ├── data/
│   │   └── site.ts                name, links, stats, services, experience
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── Article.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── work/index.astro
│   │   ├── work/[...slug].astro
│   │   ├── notes/index.astro
│   │   ├── notes/[...slug].astro
│   │   └── 404.astro
│   └── styles/
│       ├── tokens.css             every value from §6 — single source of truth
│       └── global.css             resets, base type, utilities
├── .github/workflows/deploy.yml
├── astro.config.mjs
└── package.json
```

### 9.3 Content schemas

`src/content/config.ts` — enforce these with Zod so a malformed project fails the build rather than rendering broken.

```ts
const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title:        z.string(),
    slug:         z.string(),
    tags:         z.array(z.string()).min(1).max(3),
    summary:      z.string().max(160),   // used on cards and in meta description
    cover:        image(),
    coverAlt:     z.string(),
    metrics:      z.array(z.object({ value: z.string(), label: z.string() })).max(3),
    featured:     z.boolean().default(false),
    order:        z.number(),
    repoUrl:      z.string().url().optional(),
    liveUrl:      z.string().url().optional(),
    tools:        z.array(z.string()),
    date:         z.date(),
    confidential: z.boolean().default(false),  // renders the anonymisation notice
    draft:        z.boolean().default(false),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    date:     z.date(),
    category: z.string(),
    summary:  z.string().max(200),
    draft:    z.boolean().default(false),
  }),
});
```

Draft entries are excluded from production builds but visible in `dev`.

### 9.4 Contact form

GitHub Pages serves static files only, so the form needs a third-party endpoint. **Use Web3Forms** — free tier covers 250 submissions/month, requires no account linkage, and needs only an access key in the POST body. Formspree is an equivalent alternative with a lower free ceiling.

Flow: client-side validation on blur → `fetch` POST as JSON → success or error state. The access key is public by design; the honeypot field plus the provider's own spam filtering is what protects the endpoint.

Set the provider's subject line to include the selected category, so your inbox shows `[Freelance project] New enquiry from …` — that is G4 satisfied end to end.

### 9.5 Performance budget

| Metric | Budget |
|---|---|
| LCP (mobile, 4G, p75) | ≤ 2.0s |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| Total JS (gzipped) | ≤ 40KB |
| Total CSS (gzipped) | ≤ 20KB |
| Largest image | ≤ 200KB |
| Home page total weight | ≤ 900KB |
| Lighthouse Performance / Accessibility / Best Practices / SEO | ≥ 95 each |

Techniques: AVIF with WebP fallback via Astro's `<Image>`; explicit `width`/`height` on every image; `loading="lazy"` below the fold and `fetchpriority="high"` on the hero portrait; subsetted self-hosted fonts; no analytics script over 2KB.

### 9.6 Analytics

Use **Umami Cloud** (free tier, ~2KB, cookieless, GDPR-clean) or **GoatCounter**. Avoid GA4 — heavy, cookie-banner-triggering, and overkill here.

Custom events to fire:

| Event | Trigger |
|---|---|
| `resume_download` | Any résumé CTA click — include a `location` property (hero / nav / work-with-me) |
| `project_view` | Project detail page load — include the slug |
| `contact_start` | First focus on any contact form field |
| `contact_submit` | Successful submission — include the selected category |
| `cta_click` | Any primary CTA — include the label |
| `outbound_github` / `outbound_linkedin` | External profile clicks |

Then actually look at the data monthly. Being able to say *"the hero résumé CTA outperforms the nav one four to one, so I moved it"* is a better interview answer than most people's project stories.

### 9.7 SEO

- `<title>`: `Zulqarnain Anjum — Data Analyst in Dhaka` (home); `[Project] — Zulqarnain Anjum` (detail pages).
- Meta description per page, drawn from the `summary` frontmatter field.
- JSON-LD `Person` schema on the home page: `name`, `jobTitle: "Data Analyst"`, `url`, `sameAs` (GitHub, LinkedIn), `address: { addressLocality: "Dhaka", addressCountry: "BD" }`, `alumniOf`, `knowsAbout`.
- OpenGraph and Twitter card tags on every page; per-project OG images use the project cover.
- Auto-generated `sitemap.xml` (`@astrojs/sitemap`) and RSS feed at `/notes/rss.xml` (`@astrojs/rss`).
- Canonical URL on every page. Semantic heading hierarchy — exactly one `<h1>` per page, no level skipping.

### 9.8 Deployment

GitHub Pages via GitHub Actions on push to `main`. Astro config: `site: 'https://sadatanjum.github.io'`, and `base: '/repo-name'` **only** if deploying to a project page rather than the `sadatanjum.github.io` user repo — getting this wrong is the single most common cause of broken asset paths on GitHub Pages.

Custom domain is worth considering. `zulqarnainanjum.com` or similar costs roughly $12/year and looks materially more professional on a CV than a `github.io` subdomain, particularly to freelance clients. Configure via a `CNAME` file in `/public` plus DNS records, and enable "Enforce HTTPS."

### 9.9 Privacy and data handling

- **Remove the referee's phone number** from any public page and from the publicly hosted résumé PDF (§5.9). Keep a separate copy with full referee details for direct applications.
- Your own mobile: publishing it invites spam. Email plus LinkedIn is sufficient for P1 and P2. If you want a fast channel for local freelance clients, add a WhatsApp click-to-chat link (`https://wa.me/8801957521189`) as a labelled button rather than printing the raw number — slightly less scrapeable, and clearer about what happens when it's clicked.
- Form submissions travel to a third-party processor. Add a one-line note beneath the submit button: *"Your details go to my email via Web3Forms and aren't used for anything else."*
- No cookies means no cookie banner. Keep it that way.

### 9.10 Browser support

Last two versions of Chrome, Safari, Firefox, Edge; iOS Safari 16+; Chrome on Android 10+. No IE. Graceful degradation: if JavaScript fails, all content remains readable and navigable, and the `mailto:` link works.

---

## 10. Adaptation summary — reference vs. this site

The one-page answer to *"what am I changing and why."*

| Reference section | Change | Reason |
|---|---|---|
| Hero: designer portrait | Keep composition; new copy, availability pill, dual CTA | Same visual power, two audiences served |
| "14 years / 187 clients" | Three honest, checkable stats | Inflated numbers destroy technical credibility |
| Creativity quote | Positioning paragraph about reporting plumbing | Says something true and specific about your work |
| Design service cards | Analytics / Dashboards / Automation | Actual services |
| White text on amber card | Dark ink on amber | Reference fails WCAG at 1.84:1; fix measures 8.07:1 |
| Client logo wall (IBM, BBC) | Tool logo wall | You don't have those clients; same scan value, honest |
| Skewed device mockups | Flat, cropped dashboard screenshots | A rotated dashboard is an unreadable dashboard |
| Image-only project links | Six-part case study pages | Analysts are judged on reasoning, not screenshots |
| — | **New:** work-with-me band | The dual-audience fork |
| — | **New:** experience timeline | Recruiters need chronology |
| Blog list | Notes, gated on ≥2 posts | Writing is an analyst skill; empty sections signal abandonment |
| Testimonial carousel | Single quote, gated on permission | Don't fabricate; don't publish without consent |
| Contact form | Adds subject selector + conditional fields | Routes enquiries (G4) |
| Footer joke | Keep verbatim | It's good, and it's the only joke on the site |

---

## 11. Build phases and acceptance

### Phase 1 — Foundation (day 1)
Scaffold Astro; `tokens.css` with every §6 value; fonts self-hosted; `Base.astro` layout; Nav and Footer; deploy pipeline green with a placeholder page.
*Done when:* the empty site is live at the real URL and the token file matches §6 exactly.

### Phase 2 — Home, above the fold (days 2–3)
Hero, Positioning + stats, Services, Tool wall.
*Done when:* hero is pixel-faithful to screenshot 1 at 1440px and fully usable at 390px; amber card passes contrast.

### Phase 3 — Work (days 4–6) — *the highest-value phase*
Content collections and schemas; project grid; `/work/`; detail template; all four projects populated with real write-ups and images.
*Done when:* four projects are live, each with all six case-study sections and a working repo link.

### Phase 4 — Supporting sections (day 7)
Work-with-me band, experience timeline, conditional Notes and Testimonial.
*Done when:* conditional sections correctly hide themselves when their content is absent.

### Phase 5 — Contact and instrumentation (day 8)
Form with conditional logic and all five states; Web3Forms wired; analytics events firing; SEO meta, JSON-LD, sitemap, OG images.
*Done when:* a test submission arrives correctly tagged and all six analytics events appear in the dashboard.

### Phase 6 — Polish and QA (days 9–10)
Performance pass, accessibility audit, real-device testing, copy proofread.

### 11.1 Launch checklist

**Content**
- [ ] No `[CONFIRM]` placeholder remains anywhere in the built output
- [ ] Every stat is a real, defensible number
- [ ] Referee phone number absent from site and public résumé PDF
- [ ] Confidentiality notice present on any CarryBee-derived project
- [ ] Manager sign-off obtained for any employer data shown
- [ ] Testimonial permission in writing, or section hidden
- [ ] Full proofread — a typo on an analyst's site reads as carelessness with detail

**Function**
- [ ] Every link resolves; no 404s; no dead project cards
- [ ] Résumé downloads with the correct filename
- [ ] Form submits, arrives tagged by category, and preserves input on error
- [ ] Conditional sections hide correctly when empty
- [ ] Site works with JavaScript disabled (content readable, mailto works)

**Quality**
- [ ] Lighthouse ≥ 95 on all four categories, mobile profile
- [ ] Zero axe DevTools violations
- [ ] Full keyboard traversal with a visible focus ring at every stop
- [ ] Tested on a real mid-range Android phone
- [ ] No horizontal scroll at 320px
- [ ] Reduced-motion preference fully respected
- [ ] All `[CONFIRM]` contrast pairs verified against §6.1

**Discovery**
- [ ] `sitemap.xml` and `robots.txt` live
- [ ] JSON-LD validates in Google's Rich Results Test
- [ ] OG image renders correctly in LinkedIn's Post Inspector
- [ ] Analytics recording real traffic
- [ ] URL added to LinkedIn, GitHub profile, and the résumé PDF

---

## 12. Appendix A — Prompts for an AI coding assistant

Give the assistant this whole document as context, then run these in order. Do not paste all six at once; review the output of each before continuing.

**Prompt 1 — Foundation**
> Using the attached PRD, scaffold an Astro 5 + TypeScript project for a static portfolio deployed to GitHub Pages. Create `src/styles/tokens.css` containing every colour, type, spacing, and radius token from PRD §6 verbatim as CSS custom properties. Self-host General Sans and Inter as subsetted woff2 in `/public/fonts` with `@font-face` and `font-display: swap`. Build `Base.astro`, `Nav.astro` (desktop bar + mobile full-screen panel, amber dot active indicator), and `Footer.astro` per §5.11. Add `.github/workflows/deploy.yml` for GitHub Pages. Plain CSS only — no Tailwind, no React. Confirm the token file matches §6 before writing any component.

**Prompt 2 — Hero and upper home**
> Build `Hero.astro` to match PRD §5.1 and reference screenshot 1: three-part asymmetric layout, hero name at `--step-display` on two lines, 64px amber rule, bottom-bleeding transparent portrait overlapping the name block, right column with eyebrow, headline, paragraph, availability pill, and two CTAs. Then build `Positioning.astro`, `StatBand.astro` (omits empty slots, tabular figures), `ServiceCards.astro`, and `ToolWall.astro` per §5.2–5.4. Critical: the amber service card uses `var(--on-accent)` for text, never white. Implement only the single page-load entrance animation described in §6.5 — no scroll-triggered fade-ins on other sections.

**Prompt 3 — Content collections and work**
> Implement `src/content/config.ts` with the exact Zod schemas from PRD §9.3. Build `ProjectCard.astro` and `ProjectGrid.astro` matching reference screenshot 3's staggered offset layout, but with **flat, un-skewed** cover images per §5.6. Build `/work/index.astro` with client-side tag filtering (vanilla JS, no framework) and `/work/[...slug].astro` using the six-part case study template. Render the confidentiality notice when `confidential: true`. Use Astro's `<Image>` with AVIF and WebP, explicit dimensions, lazy below the fold. Create four placeholder project markdown files matching the table in §5.6.

**Prompt 4 — Supporting sections**
> Build `WorkWithMe.astro` (§5.5 — two equal-height cards; the `Start a project` CTA scrolls to `#contact` and pre-selects `Freelance project` in the form), `ExperienceTimeline.astro` (§5.7), `Testimonial.astro` and `NotesList.astro`. The last two must render nothing at all — no heading, no wrapper, no nav entry — when their content is absent or below the threshold in §5.8 and §5.9.

**Prompt 5 — Contact and instrumentation**
> Build `ContactForm.astro` per PRD §5.10: underline-style fields, the required subject selector, conditional Company and Budget fields, honeypot, and all five states. Wire to Web3Forms via `fetch`. Errors must preserve every entered value and be announced via `aria-live="polite"`. Then add `SEO.astro` with per-page meta, OpenGraph, and `Person` JSON-LD per §9.7; install `@astrojs/sitemap` and `@astrojs/rss`; add Umami with the six custom events from §9.6.

**Prompt 6 — QA pass**
> Audit the build against PRD §11.1. Specifically: verify every colour pair against the §6.1 contrast table; confirm no white text sits on any amber fill; test at 320, 390, 768, 1024, and 1440px for horizontal overflow; confirm every interactive element has a visible focus ring; confirm `prefers-reduced-motion` suppresses all animation; check total gzipped JS is under 40KB. Report each failure with the file and line, and fix.

---

## 13. Appendix B — Open questions for you

Answer these before Phase 3 begins; several are blocking.

1. **Reporting-time reduction at CarryBee — what is the real number?** The stat band and project 1 both need it. If you don't have a measurement, say what you can defend instead: *"replaced a 90-minute daily manual process"* is fine and checkable.
2. **Can you publish anything from the CarryBee dashboard?** Ask your manager explicitly. If the answer is no, build a sanitised version with synthetic data and label it as such — that is still a legitimate portfolio piece.
3. **Do you have, or can you get, a usable cut-out portrait?** If not, decide now between Plan A and Plan B (§5.1); they imply different hero builds.
4. **Will the thesis be published?** If so, link it. If it's under embargo, say so on the page.
5. **Custom domain — yes or no?** Decide before launch; changing it later costs you accumulated links.
6. **Freelance rates — publish a range, or "on request"?** The PRD assumes on request.
7. **WhatsApp contact — include it or not?** (§9.9)
8. **Which three note topics will you actually write?** If the honest answer is none in the next month, cut the section from v1 and add it later.

---

*End of document.*
