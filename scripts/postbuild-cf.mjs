// Cloudflare Pages wants the Worker at `_worker.js` (with underscore) at the
// root of `pages_build_output_dir`. OpenNext emits `worker.js` (no underscore),
// so Pages skips it and the site 404s. Rename after build to make Pages pick
// the Worker up.
import { renameSync, existsSync } from "node:fs";

const src = ".open-next/worker.js";
const dst = ".open-next/_worker.js";

if (!existsSync(src)) {
  console.error(`postbuild-cf: ${src} not found — did the OpenNext build run?`);
  process.exit(1);
}

renameSync(src, dst);
console.log(`postbuild-cf: renamed ${src} → ${dst}`);
