## 1. Skill authoring

- [x] 1.1 Create `SKILL.md` with YAML frontmatter (`name`, `description` covering triggers: 多方案、对比、可行性、brainstorm、trade-offs)
- [x] 1.2 Document the workflow: 重述问题与约束 → 澄清或假设 → 3–5（或 2）条**机制不同**的方案 → 统一维度对比表 → 主推荐（标明“最优”含义）+ 备选/回退
- [x] 1.3 Add quality gates: 选项正交性自检、禁止仅改写的伪多样、高不确定性时的 **Unknowns / 何种证据会改变排序**
- [x] 1.4 Add output skeleton: 开篇摘要、方案列表、对比矩阵、推荐与假设、高风险领域警示（对齐 spec 中 safety 要求）

## 2. Placement and discovery

- [x] 2.1 Decide install location（例如仓库内 `skills/divergent-thinking/SKILL.md` 或用户 `~/.agents/skills/`）并写入 skill 内简短“安装说明”段落
- [x] 2.2 若团队使用 Cursor rules：可选在 `AGENTS.md` 或项目规则中增加一行引用该 skill（与 design 中 Open Question 一致时再执行）

## 3. Verification

- [x] 3.1 用 3 个样例问题走查：宽泛战略题、窄技术题、含冲突目标题，确认满足 `specs/divergent-thinking-skill/spec.md` 中各 Requirement 的 Scenario
- [x] 3.2 根据走查微调措辞（触发词、表头字段、推荐段落标题），避免与现有 `brainstorming` skill 重复时可注明**组合使用**（发散本题 + 创意前置 skill）

## 4. Proposal alignment (complementary ecosystem)

- [x] 4.1 将 `proposal.md` 中 **Complementary public skills & MCPs** 浓缩进 `skills/divergent-thinking/SKILL.md`（**Optional integrations** + workflow 中「先工具/事实再发散」一句）
- [x] 4.2 在 `design.md` 增加 **External integrations (optional)**，指向 proposal 全文表与 SKILL 摘要
- [x] 4.3 在本文件保留流程约定：**以后若 `proposal.md` 增加实质性章节，应同步在本 `tasks.md` 追加对应 `- [ ]` 任务后再收尾变更**（避免 proposal 与任务脱节）

## 5. Front-end focus & tooling alignment

- [x] 5.1 更新 `proposal.md`：**Primary lean** + **Front-end scenarios & complementary tools**（MCP 类型与可组合 skill）
- [x] 5.2 更新 `design.md`：上下文/目标/决策中体现前端优先与可选 MCP 组合
- [x] 5.3 更新 `specs/divergent-thinking-skill/spec.md`：新增 **Front-end engineering context** 及与非前端场景的 Scenario
- [x] 5.4 更新 `skills/divergent-thinking/SKILL.md`：`description` 与触发词、前端默认对比维度、**Optional integrations** 中的前端 MCP/skill 表、走查样例表增加前端题
- [x] 5.5 按需更新 `AGENTS.md` 一句说明本 skill 默认偏前端方案对比（可选）
