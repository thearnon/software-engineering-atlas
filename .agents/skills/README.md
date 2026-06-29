# Agent Skills

This directory contains repo-local skills for AI coding agents. A skill is a
self-contained workflow or reference bundle that helps an agent handle a
specific kind of engineering task consistently.

The convention is intentionally agent-agnostic: different tools may call these
"skills", "agent instructions", or "workflows", but each folder should remain
portable and readable by both humans and agents.

This directory is the canonical skill source for the repository. If
`.claude/skills/` is present, treat it as a Claude Code runtime mirror that is
synced from this directory, not as an independent source of truth.

## Current Skills

| Skill | Purpose | Notes |
| --- | --- | --- |
| `ask-matt` | Routes the agent toward the right repo-local skill or workflow. | Use when the best skill is unclear. |
| `caveman` | Ultra-compressed response style for low-token communication. | Personal interaction mode; consider whether it belongs globally. |
| `codebase-design` | Shared vocabulary for designing deeper, clearer module interfaces. | Supports architecture, testability, and AI navigation discussions. |
| `composition-patterns` | React composition guidance for scalable component APIs. | Runtime skill name is `vercel-composition-patterns`. |
| `debug-mantra` | Four-step debugging discipline for reproducing, tracing, falsifying, and cross-checking failures. | Rigid debugging workflow. |
| `diagnose` | Disciplined diagnosis loop for bugs and performance regressions. | General bug and performance investigation workflow. |
| `diagnosing-bugs` | Diagnosis loop for hard bugs, broken behavior, failures, and slowness. | Similar to `diagnose`; keep both only if both trigger names are useful. |
| `domain-modeling` | Builds project vocabulary, domain context, and architectural decision records. | Maintains `CONTEXT.md` and ADR-style docs when used. |
| `edit-article` | Revises article drafts for structure, clarity, and tighter prose. | General writing workflow. |
| `grilling` | Relentlessly interviews the user to stress-test a plan or design. | Trigger-rich planning workflow. |
| `grill-me` | Interviews the user through a plan or design until decisions are clear. | Lightweight planning interview. |
| `grill-with-docs` | Stress-tests plans while creating ADR and glossary documentation. | Useful when design choices should become durable docs. |
| `handoff` | Compacts the current conversation into a handoff for another agent or future session. | General continuity workflow. |
| `implement` | Implements work from a PRD or issue set. | Use for issue-driven or spec-driven delivery. |
| `improve-codebase-architecture` | Scans for codebase deepening opportunities and presents an HTML report. | Larger architecture review workflow. |
| `karpathy-guidelines` | Keeps agent coding changes small, verifiable, and assumption-aware. | General engineering guardrail. |
| `prototype` | Builds throwaway logic, state, or UI prototypes to clarify design choices. | Exploration workflow before committing to production code. |
| `react-best-practices` | React and Next.js performance optimization guidance from Vercel Engineering. | Runtime skill name is `vercel-react-best-practices`. |
| `resolving-merge-conflicts` | Guides resolution of in-progress git merge or rebase conflicts. | Use only when conflicts are actually present. |
| `scrutinize` | Reviews plans, PRs, diffs, and design docs from an outsider perspective. | General second-opinion workflow. |
| `setup-matt-pocock-skills` | Configures issue tracker, triage label, and domain-doc assumptions for these skills. | Run once before issue, triage, or domain workflows need that setup. |
| `setup-pre-commit` | Sets up Husky, lint-staged, Prettier, type checking, and tests. | Keep if this repo uses a Node/JS/TS stack. |
| `tdd` | Test-driven development workflow with red-green-refactor discipline. | Use when feature or bugfix work should be test-first. |
| `teach` | Creates a workspace-based teaching flow for learning a new concept. | Consider moving to global skills if it is not repo-specific. |
| `to-issues` | Breaks a plan, spec, or PRD into independently grabbable issues. | Depends on the configured project issue tracker. |
| `to-prd` | Turns the current conversation into a PRD and publishes it to the issue tracker. | Synthesis workflow; not an interview. |
| `triage` | Moves issues and external PRs through triage states and writes agent-ready briefs. | Depends on issue tracker and label configuration. |
| `web-design-guidelines` | Reviews UI code against Web Interface Guidelines. | Fetches the guideline source before each review. |
| `write-a-skill` | Guides creation of new agent skills with proper structure and resources. | Useful while maintaining this directory. |
| `writing-great-skills` | Reference for writing and editing skills predictably. | Pair with `write-a-skill` for skill maintenance. |
| `zoom-out` | Gives higher-level context for unfamiliar code or a broader perspective. | General orientation workflow. |

## Standards

- Each skill must live in its own folder under `.agents/skills/`.
- Each skill folder must include a `SKILL.md`.
- Each `SKILL.md` must include YAML frontmatter with `name` and `description`.
- Keep `SKILL.md` as the source of truth for the skill's behavior.
- Keep `.agents/skills/` as the canonical home for repo-local skills.
- The folder name should normally match the frontmatter `name`; document
  intentional exceptions in the table above.
- Keep this README as a human-facing index, not as runtime instructions.
- If maintaining `.claude/skills/` for Claude Code, sync folder additions,
  removals, renames, and `SKILL.md` changes from this directory.
- Avoid tool-specific wording unless the skill truly depends on that tool.
- Avoid company-specific, client-specific, or copied project-specific examples
  unless they are intentionally part of this repo.
- When adding, renaming, or removing a skill, update the table above.

## Review Checklist

Before keeping a new skill, check:

- Is it useful for this repo or this team's recurring work?
- Is it generic enough to be reused here without leaking another project's
  assumptions?
- Does it avoid hard-coded issue trackers, people, organizations, paths, or
  product names unless those are intentional?
- Are large examples or references placed in separate files only when they are
  actually needed?
