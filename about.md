# About headquarters

Why this repository exists, where the truth about the organization is, and
what belongs here.

## Why it exists

Headquarters gives every person and every agent, on any machine, the same
understanding of the organization: who we are, how work is done, and how the
pieces of the product fit together. It holds lasting, general knowledge, and
it stays true when a machine breaks, a phone updates or an issue closes.

## Where the truth is

Where the source code exists, it is the truth about how the product behaves.
But nobody looks for code they do not know exists, and much of what matters
never was code: why something exists, the use cases, requirements and intent
behind it, and the values it serves. Headquarters is the entry point that
says what there is, where it is and why, so that everyone knows where to
look. It does not document every issue or every file; the details are in the
source and in the issues. The whole truth is all of it together: how a button
behaves in the code is not understood until it is clear why it behaves so.

Headquarters must stay consistent, within itself and with the rest of the
organization. A contradiction found in it, or between it and an issue, the
source or reality, is resolved before the task goes on, as the
[charter](charter.md) requires.

## What belongs here

It holds:

- who the organization is and what it stands for: the [charter](charter.md);
- how work is done in every repository: the [practices](practices/readme.md);
- the general picture of the product, where it runs and where it stands, in
  general words linked to the issues: [product.md](product.md) and
  [environment/](environment/readme.md);
- the owner's decisions in force, each with its reason: [decisions/](decisions/readme.md);
- how a machine and the workspace are set up: [onboarding](onboarding/owner.md),
  [workspace.json](workspace.json) and the [scripts](scripts/);
- the agents' configuration shared by the organization.

It does not hold:

- one person's machine, hardware, accounts, purchases or plans; an agent
  learns them from the environment at hand, and a person's own instructions
  stay with that person;
- concrete problems, defects, measurements, hypotheses, tasks and their
  status, a release plan among them: they are issues of
  [musetric/musetric](https://github.com/musetric/musetric/issues), where the
  organization keeps all its issues for now. A page here may state a fact in
  general words and link to the issues that prove it;
- what a repository owns: its code rules, its toolchain and the versions it
  pins stay in that repository, and this one only links to them or reads
  them;
- the details of one device, one GPU or one browser version: they belong to
  the issue of that problem;
- how to install a tool: the requirement is stated, and the way to meet it is
  left to whoever sets the machine up;
- material that may not be published, such as real users' data or tracks
  without an open licence;
- raw experiments, their data and their models: they stay on the machine that
  runs them, in the workspace and outside every repository.

The test for a new text: if it would have to change because one machine
changed, one device updated or one issue moved, it belongs somewhere else.
