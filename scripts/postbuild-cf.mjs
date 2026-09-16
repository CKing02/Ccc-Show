// Cloudflare Pages wants the Worker at `_worker.js` (with underscore) at the
// root of `pages_build_output_dir`. OpenNext emits `worker.js` (no underscore),
// so Pages skips it and the site 404s. Rename after build to make Pages pick
// the Worker up.
//
// Pages also serves static files from the build output at the request path
// (e.g. .open-next/_next/static/foo.js → /_next/static/foo.js). OpenNext
// nests static files under .open-next/assets/, so URLs like /_next/static/*
// 404 unless we copy the assets to the build output root.
import {
  renameSync,
  copyFileSync,
  mkdirSync,
  readdirSync,
  existsSync,
} from "node:fs";
import { join } from "node:path";

const ROOT = ".open-next";

// Step 1: rename worker.js → _worker.js so Pages wires it up.
const workerSrc = join(ROOT, "worker.js");
const workerDst = join(ROOT, "_worker.js");

if (!existsSync(workerSrc)) {
  console.error(`postbuild-cf: ${workerSrc} not found — did the OpenNext build run?`);
  process.exit(1);
}

renameSync(workerSrc, workerDst);
console.log(`postbuild-cf: renamed ${workerSrc} → ${workerDst}`);

// Step 2: copy .open-next/assets/* → .open-next/ so Pages can serve static
// files at their natural paths (e.g. /_next/static/*).
const assetsDir = join(ROOT, "assets");
if (existsSync(assetsDir)) {
  copyDir(assetsDir, ROOT);
  console.log(`postbuild-cf: copied ${assetsDir}/* → ${ROOT}/`);
}

function copyDir(src, dst) {
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name);
    const dstPath = join(dst, entry.name);
    if (entry.isDirectory()) {
      mkdirSync(dstPath, { recursive: true });
      copyDir(srcPath, dstPath);
    } else {
      copyFileSync(srcPath, dstPath);
    }
  }
}
