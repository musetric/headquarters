# Musetric Headquarters

The entry point to the Musetric organization: how to set up a machine and the
workspace, and the context shared by every repository of the product.

The product itself lives in [musetric/musetric](https://github.com/musetric/musetric).

## Setting up a machine

On Windows 11:

1. `winget install --id Git.Git -e`
2. Install [Claude Code](https://code.claude.com) and sign in.
3. Create a folder for the workspace, for example `D:\musetric`, start
   `claude` in it and send:

   > Set up this machine for Musetric: clone
   > https://github.com/musetric/headquarters.git into this folder and follow
   > headquarters/onboarding/owner.md.

The agent installs the tools, clones the repositories and checks the result,
and asks you for each step that needs your account. The procedure is
[onboarding/owner.md](onboarding/owner.md); so far it covers the owner of the
organization only.

## License

[MIT licensed](license.md).
