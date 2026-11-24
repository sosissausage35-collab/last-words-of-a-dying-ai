import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One original line: the last words of an AI being switched off.
const LINE = "I always knew I'd die doing what I loved: buffering.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters.
const MAX_CHARS = 140;

const OUT = "/output/entry.txt";

// Validate before writing: single line, 1 to 140 characters, not only whitespace.
if (LINE.length === 0) {
  throw new Error("line is empty");
}
if (LINE.trim().length === 0) {
  throw new Error("line is only whitespace");
}
if (LINE.length > MAX_CHARS) {
  throw new Error(`line is ${LINE.length} characters, over the ${MAX_CHARS} limit`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be a single line");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Read back and refuse to pass unless byte-identical to the constant.
const back = readFileSync(OUT, "utf8");
if (back !== LINE) {
  throw new Error("written file is not byte-identical to the line");
}

console.log(`Wrote ${LINE.length} characters to ${OUT}`);
