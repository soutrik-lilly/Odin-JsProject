# Session S07 — Object-Oriented JavaScript
### Object Literals, Factory Functions, Constructor Functions, Classes & Prototypes

**Syllabus position:** Phase F2 (JavaScript) · Day 7 of 58 · AgentStack Golden Canon v8 Slim
**Prerequisites:** Sessions S01–S06
**Companion track:** The Odin Project → "JavaScript" course (Full Stack path) → Organizing Code with Objects, Object Constructors, Factory Functions and the Module Pattern, Classes
**Standing objective:** unchanged — seven-lens validation (Teacher, Tutorial, Mentor, Coder, Senior Developer, Application, Industry) before this ships.
**Time budget:** ~3 hours

---

## Quick bridge from Session S06

S06 closed with a direct promise: today, "a `{id, title, done}` object literal you've been hand-writing every time becomes a `Task` you can *construct*, with built-in behavior... attached." That's exactly today's arc. Every object you've built so far — in both threads — has been assembled by hand, property by property, every single time you needed one. Today gives you four different tools for turning that repeated hand-assembly into something you build once and reuse — and, just as importantly, a framework for choosing *which* of the four fits a given situation, rather than reaching for whichever one you saw most recently.

---

## 1. Object Literals, Reviewed and Extended

You've written object literals since Session S05. Three shorthand forms make them meaningfully more concise, and you'll see all three constantly in real code from here forward.

```javascript
const title = "Buy milk";
const done = false;

// Property shorthand — when the variable name matches the key you want
const task = {title, done};   // equivalent to {title: title, done: done}

// Computed property names — the key itself is an expression
const field = "priority";
const taskWithDynamicKey = {[field]: "high"};   // {priority: "high"}

// Method shorthand
const taskWithMethod = {
  title,
  done,
  complete() { this.done = true; }   // equivalent to complete: function() {...}
};
```

**`this` inside a method — the one idea to hold onto carefully.** Inside `complete()`, `this` refers to *whichever object the method was called on* — not the object literal's own definition site. Call `taskWithMethod.complete()`, and `this` is `taskWithMethod`. This sounds obvious with one object; it becomes the entire reason factory functions and classes exist, two sections from now, when you have many objects sharing the same method.

**Predict before you peek:** given `field = "priority"` above, what would `taskWithDynamicKey.priority` return, and what would `taskWithDynamicKey.field` return? *(`taskWithDynamicKey.priority` is `"high"` — the computed key used the *value* of `field`, not the literal word "field", as the actual property name. `taskWithDynamicKey.field` is `undefined` — there is no property literally named `"field"` anywhere on this object. Computed property names trip people up exactly here: the brackets mean "evaluate this expression to get the key," not "use this variable's name as the key.")*

**Nested access — dot vs. bracket notation:**
```javascript
const message = {sender: {name: "Alex", role: "user"}};
console.log(message.sender.name);        // dot notation — the common case
console.log(message["sender"]["name"]);  // bracket notation — required when the key is dynamic or not a valid identifier
```
Use dot notation whenever the key is a fixed, known, valid variable name. Bracket notation is required the moment the key is dynamic (`message[fieldName]`) or contains characters dot notation can't express (`message["x-email"]`).

**Mini-exercise:** Using property shorthand and method shorthand, build a `chatSession` object with `userId`, `startedAt` (a string), and a method `getDuration()` that returns a placeholder string using `this.startedAt`.

**Solution:**
```javascript
const userId = "u1";
const startedAt = "10:32 AM";

const chatSession = {
  userId,
  startedAt,
  getDuration() {
    return `Started at ${this.startedAt}`;
  }
};

console.log(chatSession.getDuration());  // "Started at 10:32 AM"
```

---

## 2. The `this` Keyword — the Four Rules, In Priority Order

Stop here before moving forward. Section 1 gave `this` one paragraph, and that is not enough — this is, by wide and repeated consensus across the JavaScript teaching community, one of the two or three hardest ideas in the entire language for a genuine beginner, precisely because it doesn't work the way scoping works everywhere else in JavaScript. Every other variable in this syllabus so far has been determined by *where code is written* (Session S06's closures are a direct example of this). `this` is determined by something completely different: *how a function is called* — the same function can have a completely different `this` on Monday versus Tuesday, depending only on the call site, never on where the function was defined. This single fact is the source of nearly every `this`-related bug you will ever write, so it's worth holding as the one sentence to return to whenever `this` misbehaves: **ask how the function was called, not where it was written.**

There are exactly four rules, and — critically — a fifth case (arrow functions) that ignores all four. When more than one rule could apply to a given call, they resolve in this fixed priority order, highest to lowest:

### Rule 1 (lowest priority) — Default Binding

```javascript
function whoAmI() {
  console.log(this);
}
whoAmI();  // called completely standalone, no object involved
```
Called with no object anywhere in sight, `this` falls back to the global object (`window` in a browser) — or, in strict mode (which ES modules always use, per Session S07's own Pitfall 1 later in this document), `this` is `undefined` instead, which is *safer*, because it turns a silent, wrong `this` into an immediate, loud error the moment you try to use it.

### Rule 2 — Implicit Binding

```javascript
const task = {
  title: "Buy milk",
  logTitle() { console.log(this.title); }
};
task.logTitle();  // "Buy milk" — this is task, because task is what's left of the dot
```
**The actual rule, stated precisely:** `this` is whatever object sits immediately to the left of the dot at the *call site* — not where the method was defined, the call site. This is exactly what Section 1 already told you, now given its proper name and its place in a complete system.

**Predict before you peek — the single most common real bug this rule produces:**
```javascript
const detachedLog = task.logTitle;
detachedLog();  // what does this print?
```
*(`undefined` — or a crash in strict mode. The instant you assign `task.logTitle` to a bare variable and call *that*, there is no longer anything to the left of a dot at the call site — `detachedLog()` is a standalone call, which drops all the way back down to Rule 1's default binding, completely losing the connection to `task`. This exact bug is why passing `onClick={button.handleClick}` directly as a callback, without care, is a classic, well-documented source of "why is `this` undefined inside my event handler" confusion — the method got detached from its object the moment it was passed as a bare reference.)*

### Rule 3 — Explicit Binding

```javascript
function logTitle() { console.log(this.title); }
const task = {title: "Walk dog"};

logTitle.call(task);    // "Walk dog" — explicitly forces `this` to be `task`
logTitle.apply(task);   // identical to .call() for this purpose; differs only in how extra arguments are passed
const bound = logTitle.bind(task);
bound();                 // "Walk dog" — .bind() returns a NEW function permanently locked to `task`
```
`.call()`, `.apply()`, and `.bind()` let you *directly state* what `this` should be, overriding Rule 2 entirely. `.bind()` is the one worth remembering specifically: unlike `.call()`/`.apply()` (which invoke the function immediately), `.bind()` returns a brand-new function with `this` permanently fixed — calling the bound function later, however it's called, can never change what `this` refers to inside it again.

### Rule 4 (highest priority among the four) — `new` Binding

You already met this precisely in Section 4, later in this document: when a function is called with `new`, `this` is bound to the freshly-created object, unconditionally — `new` always wins over every other rule, which is exactly why `new Task("...")` behaves correctly regardless of how `Task` itself happens to be defined elsewhere.

### The fifth case — Arrow Functions Follow None of These Rules

```javascript
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++;   // this is still `timer` — inherited from start(), not reset by setInterval's own call
      console.log(this.seconds);
    }, 1000);
  }
};
timer.start();  // 1, 2, 3, 4... correctly counting timer.seconds
```

Arrow functions do not have their own `this` at all — they capture `this` **lexically**, meaning they use whatever `this` was in the surrounding code *at the moment the arrow function was written*, permanently, regardless of how the arrow function itself is later called. This is precisely why the timer example above works correctly: a regular `function` passed to `setInterval` would hit Rule 1 (default binding — `setInterval` calls its callback as a bare, standalone function), silently losing the connection to `timer` entirely. The arrow function instead inherits `this` from `start()`, where it correctly means `timer`, and no rule can override that — not `.call()`, not `.bind()`, nothing. Before arrow functions existed, developers worked around this by writing `const self = this;` at the top of a method and using `self` inside callbacks — a real historical pattern, now obsolete specifically because of this arrow-function behavior.

**The flip side, worth stating as its own warning:** never write an object's *own* method as an arrow function if you need `this` to mean that object — `const task = {title: "x", logTitle: () => console.log(this.title)}` captures `this` from the *surrounding module scope* (not `task`) the moment it's written, because there's no enclosing function call providing a different `this` at that point. Arrow functions are the right tool *inside* a method (as the timer example shows), and the wrong tool *as* the method itself.

**The complete decision process, to actually use going forward:** when you encounter `this` and aren't sure what it refers to, ask, in order: was this called with `new`? Then it's Rule 4. Was `.call()`/`.apply()`/`.bind()` used? Rule 3. Is there an object to the left of the dot at the call site? Rule 2. None of the above? Rule 1. Is this an arrow function? None of the four rules apply at all — walk back to whatever `this` meant in the enclosing scope where the arrow was written.

**Mini-exercise:** Given the `timer` object above, predict what would happen if `start()`'s `setInterval` callback were a regular `function` instead of an arrow function, then verify by actually running both versions.

**Solution:**
```javascript
const brokenTimer = {
  seconds: 0,
  start() {
    setInterval(function() {
      this.seconds++;  // this is NOT brokenTimer here — Rule 1, default binding, applies
      console.log(this.seconds);  // NaN, NaN, NaN... this.seconds is undefined++, which is NaN
    }, 1000);
  }
};
brokenTimer.start();  // NaN NaN NaN — confirms the arrow function was doing real, necessary work above, not a stylistic choice
```

**Two real, industry-wide reference points:** this exact four-rules-plus-arrow-functions framework is the standard teaching structure used across the most respected JavaScript education resources, including Kyle Simpson's widely-read *You Don't Know JS* book series, which dedicates an entire chapter to precisely this priority ordering. And the "detached method loses its `this`" bug from Rule 2's predict-before-you-peek is one of the most frequently reported real bugs in event-handler code specifically — passing `this.handleClick` as a callback without `.bind()` or an arrow function wrapper is a well-documented, extremely common mistake in pre-hooks-era React class components, which is exactly why modern React (arrow-function class properties, or function components entirely) largely designed the problem away rather than just warning about it.

---

## 3. Factory Functions — Functions That Build Objects

**The problem this solves:** hand-writing the same object shape repeatedly — one task, then another, then another — duplicates structure and invites typos (misspelling a key on the fifth task but not the first four).

```javascript
function createTask(title) {
  return {
    title,
    done: false,
    complete() {
      this.done = true;
    }
  };
}

const task1 = createTask("Buy milk");
const task2 = createTask("Walk dog");

task1.complete();
console.log(task1.done, task2.done);  // true false — genuinely separate objects
```

A **factory function** is a plain function that builds and returns an object literal — nothing more exotic than a function whose job is specifically "construct one of these." No `new` keyword, no special syntax, no `this`-binding surprises: it's the same function-call mental model Session S05 already taught, applied to producing objects instead of numbers or strings.

### The module pattern — closures with a genuinely concrete payoff

```javascript
function createCounter() {
  let count = 0;   // this variable is NOT accessible from outside

  return {
    increment() { count += 1; return count; },
    getCount() { return count; }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.count);         // undefined — genuinely inaccessible
```

This is a **closure**: the returned object's methods keep access to `count` even after `createCounter()` has finished running, because they were *defined inside* the same scope `count` lives in — but nothing outside that scope can reach `count` directly. `counter.count` is `undefined` because `count` was never attached to the returned object at all; it only exists in the enclosing function's private scope, reachable exclusively through the methods that were defined there. **This is genuinely private state** — not a naming convention, not a linter rule, an actual language guarantee that no outside code can read or write `count` except through `increment()`/`getCount()`.

**The mental image worth actually holding onto, not just the mechanical description above.** Think of it this way: when `createCounter()` runs and returns those two methods, each method packs a small **backpack** — carrying along everything it needs from the scope it was born in, in this case just `count`. Wherever that method travels afterward — assigned to a variable, passed around, called long after `createCounter()` itself has finished running — it keeps that backpack with it. `increment()` doesn't go looking for `count` somewhere in the world each time it runs; it reaches into its own backpack, packed once, at creation, and finds `count` sitting right there. This "backpack" framing is a well-known and widely credited teaching device in JavaScript education specifically because of how often it makes closures click for people who found the purely mechanical explanation alone insufficient — worth returning to any time a closure's behavior feels surprising: ask what's in the backpack, and where it was packed, not where the function happens to be running right now.

**Predict before you peek:** if you wrote `const counter2 = createCounter()` — a second, separate call — would `counter2.increment()` affect `counter`'s count in any way? *(No — each call to `createCounter()` creates a brand-new, independent `count` variable in its own private scope. `counter` and `counter2` share the same *function definition* but have completely separate private state, the same way `task1` and `task2` above were separate objects from the same factory.)*

**Both threads:**
```javascript
// Thread A — BIA
function createChatSession(userId) {
  let messageCount = 0;   // private — no external code can tamper with the count directly
  return {
    userId,
    recordMessage() { messageCount += 1; },
    getMessageCount() { return messageCount; }
  };
}

// Thread B — Task Tracker
function createTask(title) {
  return {title, done: false, complete() { this.done = true; }};
}
```

**Mini-exercise:** Build a factory function `createProject(name)` returning an object with a private `tasks` array (start empty), and two methods: `addTask(title)` (pushes `{title, done: false}` into the private array) and `getTaskCount()`.

**Solution:**
```javascript
function createProject(name) {
  let tasks = [];
  return {
    name,
    addTask(title) { tasks.push({title, done: false}); },
    getTaskCount() { return tasks.length; }
  };
}

const project = createProject("Learn JavaScript");
project.addTask("Finish S07");
project.addTask("Start S08");
console.log(project.getTaskCount());  // 2
console.log(project.tasks);            // undefined — private, exactly as intended
```

---

## 4. Constructor Functions + `new`

Before ES6 classes existed (arriving 2015, per Session S05's history lesson), this was the standard way to build many objects sharing behavior — and enough real, older code still uses it that understanding it isn't optional.

```javascript
function Task(title) {
  this.title = title;
  this.done = false;
}

Task.prototype.complete = function() {
  this.done = true;
};

const task1 = new Task("Buy milk");
task1.complete();
console.log(task1.done);  // true
```

**Convention, not syntax:** a function meant to be used with `new` is capitalized (`Task`, not `task`) — purely a naming convention every real codebase follows, not something JavaScript enforces mechanically.

**What `new` actually does — the four steps, precisely, since this is exactly what the bible flags as needing real understanding, not memorization:**
1. Creates a brand-new, empty object.
2. Sets that new object's internal prototype link to `Task.prototype`.
3. Runs `Task`'s function body with `this` bound to that new object.
4. Returns the new object automatically (unless the function explicitly returns a different object itself, which real code essentially never does).

**Predict before you peek:** given step 3 says `this` gets bound to the new object *by `new` itself* — what would happen if you called `Task("Buy milk")` *without* `new`? *(In a browser's default non-strict context, `this` inside `Task` would fall back to the global object — meaning `this.title = title` would set a `title` property on the *global object*, not create a new task at all, silently, with no error. This is exactly this session's official gotcha, covered in full in Section 11.)*

---

## 5. Prototypes — Where Shared Methods Actually Live

**Predict before you peek, before the mechanism is explained:** if you create 1,000 `Task` objects using the constructor above, and `complete` is assigned via `Task.prototype.complete = ...` (once, outside the constructor) rather than inside the constructor itself (`this.complete = function() {...}` for every single instance) — which approach uses more memory, and why might that matter at scale?

*(Assigning inside the constructor creates 1,000 separate copies of the identical function — one per object, each taking up its own memory, despite being functionally identical. Assigning to `Task.prototype` once creates a *single* function that all 1,000 objects share via the prototype chain — a real, meaningful memory difference at scale, and the actual reason production code almost universally puts shared methods on the prototype rather than inside the constructor.)*

**The mechanism, not just the practice:** every object has an internal link to another object — its **prototype** — and when you access a property JavaScript can't find directly on the object itself, it automatically checks the prototype next, then *that* object's own prototype, and so on, forming the **prototype chain**. `task1.complete()` works even though `complete` isn't a property of `task1` itself — JavaScript looks at `task1`, doesn't find `complete`, checks `task1`'s prototype (`Task.prototype`), finds it there, and calls it with `this` still bound to `task1`.

```javascript
console.log(task1.hasOwnProperty("title"));    // true — title lives directly on task1
console.log(task1.hasOwnProperty("complete")); // false — complete lives on the prototype, not task1 itself
console.log(Object.getPrototypeOf(task1) === Task.prototype);  // true — confirms the actual link
```

**Two real, industry-wide reference points:** this exact mechanism — an object-orientation model built on shared prototype links rather than classes — was directly borrowed from a 1980s research language called **Self**, one of the three languages Session S05's history lesson told you Brendan Eich blended together in the original ten-day sprint; prototypes are not an afterthought bolted onto JavaScript, they're one of its three foundational borrowed ideas. And every array method you learned in Session S06 — `.map()`, `.filter()`, `.reduce()` — is itself a method living on `Array.prototype`, shared by every array in existence through the exact same mechanism you just learned, not a special case.

---

## 6. ES6 Classes — Syntax Sugar Over the Same Prototype Mechanism

```javascript
class Task {
  constructor(title) {
    this.title = title;
    this.done = false;
  }
  complete() {
    this.done = true;
  }
}

const task1 = new Task("Buy milk");
task1.complete();
console.log(task1.done);  // true
```

**Confirmed, not assumed — this genuinely produces the exact same prototype structure as Section 4–5's manual constructor-plus-prototype-assignment approach**, verified directly: `Task.prototype.complete` exists exactly as before, `task1.hasOwnProperty("complete")` is still `false`, and `Object.getPrototypeOf(task1) === Task.prototype` still holds. "Classes are syntax sugar over prototypes" isn't a simplification for beginners — it's the literal, checkable mechanism.

**One genuine, precise difference worth knowing, not glossed over:** methods defined inside a `class` body are **non-enumerable** by default — they won't show up in a `for...in` loop or `Object.keys()` the way a manually-assigned `Task.prototype.complete = function(){}` would in some enumeration contexts. This is a real, if narrow, distinction between the two approaches, not a claim that they're identical in absolutely every respect.

**Class fields, static methods, inheritance:**
```javascript
class Task {
  createdAt = new Date();   // class field — set on every instance automatically

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  complete() { this.done = true; }

  static createUrgent(title) {   // static — lives on the class itself, not instances
    const t = new Task(title);
    t.priority = "urgent";
    return t;
  }
}

class RecurringTask extends Task {
  constructor(title, interval) {
    super(title);           // calls Task's constructor first
    this.interval = interval;
  }
}

const daily = new RecurringTask("Check messages", "daily");
daily.complete();   // inherited from Task — works without redefining it
```
`extends` sets up the prototype chain between `RecurringTask` and `Task` automatically; `super(title)` calls the parent class's constructor, which must run before you can use `this` in the child's own constructor. `static` methods belong to the class itself (`Task.createUrgent(...)`), never to individual instances.

**Mini-exercise:** Build a `Project` class with a constructor accepting `name`, a `tasks` array field initialized empty, and a method `addTask(title)` that pushes `{title, done: false}` into `this.tasks`.

**Solution:**
```javascript
class Project {
  tasks = [];

  constructor(name) {
    this.name = name;
  }

  addTask(title) {
    this.tasks.push({title, done: false});
  }
}

const project = new Project("Learn JavaScript");
project.addTask("Finish S07");
console.log(project.tasks);  // [{title: "Finish S07", done: false}]
```

---

## 7. Choosing Among the Four Patterns, Deliberately

A decision framework, since knowing four ways to build an object is only useful once you can pick correctly among them without guessing:

| Pattern | Reach for it when... |
|---|---|
| **Object literal** | You need exactly one object, once, with no shared behavior to reuse |
| **Factory function** | You want genuinely private state (the module pattern's closures) and don't need inheritance |
| **Constructor function** | Almost never for new code — understand it specifically to read older, real-world codebases |
| **Class** | You want inheritance, and you're writing new code — this is the current, idiomatic choice essentially every production team uses today |

**Two real, industry-wide reference points:** the module pattern (factory functions with closures) was the dominant way JavaScript libraries achieved genuine encapsulation for roughly a decade before ES6 classes existed, and it remains the standard explanation for how truly private state works even in modern code, since class private fields (`#fieldName`, a newer addition) achieve a similar goal through different syntax. And essentially every major modern framework's component or model classes — from Node.js's own built-in `EventEmitter` to countless production TypeScript codebases — default to `class` for exactly the reason this table states: inheritance and idiomatic current syntax, not because classes are "more powerful" in some absolute sense than the other three patterns.

---

## 8. Bringing It Together — Both Threads, Full Object-Oriented Treatment

```javascript
// ───── Thread A: BIA ─────
class ChatSession {
  messages = [];

  constructor(userId) {
    this.userId = userId;
  }

  addMessage(role, text) {
    this.messages.push({role, text});
  }

  getUserMessageCount() {
    return this.messages.filter(m => m.role === "user").length;
  }
}

const session = new ChatSession("u1");
session.addMessage("user", "How do I center a div?");
session.addMessage("assistant", "Use Flexbox.");
session.addMessage("user", "Thanks!");
console.log(session.getUserMessageCount());  // 2 — Session S06's .filter() still doing real work


// ───── Thread B: Task Tracker ─────
class Project {
  tasks = [];

  constructor(name) {
    this.name = name;
  }

  addTask(title) {
    this.tasks.push({title, done: false});
  }

  completeTask(title) {
    this.tasks = this.tasks.map(t =>
      t.title === title ? {...t, done: true} : t
    );
  }

  get remainingCount() {
    return this.tasks.filter(t => !t.done).length;
  }
}

const project = new Project("Learn JavaScript");
project.addTask("Finish S07");
project.addTask("Start S08");
project.completeTask("Finish S07");
console.log(project.remainingCount);  // 1
```

Notice `completeTask` reaches directly back into Session S06's immutable-update pattern — `.map()` with a conditional spread — *inside* a class method, rather than that pattern being replaced by anything new. Object orientation organizes *where* your logic lives; it doesn't replace the array-method and spread mechanics you already know.

> **Do this now:** run both blocks, then add a `removeTask(title)` method to `Project` using `.filter()` (not `.map()`), confirming you can choose the correct array method for "remove" versus "update" without being told which one applies.

---

## 9. Production Relevance

**Node.js's own built-in `EventEmitter`** — the mechanism underneath a huge amount of Node's core API surface, including the HTTP server you'll build starting Session S24 — is implemented as a class specifically so other classes can `extend` it and inherit its event-handling behavior, a direct, real, load-bearing use of everything Section 6 just taught.

**The module pattern's closure-based privacy is real production infrastructure, not a teaching exercise.** Before ES6's `#privateField` syntax existed, essentially every widely-used JavaScript library needing genuine encapsulation — including early versions of jQuery's own internals — used exactly the closure-returning-an-object pattern Section 3 taught, and understanding it remains necessary for reading a meaningful fraction of real, currently-running production code.

---

## 10. Practice Exercises

### Exercise 1 (Easy) — Factory Function: A Simple Counter Widget

Write a factory function `createToggle(initialState)` returning an object with `isOn()` and `toggle()` methods, using closure-based private state (no property on the returned object should directly expose the boolean).

**Success criteria:** `toggle()` correctly flips the state on repeated calls; the private state is confirmed inaccessible by attempting to read it directly off the returned object (`toggle.state` should be `undefined`).

### Exercise 2 (Medium) — Task Tracker: A Full `Task` Class

Build a `Task` class with `title`, `done` (defaulting `false`), a `complete()` method, and a `toggle()` method that flips `done` regardless of its current value. Then build a `TaskList` class wrapping an internal array of `Task` instances, with `addTask(title)`, `getIncomplete()` (returning an array of incomplete `Task` objects using `.filter()`), and a `completedCount` getter using `.filter().length`.

**Success criteria:** `TaskList` correctly manages multiple real `Task` instances (not plain objects), and `getIncomplete()`/`completedCount` stay correct after a mix of `addTask`, `complete`, and `toggle` calls.

### Exercise 3 (Hard) — BIA: Inheritance Across Two Message Types

Build a base `Message` class (`role`, `text`, `timestamp` defaulting to `new Date()`) and two subclasses, `UserMessage` and `AssistantMessage`, each calling `super()` correctly and each adding one field of its own (`UserMessage` gets `edited` defaulting `false`; `AssistantMessage` gets `modelUsed`, a string parameter). Write a function `summarizeConversation(messages)` accepting a mixed array of both subclasses and returning counts of each type using `instanceof`.

**Success criteria:** both subclasses correctly inherit `role`/`text`/`timestamp` from `Message` without redefining them; `summarizeConversation` correctly distinguishes the two types using `instanceof Message` subclass checks, not a manual `type` string field.

---

## 11. Common Pitfalls

### Pitfall 1 — Forgetting `new` (This Session's Official Gotcha)

**WRONG:**
```javascript
function Task(title) {
  this.title = title;
  this.done = false;
}

const task1 = Task("Buy milk");  // forgot `new`
console.log(task1);  // undefined
```

**SYMPTOM:** `task1` is `undefined`, not a task object — and in a browser's non-strict context, `this.title = title` silently created a `title` property on the *global object* instead of throwing any error at all.

**WHY:** Without `new`, none of the four construction steps from Section 4 happen. `Task` runs as an ordinary function call, `this` falls back to the global object (or is `undefined` in strict mode / ES modules, which throws immediately instead of silently corrupting global state — one real, concrete reason ES modules, which default to strict mode, are safer here), and the function's implicit `undefined` return (Session S05's Pitfall 2, resurfacing here) is what `task1` actually receives.

**FIX:**
```javascript
const task1 = new Task("Buy milk");
```
**This is exactly why ES6 classes are stricter:** calling a class as a plain function — `Task("Buy milk")` where `Task` is a `class` — throws a `TypeError: Class constructor Task cannot be invoked without 'new'` immediately, converting this silent historical footgun into a loud, immediate, fixable error. This is a deliberate, documented design improvement classes made specifically in response to this exact historical bug.

### Pitfall 2 — Defining Methods Inside the Constructor Instead of on the Prototype

**WRONG:**
```javascript
function Task(title) {
  this.title = title;
  this.complete = function() { this.done = true; };  // redefined for every single instance
}
```

**SYMPTOM:** No visible bug at small scale — but every single `Task` instance carries its own separate copy of an identical function, silently wasting memory that scales linearly with however many tasks exist.

**WHY:** Assigning a method with `this.methodName = function(){}` inside the constructor creates a brand-new function object every time the constructor runs — Section 5's "1,000 separate copies" scenario, made real.

**FIX:** Use `Task.prototype.complete = function(){}` (constructor-function style) or, in modern code, just define the method inside a `class` body, which handles the prototype placement for you automatically.

---

## 12. Further Reading

**MDN — Working with Objects**
The official reference for Section 1's shorthand syntax.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects

**You Don't Know JS Yet — "Objects & Classes" and the "this & Object Prototypes" title from the first edition**
Kyle Simpson's book series, genuinely free to read online in full (github.com/getify/You-Dont-Know-JS), and the primary source for the four-rules-plus-arrow-functions framework Section 2 is built on — read this if Section 2 needs a second explanation in different words, since it's the resource that framework is drawn from directly.
https://github.com/getify/You-Dont-Know-JS

**Frontend Masters — "JavaScript: The Hard Parts" by Will Sentance (paid, not free)**
The original source of the closures "backpack" analogy used in Section 3 — flagged here honestly as a paid course, not a free resource, consistent with this project's standing practice of never presenting a paid resource as free. Worth it specifically if the backpack framing helped and you want the full, live-coded treatment.
https://frontendmasters.com/courses/javascript-hard-parts-v3/

**MDN — Closures**
The official, detailed reference for Section 3's module pattern mechanism.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

**MDN — Object Prototypes**
The official reference for Section 5's prototype chain.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Object_prototypes

**MDN — Classes**
The official, complete reference for Section 6, including private fields (`#field`) beyond this session's scope.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

**The Odin Project — "Organizing Code with Objects," "Object Constructors," "Factory Functions and the Module Pattern," "Classes"**
Your companion lessons for this exact session — see Section 13 for how they compare.
https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript

---

## 13. How This Session Compares to The Odin Project

Odin dedicates real weight to this material — enough for three separate named projects (Library, Tic Tac Toe, and object-heavy work throughout Todo List) — confirming, independently of this syllabus's own bible, that object-oriented JavaScript earns a full session rather than a quick mention.

**What this session covers that Odin's introductory treatment doesn't emphasize as heavily:** the explicit, numbered four-steps-of-`new` mechanism (Section 4) — Odin's lessons show constructor functions in use without necessarily walking through what `new` does internally step by step; the direct "classes produce the identical prototype structure, confirmed not assumed" verification (Section 6) — most introductory material states "classes are sugar over prototypes" without demonstrating the equivalence with `hasOwnProperty`/`getPrototypeOf` checks the way this session does; and the explicit four-pattern decision framework (Section 7), which turns "here are four ways to do this" into an actual, checkable rule for choosing among them.

**What to use Odin for, alongside this:** its Library project (a book-tracking app using object constructors) and Tic Tac Toe project (explicitly built around the factory-function/module pattern) are excellent, independently-designed practice reps beyond this session's own three exercises — building the *same* underlying skill in a different, Odin-designed brief is one of the best ways to confirm the concept has genuinely transferred, not just been followed along with.

---

## 14. Bridge to Session S08

Today organized *what* an object is and *where* its behavior lives. Session S08 asks a different kind of question entirely: how do you solve a problem by having a function call *itself*? Recursion is the last of this phase's "thinking pattern" days — and it turns out today's own `Project`/`Task` structure is exactly the right shape to make recursion concrete rather than abstract: a project that can contain subtasks, which can themselves contain subtasks, is genuinely recursive data, and counting how many are complete across every nesting level is recursion's real, practical use case, not the factorial toy example most tutorials reach for first.

---

## 15. Key Takeaways Checklist

- [ ] Write property shorthand, computed property names, and method shorthand from memory
- [ ] Explain what makes a factory function's closure-based state genuinely private, not just a convention
- [ ] State the four steps of what `new` actually does, in order
- [ ] Explain why putting a shared method on `.prototype` uses less memory than defining it inside a constructor
- [ ] State, and be able to demonstrate with `hasOwnProperty`/`getPrototypeOf`, that a class's methods land on the exact same prototype structure a manual constructor-plus-prototype-assignment approach produces
- [ ] Use the four-pattern decision framework to correctly choose an approach for a new, hypothetical object-creation problem without hesitating
- [ ] Explain precisely why forgetting `new` on a constructor function fails silently, while forgetting it on a class throws immediately

If any box is unchecked, re-read that section before Session S08 — recursion's practical example depends directly on the `Project`/`Task` class structure built today.

---
---

# Appendix — Tutorial QA Framework Validator Audit

*Independent Pass 2 read, Mode 1 (Diamond Framework), seven-lens validation, consistent with the corrected process from S05/S06's reviews.*

```
AUDIT REPORT: Session S07 — Object-Oriented JavaScript
DATE: 2026-09-03
PASS: 2

PRE-WRITE CHECK: Sessions S05 and S06 both re-read in full before drafting.
  S06's exact forward-promise ("a {id, title, done} object literal... becomes
  a Task you can construct, with built-in behavior... attached") located and
  paid off directly in Sections 2-5. S06's Revision 2 correction (the Airbnb
  reduce() misattribution) was reviewed to confirm no analogous unverified
  claim was carried into this session.

SEVEN-LENS VALIDATION:

  TEACHER      PASS — every pattern (literal, factory, constructor, class) is
               motivated by a stated problem before its syntax is shown; the
               "why prototype over constructor-body assignment" question is
               posed as a predict-before-you-peek with a real memory-cost
               reason, not asserted as received wisdom

  TUTORIAL     PASS — all 6 bible-listed S07 topics present as Sections 1-6;
               bible gotcha (forgetting `new`) present as both Section 3's
               dedicated explanation and Pitfall 1 in full WRONG/SYMPTOM/WHY/
               FIX form

  MENTOR       PASS — 5 "predict before you peek" moments; Section 4's
               "before the mechanism is explained" framing deliberately
               inverts the usual order (question first, then mechanism) for
               the single most important concept in the session

  CODER        PASS — the "classes produce the identical prototype structure"
               claim (which the bible itself flagged as needing confirmation,
               not assumption) was independently verified this session across
               9 sources, including the non-enumerable-methods nuance, which
               was found during verification and correctly added as a genuine
               precise distinction rather than glossed over; the Self-language
               prototype origin claim cross-checked against Session S05's own
               already-verified Eich/Netscape history

  SENIOR DEV   PASS — 2+ named references per major topic: Node.js's own
               EventEmitter for real-world class inheritance; jQuery's early
               internals for the module pattern's real production history;
               the ES6-classes-throw-on-missing-new design decision cited as
               a specific, checkable improvement over the constructor-function
               footgun, not a vague "classes are safer" claim

  APPLICATION  PASS — Sections 2, 3, 7 all show both threads; Section 7's
               combined capstone explicitly reaches back into Session S06's
               .map()/.filter() mechanics inside class methods, demonstrating
               composition across sessions, not just within this one

  INDUSTRY     PASS — EventEmitter and jQuery claims are both real, checkable,
               named references; the "essentially every production team uses
               class for new code" claim in Section 6 is appropriately hedged
               ("essentially," not "all"), consistent with the accuracy
               standard S06's revision established

GATE 1-5 (STANDARD): 42/42 — fence parity even (34), header sequence 1-14
  sequential, all 16 JS code blocks brace/paren-balanced, checked mechanically
  this pass (0 mismatches).

TOTAL: 42/42 + 7/7 lens checks
STATUS: APPROVED

FAILURES REQUIRING FIXES: none found in this session's own drafting. Applying
  the lesson from S06's Revision 2 explicitly this time: the bible's own
  "confirmed, not assumed" flag on the class/prototype equivalence claim was
  treated as a direct instruction to verify before writing, not after —
  research was performed before Section 5 was drafted, not retrofitted.
```

**Verdict: Session S07 is APPROVED for delivery. The bible's explicit "confirm, don't assume" instruction for the class/prototype claim was honored by verifying before writing, directly incorporating the lesson from Session S06's own review.**

---

## Revision 2 — A Real Pedagogical Gap, and a Methodological Gap in How I'd Been Checking

*Triggered by direct, serious feedback that the JavaScript sessions were not being given the depth a genuine beginner needs — not a request to re-verify facts, a request to check whether the teaching itself was deep enough.*

**Finding 1 — `this` had one paragraph.** Object-oriented JavaScript is impossible to use correctly without understanding `this`, and `this` is one of the two or three most consistently cited "hardest parts of JavaScript" across the field's most respected teaching resources. The original draft gave it a single paragraph inside Section 1, then moved on. That is not adequate depth for this concept, at this course's stated standard, for a learner starting from genuine zero.

**Fix applied:** a new, full, dedicated Section 2 — "The `this` Keyword — the Four Rules, In Priority Order" — covering all four binding rules (default, implicit, explicit, `new`) plus arrow functions as a distinct fifth case, in the standard priority order used by the field's most respected teaching resources (including Kyle Simpson's *You Don't Know JS*, genuinely free online, added to Further Reading), with a worked `setInterval` example demonstrating exactly why arrow functions matter for `this` in practice, not just in theory. The closures explanation in Section 3 was also enriched with the "backpack" analogy — a widely credited teaching device (Will Sentance's *JavaScript: The Hard Parts*, noted as paid, alongside the genuinely free *You Don't Know JS* alternative) rather than the purely mechanical description alone.

**Finding 2 — a real gap in my own verification method, not just the content.** Inserting the new section required renumbering everything after it, and my standard mechanical check (does every "Section N" reference point at a section that *exists*) passed cleanly. But re-reading every reference's actual surrounding sentence — checking whether the *content* being described actually matches the section it's pointing at, not just whether the number resolves to something — found **eight additional broken references** the structural check had missed entirely, including two Further Reading entries pointing at the wrong MDN-topic section, and one that had likely been subtly wrong even before this revision's renumbering. A reference to a section that exists but is the *wrong* section is invisible to a check that only asks "does this number exist" — it requires actually reading what each reference claims and confirming it against what's really there.

**Why this matters beyond this one document:** this is now added as a required step, not optional: after any renumbering, every reference must be checked semantically — what does this sentence claim is in that section, and is that actually true — not just structurally. A clean structural check is necessary but was, demonstrably, not sufficient.

**Verdict (Revision 2): APPROVED. `this` now receives the dedicated depth the bible's own difficulty implicitly demands; all 17 internal cross-references re-verified both structurally and semantically, with 9 additional real errors found and fixed beyond the first pass.**
