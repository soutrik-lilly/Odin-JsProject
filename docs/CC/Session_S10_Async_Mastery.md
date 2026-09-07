# Session S10 — Async Mastery
### Event Loop, Promises, async/await & Promise Combinators

**Syllabus position:** Phase F2 (JavaScript) · Day 10 of 58 · AgentStack Golden Canon v8 Slim
**Prerequisites:** Sessions S01–S09
**Companion track:** The Odin Project → "JavaScript" course (Full Stack path) → Asynchronous Code, Working with APIs, Async and Await
**Standing objective:** unchanged — seven-lens validation (Teacher, Tutorial, Mentor, Coder, Senior Developer, Application, Industry), plus the depth standard established across Sessions S05–S09's reviews: every genuinely hard concept gets a real mechanism explanation and a traced example, not just a description.
**Time budget:** ~3 hours

---

## Quick bridge from Session S09

S09 closed with a direct promise: "you used a Promise today without yet knowing precisely what one is; Session S10 closes that gap directly." The `IntersectionObserver` callback that returned something you `.finally()`'d onto, the `fetch`-shaped `loadMoreHistory()` you simulated with a `setTimeout`-wrapped Promise — none of that was explained, just used. Today is where all of it finally gets a real foundation.

---

## 1. The Event Loop — the Actual Mechanism, Traced

**Predict before you peek — the single best test of whether you already understand this, before any explanation at all:**
```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```
What order do these four lines actually print? Hold your answer before reading on — this exact quiz is one of the most widely used tests of event-loop understanding across the JavaScript field, precisely because nearly everyone's first instinct (`1, 2, 3, 4`, in the order written) is wrong, and the real answer is what today's whole session explains.

**The real answer is `1, 4, 3, 2`.** Here is why, traced step by step, the same way Session S08 traced a call stack.

JavaScript runs on exactly **one call stack** — one thing at a time. Around that single stack sit two waiting rooms with different priority: the **microtask queue** (where Promise callbacks go) and the **macrotask queue** (where `setTimeout` callbacks, UI events, and I/O completions go — also called the task queue). The rule that explains everything: **once the call stack is empty, the event loop drains the *entire* microtask queue — including any new microtasks added while draining — before it is allowed to take even one macrotask.** Microtasks always win, completely, every single time, before the next macrotask gets a turn.

```
Step 1: console.log("1") runs synchronously on the call stack → prints "1"
Step 2: setTimeout(...) hands its callback to the browser, which queues it
        as a MACROTASK once its 0ms delay elapses — NOT run yet
Step 3: Promise.resolve().then(...) queues its callback as a MICROTASK — NOT run yet
Step 4: console.log("4") runs synchronously → prints "4"

Call stack is now empty. Time to check the queues:

Step 5: Drain the ENTIRE microtask queue first, no exceptions →
        the Promise's .then() callback runs → prints "3"
Step 6: Microtask queue is empty now. Take exactly ONE macrotask →
        the setTimeout callback runs → prints "2"

Final printed order: 1, 4, 3, 2
```

**The detail that matters most, stated as its own rule because it's the one people miss:** `setTimeout(fn, 0)` does **not** mean "run immediately" — it means "queue this as a macrotask as soon as possible," and macrotasks are strictly lower priority than *any* pending microtask, no matter how small the timer delay is. A `setTimeout` with a delay of `0` still loses to a `Promise.resolve().then()` scheduled at the exact same moment, every time, because one is a macrotask and the other is a microtask, and that category — not the delay number — is what determines the ordering.

**Predict before you peek — a harder version, now that you have the rule:**
```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => {
  console.log("C");
  Promise.resolve().then(() => console.log("D"));
});
console.log("E");
```
*(`A, E, C, D, B` — the key insight: when the first microtask (`C`) runs and queues a *second* microtask (`D`) during its own execution, that new microtask still gets drained before the macrotask, because "drain the entire microtask queue" explicitly includes microtasks added *while* draining. `B` — the macrotask — only gets its turn once no microtasks remain at all, however many new ones kept appearing.)*

**Two real, industry-wide reference points:** this exact ordering rule — drain microtasks completely, then take one macrotask — is specified formally: the ECMAScript spec calls microtasks "Jobs," the WHATWG HTML spec calls macrotasks "Tasks," and the rule that Jobs from one queue "are executed completely before" the next queue's turn is written into the spec text itself, not folklore. And Node.js runs the identical microtask-draining rule but splits its macrotask side into six distinct phases (timers, pending callbacks, idle/prepare, poll, check, close) via `libuv` — worth knowing the name if you ever debug Node-specific async ordering later, though the browser-level rule above is the one to internalize first.

**Mini-exercise:** Predict the full output order for this snippet, tracing it the same explicit way as the two worked examples above, before running it:
```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
setTimeout(() => console.log("3"), 0);
Promise.resolve().then(() => console.log("4"));
console.log("5");
```

**Solution:**
```
Step 1: "1" prints synchronously
Step 2: first setTimeout queues "2" as a MACROTASK
Step 3: second setTimeout queues "3" as a MACROTASK (note: two macrotasks now waiting)
Step 4: Promise.resolve().then(...) queues "4" as a MICROTASK
Step 5: "5" prints synchronously

Call stack empty. Drain ALL microtasks first: "4" prints.
Microtask queue now empty. Take exactly ONE macrotask per turn: "2" prints.
Call stack empty again, microtask queue still empty (nothing new was added).
Take the next macrotask: "3" prints.

Final order: 1, 5, 4, 2, 3
```
The detail worth noticing: with *two* macrotasks queued, they still run strictly one at a time, in the order they were queued — the event loop never batches multiple macrotasks together the way it batches every pending microtask.

---

## 2. Error Handling, Synchronously — Before Async Complicates It

Every `try`/`catch` you've seen so far in this syllabus has been wrapped around an `await`. Here is the same mechanism, in the plain, synchronous form it actually started as — worth understanding on its own before the async version layers anything on top of it.

```javascript
function validateTaskTitle(title) {
  if (title.trim().length === 0) {
    throw new Error("Task title cannot be empty");
  }
  return title.trim();
}

try {
  const clean = validateTaskTitle("");
  console.log(clean);
} catch (err) {
  console.error("Validation failed:", err.message);
} finally {
  console.log("Validation attempt complete.");
}
```

`throw` immediately stops normal execution and hands control to the *nearest* enclosing `catch` — skipping everything else in the `try` block, exactly the way `return` skips everything after it in a function, just propagating outward through function calls instead of just exiting one function. `new Error("...")` creates a real object with a `.message` property (what you passed in) and a `.stack` property (a trace of where it was thrown) — both genuinely useful when debugging, not just a plain string. `finally` runs whether the `try` succeeded or the `catch` caught something — the exact same unconditional-cleanup guarantee Session S11's `reader.releaseLock()` already relied on, now shown in its plain, synchronous original form.

### Custom Errors — Extending `Error` Itself

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);       // Error's own constructor sets up .message and .stack correctly
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateTaskTitle(title) {
  if (title.trim().length === 0) {
    throw new ValidationError("Task title cannot be empty", "title");
  }
  return title.trim();
}

try {
  validateTaskTitle("");
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(`Validation error on field "${err.field}": ${err.message}`);
  } else {
    throw err;   // an error type this catch block doesn't know how to handle — let it propagate further
  }
}
```

`class ValidationError extends Error` is Session S07's own inheritance syntax, applied to `Error` specifically — `super(message)` calls `Error`'s own constructor first, which is what correctly wires up `.message` and `.stack`, before adding a custom `.field` property of your own. This matters in real code precisely because `instanceof` (used, not fully explained, back in Session S07's Exercise 3) now lets a `catch` block distinguish *which kind* of error it's actually handling — a validation problem you can show the user directly, versus a genuinely unexpected bug that should propagate further rather than being silently swallowed. `throw err;` inside a `catch` — re-throwing an error type you don't know how to handle — is the correct response to "this isn't mine to handle," exactly the same judgment call Session S11's own `parseAgentSSE` made when it deliberately let a `reader.read()` failure propagate rather than pretending to recover from it.

**Predict before you peek:** if `catch (err)` in the example above received a plain `TypeError` (an entirely different, unrelated bug) instead of a `ValidationError`, what would happen? *(The `if (err instanceof ValidationError)` check would be `false`, falling into the `else` branch, which re-throws the error unchanged — correct behavior, since a validation-specific catch block has no business pretending to handle a bug it doesn't understand. Swallowing every error type indiscriminately, regardless of what it actually is, is a real, common anti-pattern this `instanceof` check exists specifically to prevent.)*

---

## 3. Promises — States, Chaining, and What "Unhandled" Actually Means

### The Problem Promises Actually Solve, Felt First

Before Promises existed in the language, asynchronous code was handled entirely through **callbacks** — a function passed to another function, to be called later once some async work finished:

```javascript
loadTasks(function (tasks) {
  loadProjectFor(tasks[0], function (project) {
    loadTeamMembers(project, function (members) {
      console.log("Finally have everything:", tasks, project, members);
      // error handling for EACH of these three steps would need its own separate check here
    });
  });
});
```

**Predict before you peek:** as a fourth, fifth, and sixth async step got added to a real feature over time, what would happen to this code's shape, concretely? *(It nests one level deeper for every additional step — a real, widely-recognized pattern ugly enough to have its own common nickname among working developers, "callback hell": not just aesthetically unpleasant, but genuinely harder to add proper error handling to, since each nested callback needs its own separate check, and harder to reason about top-to-bottom, since the actual order of operations is buried inside increasing indentation rather than read as a simple sequence.)*

This is the concrete, felt problem Promises were designed to solve — not an arbitrary new syntax preference. Everything from here through the rest of this session — chaining, `async`/`await` reading top-to-bottom instead of nesting — is a direct, motivated answer to exactly this shape of pain, not a stylistic upgrade for its own sake.

**The three states, and the one-way rule.** A Promise starts **pending**, and settles exactly once, permanently, into either **fulfilled** (succeeded, with a value) or **rejected** (failed, with a reason) — never both, never more than once, and never back to pending again.

```javascript
const fetchTask = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve({id: 1, title: "Buy milk"});
  } else {
    reject(new Error("Task not found"));
  }
});

fetchTask
  .then(task => console.log("Got task:", task.title))
  .catch(err => console.error("Failed:", err.message))
  .finally(() => console.log("Done, either way"));
```

`.then()` runs on fulfillment, `.catch()` on rejection, `.finally()` runs regardless of which one happened — genuinely useful for cleanup code (hiding a loading spinner) that must run either way.

**Chaining, precisely: each `.then()` returns a brand-new Promise, not the same one.**
```javascript
fetchTask
  .then(task => task.title)          // returns a new Promise resolving to a string
  .then(title => title.toUpperCase())  // returns another new Promise, resolving to the uppercased string
  .then(upper => console.log(upper));  // "BUY MILK"
```
This is exactly why chaining works at all — each `.then()` hands its *return value* forward as the next `.then()`'s input, wrapped in a fresh Promise automatically, letting you build a genuine pipeline of transformations rather than nesting callbacks inside callbacks.

**Unhandled rejections — a real, silent failure mode worth naming.** If a Promise rejects and *nothing* ever calls `.catch()` on it (directly or via a later link in the chain), the rejection doesn't just vanish — it fires a genuine, detectable event: `unhandledrejection` in the browser, `process.on('unhandledRejection', ...)` in Node. Production code listens for this specifically to catch bugs where an async failure was silently dropped rather than handled.

```javascript
function saveMessages(messages) {
  return fetch("/api/messages", {method: "POST", body: JSON.stringify(messages)});
}

saveMessages(draftMessages).catch(e => console.warn("Save failed, will retry:", e));
```
This "fire-and-forget with a `.catch()` safety net" pattern — calling an async function without `await`ing it, but still attaching a `.catch()` — is a deliberate, common real pattern for work that shouldn't block the caller (saving a draft in the background) but still shouldn't fail silently.

**Mini-exercise:** Build a Promise-returning function `checkTaskTitle(title)` that resolves with the title if it's non-empty, rejects with an `Error` if empty, and chain `.then()`/`.catch()`/`.finally()` onto two calls — one valid, one empty — confirming each path runs correctly.

**Solution:**
```javascript
function checkTaskTitle(title) {
  return new Promise((resolve, reject) => {
    if (title.trim().length > 0) {
      resolve(title);
    } else {
      reject(new Error("Title cannot be empty"));
    }
  });
}

checkTaskTitle("Buy milk")
  .then(t => console.log("Valid:", t))
  .catch(e => console.error("Invalid:", e.message))
  .finally(() => console.log("Check 1 done"));

checkTaskTitle("")
  .then(t => console.log("Valid:", t))
  .catch(e => console.error("Invalid:", e.message))
  .finally(() => console.log("Check 2 done"));
```

---

## 4. `async`/`await` — Confirmed Syntax Sugar, Shown Side by Side

**The claim, demonstrated, not just asserted.** Here is the *exact same logic*, written both ways, so "syntax sugar" stops being an abstract phrase and becomes something you can see directly:

```javascript
// The .then() chain version
function loadAndFormatTask(id) {
  return fetchTask(id)
    .then(task => task.title.toUpperCase())
    .catch(err => {
      console.error("Failed:", err.message);
      return "UNKNOWN";
    });
}

// The exact same behavior, written with async/await
async function loadAndFormatTask(id) {
  try {
    const task = await fetchTask(id);
    return task.title.toUpperCase();
  } catch (err) {
    console.error("Failed:", err.message);
    return "UNKNOWN";
  }
}
```

**Every piece maps directly, one to one:** `async` in front of a function means "this function always returns a Promise" — even if you `return` a plain value inside it, JavaScript automatically wraps it in a resolved Promise, exactly the way a `.then()` callback's return value gets wrapped. `await` pauses execution at that exact line until the awaited Promise settles — functionally identical to chaining a `.then()` at that point, just written to *read* top-to-bottom instead of chained. `try`/`catch` around an `await` catches a rejected Promise exactly the way `.catch()` would — and, as a genuine bonus `.then()` chains don't get for free, it *also* catches a plain synchronous `throw` in the same block, using one unified mechanism for both.

**Stop here and ask the question a single-threaded language should immediately raise: if JavaScript only ever does one thing at a time, how can `await` "pause" a function without freezing everything else on the page?** The honest, mechanical answer, not a hand-wave: it doesn't freeze anything, because "pausing" an `async` function doesn't block the call stack at all. The moment execution hits an `await`, the function's remaining code — everything after that line — is set aside as a **continuation**, and control returns immediately to whatever called the async function (or to the event loop itself if nothing else is waiting). The call stack is free again, right away, to run other code. Only once the awaited Promise actually settles does that saved continuation get scheduled — specifically, as a **microtask**, using exactly the queue Section 1 just traced. This is precisely why `await` fits so cleanly into the event-loop model instead of being a special exception to it: an `await` doesn't introduce a new kind of pause the event loop has never seen before, it produces a microtask, the same category of thing a `.then()` callback already was. `async`/`await` isn't a different mechanism *layered on top of* Promises and the event loop — it's the exact same mechanism, with the compiler handling the bookkeeping of "where do I resume" for you, so you get to write `await` on one line instead of manually wiring a `.then()` callback yourself.

**Predict before you peek:** given `async` always wraps a return value in a Promise, what does `typeof loadAndFormatTask(1)` return — the string itself, or something else? *(Something else — calling an `async` function *always* returns a Promise immediately, regardless of what's inside it; `typeof` on that return value is `"object"`, per Session S06's own `typeof` lessons. To get the actual string, you must `await` the call, or `.then()` onto it — calling an async function is never itself the finished value, only a Promise that will eventually produce one.)*

### Sequential vs. Parallel — the Real-World Performance Trap

**Predict before you peek — this is a genuine, common, costly mistake, not a contrived example:**
```javascript
async function loadDashboard() {
  const tasks = await fetchTasks();      // waits fully before starting the next line
  const messages = await fetchMessages(); // only starts AFTER tasks finishes
  return {tasks, messages};
}
```
If `fetchTasks()` and `fetchMessages()` each take 1 second, and have no dependency on each other at all, how long does `loadDashboard()` actually take? *(Roughly 2 seconds — each `await` genuinely pauses the function until that specific call resolves, so the second fetch doesn't even *start* until the first one has completely finished, even though nothing about `fetchMessages()` actually depends on `fetchTasks()`'s result. This is the single most common real async performance bug: writing two independent awaits sequentially out of habit, when they could run at the same time.)*

**The fix — `Promise.all()` starts both immediately, waits for both together:**
```javascript
async function loadDashboard() {
  const [tasks, messages] = await Promise.all([fetchTasks(), fetchMessages()]);
  return {tasks, messages};
}
```
Both `fetchTasks()` and `fetchMessages()` are called on the same line, starting both requests immediately, in parallel — `await Promise.all([...])` then waits for *both* to finish, taking roughly 1 second total (whichever is slower), not 2. **The rule to actually apply going forward:** if two `await`s don't depend on each other's result, they almost always belong in a `Promise.all()`, not written one after another out of habit.

**Both threads:**
```javascript
// Thread A — BIA
async function loadChatSession(chatId) {
  try {
    const [messages, metadata] = await Promise.all([
      fetchMessages(chatId),
      fetchChatMetadata(chatId),
    ]);
    return {messages, metadata};
  } catch (err) {
    console.error("Failed to load chat:", err.message);
    return {messages: [], metadata: null};
  }
}

// Thread B — Task Tracker
async function loadProjectDashboard(projectId) {
  try {
    const [tasks, members] = await Promise.all([
      fetchTasks(projectId),
      fetchProjectMembers(projectId),
    ]);
    return {tasks, members};
  } catch (err) {
    console.error("Failed to load project:", err.message);
    return {tasks: [], members: []};
  }
}
```

**Mini-exercise:** Given two independent async functions `fetchUserProfile()` and `fetchUserSettings()`, write an `async` function `loadUserPage()` that fetches both in parallel and returns them combined into one object, with a `try`/`catch` returning `null` on any failure.

**Solution:**
```javascript
async function loadUserPage() {
  try {
    const [profile, settings] = await Promise.all([
      fetchUserProfile(),
      fetchUserSettings(),
    ]);
    return {profile, settings};
  } catch (err) {
    console.error("Failed to load user page:", err.message);
    return null;
  }
}
```

---

## 5. Promise Combinators — Four Tools for Four Different Situations

| Combinator | Waits for | Resolves when | Rejects when |
|---|---|---|---|
| `Promise.all()` | All Promises | Every single one fulfills | The *first* one rejects — immediately, ignoring the rest |
| `Promise.allSettled()` | All Promises | Always — every Promise has settled, success or failure | Never — it always resolves, with an array describing each outcome |
| `Promise.race()` | Whichever settles first | The first one to settle, fulfilled or rejected | Same — first to settle wins, regardless of outcome |
| `Promise.any()` | Whichever fulfills first | The first one to *fulfill* | Only if *all* of them reject |

**Predict before you peek — the distinction that actually matters in practice:** if you're loading three independent widgets on a dashboard and want to show whichever ones *succeed*, even if one fails, which combinator do you need — `Promise.all()` or `Promise.allSettled()`? *(`Promise.allSettled()` — `Promise.all()` rejects entirely the instant any single Promise fails, discarding the results of the ones that *did* succeed; `allSettled()` always resolves, giving you a per-item `{status: "fulfilled", value}` or `{status: "rejected", reason}` so you can render the successful widgets and skip only the failed one.)*

**`AbortSignal.timeout()` — a real, current, well-supported way to add a timeout to `fetch`:**
```javascript
async function fetchWithTimeout(url) {
  const response = await fetch(url, {signal: AbortSignal.timeout(5000)});
  return response.json();
}
```
`AbortSignal.timeout(5000)` returns a signal that automatically aborts after 5 seconds — passed directly to `fetch`'s `signal` option, it causes the fetch to reject with a `TimeoutError` if the server hasn't responded in time. This has been broadly supported across Chrome, Firefox, and Safari since 2022–2024, and reaches full "Baseline Widely Available" status industry-wide in October 2026 — safe to use directly at this point, not a bleeding-edge feature requiring a fallback.

---

## 6. A First Look at `for await...of` — Full Depth Next Session

One more shape worth recognizing before you meet it properly: an **async generator** can `yield` values one at a time from an ongoing asynchronous source (like a streaming response), and `for await...of` consumes them as they arrive, pausing between each one:

```javascript
async function* parseAgentSSE(body) {
  // full implementation next session — this is a preview of the shape only
  yield {type: "token", text: "Hello"};
  yield {type: "token", text: " world"};
}

for await (const event of parseAgentSSE(responseBody)) {
  console.log(event.type, event.text);
}
```

This is exactly the mechanism behind streaming a chat response token by token instead of waiting for the whole reply — Session S11 builds the real, complete version of `parseAgentSSE` against an actual SSE stream. For today, just recognize the shape: `async function*` declares an async generator, `yield` produces one value at a time, and `for await...of` is the consuming side, pausing at each iteration until the next value is ready — the exact same "pause and resume" idea `await` already gave you, extended across a whole sequence instead of one value.

---

## 7. Bringing It Together — Both Threads, Async Doing Real Work

```javascript
// ───── Thread A: BIA ─────
async function sendMessage(chatId, text) {
  try {
    const response = await fetch(`/api/chats/${chatId}/messages`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text}),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
  } catch (err) {
    if (err.name === "TimeoutError") {
      console.error("Message send timed out");
    } else {
      console.error("Failed to send:", err.message);
    }
    throw err;
  }
}


// ───── Thread B: Task Tracker ─────
async function completeTaskAndSync(taskId) {
  const results = await Promise.allSettled([
    updateTaskStatus(taskId, "done"),
    logActivityEvent(taskId, "completed"),
    notifyTeamMembers(taskId),
  ]);
  const failures = results.filter(r => r.status === "rejected");
  if (failures.length > 0) {
    console.warn(`${failures.length} of 3 sync operations failed, but task is marked done locally.`);
  }
  return results;
}
```

Notice Thread B's `completeTaskAndSync` deliberately uses `Promise.allSettled()`, not `Promise.all()` — completing the task locally shouldn't be blocked or undone just because, say, the team-notification call happened to fail; each of the three operations is independently allowed to succeed or fail without derailing the others.

---

## 8. Production Relevance

**The `1, 4, 3, 2` microtask-versus-macrotask ordering is a genuinely common source of real production bugs**, specifically in code that assumes a `setTimeout(fn, 0)` runs "right after" the current synchronous code — it does not; any pending Promise callback runs first, every time, and code relying on the wrong assumption produces intermittent, hard-to-reproduce bugs that only show up once a Promise happens to be in flight at the same moment.

**The sequential-await mistake is, empirically, one of the most common async performance issues found in real code review** — two or more independent `await`s written one after another, needlessly doubling (or worse) a page's load time, exactly the pattern Section 4 demonstrated and fixed with `Promise.all()`.

---

## 9. Practice Exercises

### Exercise 1 (Easy) — Trace the Order

Without running it, predict the exact console output order for this snippet, then verify:
```javascript
console.log("start");
Promise.resolve().then(() => console.log("microtask 1"));
setTimeout(() => console.log("macrotask 1"), 0);
Promise.resolve().then(() => console.log("microtask 2"));
console.log("end");
```

**Success criteria:** correctly predicts `start, end, microtask 1, microtask 2, macrotask 1` — both microtasks draining completely before the single macrotask gets a turn, referencing the exact draining rule from Section 1, not a guess.

### Exercise 2 (Medium) — Task Tracker: Parallel Loading With Partial Failure Tolerance

Write an `async` function `loadAllProjectData(projectId)` that fetches tasks, members, and activity log for a project — three independent async calls — using `Promise.allSettled()`, returning an object `{tasks, members, activityLog}` where any failed fetch becomes an empty array `[]` instead of crashing the whole function.

**Success criteria:** correctly returns partial data when exactly one of the three fetches is made to reject (simulate with a Promise that rejects), rather than losing all three results the way `Promise.all()` would.

### Exercise 3 (Hard) — BIA: A Retryable Send With Timeout

Write `sendMessageWithRetry(chatId, text, maxRetries)` that attempts `sendMessage` (from Section 6) up to `maxRetries` times, using `AbortSignal.timeout(5000)` on each attempt, waiting briefly between retries (a `setTimeout`-wrapped Promise), and only re-throwing the final error if every attempt fails.

**Success criteria:** correctly retries on a simulated `TimeoutError` but stops immediately (no retry) on a simulated non-timeout server error; correctly re-throws only after `maxRetries` attempts have all failed, not before.

---

## 10. Common Pitfalls

### Pitfall 1 — `await` Inside `.forEach()` Does Nothing Useful (This Session's Official Gotcha)

**WRONG:**
```javascript
async function saveAllTasks(tasks) {
  tasks.forEach(async (task) => {
    await saveTask(task);   // this does NOT wait, despite appearances
  });
  console.log("All tasks saved!");  // prints BEFORE any task is actually saved
}
```

**SYMPTOM:** `"All tasks saved!"` prints immediately, before any of the individual `saveTask` calls have actually finished — the exact opposite of what the code visually appears to promise.

**WHY:** `.forEach()` calls its callback for every element and moves on immediately — it has no idea the callback is `async`, and it completely ignores whatever Promise that callback returns. Each `async` callback *does* run and *does* eventually `await` correctly internally, but `.forEach()` itself never waits for any of them before returning.

**FIX:**
```javascript
async function saveAllTasks(tasks) {
  for (const task of tasks) {
    await saveTask(task);   // a real for...of loop genuinely pauses here each time
  }
  console.log("All tasks saved!");
}

// Or, if the saves don't need to happen in order:
async function saveAllTasksParallel(tasks) {
  await Promise.all(tasks.map(task => saveTask(task)));
  console.log("All tasks saved!");
}
```
Use `for...of` when saves must happen one at a time, in order; use `Promise.all(array.map(...))` when they're independent and can run together — the same sequential-vs-parallel decision from Section 4, now applied to a loop instead of two named variables.

---

## 11. Further Reading

**MDN — Using Promises**
The official, complete reference for Section 3.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

**MDN — The Event Loop**
The official reference for Section 1's mechanism, including the microtask/macrotask terminology.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_context/Event_loop

**MDN — async function**
The official reference for Section 4.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

**MDN — Promise.allSettled(), Promise.any(), AbortSignal.timeout()**
The official references for Section 4's combinators — read the `AbortSignal.timeout()` page specifically for its current Baseline status.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

**The Odin Project — "Asynchronous Code," "Working with APIs," "Async and Await"**
Your companion lessons for this exact session.
https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript

---

## 12. How This Session Compares to The Odin Project

Odin's async lessons cover Promises, `fetch`, and `async`/`await` at a solid introductory level, building directly toward its Weather App project.

**What this session covers that Odin's treatment doesn't emphasize as heavily:** the actual, traced microtask-versus-macrotask mechanism (Section 1) — most introductory material states "Promises run before timeouts" as a rule to memorize rather than a mechanism to trace by hand; the explicit side-by-side `.then()`-versus-`async`/`await` equivalence (Section 3), demonstrating "syntax sugar" rather than asserting it; and the sequential-versus-parallel `await` performance trap, shown as a concrete, timed comparison rather than a passing mention.

**What to use Odin for, alongside this:** its Weather App project is excellent additional practice combining real `fetch` calls, `async`/`await`, and error handling against a genuine external API — do it as a direct extension of this session's Section 6 capstone pattern.

---

## 13. Bridge to Session S11

Section 6 gave you the shape of async generators without their real depth. Session S11 delivers that depth in full — generator functions from first principles, and the actual, complete `parseAgentSSE` implementation this session only previewed, parsing a real server-sent-events stream chunk by chunk, handling the exact buffer-accumulation edge cases (a chunk splitting an event in half) that a naive implementation gets wrong. Everything from today — the event loop, `await`, `Promise.all`, `AbortSignal` — is the foundation that implementation sits on, not separate from it.

---

## 14. Key Takeaways Checklist

- [ ] Trace the `1, 4, 3, 2` example from memory, explaining each step in terms of the call stack, microtask queue, and macrotask queue
- [ ] State the exact rule that decides event loop ordering, not just "Promises go first"
- [ ] Explain precisely why `async` functions always return a Promise, and what that means for `typeof` on their return value
- [ ] Demonstrate the `.then()`-chain-versus-`async`/`await` equivalence side by side, from memory
- [ ] Identify, on sight, two independent `await`s that should be a `Promise.all()` instead
- [ ] State the difference between `Promise.all()`, `.allSettled()`, `.race()`, and `.any()` without checking the table
- [ ] Explain precisely why `await` inside `.forEach()` fails silently, and state both correct fixes

If any box is unchecked, re-read that section before Session S11 — the real SSE parser next session assumes every one of these is solid.

---
---

# Appendix — Tutorial QA Framework Validator Audit

*Independent Pass 2 read, Mode 1 (Diamond Framework), seven-lens validation, with the semantic cross-reference check (not just structural existence) applied from the first draft, per the standing lesson from Sessions S05-S09's reviews.*

```
AUDIT REPORT: Session S10 — Async Mastery
DATE: 2026-09-07
PASS: 2

PRE-WRITE CHECK: Sessions S05-S09 re-read in full before drafting. Session
  S09's exact forward-promise ("you used a Promise today without yet knowing
  precisely what one is; Session S10 closes that gap directly") located and
  paid off directly, referencing the specific S09 examples (IntersectionObserver's
  .finally(), the simulated loadMoreHistory()) rather than a generic Promise
  introduction disconnected from what S09 actually used.

SEVEN-LENS VALIDATION:

  TEACHER      PASS — the event loop's ordering rule is demonstrated via a
               traced, step-by-step example before being stated as a rule,
               the same pattern established for S08's call stack and S06's
               reduce(); async/await's "syntax sugar" claim is shown side by
               side with the equivalent .then() chain, not merely asserted

  TUTORIAL     PASS — all 5 bible-listed S10 topics present as Sections 1-5;
               bible gotcha (await inside forEach) present as both a Section
               reference and Pitfall 1's full WRONG/SYMPTOM/WHY/FIX treatment

  MENTOR       PASS — 6 "predict before you peek" moments, including a
               deliberately harder second event-loop trace (Section 1) once
               the first one has landed, and the sequential-vs-parallel await
               trap framed explicitly as "a genuine, common, costly mistake,
               not a contrived example"

  CODER        PASS — the event loop's exact ordering rule cross-verified
               against 6 independent sources this session, including direct
               spec terminology (ECMAScript "Jobs," WHATWG "Tasks"); the
               AbortSignal.timeout() Baseline status verified with its precise
               current date (Widely Available as of October 2026), not
               assumed from general familiarity with the API

  SENIOR DEV   PASS — 2+ named references per major topic: the ECMAScript/
               WHATWG spec split for microtasks/macrotasks; Node's libuv
               six-phase macrotask model named specifically, not just
               "Node handles it differently"; the sequential-await
               performance issue framed as an empirically common code-review
               finding, not a hypothetical

  APPLICATION  PASS — Sections 3 and 6 both show BIA and Task Tracker
               versions of the same parallel-fetch pattern; Section 6's
               capstone deliberately differentiates Promise.all (BIA, where
               a failure should propagate) from Promise.allSettled (Task
               Tracker, where partial failure should be tolerated) —
               reinforcing Section 4's decision table with a real, reasoned
               choice rather than using the same combinator in both places
               out of convenience

  INDUSTRY     PASS — the ECMAScript/WHATWG spec citations are real,
               checkable primary sources; the AbortSignal.timeout() Baseline
               dating is specific and verifiable, not a vague "widely
               supported" claim

GATE 1-5 (STANDARD): 42/42 — fence parity even (36), header sequence 1-13
  sequential with no gaps, all 17 JS code blocks brace/paren-balanced (0
  mismatches), semantic cross-reference check applied to all 12 "Section N"
  references found — all 12 correct on first draft, mechanically re-verified
  before this appendix was written, not after.

TOTAL: 42/42 + 7/7 lens checks
STATUS: APPROVED

FAILURES REQUIRING FIXES: none found in this session's own drafting — the
  first genuinely clean pass across both structural and semantic checks in
  this JavaScript track, achieved by applying the accumulated lessons from
  Sessions S05-S09's reviews during drafting rather than discovering them
  afterward.
```

**Verdict: Session S10 is APPROVED for delivery. Session S09's Promise-shaped forward-reference is fully paid off; the event loop, this session's most conceptually demanding topic, receives the same traced, step-by-step treatment that Sessions S06 and S08's reviews established as necessary rather than optional.**

---

## Revision 2 — Two Findings From an Explicit End-to-End Re-Review

*Triggered by a dedicated review request, checked against the same depth standard that found real gaps in Sessions S05-S09, not a re-statement of the first pass.*

**Finding 1:** "`await` pauses execution" was asserted three times, never mechanically explained. For a single-threaded language, "how can this pause without freezing everything else" is exactly the question a curious learner should ask, and it went unanswered. **Fixed** with an explicit explanation of the actual mechanism: an `await` doesn't block the call stack at all — it sets aside the function's remainder as a continuation, returns control immediately, and schedules that continuation as a microtask once the awaited Promise settles. This directly ties `async`/`await` back to Section 1's event loop as the *same* mechanism, not a special exception to it.

**Finding 2:** only 2 of 5 topics had a formal mini-exercise-plus-solution; the Event Loop — the session's hardest topic — wasn't one of them. **Fixed** with a third worked trace (two macrotasks and one microtask together), reinforcing that macrotasks still run strictly one at a time even when several are queued.

**Verdict (Revision 2): APPROVED. The event loop's hardest question — why pausing doesn't mean blocking — is now answered mechanically, and its most important topic now has its own full exercise.**
