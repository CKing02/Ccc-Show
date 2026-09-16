// Cloudflare Pages wants the Worker at `_worker.js` (with underscore) at the
// root of `pages_build_output_dir`. OpenNext emits `worker.js` (no underscore),
// so Pages skips it and the site 404s. Rename after build to make Pages pick
// the Worker up.
//
// Static asset serving is handled by the `assets.directory` config in
// wrangler.jsonc — Pages provides the `env.ASSETS` binding to the Worker
// automatically (the name is reserved in Pages projects). No copy step is
// needed: Pages serves /_next/static/* from .open-next/assets/_next/static/*.
import { renameSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".open-next";

const workerSrc = join(ROOT, "worker.js");
const workerDst = join(ROOT, "_worker.js");

if (!existsSync(workerSrc)) {
  console.error(`postbuild-cf: ${workerSrc} not found — did the OpenNext build run?`);
  process.exit(1);
}

renameSync(workerSrc, workerDst);
console.log(`postbuild-cf: renamed ${workerSrc} → ${workerDst}`);
