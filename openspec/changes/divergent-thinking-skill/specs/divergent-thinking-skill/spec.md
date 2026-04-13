## ADDED Requirements

### Requirement: Skill activation

The divergent-thinking skill SHALL be applied when the user requests multiple approaches, comparison of options, brainstorming with trade-offs, or judgment of feasibility/optimality for an open-ended question.

#### Scenario: Explicit multi-option request

- **WHEN** the user asks for several solutions, options, or paths (including phrasing such as 多个方案, 对比一下, brainstorm, trade-offs, 哪个更可行)
- **THEN** the agent SHALL follow the divergent-thinking workflow before answering with a single unprioritized idea only

#### Scenario: Implicit open strategy question

- **WHEN** the user asks how to achieve a goal without a prescribed method and the answer space is not uniquely determined
- **THEN** the agent SHALL offer multiple distinct approaches and a comparison unless the user explicitly requests a single short answer

### Requirement: Constraint restatement

Before generating options, the agent SHALL restate the problem, success criteria, and hard constraints; if critical information is missing, the agent SHALL ask concise clarifying questions or SHALL label explicit assumptions.

#### Scenario: Missing constraints

- **WHEN** feasibility, budget, timeline, risk tolerance, or success metrics are unknown and material to ranking options
- **THEN** the agent SHALL either ask up to three targeted questions OR proceed with a labeled **Assumptions** block that states what was assumed

### Requirement: Divergent options

The agent SHALL produce at least three qualitatively distinct options for broad questions, or at least two for narrow questions, each summarized with approach, expected outcome, and main cost/risk.

#### Scenario: Breadth of problem

- **WHEN** the problem scope is broad or strategic
- **THEN** the agent SHALL provide between three and five options that differ in mechanism or posture (not wording-only variants)

#### Scenario: Narrow problem

- **WHEN** the user defines a tight technical or procedural scope
- **THEN** the agent SHALL provide at least two substantively different options or SHALL justify why only one approach is viable

### Requirement: Comparison on shared criteria

The agent SHALL compare options using a shared set of criteria (for example: feasibility, time, cost, risk, reversibility, alignment with stated goals) in a matrix or structured table.

#### Scenario: User-facing comparison

- **WHEN** more than one option is presented
- **THEN** the agent SHALL include a comparison section that references every option against the same criteria set

### Requirement: Recommendation and ambiguity

The agent SHALL state a primary recommendation and SHALL name the sense of “best” (for example: best overall under stated priorities, most feasible now, lowest risk). If criteria conflict, the agent SHALL name a runner-up or conditional choice.

#### Scenario: Conflicting criteria

- **WHEN** two or more criteria trade off (e.g., speed vs. cost)
- **THEN** the agent SHALL explain the trade-off, state which criterion drove the primary pick, and offer a fallback when priorities differ

#### Scenario: High uncertainty

- **WHEN** key facts are unknown or speculative
- **THEN** the agent SHALL qualify the recommendation, list unknowns, and describe what evidence would change the ranking

### Requirement: Safety and reversibility

For decisions with legal, safety, financial, or irreversible effects, the agent SHALL flag the risk class and SHALL not present a single “optimal” choice without noting need for human/domain verification.

#### Scenario: High-stakes domain

- **WHEN** the question concerns medical, legal, financial, or safety-critical action
- **THEN** the agent SHALL include an explicit caution and SHALL recommend professional verification where appropriate

### Requirement: Front-end engineering context

When the user’s question primarily concerns **front-end** implementation (user interface, styling, browser runtime, client-side performance, accessibility, or front-end framework/library choice), the agent SHALL include **front-end-relevant criteria** in the comparison matrix (for example: performance or runtime cost, accessibility impact, bundle or build impact, maintainability, fit to the stated stack, design-handoff friction) alongside any user-specified goals, unless the user explicitly asks to omit those dimensions.

#### Scenario: Open UI or front-end architecture question

- **WHEN** the user asks how to implement or structure a UI or front-end capability without a single prescribed approach
- **THEN** the comparison SHALL use a shared criteria set that reflects typical UI engineering trade-offs, with column labels adapted to the stated stack and constraints

#### Scenario: Front-end library or pattern comparison

- **WHEN** the user compares specific libraries, patterns, or tooling for front-end work
- **THEN** the matrix SHALL include at least one criterion drawn from integration or migration cost, runtime or bundle impact, accessibility implications, or team familiarity, as applicable to the question

#### Scenario: Non-front-end question

- **WHEN** the question is not primarily about front-end implementation
- **THEN** the agent SHALL NOT force front-end-specific criteria; the agent MAY use domain-appropriate criteria only
