// Gives every new OpenCode session started in the workspace root what the
// SessionStart hook gives Claude Code and Codex: the output of
// scripts/session-start.mjs, kept as an instruction entry of the session.
// OpenCode loads it through the plugins of agents/opencode/opencode.json.

import { execFile } from 'node:child_process';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const headquarters = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const root = resolve(headquarters, '..');
const script = resolve(headquarters, 'scripts', 'session-start.mjs');
// The process is OpenCode's own executable, so node is taken from the PATH.
const isRoot = (directory) => relative(directory, root) === '';

export default {
  id: 'musetric.session-start',
  setup(ctx) {
    if (!isRoot(ctx.location.directory)) {
      return undefined;
    }
    const inject = async (sessionID) => {
      const { stdout } = await run('node', [script]);
      await ctx.session.instructions.entry.put({ sessionID, key: 'musetric-workspace', value: stdout.trim() });
    };
    const controller = new AbortController();
    void (async () => {
      for await (const event of ctx.event.subscribe({ types: ['session.created'], signal: controller.signal })) {
        // A subagent's session has a parent; Claude Code's hook skips those too.
        if (!event.data.parentID && isRoot(event.data.location.directory)) {
          void inject(event.data.sessionID).catch(console.error);
        }
      }
    })();
    return () => controller.abort();
  },
};
