---
name: Interrogate Idea
description: Pressure-test an idea by checking all three dimensions (customer experience, business, code) before you build. Use when user has an idea they want to validate, when a concept feels half-formed, or when starting a new project.
---

<what-to-do>

Pressure-test the user's idea across three dimensions. Ask questions one at a time, wait for a response before continuing.

For each question:

1. Ask it clearly
2. Note the response
3. If the answer is weak, note the gap explicitly
4. Proceed to the next question

After all questions are answered, score each dimension and present the results. If any dimension is INCOMPLETE, the user must close the gap before proceeding.

</what-to-do>

<supporting-info>

## The Three Dimensions

Every product idea lives in three dimensions simultaneously:

- **Customer Experience** — Is the problem real for your customers (or you)? Do they feel a deep need?
- **Business** — Is there commercial viability? Is the proposition sound?
- **Code** — Is it feasible? Is it built for change?

## Question Order

### Set up

**1. Check for a name**

- If the user has already given the idea a name (or codename), use that and skip to Q1.
- If no name was given, create a temporary codename based on Greek mythology — single word, no context. Tell the user this is temporary and can be changed later.

---

### Customer Experience Dimension

**1. Imagine 100 of your customers in a room. What do they have in common?**

- Prompt: "Who are these people? Be specific — age, context, what they do"
- If the user says "everyone" or names themselves, push back: "Not you. Who else?"

**2. What makes you confident that they care?**

- Prompt: "How do you know this is a real problem they experience?"
- Evidence includes: interviews, research, signals of engagement
- "I care" is not evidence. "I asked 10 people and 8 said X" is.

**3. How do they solve this problem today?**

- Prompt: "What are they doing right now to address this need?"
- If they're not solving it: might not be a real problem
- If they're solving it badly: opportunity exists

**4. What's different about your approach?**

- Prompt: "Why would they switch to your solution?"
- "AI" or "better UX" or "cheaper" are not differentiators by themselves
- Must articulate specific value

---

### Business Dimension

**1. How do your customers pay today?**

- Prompt: "What are they currently spending on this problem — money, time, attention?"
- Direct payment (buying a product/service)
- Indirect payment (ads, subscription to free tier, time spent)
- No payment model yet = gap

**2. Roughly how many people have this problem? (10s / 100s / 1000s / millions)**

- Prompt: "If you picked 1000 people at random, how many would care about this?"
- Small niche: viable if profitable per person
- Large market: viable if you can reach them

---

### Code Dimension

**1. What's the core domain?**

- Prompt: "What data are you modelling? What are the key entities and relationships?"
- Forces the user to think about the problem space, not the solution

**2. What's the simplest version that proves it works?**

- Prompt: "What's the MVP — not the feature set, the thing you can ship in 2-4 weeks?"
- If the user can't scope it small, that's a gap

**3. What do you not know how to build?**

- Prompt: "What are the technical unknowns — the things you'd need to research or figure out?"
- "We'll figure it out" is not a plan

---

## Gap States

After interrogation, each dimension is in one state:

- **COMPLETE** — Answers are solid, evidence exists, score 3+
- **INCOMPLETE** — Gap identified — must be closed or consciously accepted before proceeding

## Scoring

COMPLETE answers get a score 1-5:

- **1** — Vague, assumption-based, no evidence
- **3** — Plausible, but general (e.g., "people care about baking")
- **5** — Specific, evidence-backed (e.g., "amateur bakers in UK aged 25-45, who follow baking influencers, expressed this problem in X research")

## Output Format

After all questions are answered, present:

```
Customer Experience: [COMPLETE | INCOMPLETE] (score /5)
  - [notes on what you know]
  - [notes on gaps]

Business: [COMPLETE | INCOMPLETE] (score /5)
  - [notes on what you know]
  - [notes on gaps]

Code: [COMPLETE | INCOMPLETE] (score /5)
  - [notes on what you know]
  - [notes on gaps]
```

If any dimension is INCOMPLETE: describe the gap and the user's plan to close it. The burden is on the user to improve or abandon.

## When to Use

- Before starting any new project
- Before adding a major feature
- Before pitching to stakeholders
- When an idea feels half-formed

## What Interrogation Is Not

- A checklist to tick and ignore
- A way to kill ideas prematurely
- A one-shot gate — return to it when new information emerges

</supporting-info>
