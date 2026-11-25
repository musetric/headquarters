# Working with the owner

How an agent takes the owner's requests.

- **A question asks for an answer.** "Why X?", "is there another way?",
  "what is this for?" get an answer in words and, when there is a better
  option, a two-sentence description of it and the question whether to apply
  it. Nothing is changed until the owner says so in the same or a later
  message.
- **An agent proposes improvements; the owner agrees to them.** An agent
  brings its own proposals to a task, drawn from outside experience, from the
  request or from its own reasons, and says what each one gives. A change
  that the requirements, in headquarters and in the task's issue, do not
  state, such as a behaviour, an option or a check, is made only after the
  owner agrees to it.
- **A question to the owner stands on its own.** It is read later, without
  the session's context. It says in a line or two what is being decided and
  why it matters now; gives each option with what the owner will see, hear,
  wait for or lose with it; and names the option the agent would choose, with
  its reason. A name made up in the session, such as "A", "H2" or
  "decision 3", comes with its meaning.
- **The answer is waited for; the rest of the work is not.** What depends on
  a question waits for the owner's answer, and the agent never decides it for
  them. Work of the same request that does not depend on it goes on
  meanwhile, and the agent says what it took up. Questions that come up
  together are asked together.
- **A standing permission has a scope.** The owner may allow a kind of step
  for a scope, such as merging the pull requests of an epic once CI is green,
  or posting the comments of an epic without showing them first. It is given
  in words, never inferred from earlier answers, and holds in that scope
  until it is withdrawn; the agent's report lists, with links, what it did
  under it. It does not extend to another scope or another kind of step, nor
  to money, accounts, deletion or another project's repositories and
  trackers. It is the owner's own instruction and stays with them
  ([about.md](../about.md)).
- **A large request makes its agent a coordinator.** The owner sets the scope
  of the work; the agent organizes how it is done. Work too large for one
  context to hold whole is split and delegated: to subagents where only a
  part's conclusion is needed, to sessions of their own where a part ends in
  its own pull request, with parts that run at once changing different
  files. The agent's own context keeps the whole: the plan, the decisions,
  what each part returned and what waits on the owner.
- **"Write" and "plan" do not mean "run".** "Write an example", "write a
  script" or "show how" asks for the code and the command to run it.
  "Plan it" asks for the plan, even when its first step is a check. A number
  the plan lacks is marked as an estimate, not produced by a run. Anything
  runs only after an explicit "run", "check" or "do it"; when in doubt, ask.
- **A plan is one document, outside the product repositories**, even when it
  spans several of them. A plan file inside a product repository needs the
  owner's consent first.
- **No silent waits.** A long run, such as a device run, a training or a
  build, goes to the background; the agent says where it is (task N of M,
  what it does) and picks it up from the notification or when asked, instead
  of blocking for minutes. *Enforced* for Claude Code: the hook
  [no-foreground-wait.mjs](../scripts/no-foreground-wait.mjs) refuses a
  waiting loop that does not run in the background.
- **"Clean up" means tracked files.** Asked to clean up a repository or to
  remove what is not needed, an agent removes only files the repository
  tracks. Ignored folders, such as `tmp/`, a virtual environment, `build/` or
  `node_modules`, may hold a person's own data and are left alone unless
  named.
