# WINTR Guide — Content Arc

_Stub. First draft._

## Architecture: State Machine

WINTR is a state machine. You enter in a starting state and progress through gates.

```
[START: Idea exists]
    ↓
[INTERROGATION: Check all three dimensions]
    ↓
For each dimension (UX, Business, Code):
    - State: Complete → dimension passes
    - State: Incomplete → stub skill appears, close the gap, re-interrogate
    ↓
Once ALL dimensions pass → PROCEED
    ↓
[DISCOVER] → [DEFINE] → [DESIGN] → [DELIVER]
```

Interrogation is recursive, not one-shot. You don't "fail" — you loop back to close gaps.

---

## Interrogation (Gate)

**Checks:** Three dimensions — UX, Business, Code.

**What it evaluates:**
- UX: Is the problem real? Is the user need clear?
- Business: Is there commercial viability? Is the proposition sound?
- Code: Is the idea feasible technically? Is it built for change?

**Skills integrated:**
- `interrogate-dimension` (stub)

**Failure prevented:** Building something doomed because a dimension was skipped.

**States:**
- `UX_INCOMPLETE` → skills to close UX gaps
- `BUSINESS_INCOMPLETE` → skills to close business gaps
- `CODE_INCOMPLETE` → skills to close code gaps
- `ALL_COMPLETE` → proceed to Discover

---

## Phase 1: Discover

**Goal:** Validate that the problem is real before you build anything.

**What you do:**
- Define the problem you're solving
- Identify who has this problem
- Research whether they care enough to pay (or use it)

**Skills integrated:**
- `validate-problem` (stub)

**Failure prevented:** Building something nobody wants.

---

## Phase 2: Define

**Goal:** Shape the solution with testable specifications.

**What you do:**
- Articulate the proposition clearly
- Define the value proposition for different audiences
- Write user stories with acceptance criteria
- Assess technical feasibility (UX + Business + Code)

**Skills integrated:**
- `validate-stories` (exists)
- `define-proposition` (stub)

**Failure prevented:** Vague requirements that blow up in dev. Fundraising collapses because you can't explain what you're building.

---

## Phase 3: Design

**Goal:** Align stakeholders and get buy-in before you commit.

**What you do:**
- Build the case (deck, demo, pitch)
- Communicate value to skeptics
- Align team on priorities

**Skills integrated:**
- `make-deck` (exists)
- `stakeholder-alignment` (stub)

**Failure prevented:** Building consensus that falls apart the moment you ship.

---

## Phase 4: Deliver

**Goal:** Ship with quality and visibility.

**What you do:**
- Validate story quality before dev starts
- Monitor delivery health
- Catch scope creep early
- Ensure the thing you built actually works

**Skills integrated:**
- `validate-stories` (exists)
- `delivery-monitor` (stub)

**Failure prevented:** Launch week where nobody cares because the thing you shipped wasn't what they needed.

---

## Running Themes

- AI integration at every step — use AI to accelerate, not to bypass thinking
- The trifecta lens — every decision checked against UX + Business + Code
- Agent skills available at each phase
- Buyer is the hero — WINTR is the Yoda

---

## TODO

- [ ] Expand each phase into concrete steps
- [ ] Identify skill gaps (stub placeholders)
- [ ] Map failure modes explicitly to each phase
- [ ] Add AI-specific workflows
- [ ] Define what "complete" means for each dimension in Interrogation
- [ ] Design the stub skills: `interrogate-dimension`, `validate-problem`, `define-proposition`, `stakeholder-alignment`, `delivery-monitor`