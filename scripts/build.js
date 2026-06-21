import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve("src/aegis-iframe-background-card.js");
const rootTarget = resolve("aegis-iframe-background-card.js");
const distTarget = resolve("dist/aegis-iframe-background-card.js");

mkdirSync(dirname(rootTarget), { recursive: true });
mkdirSync(dirname(distTarget), { recursive: true });
copyFileSync(source, rootTarget);
copyFileSync(source, distTarget);
