import { readFileSync } from 'node:fs';

const limit = 60;
const unknownCountSleep = 5;

const seconds = (value, unit) => Number(value) * ({ m: 60, h: 3600 }[unit?.toLowerCase()] ?? 1);

const sleeps = (text) => [
  ...[...text.matchAll(/(?<![-\w])sleep\s+(\d+(?:\.\d+)?)([smh])?\b/gi)].map((match) => seconds(match[1], match[2])),
  ...[...text.matchAll(/\bStart-Sleep\b(?:\s+-Seconds)?\s+(\d+(?:\.\d+)?)/gi)].map((match) => Number(match[1])),
  ...[...text.matchAll(/\bStart-Sleep\s+-Milliseconds\s+(\d+)/gi)].map((match) => Number(match[1]) / 1000),
  ...[...text.matchAll(/\btimeout\s+\/t\s+(\d+)/gi)].map((match) => Number(match[1])),
];

const longest = (text) => Math.max(0, ...sleeps(text));

const count = (header) => {
  const range = header.match(/\bseq\s+(\d+)(?:\s+(\d+))?(?:\s+(\d+))?/);
  if (range !== null) {
    if (range[3] !== undefined) {
      return (Number(range[3]) - Number(range[1])) / Number(range[2]) + 1;
    }
    return range[2] === undefined ? Number(range[1]) : Number(range[2]) - Number(range[1]) + 1;
  }
  const braces = header.match(/\{(\d+)\.\.(\d+)\}/);
  if (braces !== null) {
    return Number(braces[2]) - Number(braces[1]) + 1;
  }
  const words = header.match(/\bin\s+((?:\d+\s*)+)$/);
  if (words !== null) {
    return words[1].trim().split(/\s+/).length;
  }
  const counter = header.match(/\(\s*\$\w+\s*=\s*(\d+)\s*;\s*\$\w+\s*-l([te])\s*(\d+)/i);
  if (counter !== null) {
    return Number(counter[3]) - Number(counter[1]) + (counter[2].toLowerCase() === 'e' ? 1 : 0);
  }
  return undefined;
};

const loopWaits = (kind, header, body) => {
  const pause = longest(body);
  if (pause === 0) {
    return false;
  }
  if (kind !== 'for' && kind !== 'foreach') {
    return true;
  }
  const times = count(header);
  return times === undefined ? pause >= unknownCountSleep : times * pause >= limit;
};

const bashLoops = (command) =>
  [...command.matchAll(/\b(until|while|for)\b([\s\S]*?);?\s*\bdo\b([\s\S]*?)\bdone\b/g)].some((match) =>
    loopWaits(match[1], match[2], match[3]),
  );

const powershellLoops = (command) =>
  [
    ...[...command.matchAll(/\b(while|for|foreach)\s*(\([^{]*\))\s*\{([\s\S]*?)\}/gi)].map((match) =>
      loopWaits(match[1].toLowerCase(), match[2], match[3]),
    ),
    ...[...command.matchAll(/\bdo\s*\{([\s\S]*?)\}\s*(?:while|until)\b/gi)].map((match) =>
      loopWaits('do', '', match[1]),
    ),
  ].some(Boolean);

const foreground = (command) =>
  command
    .replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n\s*\2\b/g, ' ')
    .replace(/@'\n[\s\S]*?\n'@|@"\n[\s\S]*?\n"@/g, ' ')
    .replace(/\((?:[^()]|\([^()]*\))*\)(?:\s*\d?>>?\s*\S+|\s*\d?>&\d)*\s*&(?!&)/g, ' ')
    .replace(/\b(?:while|until|for)\b[\s\S]*?\bdone\b(?:\s*\d?>>?\s*\S+|\s*\d?>&\d)*\s*&(?!&)/g, ' ');

const waits = (command) => {
  if (/\bgh\s+run\s+watch\b/.test(command) || /\bgh\s+pr\s+checks\b[^\n|;&]*--watch\b/.test(command)) {
    return true;
  }
  if (longest(command) >= limit) {
    return true;
  }
  const bounds = [...command.matchAll(/\btimeout\s+(\d+)s?\s/g)].map((match) => Number(match[1]));
  if (bounds.length > 0 && Math.max(...bounds) < limit) {
    return false;
  }
  return bashLoops(command) || powershellLoops(command);
};

const input = JSON.parse(readFileSync(0, 'utf8'));
if (input.tool_input?.run_in_background !== true && waits(foreground(String(input.tool_input?.command ?? '')))) {
  process.stderr.write(
    [
      'This command waits in the foreground: until it ends, the session can neither do other work nor answer the person.',
      'Run it again with run_in_background set to true; a notification comes when it exits.',
      'Meanwhile go on with work that does not depend on it',
      '(headquarters/practices/working-with-the-owner.md, "No silent waits").',
    ].join(' '),
  );
  process.exit(2);
}
