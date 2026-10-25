# Musetric Headquarters

The entry point to the Musetric organization: how to set up a machine and the
workspace, and the context shared by every repository of the product.

The product itself lives in [musetric/musetric](https://github.com/musetric/musetric).
Who we are and what we will never do: [the charter](charter.md). What belongs
in this repository, and what goes elsewhere:
[about.md](about.md).

## Setting up a machine

You need git and a signed-in coding agent, such as
[Claude Code](https://code.claude.com). Start the agent in an empty folder for
the workspace and send:

> Set up this machine for Musetric: clone
> https://github.com/musetric/headquarters.git into this folder and follow
> headquarters/onboarding/owner.md.

The agent brings the machine to the state the procedure describes, clones the
repositories and checks the result, and asks you for each step that needs
your account. The procedure is
[onboarding/owner.md](onboarding/owner.md); so far it covers the owner of the
organization only.

## License

[MIT licensed](license.md).
