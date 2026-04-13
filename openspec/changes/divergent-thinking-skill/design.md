## Context

The change adds a **portable agent skill** (Markdown instructions loaded by Cursor/Codex/Claude-style agents) so that when a user poses an open question, the agent systematically explores **multiple qualitatively different** solutions before converging. The repo currently has OpenSpec scaffolding but no existing `openspec/specs/` capabilities; the skill is documentation-first and may live in this workspace or in the user’s global skills directory.

**Product emphasis:** Usage and examples **skew toward front-end engineering** (UI architecture, styling, client performance, accessibility, framework choices, design handoff). The same workflow still applies to non-UI topics.

## Goals / Non-Goals

**Goals:**

- Define a **single canonical workflow** (diverge → compare → recommend) that any compliant agent can follow.
- Ensure options differ by **approach** (not trivial parameter tweaks), with explicit **trade-offs** and **feasibility** signals.
- Make the **primary recommendation** auditable: criteria, weights or ordering rationale, assumptions, and a **runner-up / fallback** when uncertainty is high.
- For **front-end** questions, bias comparison criteria toward **actionable UI engineering dimensions** (e.g. bundle/build impact, runtime perf, accessibility, maintainability, fit to existing stack, handoff from design) unless the user excludes them.

**Non-Goals:**

- Building a hosted API, UI, or automated scoring engine.
- Replacing domain-specific research skills (e.g., deep web research); this skill may **delegate** to them when facts are missing.
- Guaranteeing “objectively optimal” answers without stated user constraints.

## Decisions

1. **Artifact shape: one `SKILL.md` (+ optional small appendix)**  
   - **Rationale**: Matches existing agent skill conventions (frontmatter `name`, `description`, body with workflow).  
   - **Alternatives**: Multiple tiny skills (rejected — harder to discover and compose); embedding only in Cursor rules (rejected — less portable).

2. **Default option count: 3–5 distinct approaches**  
   - **Rationale**: Enough diversity without overwhelming the user; scales down to 2 when the problem is narrow.  
   - **Alternatives**: Fixed 5 always (rejected — noisy for tight questions); unbounded list (rejected — weak comparison).

3. **Comparison: explicit matrix or table on shared criteria**  
   - **Rationale**: Forces apples-to-apples reasoning and surfaces conflicts (e.g., cheap vs. fast).  
   - **Alternatives**: Prose-only comparison (rejected — easier to hide gaps).

4. **Recommendation: label type of “best”**  
   - **Rationale**: “最优” is ambiguous; the skill SHALL distinguish e.g. **best overall under stated priorities**, **most feasible now**, **lowest risk**, **best long-term**, when they differ.  
   - **Alternatives**: Single superlative only (rejected — often misleading).

5. **Activation: trigger phrases + intent**  
   - **Rationale**: Broad triggers (“方案对比”, “brainstorm”, “哪个更可行”, “多给几个思路”) plus implicit open-ended strategy questions.  
   - **Alternatives**: Slash-command only (rejected — user asked for natural questions).

6. **Front-end complementary MCPs (optional)**  
   - **Rationale**: Design files (Figma-class MCP), browser tooling (Chrome DevTools / Playwright-class MCP), and repo inspection (Git/GitHub) reduce speculative “feasibility” for UI options.  
   - **Alternatives**: Text-only reasoning (rejected for this iteration’s primary audience — acceptable only when tools are unavailable, with **Unknowns**).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Agent produces superficially different options that are the same idea reworded | Skill requires **orthogonal axes** (e.g., build vs. buy vs. partner) and a self-check before presenting |
| Recommendation overconfident without data | Require **assumptions**, **unknowns**, and **what would change the ranking** |
| Long outputs fatigue users | Start with a **one-screen summary**; move detail to collapsible sections or appendix |
| Conflicts with “minimal answer” user preference | If user signals brevity, reduce option count but **keep** comparison + one primary pick |

## Migration Plan

1. Author `SKILL.md` in the chosen location (workspace `skills/` or user skills path).  
2. Validate against spec scenarios (manual walkthrough with 2–3 sample questions).  
3. Optionally register the skill in project docs or Cursor rules **only if** the team standardizes on it (out of scope for minimal deliverable).

## External integrations (optional)

The skill stays **workflow-only**. Hosts may attach **MCP** (fetch, search, browser, Git/GitHub, memory) or other **skills** to ground options and criteria. Discovery links and integration order (facts or **Unknowns** → diverge → matrix) live in **proposal.md** under *Complementary public skills & MCPs* and *Front-end scenarios & complementary tools*; the runnable skill mirrors tables in `skills/divergent-thinking/SKILL.md` (*Optional integrations*). For UI work, prioritize **design-read**, **browser-verify**, and **repo** MCPs when enabled. No endorsement of specific third-party servers—teams must pin versions and review trust boundaries.

## Open Questions

- **Install path**: Should the repo own `skills/divergent-thinking/SKILL.md` or only document install steps for `~/.agents/skills/`? (Implementation can choose repo-local for sharing.)  
- **Locale**: Chinese-first, English-first, or bilingual templates? (Default: follow user language; structure stays fixed.)
