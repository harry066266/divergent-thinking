## Why

Users often get stuck on the first idea when solving open-ended problems. A dedicated agent skill that **forces divergent exploration** (multiple distinct approaches), **explicit comparison**, and a **grounded recommendation** reduces bias toward the obvious path and improves decision quality for product, technical, and organizational questions.

**Primary lean (this iteration):** The skill is tuned for **front-end engineering** scenarios—framework/library choices, UI architecture, styling strategy, runtime performance, accessibility, design handoff, and delivery trade-offs—while remaining usable for non-UI questions.

## What Changes

- Add a new **agent skill** (SKILL.md) that agents must follow when the user asks for options, brainstorming with trade-offs, or “what’s best / most feasible.”
- The skill defines a repeatable workflow: restate constraints → generate N diverse options → compare on shared criteria → recommend primary + fallback with assumptions and risks.
- **Front-end emphasis:** Examples, default comparison dimensions, and optional MCP/skill pairings target **UI / browser / engineering** trade-offs; spec adds a conditional requirement for front-end questions.
- No changes to application runtime code in this repo unless implementation chooses to vendor the skill file here for version control.

## Capabilities

### New Capabilities

- `divergent-thinking-skill`: Defines when the skill activates, the minimum outputs (options, comparison, recommendation), quality bar for diversity and feasibility, guardrails (assumptions, unknowns, user confirmation for irreversible choices), and **front-end–aware comparison criteria** when the question is UI/engineering-focused.

### Modified Capabilities

- _(None — no existing specs under `openspec/specs/`.)_

## Impact

- **Deliverable**: One or more skill files (typically `SKILL.md` plus optional references) installable under the user’s agent skills directory or committed in this workspace for sharing.
- **Dependencies**: None beyond the agent runtime that loads skills (Cursor, Codex, Claude Code, etc.).
- **Risk**: Low; additive documentation-only change unless paired with automation (e.g., slash commands) in a later change.

## Complementary public skills & MCPs (optional)

This skill is **workflow-only**; pairing it with **retrieval, memory, and domain skills** improves option quality and reduces hallucinated “feasibility.” Nothing below is required—pick what matches the host (Cursor, Claude Code, Codex, etc.).

### MCP categories that pair well

| Need | Why it helps | Where to discover |
|------|----------------|------------------|
| **Grounding (web/docs)** | Pull current facts, pricing, APIs, or competitor reality before comparing options | Official registry: [MCP Registry](https://modelcontextprotocol.io/registry) / [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io/); reference & community pointers: [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers); community browse: [MCP Directory](https://mcpserverdirectory.org/) |
| **Fetch / search** | Turn “sounds feasible” into “verified against a page or doc” | Common patterns: HTTP **fetch**-style servers, search-backed servers (registry lists many under search/research categories) |
| **Browser automation** | Validate UX flows, live sites, or SaaS consoles when options depend on real UI | Registry categories such as browser automation / testing; aligns with tools like Playwright- or Puppeteer-based MCPs where available |
| **Repo & tickets** | Options tied to *this* codebase: scope, risk, and effort from real files and issues | **Git** / **GitHub**-class MCPs (see reference repo above) |
| **Memory / notes** | Remember user constraints, past decisions, and weights for criteria across sessions | Registry: knowledge / memory style servers; use only with clear trust boundaries for sensitive data |

**Integration pattern:** Run divergent-thinking **after** pulling any missing facts (or label **Unknowns** and call MCP tools mid-flow). The skill’s comparison matrix then scores **evidence-backed** options instead of pure speculation.

### Public / shareable *skill* patterns (not a single store)

Agent “skills” are fragmented by product; there is no one npm-equivalent catalog. Format and examples: [Agent Skills spec](https://agentskills.io) and the public gallery [anthropics/skills](https://github.com/anthropics/skills) (Claude Code: `/plugin marketplace add anthropics/skills`). Practical combinations:

- **Upstream clarification**: Skills or rules that force requirements discovery (e.g. brainstorming / product discovery patterns) **before** this skill’s option matrix—already noted in `skills/divergent-thinking/SKILL.md` for coexistence with a **brainstorming** skill.
- **Downstream depth**: Domain skills (architecture review, market sizing, security review) **after** shortlisting 2–3 options from this workflow.
- **Publishing your skill**: Reuse the [Anthropic skill authoring guidance](https://github.com/anthropics/skills) (community repo and patterns) or your host’s skill format so others can vendor the same `SKILL.md`.

### Non-goals of this section

- Endorsing specific third-party servers without version pinning and security review.
- Implying MCP access replaces human judgment for legal, medical, financial, or safety-critical decisions (still per skill guardrails).

## Front-end scenarios & complementary tools (optional)

Typical prompts where this skill pays off: state management vs. server state, CSS approach (utility / CSS-in-JS / modules), component model, SSR/SSG vs. SPA islands, design-token handoff, bundle/perf budgets, **a11y** strategy, testing pyramid for UI (unit vs. e2e), micro-frontend vs. monolith UI, etc.

### MCP patterns that help **front-end** options land

| Need | Why it helps | Examples (verify in your registry / host) |
|------|----------------|-------------------------------------------|
| **Design → spec** | Options grounded in real spacing, components, variants | **Figma**-class MCPs (e.g. Framelink-style integrations) to read frames/components before recommending structure |
| **Browser truth** | Catches “works in theory” layout, perf, a11y | **Chrome DevTools**-class MCP (console, network, performance) or **Playwright**-class MCP for automated navigation/screenshots |
| **Docs / standards** | Compare APIs with current framework docs | **Fetch** + official docs URLs; framework release notes |
| **Repo reality** | Align options with existing stack and patterns | **Git** / **GitHub** MCP to inspect current dependencies and conventions |

### Skills that pair well (front-end)

- **UI / UX implementation:** e.g. `frontend-design`, `ui-ux-pro-max` — tighten visual and IA choices *before* or *alongside* option matrices.
- **Browser verification:** e.g. `webapp-testing` (Playwright) — validate short-listed UI approaches when a local app or URL exists.
- **Upstream product shape:** brainstorming / product discovery skills — clarify user journeys before comparing implementation paths.

**Order of operations:** clarify stack + constraints → (optional) pull design/repo/docs via MCP → diverge → matrix with **front-end-aware criteria** → recommend.
