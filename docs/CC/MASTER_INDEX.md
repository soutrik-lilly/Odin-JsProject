# Master Index — AgentStack Golden Canon Slim 30
### Every Artifact, in the Order You Actually Need Them

**Read this document first, once, then use it as a map — not something to read start to finish.** Everything below reflects the actual current state of the project as of this writing: a 58-day bible, four completed HTML/CSS sessions, eight completed JavaScript sessions, and three tracks planned but not yet built. Where something is superseded, stale, or unrelated to this specific track, it's named explicitly rather than left for you to stumble on and wonder about.

---

## Part 0 — Housekeeping, Before Anything Else

Your outputs folder contains a number of files from entirely separate, unrelated past projects (curriculum work with different names, different structures, months older) — these are not part of this track and can be ignored. Specific to *this* track, three files are genuinely stale and worth deleting to avoid confusion:

- `session_S01_html5_essentials.md` (lowercase, no capital S)
- `session_S01_html_essentials.md` (lowercase, an even earlier draft)
- `QA_audit_S01.txt`

All three predate the current, canonical `Session_S01_HTML5_Essentials.md` and its embedded QA appendix. Only the capitalized `Session_SXX_*.md` files are current.

---

## Part 1 — The One Document You Keep Open Permanently

### `agentstack_golden_canon_slim_30.html`

**What it is:** the bible. The single source of truth for what every session covers — 58 days total (51 web days + 7 Electron days), organized into phases. Every session document's content is derived from this file's own topic list for that day, not the reverse.

**How to use it:** don't read it front to back. Open it, use the Table of Contents to jump to whichever day you're currently on, and treat its topic list for that day as the checklist a session document is supposed to satisfy. If a session document and the bible ever disagree, the bible is authoritative — flag it, don't just trust the session doc.

**Current state:** Phases F1 (HTML/CSS, S01–S04) and F2 (JavaScript, S05–S12) are fully built out as session documents. Phase F3 onward (TypeScript, React, backend integration, production, the senior Vite/Vue/Next.js/Testing track, and Electron) exist in the bible as topic lists only — not yet written as full tutorials.

---

## Part 2 — Phase F1: HTML/CSS Foundations (Complete)

Read and build these in order if you haven't already. Each one's own QA appendix documents its revision history honestly — worth skimming those too, since they disclose real errors found and fixed, not just a clean bill of health.

| Order | File | Covers |
|---|---|---|
| 1 | `Session_S01_HTML5_Essentials.md` | Semantic HTML, forms, ARIA, the rendering pipeline, DevTools |
| 2 | `Session_S02_CSS_Fundamentals.md` | Cascade, box model, units, custom properties, selectors |
| 3 | `Session_S03_CSS_Layout.md` | Flexbox, Grid, positioning, responsive design, modern CSS (`@layer`) |
| 4 | `Session_S04_Foundation_Project.md` | Pure integration — the first complete, pixel-perfect chat UI capstone |

---

## Part 3 — Before Starting Phase F2: Read the Plan

### `Plan_JavaScript_Sessions_S05-S12_Plus_Capstone.md`

**Read this once, before Session S05**, even though S05 itself is already built — it explains the *why* behind the whole JavaScript phase's structure: the two-thread continuity model (the BIA chat UI plus a standalone Task Tracker project, run in parallel through every session), the seven-lens validation rubric (Teacher, Tutorial, Mentor, Coder, Senior Developer, Application, Industry), and the reasoning for why Object-Oriented JavaScript and Recursion were inserted as new days S07–S08 after checking Phase F2 against Odin's own curriculum. Skipping this document doesn't break anything, but the sessions will make more sense with this context in hand first.

---

## Part 4 — Phase F2: JavaScript (Complete, Just Finished)

**Build and study these in strict order — each one explicitly assumes the ones before it.** Every session's own "Quick bridge" section names exactly what it's carrying forward; every "Bridge to Session SXX" section at the end names exactly what comes next.

| Order | File | Covers | Note |
|---|---|---|---|
| 5 | `Session_S05_JavaScript_Ground_Zero.md` | JS history, variables, operators, control flow, functions, **scope** | Now includes `"use strict"`, `alert`/`prompt`/`confirm`, `while`/`do-while`, `switch` |
| 6 | `Session_S06_JavaScript_Fundamentals.md` | Types, destructuring, spread, array methods, ES Modules | Now includes explicit type conversion, `Map`/`Set`, `Object.keys/values/entries` |
| 7 | `Session_S07_Object_Oriented_JavaScript.md` | Object literals, `this` (all four rules), factories, constructors, classes, prototypes | Now includes getters/setters and private `#fields` |
| 8 | `Session_S08_Recursion.md` | Base cases, the call stack, the actual design process for new problems | |
| 9 | `Session_S09_DOM_Events.md` | Real DOM manipulation, event bubbling, delegation, IntersectionObserver | Pays off Session S04's checkbox-hack limitation |
| 10 | `Session_S10_Async_Mastery.md` | Event loop, Promises, `async`/`await`, combinators | Now includes callback-hell motivation and synchronous error handling with custom `Error` classes |
| 11 | `Session_S11_Generators_SSE_Parser.md` | Generators, async generators, the real production SSE parser | **CRITICAL** — the bible's own flag; budget extra time |
| 12 | `Session_S12_Utilities_Streaming_Capstone.md` | Debounce/throttle, localStorage, UUIDs, clipboard, the full streaming chat capstone | Phase F2's capstone — everything from S05–S11 wired into one working app |

---

## Part 5 — After Finishing S12: Consolidate

### `Phase_F2_Study_Companion_S05-S12.md`

**Use this only after all eight sessions above are done**, not alongside them. It contains three things in order: a realistic day-by-day study schedule (confirmed against each session's own stated time budget — roughly 25 core hours, 33–36 hours including everything below), a session-by-session objective/outcome/connection summary you can use as a quick refresher without re-reading full sessions, and — the most important part — five new cross-cutting integration exercises plus **TaskFlow**, a complete, standalone final capstone project deliberately built on Thread B (the Task Tracker) rather than repeating the BIA chat UI, specifically to test whether the concepts genuinely transferred rather than just being followed along with once.

**The actual procedure for this phase, stated plainly:**
1. Work through Sessions S05–S12 in order, doing every mini-exercise and its solution as you reach it.
2. At the end of each session, run its own "Key Takeaways Checklist" — if any box is unchecked, re-read that section before moving on.
3. Once all eight are done, do the five Integration Exercises in the Study Companion — these deliberately combine non-adjacent sessions' concepts.
4. Build TaskFlow, following the Study Companion's suggested build order (data layer first, static rendering, interactivity, utilities, async layer last) and run its self-validation checklist without opening any session document for a reminder.

---

## Part 6 — What Comes After Phase F2 (Not Yet Built)

These are real, planned, but not yet written as full session tutorials. Listed here so you know what's coming and in what order, not because there's anything to read yet.

1. **Phase F3 — TypeScript** (Sessions S13–S14, per the bible)
2. **Phase F4 — React + Tailwind v4 + shadcn/UI** (Sessions S15–S21)
3. **Phase F5 — Auth, Integration, Agent UI Stack** (Sessions S22–S29)
4. **Phase F6 — Production hardening** (Sessions S30–S32)
5. **Session S33 — Capstone** (the full BIA_CATS_AIA_TEMPLATE_UI build, from scratch)
6. **The Senior Track — Vite, Vue 3, Next.js 16, Testing Mastery** (Sessions S34–S49, already planned in the bible)
7. **Electron Desktop Module** (E1–E7 — a separate track, can run any time after the core web phases)

---

## Part 7 — Further Out Still (Separate Post-Bible Tracks)

These three documents are genuinely separate, larger undertakings, planned for *after* the full 58-day bible is complete — not part of the current sequence, included here only so the full picture is in one place.

| File | What it is |
|---|---|
| `Vite_Vue_NextJS_15Day_Syllabus.md` | A focused 18-day deep-dive (Vite internals, Vue 3 by contrast with React, Next.js 16) — a supplementary track, distinct from the bible's own Senior Track above, planned earlier in this project before that Senior Track was folded directly into the bible |
| `Mega_Course_A_NodeJS_TypeScript_Syllabus.md` | 54-day Node.js/TypeScript deep-dive, for reaching a senior backend-engineer bar |
| `Mega_Course_B_React_NextJS_Syllabus.md` | 41-day React/Next.js deep-dive, the frontend equivalent of Mega Course A |
| `Fusion_Capstone_Social_Platform_Project_Plan.md` | A 75-day fusion capstone combining both mega-courses into one social-platform build |

**One honest overlap worth naming:** the standalone `Vite_Vue_NextJS_15Day_Syllabus.md` and the bible's own Senior Track (Sessions S34–S49, Part 6 above) cover meaningfully similar ground — the 15-day document was built before the Senior Track was folded directly into the bible. When you reach that point, the bible's own S34–S49 topic list is the current, authoritative one to follow; the standalone document is worth keeping as a secondary reference, not a competing plan.

**Companion resource, usable throughout:** `companion_courses.md` maps free external courses (Scrimba, The Odin Project, Full Stack Open, official docs) to every phase of the bible, including the JavaScript track and the Senior Track — worth checking whenever a session names a specific external resource in its own "Further Reading" section.

---

## The One-Paragraph Procedure, If You Forget Everything Else

Open the bible, find your current day, confirm the session document for that day covers everything the bible lists. Read the previous session's "Bridge to" section once if you haven't recently. Work through the new session top to bottom, doing every mini-exercise as you hit it, not skipping to the code. Run the session's own Key Takeaways checklist at the end. Move to the next day only once every box is checked. When a phase ends, use that phase's study companion (only one exists so far, for F2) to consolidate before moving to the next phase's plan document.
