# mult-solutions

Workspace for **agent skills**, small CLI installers, and **OpenSpec** change docs. The main user-facing artifact here is **divergent-thinking**: a portable workflow skill (multi-option → shared comparison matrix → labeled recommendation), with a bias toward **front-end / UI** trade-offs.

## Repository layout

| Path | Purpose |
|------|---------|
| `skills/divergent-thinking/SKILL.md` | **Source of truth** for the skill (edit this). |
| `AGENTS.md` | Cursor / agent hint: when to follow the skill. |
| `packages/divergent-thinking-skill/` | **npm package** that copies `SKILL.md` into local agent skill directories (`bin/install.js`, `init`, presets). |
| `openspec/` | OpenSpec config and the `divergent-thinking-skill` change (proposal, design, spec, tasks). |

## Use the skill (no npm)

1. Open this repo as the project workspace (or copy `skills/divergent-thinking/` into your own repo).
2. In the agent chat, **@** `skills/divergent-thinking/SKILL.md`, or rely on `AGENTS.md` if your host reads it.

## Install via npm / npx

Requires **Node.js ≥ 18** for the installer CLI.

```bash
# Default install (~/.agents/skills/divergent-thinking/SKILL.md)
npx divergent-thinking-skill

# Interactive: detect + multi-select tools (Cursor, Codex, Claude, …)
npx divergent-thinking-skill init

# Non-interactive: install to all detected tool skill roots
npx divergent-thinking-skill init --yes

# One or more presets
npx divergent-thinking-skill --tool codex,claude,cursor
```

After global install:

```bash
npm i -g divergent-thinking-skill
divergent-thinking init
```

If your default npm registry is a corporate mirror, pin the public registry when installing:

```bash
npm i -g divergent-thinking-skill --registry https://registry.npmjs.org/
```

More detail: [packages/divergent-thinking-skill/README.md](packages/divergent-thinking-skill/README.md).

## Publish / bump the npm package (maintainers)

```bash
cd packages/divergent-thinking-skill
npm run sync
npm publish --registry https://registry.npmjs.org/ --access public
```

Set a real Git URL in `packages/divergent-thinking-skill/package.json` → `repository.url` before publishing.

## Listing on skills.sh (or similar)

Registries usually expect a **GitHub repo** whose layout matches their CLI (often a root `SKILL.md` or a documented `skills/<name>/` layout). For a **minimal public repo**, copy the canonical skill to the layout their docs require and add a short README + `LICENSE` there. The canonical text in *this* repo remains under `skills/divergent-thinking/SKILL.md`.

See also: [The Agent Skills Directory](https://skills.sh).

## OpenSpec

Change artifacts live under `openspec/changes/divergent-thinking-skill/` (proposal, design, spec, tasks).

## License

Skill and installer package are intended for use under **MIT** (see `packages/divergent-thinking-skill/README.md`). Add a root `LICENSE` file if you want the whole repo explicitly under MIT.
