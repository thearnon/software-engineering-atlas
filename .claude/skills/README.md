# Claude Code Skill Mirror

This directory is a Claude Code runtime mirror of the canonical repo-local
skills in `.agents/skills/`.

Claude Code discovers project skills from `.claude/skills/<skill>/SKILL.md`, so
this mirror is kept for Claude Code compatibility. Do not edit this directory as
an independent source of truth. Make skill changes in `.agents/skills/` first,
then sync this mirror.

For the current skill index, maintenance standards, and review checklist, see
`.agents/skills/README.md`.

## Mirror Rules

- Keep folder names in `.claude/skills/` aligned with `.agents/skills/`.
- Keep each mirrored `SKILL.md` and supporting file aligned with its canonical
  counterpart unless the difference is intentionally Claude-specific.
- Record intentional Claude-specific differences in this README or in the
  relevant skill folder.
- When adding, renaming, or removing a skill, update `.agents/skills/README.md`
  and then sync this mirror.
