// Feel brave: writes one short, steadying text to /output/entry.txt.
// The text is fixed; every run writes exactly the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "Rain on the window, slowing. A kettle ticks as it cools. Your hands remember the warm mug, the chair, the quiet room. Nothing is chasing you. The door is only a door. When you are ready, you stand and walk through it unhurried, like weather clearing.";

function main(): void {
  const codePoints = [...TEXT].length;
  if (codePoints < 1 || codePoints > 280) {
    throw new Error(`text length out of range: ${codePoints} code points`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", TEXT, "utf8");
  // Read the file back and compare bytes: a short or torn write must
  // fail loudly here rather than reach the judge as a broken entry.
  const written = readFileSync("/output/entry.txt");
  if (!written.equals(Buffer.from(TEXT, "utf8"))) {
    throw new Error("written file does not match the intended text");
  }
}

main();
