---
name: validate-stories
description: Validate specs before development. Check acceptance criteria quality, test coverage, and flag delivery risks. Use when user wants to assess story quality, enforce spec standards, or monitor delivery health.
---

# Validate Stories

Assess, remind, and optionally block stories that aren't ready for development.

## Workflow States

| State | Assess | Remind | Block | Notes |
|-------|--------|--------|-------|-------|
| Spec drafting | ✅ | - | - | Initial quality check |
| Ready for dev | ✅ | ✅ | ❓ | Block mechanism TBD |
| In progress | ✅ | - | - | Track scope creep |
| PR ready | ✅ | ✅ | ✅ | Test coverage gate |
| Merged | ✅ | - | - | Post-delivery metrics |

## Signals to Check

### Story Quality
- Has acceptance criteria (AC)?
- AC are testable (not "works fine" or "looks good")
- No ambiguous terms: "should", "maybe", "or", "etc."
- BDD format preferred: Given/When/Then or similar

### Test Coverage
- New logic has unit tests
- Coverage doesn't drop below threshold
- Integration tests for critical paths

### Delivery Risk
- Story points growing mid-sprint
- AC added after work started (scope creep)
- High defect rate on similar stories
- Long time in "In Progress"

## Reminders

Format: "[Story ID] needs attention: [reason]"

Trigger: Weekly digest or configurable threshold.

## Block Mechanism

> **NOTE:** Block implementation depends on project management tool and workflow. This skill will be refined when workflow is defined.

Stubbed integrations:
- [ ] Linear
- [ ] Jira
- [ ] GitHub Projects
- [ ] Custom (manual process)

## Usage

1. Load story or sprint data
2. Run validation checks
3. Generate assessment report
4. Send reminders if configured
5. Block if criteria not met (when implemented)

## Output Format

```
## Story Assessment: [ID]

### Quality Score: X/Y criteria met

**Acceptance Criteria:**
- ✅ [criterion]
- ❌ [missing/poor criterion]

**Test Coverage:**
- ✅ [metric]

**Risks:**
- ⚠️ [risk description]

**Recommendation:** [Ready / Needs Work / Blocked]
```

## Safe Assumptions

- Stories use some form of task tracking (Linear, Jira, etc.)
- Git workflow exists (PRs, merges)
- Test coverage is measured (coverage reports)

## TODO

- [ ] Define block mechanism with Nimble team
- [ ] Identify test coverage tools (Jest, Vitest, etc.)
- [ ] Confirm defect tracking integration
- [ ] Add example stories for testing