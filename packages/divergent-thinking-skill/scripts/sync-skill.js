#!/usr/bin/env node
/**
 * Copies canonical SKILL.md from repo `skills/divergent-thinking/` into this package
 * before publish. Run: npm run sync
 */
const fs = require("fs");
const path = require("path");

const pkgRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(pkgRoot, "../..");
const src = path.join(repoRoot, "skills", "divergent-thinking", "SKILL.md");
const destDir = path.join(pkgRoot, "skill");
const dest = path.join(destDir, "SKILL.md");

if (!fs.existsSync(src)) {
  console.error("sync-skill: source not found:", src);
  process.exit(1);
}
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log("sync-skill: copied to", dest);
