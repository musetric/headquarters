---
name: learn
description: Use when a session in the Musetric workspace learns something that should outlive it, such as a rule the owner sets, the lesson of a failure, or a fact about a tool, a platform or a device. Puts it where the organization keeps it, not in an agent's private memory.
---

# Keep what was learned

Knowledge an agent keeps to itself is lost to every other person, agent and
machine. Find its home in headquarters' `about.md` and write it there.

| What it is | Where it goes |
| --- | --- |
| How work is done in every repository | `headquarters/practices/` |
| What a platform or a kind of device does | `headquarters/environment/` |
| A decision of the owner about the product | `headquarters/product.md`, or `headquarters/principles.md` when it holds for every part |
| A rule or a fact of one repository | that repository's `AGENTS.md` or readme |
| A concrete problem, a measurement, a status | an issue of `musetric/musetric` |
| One person's machine, accounts, purchases or own instructions | that person's own notes, never a public text |

Then:

1. **Write it once, in general words**, in English, with the details linked
   rather than copied (`headquarters/practices/public-texts.md`). A rule says
   why it exists.
2. **Check the neighbours.** If the new text contradicts what is written
   elsewhere, resolve that first; one fact has one home.
3. **Publish it**: a pull request for a repository, or the exact text of an
   issue or a comment shown to the owner before it is posted.
4. **Drop the private copy.** Once it is merged, an agent's memory keeps at
   most a pointer to it.
