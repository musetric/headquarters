---
name: finish
description: Use before reporting a task in the Musetric workspace as done. Checks that the work is verified, that headquarters and the issues say what the task changed, and that nothing is left behind.
---

# Finish a task

Go through every step; say in the report which ones did not apply.

1. **Checks.** Run the checks of every repository the task changed, as its
   `AGENTS.md` names them under "Before finishing". A check that fails is
   fixed, or reported with its output; it is never skipped in silence.
2. **Headquarters.** Did the task change anything headquarters states: a
   decision in force (`headquarters/decisions/`), the picture of the product
   (`headquarters/product.md`), a practice, the environment? If it did,
   headquarters changes in the same task, through a pull request. A
   contradiction between headquarters and the code or an issue is fixed
   first, as the charter requires.
3. **Issues.** The state of the work lives in its issue of
   `musetric/musetric`: results, measurements, the status of hypotheses,
   following `headquarters/practices/tracker.md`. The owner sees the exact
   text of an issue or a comment before it is posted
   (`headquarters/practices/public-texts.md`).
4. **Nothing left behind.** Stop the processes the task started, close the
   pages, remove the port mappings and the temporary files, and delete the
   local branches whose pull requests were merged
   (`headquarters/practices/resources.md`, `headquarters/practices/git.md`).
5. **Report.** What was done; what was verified and how; what was not done,
   and why; what waits on the owner.
