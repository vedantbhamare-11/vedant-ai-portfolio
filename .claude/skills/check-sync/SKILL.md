---
name: check-sync
description: Verify that quick-action ids in src/lib/chat-config.ts that need custom rendering (contact, photography, fun) have a matching id-prefix branch in ChatMessage.tsx, and flag drift in either direction.
---

# check-sync

Checks that the two files which must stay manually in sync for custom
message rendering — `src/lib/chat-config.ts` and
`src/components/chat/ChatMessage.tsx` — haven't drifted apart. See the
"Message rendering" section of the project's `CLAUDE.md` for why this
coupling exists: `ChatMessage.tsx` mounts custom components by checking
`msg.id?.startsWith("preloaded-<action-id>")`, and those ids come from
`page.tsx`'s `handleActionClick`, which uses the `id` field of an entry
in `QUICK_ACTIONS`. Renaming an id in one file without the other silently
breaks the custom render for that quick action.

This is a read-only audit. Do not edit either file — just report findings.

## Steps

1. **Read `src/lib/chat-config.ts`.** Extract every `id: "..."` value
   inside the `QUICK_ACTIONS` array (not `PRELOADED_RESPONSES`, which is
   keyed the same way but is a separate object). This is the authoritative
   set of quick-action ids, call it `configIds`.

2. **Read `src/components/chat/ChatMessage.tsx`.** Find every conditional
   of the form `msg.id?.startsWith("preloaded-<name>")` (currently three:
   `preloaded-contact`, `preloaded-photography`, `preloaded-fun`, guarding
   `SocialLinks`, `Photography`, and `DevGame` respectively — but read the
   actual file, don't assume the count stays at three). Extract `<name>`
   from each. Call this set `renderPrefixes`, and keep the component each
   one mounts and the line number for reporting.

3. **Cross-check `renderPrefixes` against `configIds`:**
   - For each entry in `renderPrefixes`, confirm `<name>` exactly matches
     an id in `configIds`. If not, flag it as **dangling render branch**:
     `ChatMessage.tsx` mounts `<Component>` for `preloaded-<name>-*` but no
     quick action with id `"<name>"` exists in `chat-config.ts` — likely a
     stale check left behind after a rename, or a typo. Give the
     `ChatMessage.tsx` line number.

4. **Cross-check the reverse direction, but only for ids that plausibly
   need custom rendering.** You can't infer "needs custom rendering" from
   `chat-config.ts` alone (most quick actions, like `me`/`projects`/
   `experience`/`skills`, intentionally render as plain markdown with no
   custom component). So:
   - Treat the *names already present in `renderPrefixes` before this run*
     as the known set of ids that are supposed to have custom rendering.
   - If `configIds` contains an id that looks like a near-miss of one of
     those names (e.g. `contacts` vs. a `renderPrefixes` entry `contact`,
     or `photo` vs. `photography`) — i.e. one is a prefix or edit-distance-1
     variant of the other but they aren't exactly equal — flag it as a
     **likely rename drift**: `chat-config.ts` has id `"<configId>"` which
     looks like it used to be (or should be) `"<name>"`, but
     `ChatMessage.tsx` still checks for `preloaded-<name>`.
   - Do not flag `configIds` entries that have no resemblance to any
     `renderPrefixes` name (e.g. `me`, `projects`) — those are working as
     intended with no custom UI.

5. **Report.** Print a short structured summary:
   - "In sync" — list each id present in both `renderPrefixes` and
     `configIds` with an exact match, plus which component it mounts.
   - "Issues" — one bullet per flag from steps 3–4, each naming the file,
     line, the id involved, and the concrete fix (rename the id in
     `chat-config.ts` to match, or update the `startsWith` check in
     `ChatMessage.tsx`).
   - If there are no issues, say so plainly — don't invent problems to
     report.

Do not modify `page.tsx`, `chat-config.ts`, or `ChatMessage.tsx` as part of
this skill. If the user wants the drift fixed after seeing the report, ask
which side (id or branch) is the intended source of truth before editing.
