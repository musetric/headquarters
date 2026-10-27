import { execFile } from 'node:child_process';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const headquarters = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const root = resolve(headquarters, '..');
const script = resolve(headquarters, 'scripts', 'session-start.mjs');
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
        if (!event.data.parentID && isRoot(event.data.location.directory)) {
          void inject(event.data.sessionID).catch(console.error);
        }
      }
    })();
    return () => controller.abort();
  },
};
