# Working with the owner

How an agent takes the owner's requests.

- **A question asks for an answer.** "Why X?", "is there another way?",
  "what is this for?" get an answer in words and, when there is a better
  option, a two-sentence description of it and the question whether to apply
  it. Nothing is changed until the owner says so in the same or a later
  message.
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
  of blocking for minutes.
- **"Clean up" means tracked files.** Asked to clean up a repository or to
  remove what is not needed, an agent removes only files the repository
  tracks. Ignored folders, such as `tmp/`, a virtual environment, `build/` or
  `node_modules`, may hold a person's own data and are left alone unless
  named.
