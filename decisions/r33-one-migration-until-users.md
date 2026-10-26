# R-33. One database migration until the app has users

**Decided** 2026-09-07; confirmed 2026-09-20 and 2026-10-04.

## Decision

Until the app has users, its database has one migration, `V001_INITIAL`. A
change of the schema edits that migration in place: there is no second
migration and no backfill of old rows. The app does not migrate a local
database of an older schema: whoever holds one deletes it, and the app
creates a new one. The decision is revisited before the first release
([musetric/musetric#1099](https://github.com/musetric/musetric/issues/1099)).

## Why

Nobody has data to keep yet, and every migration written now would be carried
forever.

## Where it applies

- `packages/server/crates/db/src/schema.rs` and its
  `schema.fingerprint.json`.
