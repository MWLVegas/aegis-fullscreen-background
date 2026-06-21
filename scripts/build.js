import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve("src/aegis-iframe-background-card.js");
const target = resolve("dist/aegis-iframe-background-card.js");

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);

