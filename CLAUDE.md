# CLAUDE.md

@AGENTS.md

## Claude Code

Claude Code reads `CLAUDE.md` at session start and expands the `@AGENTS.md`
import, so project instructions stay in one canonical source of truth.

Claude Code project skills live in `.claude/skills/`. This repository keeps
that directory as a runtime mirror of the canonical `.agents/skills/` skill
source. Make skill changes in `.agents/skills/` first, then sync the
`.claude/skills/` mirror when Claude Code support is maintained.
