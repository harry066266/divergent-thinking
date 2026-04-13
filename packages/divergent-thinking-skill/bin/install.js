#!/usr/bin/env node
/**
 * Installs packaged SKILL.md into the user's agent skills directory.
 *
 * Usage:
 *   npx divergent-thinking-skill
 *   npx divergent-thinking-skill init
 *   npx divergent-thinking-skill --dir ~/.codex/skills
 *   divergent-thinking init
 */
const fs = require("fs");
const path = require("path");
const os = require("os");

const TOOL_PRESETS = [
  { key: "cursor", name: "Cursor", dir: "~/.agents/skills" },
  { key: "codex", name: "Codex", dir: "~/.codex/skills" },
  { key: "claude", name: "Claude Code", dir: "~/.claude/skills" },
  { key: "gemini", name: "Gemini CLI", dir: "~/.gemini/skills" },
  { key: "copilot", name: "GitHub Copilot", dir: "~/.copilot/skills" },
  { key: "continue", name: "Continue", dir: "~/.continue/skills" },
];

function expandHome(p) {
  if (!p || p[0] !== "~") return p;
  return path.join(os.homedir(), p.slice(1).replace(/^\//, "") || "");
}

function parseArgs(argv) {
  let outDir = null;
  let help = false;
  let init = false;
  let tool = null;
  let yes = false;
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") help = true;
    else if (a === "init") init = true;
    else if (a === "--yes" || a === "-y") yes = true;
    else if (a === "--dir" && argv[i + 1]) {
      outDir = expandHome(argv[++i]);
    } else if (a.startsWith("--dir=")) {
      outDir = expandHome(a.slice("--dir=".length));
    } else if (a === "--tool" && argv[i + 1]) {
      tool = argv[++i].toLowerCase();
    } else if (a.startsWith("--tool=")) {
      tool = a.slice("--tool=".length).toLowerCase();
    }
  }
  return { outDir, help, init, tool, yes };
}

function defaultSkillsRoot() {
  const env =
    process.env.DIVERGENT_THINKING_SKILL_DIR ||
    process.env.AGENT_SKILLS_DIR ||
    "";
  if (env) return expandHome(env.trim());
  return path.join(os.homedir(), ".agents", "skills");
}

function resolvePreset(tool) {
  if (!tool) return null;
  const tools = tool.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  const dirs = tools.map((key) => {
    const p = TOOL_PRESETS.find((x) => x.key === key);
    return p ? expandHome(p.dir) : null;
  });
  if (dirs.some((d) => d === null)) return null;
  return Array.from(new Set(dirs));
}

function printHelp() {
  console.log(`
divergent-thinking-skill — install SKILL.md for agent runtimes.

Usage:
  npx divergent-thinking-skill
  npx divergent-thinking-skill init
  npx divergent-thinking-skill --dir ~/.agents/skills
  npx divergent-thinking-skill --tool codex
  npx divergent-thinking-skill --tool codex,claude
  divergent-thinking init

Commands:
  init                          Interactive setup (detect + multi-select tools)

Options:
  --dir <path>                  Parent skills directory (final: <path>/divergent-thinking/SKILL.md)
  --tool <list>                 Comma-separated tool keys (e.g. codex,claude,cursor)
  --yes, -y                     Non-interactive; with init uses detected tools
  -h, --help                    Show help

Environment:
  DIVERGENT_THINKING_SKILL_DIR  Parent directory for skill folders
  AGENT_SKILLS_DIR              Fallback alias

Preset defaults:
${TOOL_PRESETS.map((t) => `  ${t.key.padEnd(8)} -> ${t.dir}`).join("\n")}
`);
}

function installTo(parent) {
  const destDir = path.join(parent, "divergent-thinking");
  const src = path.join(__dirname, "..", "skill", "SKILL.md");
  const dest = path.join(destDir, "SKILL.md");

  if (!fs.existsSync(src)) {
    console.error("install: packaged SKILL.md missing at", src);
    process.exit(1);
  }

  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log("Installed:", dest);
  console.log("Parent skills directory:", path.resolve(parent));
}

function detectedTools() {
  return TOOL_PRESETS.filter((t) => fs.existsSync(expandHome(t.dir)));
}

async function interactiveInit() {
  const { checkbox, input } = await import("@inquirer/prompts");
  const detected = detectedTools();
  const detectedNames = detected.length
    ? detected.map((t) => t.name).join(", ")
    : "none";
  console.log(`Detected tool directories: ${detectedNames}`);

  const choices = TOOL_PRESETS.map((tool) => ({
    name: `${tool.name}${detected.some((d) => d.key === tool.key) ? " (detected)" : ""}  [${tool.dir}]`,
    value: tool.key,
    checked: detected.some((d) => d.key === tool.key),
  }));
  choices.push({ name: "Custom path", value: "__custom__", checked: false });

  const selected = await checkbox({
    message: `Select tools to set up (${choices.length - 1} available)`,
    choices,
    loop: false,
  });

  if (!selected.length) {
    console.log("No tools selected. Nothing installed.");
    return;
  }

  let parents = selected
    .filter((v) => v !== "__custom__")
    .map((key) => TOOL_PRESETS.find((t) => t.key === key))
    .filter(Boolean)
    .map((t) => expandHome(t.dir));

  if (selected.includes("__custom__")) {
    const custom = await input({ message: "Enter parent skills directory for custom target" });
    if (custom && custom.trim()) {
      parents.push(expandHome(custom.trim()));
    }
  }

  parents = Array.from(new Set(parents));
  for (const parent of parents) {
    installTo(parent);
  }
}

async function main() {
  const { outDir, help, init, tool, yes } = parseArgs(process.argv);
  if (help) {
    printHelp();
    process.exit(0);
  }

  if (init) {
    if (yes) {
      const detected = detectedTools();
      if (!detected.length) {
        console.log("No detected tool directories. Falling back to ~/.agents/skills");
        installTo(defaultSkillsRoot());
        return;
      }
      for (const t of detected) installTo(expandHome(t.dir));
      return;
    }
    await interactiveInit();
    return;
  }

  const fromToolPreset = resolvePreset(tool);
  if (tool && !fromToolPreset) {
    console.error(`Unknown --tool value: ${tool}. Use one or more of: ${TOOL_PRESETS.map((t) => t.key).join(", ")}.`);
    process.exit(1);
  }

  const parents = outDir ? [outDir] : fromToolPreset || [defaultSkillsRoot()];
  for (const parent of parents) installTo(parent);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
