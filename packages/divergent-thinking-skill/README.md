# divergent-thinking-skill

npm package that installs the **divergent-thinking** agent skill (`SKILL.md`) so users can run:

```bash
npx divergent-thinking-skill
```

or interactive init:

```bash
npx divergent-thinking-skill init
# after global install:
divergent-thinking init
```

`init` detects common AI tool directories, pre-selects detected tools, and supports multi-select install.

## Install

Default target: `~/.agents/skills/divergent-thinking/SKILL.md`.

```bash
# Custom parent (folder that contains per-skill subdirs)
npx divergent-thinking-skill --dir ~/.codex/skills
npx divergent-thinking-skill --dir ~/.claude/skills

# Tool presets
npx divergent-thinking-skill --tool codex
npx divergent-thinking-skill --tool claude
npx divergent-thinking-skill --tool cursor
# Multiple tools at once
npx divergent-thinking-skill --tool codex,claude
```

Or set environment (parent directory only):

```bash
DIVERGENT_THINKING_SKILL_DIR=~/.claude/skills npx divergent-thinking-skill
```

Non-interactive detected setup:

```bash
npx divergent-thinking-skill init --yes
```

## Publish to npm (maintainers)

1. Edit `package.json` → set `"repository.url"` to your real Git URL.
2. Pick an available name on npm; if `divergent-thinking-skill` is taken, use a scoped name:
   `@your-scope/divergent-thinking-skill` and update the `"name"` field.
3. From this directory:

   ```bash
   npm login
   npm publish --access public
   ```

   `prepublishOnly` runs `scripts/sync-skill.js` and refreshes `skill/SKILL.md` from the repo root `skills/divergent-thinking/SKILL.md`.

## Local test without publishing

```bash
cd packages/divergent-thinking-skill
npm run sync
node bin/install.js --dir /tmp/skills-test
```

## License

MIT
