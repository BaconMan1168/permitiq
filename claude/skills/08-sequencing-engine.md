# 08 — Sequencing Engine

## Location

```
packages/core/
  src/
    rules/        — JSON-logic rule evaluation
    sequencing/   — topological sort + cycle detection
    types/        — shared TS interfaces
```

## Invariants (Never Break)

- [ ] Same input + same dataset → identical output order (deterministic)
- [ ] Stable tie-breaking in topological sort (sort by permit `id` asc)
- [ ] Cycle detected → return human-readable explanation (not crash)
- [ ] No LLM interpretation — only structured JSON-logic rules

## Engine Pipeline

```
1. Evaluate rules (json-logic-js) against business profile
   → produces Set<permitId>
2. Build dependency graph from PermitDependencies
3. Topological sort (Kahn's algorithm)
4. Stable tie-break: sort ready nodes by id asc each round
5. Return ordered permit list
```

## Cycle Detection Pattern

```ts
// If Kahn's algo finishes with unprocessed nodes → cycle exists
// Collect remaining nodes, find edges forming cycle
// Return: { error: 'CYCLE_DETECTED', cycle: ['permit-a', 'permit-b', 'permit-a'] }
```

## Rule Evaluation Pattern

```ts
import jsonLogic from 'json-logic-js'
// conditionJson stored in PermitRules.conditionJson
const applies = jsonLogic.apply(rule.conditionJson, businessProfile)
```

## Types Template

```ts
interface PermitNode { id: string; dependsOn: string[] }
interface SequenceResult { ordered: string[]; error?: string; cycle?: string[] }
```

## Test Requirements

- [ ] Rule evaluation — applies / does-not-apply for each vertical
- [ ] Deterministic ordering — same input → same order (run 10x)
- [ ] Cycle detection — graph with cycle returns error + cycle path
- [ ] Empty graph → empty result (no crash)
- [ ] Single node with no deps → returns that node

## Definition of Done

- [ ] `packages/core` tests pass (`pnpm -r test`)
- [ ] Same input produces identical output across multiple runs
- [ ] Cycle detection returns structured error (not throw)
- [ ] No business logic imported from `frontend/` or `backend/`
- [ ] Rule evaluation uses `json-logic-js` (no LLM)
