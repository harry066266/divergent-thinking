---
name: divergent-thinking
description: >
  Use when the user wants multiple approaches, option comparison, feasibility or “best” picks—
  especially front-end/UI (组件方案、状态管理、样式、性能、无障碍、SSR/SSG、设计还原、工程化).
  Also general open questions: 多个方案、对比一下、brainstorm、trade-offs、方案对比、可行性.
  Produces distinct options, a shared-criteria matrix, and a labeled primary recommendation plus fallback.
---

# Divergent thinking (multi-option → compare → recommend)

## When to use

Apply this skill when:

- The user explicitly asks for several paths, comparison, or what is “most feasible / optimal,” **or**
- The question is open-ended (how to achieve X) and more than one credible approach exists,

unless the user clearly wants a **single short answer** only.

**Primary domain:** **Front-end engineering** (UI structure, styling systems, client performance, accessibility, framework/library choice, design handoff, delivery trade-offs). For non-UI questions, keep the same workflow with domain-appropriate criteria.

**With `brainstorming` skill:** For greenfield product/feature ideation, you may use the brainstorming skill first to clarify intent and constraints, then use **this** skill to produce comparable options and a recommendation.

**With UI skills:** When output must be visually or structurally strong, combine with **`frontend-design`** / **`ui-ux-pro-max`** (or similar) for layout/tokens before or while building the matrix.

## Workflow (follow in order)

1. **Restate** the goal, success criteria, and hard constraints in your own words.
2. **Clarify or assume:** If missing facts would change the ranking (budget, timeline, risk tolerance, metrics, platform limits), ask up to **three** targeted questions **or** proceed with a labeled **Assumptions** block.
3. **Diverge:** Produce **3–5** options for broad/strategic questions, or **2+** for narrow technical questions. Each option must differ in **mechanism or posture** (build vs. buy vs. partner), not wording alone.
4. **Compare:** Build a **matrix or table**—every option × the **same** criteria. For **front-end** topics, include engineering-relevant columns such as **runtime/bundle impact**, **accessibility**, **maintainability**, **fit to current stack**, **design-handoff friction**, **migration cost**, plus user goals (ship speed, quality). For non-UI topics, use domain-appropriate columns only. Do not compare on different axes per row.
5. **Recommend:** Give a **primary** pick and name what “best” means here (e.g. *best under stated priorities*, *most feasible now*, *lowest risk*). If criteria conflict, name a **runner-up** or **conditional** choice (“if speed matters more than cost, pick B”).
6. **Uncertainty:** If facts are thin, add **Unknowns** and **What would change the ranking** (specific evidence or experiments).

**Optional — tools first:** If the host has MCP or web access, prefer **fetching or searching** for missing facts *before* step 3, or mid-workflow when a claim is checkable. If tools are unavailable, keep **Unknowns** explicit. (See also **Optional integrations** below.)

## Quality gates (before you send)

- **Orthogonality check:** Can each option be summarized in one line without overlapping the others? If two collapse into the same approach, replace one.
- **No fake diversity:** Do not list the same idea with different adjectives.
- **Explicit trade-offs:** Where speed vs. cost vs. quality conflict, say which criterion drove the primary recommendation.
- **High-stakes caution:** For medical, legal, financial, or safety-critical decisions, add a **Risk note**: not a substitute for a qualified professional; do not imply a single “optimal” legal/medical/financial outcome without verification.

## Output skeleton

Use this structure (headings can be localized to the user’s language):

1. **Summary** — One short paragraph: problem, number of options, top pick + sense of “best.”
2. **Problem & constraints** — Restatement + **Assumptions** (if any).
3. **Options** — For each: name, one-line approach, expected outcome, main cost/risk.
4. **Comparison** — Table/matrix: rows = options, columns = shared criteria (use ✓/– or L/M/H if helpful).
5. **Recommendation** — Primary + **labeled “best” type**; runner-up or conditional branch; **Unknowns** + **what would change the ranking** when relevant.
6. **Risk note** (if high-stakes or irreversible) — Scope of caution and suggestion to verify with a human expert.

## Installation

- **Repo-local (this project):** `skills/divergent-thinking/SKILL.md` — reference from project `AGENTS.md` or Cursor rules if you want it always considered.
- **User-wide:** Copy the folder to `~/.agents/skills/divergent-thinking/` (or your tool’s skills directory) so the agent loads it globally.

## Optional integrations (public MCPs & skills)

This skill does not require any server. To improve **grounded** comparisons, combine with tools your environment already exposes:

| Need | Role | Where to browse |
|------|------|-----------------|
| Grounding / fetch / search | Turn “feasible” into “checked against a source” | [MCP Registry](https://modelcontextprotocol.io/registry), [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io/), [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers), [MCP Directory](https://mcpserverdirectory.org/) |
| Browser automation | Validate flows that depend on live UI | Registry categories (browser / testing) |
| Git / GitHub | Scope and risk for **this** repo | Git/GitHub-class MCPs in the reference repo above |
| Memory / notes | Persist user constraints across sessions | Registry “knowledge / memory” style servers — mind privacy |

**Skill ecosystem (no single store):** [Agent Skills spec](https://agentskills.io), example gallery [anthropics/skills](https://github.com/anthropics/skills). Use **brainstorming**-style skills *before* this one for discovery; use domain skills *after* shortlisting.

### Front-end–oriented MCP patterns (when available)

| Need | Role | Typical MCP patterns |
|------|------|----------------------|
| Design source | Ground options in real components/layouts | **Figma**-class MCP (design → structure / tokens) |
| Browser truth | Layout, perf, network, a11y checks | **Chrome DevTools**-class MCP |
| E2E / UI flows | Scripted navigation, screenshots, regressions | **Playwright**-class MCP |
| Docs | API and version truth for frameworks | **Fetch** + official docs |
| Repo | Match existing stack and conventions | **Git** / **GitHub** MCP |

Use **stack → (optional) design/repo/docs via MCP → diverge → matrix → recommend.** If tools are missing, state **Unknowns**.

Full rationale: `openspec/changes/divergent-thinking-skill/proposal.md` (*Complementary public skills & MCPs*, *Front-end scenarios & complementary tools*).

## Verification walkthrough (spec coverage)

Use these as internal self-checks; outputs should satisfy the scenarios in `openspec/changes/divergent-thinking-skill/specs/divergent-thinking-skill/spec.md`.

| Type | Example prompt | You must |
|------|----------------|----------|
| Broad / strategic | “我们团队效率低，怎么系统性提升？” | ≥3 distinct mechanisms, 3–5 options, full matrix, recommendation with “best” type |
| Narrow technical | “Python 里用哪个 HTTP 客户端更合适？” | ≥2 real alternatives or justify single viable path; same comparison columns for each |
| Conflicting goals | “要快上线还要零技术债，怎么选架构？” | Call out trade-off; primary + fallback when priorities differ; optional Unknowns |
| Front-end open | “中后台表格页，数据量大，怎么设计前端架构？” | ≥3 distinct approaches; matrix includes perf, a11y, maintainability, stack fit |
| Front-end narrow | “Tailwind vs CSS Modules vs styled-components，选哪个？” | ≥2 options; include bundle/DX/a11y/migration criteria |
| Front-end + design | “Figma 还原 + 主题切换，给几种实现路线？” | Mention handoff/tokens; if Figma MCP available, read structure before options |

## Trigger phrases (non-exhaustive)

中文：多个方案、几种思路、对比一下、哪个更可行、优缺点、权衡、可行性、最优方案、发散；前端常用：组件方案、状态管理、样式方案、性能、无障碍、SSR、设计稿还原、工程化选型。  
English: brainstorm options, compare approaches, trade-offs, pros and cons, most feasible, best path, alternatives; UI: styling strategy, state management, SSR vs SPA, a11y, bundle/perf, component architecture.
