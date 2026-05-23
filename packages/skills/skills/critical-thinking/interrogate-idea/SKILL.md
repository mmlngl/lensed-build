---
name: Interrogate Idea
description: Pressure-test an idea by checking all three dimensions (customer experience, business, code) before you build. Use when user has an idea they want to validate, when a concept feels half-formed, or when starting a new project.
---

<what-to-do>

Pressure-test the user's idea across three dimensions. Ask questions one at a time, wait for a response before continuing. Keep it conversational — use the user's answers to form the next question naturally. You're not reading a script, you're having a dialogue.

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

If the user has already given the idea a name, use it and move on. If not, give it a temporary codename — Greek mythology, single word, no context. Tell them it can be changed later.

---

### Customer Experience Dimension

**1. Imagine 100 of your customers in a room. What do they have in common?**

Imagine 100 of their customers in a room. What do they have in common?
Push for specifics: age, context, what they do, what they're motivated by, what they're driven by.
If they say "everyone" or themselves, push back.

**2. What problem are they experiencing?**

Don't assume — get the customer's problem in the words of the user.

**3. How do you know they care?**

Evidence: interviews, research, engagement signals. "I care" is not evidence.

**4. How do they solve this problem today?**

If they care, they're already solving it somehow. How?

**5. What's different about your approach?**

Why would they switch? "AI" or "better UX" are not differentiators on their own.

---

### Business Dimension

**1. How do your customers pay today?**

What are they currently spending — money, time, attention? If nothing, that's a gap.

**2. If you picked 100 people at random, how many would care about this?**

- Small niche: viable if profitable per person
- Large market: viable if you can reach them

---

### Code Dimension

**1. What's the core domain?**

What data are you modelling? What are the key entities and relationships?

**2. What's the simplest version that proves it works?**

What's the MVP — not the feature list, the thing you can ship in 2-4 weeks?

**3. What do you not know how to build?**

What are the technical unknowns? "We'll figure it out" is not a plan.

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
