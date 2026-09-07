# Phase F2 Study Companion — Sessions S05 to S12
### A Day-by-Day Preparation Plan, Session Guide, and Final Synthesis Capstone

**Purpose of this document:** everything you need to actually *work through* Phase F2 in the right order, at a sustainable pace, with a clear sense of why each day exists and what it owes to the day before it — and, at the end, one final project that forces every single concept from all eight sessions to work together at once, so you can prove to yourself (not just to a checklist) that this all actually stuck.

---

## Part 1 — The Schedule

**Total core content: ~25 hours** across eight sessions (confirmed directly from each session's own stated time budget, not estimated — 3+3+3+3+3+3+3.5+3.5). At your own stated pace — roughly 2 hours a day — that's about 12.5 days for the core sessions alone. Adding the new integration exercises (2–3h) and the final capstone below (6–8h) brings the honest total to **33–36 hours**, or roughly **17–18 days** at 2 hours a day — still inside your own 2–3 week window, though closer to the upper edge of it than the core sessions alone would suggest, with less slack for the Odin catch-up than a quick glance at "25 hours" would imply.

| Day | Session(s) | Hours | Focus |
|---|---|---|---|
| 1–2 | S05 | 3h | JavaScript from zero: history, variables, control flow, functions, **scope** |
| 3–4 | S06 | 3h | Types, destructuring, spread, array methods, ES Modules — split across 2 days, it's the densest single-topic-count session |
| 5 | S07 | 3h | Object-oriented JavaScript: literals, `this`, factories, constructors, classes, prototypes |
| 6 | S08 | 3h | Recursion: the design process, not just worked examples |
| 7 | S09 | 3h | The real DOM: queries, delegation, bubbling, IntersectionObserver, MutationObserver |
| 8–9 | S10 | 3h | Async mastery: the event loop, Promises, `async`/`await`, combinators — the event-loop tracing benefits from a second sitting |
| 10–11 | S11 | 3.5h | **CRITICAL.** Generators, async generators, the real SSE parser — budget the extra time this session asks for |
| 12 | S12 | 3.5h | Utilities + the full Phase F2 capstone: everything wired into one working streaming chat client |
| 13 | Integration Exercises (Part 3 below) | 2–3h | New, cross-cutting drills combining 2+ sessions each |
| 14–16 | Final Synthesis Capstone (Part 4 below) | 6–8h | One complete, standalone application requiring every concept from S05–S12 |
| 17 | Buffer / Odin catch-up | — | Slack day — use it if any prior day ran long, or to run Odin's parallel lessons |

**How to actually use this table:** don't treat the hour counts as a race. If S06 or S11 need a third sitting, take it — both are explicitly flagged in their own documents as the densest and highest-stakes sessions respectively, and rushing either one to hit a day-count defeats the entire point of this plan.

---

## Part 2 — Session-by-Session Guide

For each session: what to expect walking in, the actual objective (not just the topic list), the real outcome once you're done, which exercises matter most, and exactly how it connects to what came before and what comes next.

### Session S05 — JavaScript Ground Zero
**What to expect:** the slowest-paced session in the whole phase, deliberately — real history (Brendan Eich's ten-day sprint), then variables, operators, control flow, functions, and a full section on **scope** (added specifically because it's foundational to everything after it).
**Objective:** stop treating JavaScript as "Python with different punctuation" and start reasoning in its own terms — particularly `let`/`const` versus the retired `var`, and scope as a real, traceable mechanism, not a vague notion.
**Outcome:** you can write a `for` loop, a function (both declaration and arrow forms), and correctly predict what a nested scope can and can't see, from memory, without checking notes.
**Key exercises:** the `==` vs `===` pitfall drill, and the Section 7 scope mini-exercise (the `outer`/`inner` shadowing example) — if that one didn't click immediately, it's worth a second pass before S06.
**Connects to:** nothing before it in this phase (it's day one) — but it explicitly pays off Session S01's rendering-pipeline preview and Session S04's "you'll understand this once JS exists" promises. Sets up S06's object work and S07's closures directly through its new Scope section.

### Session S06 — Types, Destructuring, Spread, Array Methods, ES Modules
**What to expect:** the densest topic count in the phase — five real clusters in one session. This is explicitly flagged as splittable across two sittings.
**Objective:** stop writing `for` loops by default and start reaching for `.map()`/`.filter()`/`.reduce()` correctly, on purpose, plus understanding *why* `const` doesn't stop you from mutating an object (the value-vs-reference explanation added specifically to close this gap).
**Outcome:** you can destructure a nested object without hesitating, explain the shallow-clone trap from memory, and trace a `.reduce()` call step by step rather than treating it as unreadable magic.
**Key exercises:** the hand-traced `.reduce()` walkthrough (Section 6) and the shallow-clone Pitfall — both were specifically enriched after review because they're the two places beginners genuinely get stuck.
**Connects to:** directly pays off S05's promise that Thread B's task tracker would get "its first real array of tasks." Everything here becomes Session S07's raw material — you can't build a `Task` class cleanly without first being fluent in the object/array mechanics from today.

### Session S07 — Object-Oriented JavaScript
**What to expect:** four different ways to build an object (literal, factory function, constructor function, class), plus a full, dedicated section on `this` — the single most expanded topic in the whole phase, added because one paragraph was never going to be enough for a concept this consistently hard.
**Objective:** know *which* of the four object-creation patterns to reach for, deliberately, not out of habit — and be able to state, precisely, which of the four `this`-binding rules applies to a given function call.
**Outcome:** you can build a `Task`/`Project` class pair with real, encapsulated behavior, and correctly predict what `this` refers to in at least four different call-site scenarios without guessing.
**Key exercises:** the `this` section's `setInterval`/arrow-function predict-before-you-peek, and the closures "backpack" exercise — both are the two additions made specifically because the first draft under-explained them.
**Connects to:** builds directly on S06's object/array fluency. Everything here becomes Session S08's actual working material — the `Task`/`Project` classes built today are the exact objects Session S08 makes recursive.

### Session S08 — Recursion
**What to expect:** less about *what* recursion is and more about *how you'd design a recursive function yourself*, on a problem you've never seen before — a full section dedicated to that process specifically.
**Objective:** stop treating recursion as "a trick some problems need" and start recognizing, on sight, which problems are genuinely recursive in shape (self-similar, unpredictable depth) versus which just look intimidating.
**Outcome:** given a brand-new nested-data problem, you can state a correct base case and recursive case in plain English *before* writing any code — the actual transferable skill, not just a memorized worked example.
**Key exercises:** the four-step design process applied to flattening a nested array (Section 6) — deliberately a problem not used anywhere else in the session, specifically so you're not just recognizing a pattern you already memorized.
**Connects to:** uses S07's `Task`/`Project` classes as its real, non-toy example (counting completed subtasks across arbitrary nesting). Sets up S09 directly — the DOM you're about to meet is itself recursively structured, the exact shape this session just trained you to handle.

### Session S09 — The Real DOM
**What to expect:** the session that finally replaces Session S04's checkbox-hack sidebar toggle with real, working JavaScript — plus **bubbling**, the actual mechanism that makes event delegation possible, explained before delegation is presented as a pattern to copy.
**Objective:** understand event delegation as a direct, explainable consequence of bubbling, not a clever trick — and know precisely when `IntersectionObserver` beats a scroll listener.
**Outcome:** you can wire a single delegated listener to handle clicks on elements that don't exist yet, and explain exactly why that works, mechanically, from the event's propagation path.
**Key exercises:** the bubbling predict-before-you-peek (does a listener on `<ul>` hear a click on a nested `<li>` it never touched directly?), and the full checkbox-to-button capstone in Section 6 — this is the session's real payoff, not a side exercise.
**Connects to:** pays off Session S04's exact stated limitation. Sets up Session S10 directly — you used a Promise-shaped `IntersectionObserver` callback today without knowing precisely what a Promise is; that gap closes next session.

### Session S10 — Async Mastery
**What to expect:** the event loop traced step by step (the classic `1, 4, 3, 2` ordering quiz), `async`/`await` shown side by side with the equivalent `.then()` chain rather than just asserted as "the same thing," and the real mechanism behind *why* `await` can pause without blocking the whole page.
**Objective:** correctly predict async execution order on sight, and — the single most common real-world mistake this session targets — recognize two independent `await`s that should be a `Promise.all()` instead.
**Outcome:** you can trace a mixed microtask/macrotask example by hand and get the order right, and you never again write two independent sequential `await`s where a parallel `Promise.all()` was actually correct.
**Key exercises:** the two-macrotask event-loop trace (Section 1's mini-exercise, added specifically because the hardest topic in the session initially had no dedicated exercise), and the sequential-vs-parallel dashboard example.
**Connects to:** everything here is what Session S09's Promise-shaped code was quietly running on. Sets up Session S11 completely — the real SSE parser is an `async` generator, combining this session's `await` with next session's generators.

### Session S11 — Generators & the Real SSE Parser (CRITICAL)
**What to expect:** the highest-stakes session in the phase, by the bible's own explicit flag — generators from first principles, then the actual, complete, production-structured function the real BIA UI uses to parse a streaming AI response, built up piece by piece rather than handed over as a finished black box.
**Objective:** understand *why* SSE parsing needs a buffer at all (network chunks don't respect message boundaries), and watch the async-generator combination demonstrated small before trusting the complex real version.
**Outcome:** you can hand-trace `parseAgentSSE` processing a real event split across multiple chunk boundaries and get the buffer's value right at every step — not just recognize the finished function, actually predict its behavior on new input.
**Key exercises:** the three-chunk hand-trace (Exercise 3) — deliberately harder than the two-chunk case worked through in the main text, specifically to test whether the algorithm generalizes for you or was only ever memorized for one specific example.
**Connects to:** the direct, complete payoff of Session S10's own forward-reference. Sets up Session S12 entirely — today's `parseAgentSSE` is used, not redefined, in tomorrow's capstone.

### Session S12 — Utilities + the Full Streaming Chat Capstone
**What to expect:** four small new utilities (debounce/throttle, localStorage, UUIDs, clipboard), one real security gotcha (`textContent` vs. `innerHTML` while streaming), and then the actual, complete, working vanilla-JavaScript chat client — every mechanism from all seven prior sessions, composed into one file.
**Objective:** see, concretely, that eight sessions of separately-learned mechanisms genuinely compose into one real, working thing — not as an abstract claim, but as actual running code you can trace line by line back to the session that taught each piece.
**Outcome:** you can explain, from memory, how at least five distinct mechanisms from across the whole phase combine in the capstone's `sendMessage` function.
**Key exercises:** the debounce/throttle distinction drill, and the capstone itself — building it against your real Session S04 HTML and confirming persistence, streaming, and stop-generation all genuinely work together.
**Connects to:** the close of Phase F2. Bridges directly to Session S13 (TypeScript), which exists specifically to catch, at compile time, the exact class of type-confusion bug Session S06's `typeof null` first showed you as a historical curiosity.

---

## Part 3 — New Cross-Cutting Integration Exercises

Every exercise inside Sessions S05–S12 tests *that session's* concepts. These five are new, and deliberately combine concepts from sessions that are **not adjacent** to each other — specifically to test whether the material actually generalizes across the phase, not just within one session's boundaries.

### Integration Exercise 1 — Scope + Closures + Recursion (S05 + S07 + S08)

Write a factory function `createTaskCounter()` (S07's module pattern) that returns an object with a genuinely private counter (S05's scope rules make this private, not just convention), and a method `countNested(task)` that recursively counts every task and subtask (S08's design process) — incrementing the counter as a side effect, then returning the total.

**Solution:**
```javascript
function createTaskCounter() {
  let count = 0;   // private via scope — no property on the returned object exposes it directly

  function countNested(task) {
    count += 1;
    for (const subtask of task.subtasks ?? []) {
      countNested(subtask);
    }
    return count;
  }

  return {countNested, getCount: () => count};
}

const counter = createTaskCounter();
const project = {title: "Learn JS", subtasks: [
  {title: "S05", subtasks: []},
  {title: "S06", subtasks: [{title: "reduce practice", subtasks: []}]},
]};
console.log(counter.countNested(project));  // 4
```

### Integration Exercise 2 — Array Methods + Async + Generators (S06 + S10 + S11)

Write an async generator `fetchTasksBatch(ids)` that, for each id, `await`s a simulated network call (`setTimeout`-wrapped Promise) and `yield`s the result — but fetch all the simulated calls **in parallel** (S10's `Promise.all` lesson) rather than one at a time, then `yield` them in original order once all have resolved. Consume it with `for await...of` and use `.filter()` (S06) on the results to keep only completed tasks.

**Solution:**
```javascript
function fakeFetchTask(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve({id, title: `Task ${id}`, done: id % 2 === 0}), 200)
  );
}

async function* fetchTasksBatch(ids) {
  const results = await Promise.all(ids.map(fakeFetchTask));   // parallel, not sequential
  for (const task of results) {
    yield task;
  }
}

async function run() {
  const completed = [];
  for await (const task of fetchTasksBatch([1, 2, 3, 4])) {
    if (task.done) completed.push(task);
  }
  console.log(completed);   // tasks 2 and 4, arriving in ~200ms total, not ~800ms
}
run();
```

### Integration Exercise 3 — DOM Delegation + Debounce + LocalStorage (S09 + S12)

Build a task list where typing in a search box (debounced, 300ms) filters visible tasks, a single delegated click listener handles "complete" toggling on any task row, and every state change (search text, completed status) persists to `localStorage` immediately.

**Solution:**
```javascript
const tasks = loadFromStorage("tasks", [
  {id: 1, title: "Buy milk", done: false},
  {id: 2, title: "Walk dog", done: true},
]);

function render(filterText = "") {
  const list = document.querySelector("#task-list");
  list.innerHTML = "";
  tasks
    .filter(t => t.title.toLowerCase().includes(filterText.toLowerCase()))
    .forEach(t => {
      const li = document.createElement("li");
      li.textContent = t.title;
      li.dataset.id = t.id;
      li.classList.toggle("done", t.done);
      list.appendChild(li);
    });
}

document.querySelector("#task-list").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const task = tasks.find(t => t.id === Number(li.dataset.id));
  task.done = !task.done;
  saveToStorage("tasks", tasks);
  render(document.querySelector("#search").value);
});

const debouncedFilter = debounce((text) => render(text), 300);
document.querySelector("#search").addEventListener("input", (e) => debouncedFilter(e.target.value));

render();
```

### Integration Exercise 4 — `this` + Classes + Array Methods (S07 + S06)

Write a `TaskList` class with a method `summarize()` that uses `.filter()`/`.map()` internally, referencing `this.tasks` — then deliberately break it by extracting `summarize` as a standalone function and calling it detached, predicting the failure before running it (S07's Rule 2 implicit-binding lesson, applied to a method you wrote yourself rather than a given example).

**Solution:**
```javascript
class TaskList {
  constructor(tasks) { this.tasks = tasks; }
  summarize() {
    return this.tasks.filter(t => !t.done).map(t => t.title);
  }
}

const list = new TaskList([{title: "A", done: false}, {title: "B", done: true}]);
console.log(list.summarize());   // ["A"] — correct, called as list.summarize()

const detached = list.summarize;
// detached(); // TypeError: Cannot read properties of undefined (reading 'tasks')
// — exactly S07's Rule 2 lesson: no object to the left of the dot at the call site,
// so `this` falls back to Rule 1's default binding, which is `undefined` in strict/module code.
```

### Integration Exercise 5 — The Full Vertical Slice (S05 through S12, all at once)

Build a single function `createSearchableTaskFeed(tasks)` that: uses a `for...of` loop with scope-correct `let` (S05), destructures each task (S06), uses a `Task` class with a `.complete()` method (S07), recursively counts completed subtasks (S08), renders to the DOM with a delegated listener (S09), debounces a search filter (S12), persists to `localStorage` on every change (S12), and generates a `crypto.randomUUID()` for any newly added task (S12). This is deliberately not a new concept — it's a checklist. If you can build it without opening any of the eight session documents, Phase F2 is genuinely internalized, not just completed.

*(No solution provided for this one — deliberately. This is the same "attempt without a safety net" design already used for the formal Practice Exercises across every session in this phase, and it's the direct on-ramp to Part 4 below.)*

---

## Part 4 — The Final Synthesis Capstone: TaskFlow

### Why a standalone project, not another pass at the BIA chat UI

Session S12 already built a complete, working BIA streaming chat client — genuinely comprehensive, but it's Thread A, and by design it leans on a fixed HTML shell from Session S04. **TaskFlow is Thread B's project, finished for real** — the personal task tracker that's been growing since Session S05's very first variables, now assembled into one complete, standalone application from scratch, with no prior HTML to lean on. Building the *same* concepts against a *genuinely different* application is the actual test of whether you learned transferable skills or just followed along with one specific example — precisely the reasoning this whole two-thread structure was built on from Session S05 onward.

### Full Requirements, Each Mapped to Where It Was Taught

| Requirement | Session | Concept |
|---|---|---|
| Projects contain tasks, which can contain subtasks, to arbitrary depth | S07, S08 | Classes, recursive data |
| `Task` and `Project` are real classes, not plain objects | S07 | Constructor + methods, decided deliberately via the four-pattern framework |
| Completing a task recursively updates a "percent complete" on every ancestor project | S08 | The recursive design process, applied to new behavior |
| The task list renders via real DOM creation, never `innerHTML` for task titles | S09, S12 | `textContent` safety discipline |
| Adding, completing, and deleting tasks all use one delegated listener, not one per row | S09 | Bubbling-based delegation |
| A search box filters the visible list, debounced | S12 | Debounce |
| Scroll position in a long task list is saved, throttled | S12 | Throttle |
| Every task gets a `crypto.randomUUID()`, sanitized the same way on every save | S12 | UUID + sanitization |
| The entire project list persists to `localStorage`, safely handling a missing or corrupted key | S12 | LocalStorage patterns |
| A "sync to cloud" button simulates an async save using real `async`/`await`, with correct error handling | S10 | Promises, `try`/`catch` |
| Loading a project's tasks *and* its team members happens in parallel, not sequentially | S10 | `Promise.all` |
| An async generator produces a simulated "live activity feed" (task completed, task added) over time | S11 | Async generators, `for await...of` |
| A "copy summary to clipboard" button exists on each project | S12 | Clipboard API |
| At least one array method chain (`.filter().map()`, or a `.reduce()`) is used for a real summary statistic | S06 | Array methods |
| The whole thing is split across at least two files using real `import`/`export` | S06 | ES Modules |

### Suggested Build Order

1. **Data layer first, no DOM at all.** `Task` and `Project` classes (S07), the recursive `percentComplete` getter (S08), `localStorage` persistence (S12) — get this fully working and tested from the Console before touching a single DOM element, the same discipline Session S04's own build-order lesson taught.
2. **Static rendering.** DOM creation for a fixed, hardcoded project — no interactivity yet, just confirming data renders correctly (S09's `textContent` discipline).
3. **Interactivity.** The one delegated listener handling add/complete/delete (S09).
4. **Utilities.** Debounced search, throttled scroll-save, UUID generation, clipboard copy (S12) — layered on top of a version that already works without them.
5. **Async layer last.** The simulated cloud-sync and the async-generator activity feed (S10, S11) — genuinely optional-feeling polish that happens to exercise the two most conceptually demanding sessions in the phase.

### Self-Validation Checklist

- [ ] Reload the page — every project, task, and subtask survives exactly as left
- [ ] Complete a deeply nested subtask — confirm every ancestor's percent-complete updates correctly, recursively
- [ ] Type quickly in search — confirm filtering only happens once typing pauses, not on every keystroke
- [ ] Add ten tasks rapidly, then delete one from the middle — confirm the delegated listener still correctly targets the right row, not an off-by-one row
- [ ] Type a task title containing a literal `<` character — confirm it renders as plain text, never as a broken tag
- [ ] Trigger the simulated cloud-sync, then deliberately make it fail (throw inside the simulated Promise) — confirm the error is caught and shown, not an unhandled rejection in the console
- [ ] Watch the async-generator activity feed for at least three simulated events, confirming real delay between each, not all three appearing instantly

If every box is checked without opening any of the eight session documents for a reminder, Phase F2 is done — not "completed," genuinely internalized.
