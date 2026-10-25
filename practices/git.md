# Git and pull requests

## Branches

- **Never commit to `main`.** Create the branch before the first edit, not
  before the commit: after `git pull` on `main`, the next command is
  `git switch -c <branch> --no-track`. A commit made on `main` by mistake
  moves away with `git switch -c <branch>` and `git branch -f main origin/main`.
  *Enforced:* the `main rule` ruleset of every repository takes changes to
  `main` only through pull requests.
- **A branch `X` tracks `origin/X` or nothing.** A new branch has no upstream
  until its first push, `git push -u origin X:X`, and never tracks
  `origin/main`. Every clone sets `git config branch.autoSetupMerge simple`, so
  git links a branch only to its namesake. Before a push,
  `git for-each-ref --format='%(refname:short) -> %(upstream:short)' refs/heads`
  shows no other pairing. *Not enforced yet.*
- **No worktrees unless the owner asks.** Switch branches in the repository's
  own checkout. When another session's branch is checked out there, ask that
  session before switching, switch back when done, and tell it what changed:
  a silent switch changes the code it builds and measures.
- **Nothing stray in a product repository**: no uncommitted or untracked
  files, not even ignored ones such as benches, probes, copies of the server's
  storage or model variants. Experiments live outside the product
  repositories, and their files go away when the experiment ends.

## Commits

- **Title: `type(scope): subject`, scope required, 70 characters at most,**
  counted by a program, not by eye. Types and scopes come from the
  repository's `.github/prTitle.config.yml`, a closed list. A new scope is
  merged to `main` in a pull request of its own first, because the check reads
  the list from the base branch. *Enforced:* the `validate-pr-title` check of
  every pull request; the squash merge makes the pull request's title the
  commit title on `main`.
- **Signed.** `main` of every repository requires verified signatures, and
  GitHub refuses to merge a pull request that carries an unsigned commit.
  Rewrites that bypass the signing setup, such as `git replay`, drop the
  signature: before a push, `git log --format='%h %G? %s' <base>..HEAD` shows
  `G` for every commit, and `git rebase --force-rebase --gpg-sign <base>`
  signs them again. *Enforced:* the ruleset's required signatures.
- **A diff carries only the change.** JSON is edited line by line, never
  through parse and stringify, which reflows the whole file while the
  formatter lets it pass. Before a commit, `git diff` shows as many changed
  lines as the change needs.

## Pull requests

- **Agents push, open pull requests and publish only when the owner asks.**
  Until then, work ends with a local branch and a commit, reported by name
  and hash. The same holds for model revisions on Hugging Face.
- **One pull request per piece of work until it is merged.** Follow-ups go to
  the same branch, and its description is rewritten; a second pull request is
  never stacked on an open one. Before pushing to a pull request's branch,
  `gh pr view <n> --json state` confirms it is still open; a merged one gets a
  new branch from `origin/main` and a new pull request.
- **The description becomes the commit message on `main`**, because the
  squash merge takes the pull request's body. It follows
  [public-texts.md](public-texts.md) before the merge.
