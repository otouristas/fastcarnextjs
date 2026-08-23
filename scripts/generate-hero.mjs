#!/usr/bin/env node
/**
 * Build the homepage hero master from a source photo.
 *
 *   node scripts/generate-hero.mjs [source.jpg] [--out public/images/naxos/agia-anna-hero.webp]
 *
 * next/image can only serve up to the source's own width, so a 1000px file on a
 * full-bleed hero is upscaled by the browser — bilinear, on top of JPEG
 * artefacts. This produces a 2400px master with Lanczos3 resampling and an
 * unsharp mask, which the optimizer then sizes down per request.
 *
 * Upscaling cannot invent detail. This makes an under-resolution source look as
 * good as it can; it is not a substitute for an original shot at 2400px+.
 */
import { statSync } from "node:fs";
import sharp from "sharp";

const args = process.argv.slice(2);
const src = args.find((a) => !a.startsWith("--")) ?? "public/images/naxos/agia-anna.jpg";
const outIdx = args.indexOf("--out");
const out = outIdx === -1 ? "public/images/naxos/agia-anna-hero.webp" : args[outIdx + 1];
const TARGET_WIDTH = 2400;

const meta = await sharp(src).metadata();
if (meta.width >= TARGET_WIDTH) {
  console.log(`${src} is already ${meta.width}px — resampling without upscaling.`);
} else {
  const factor = (TARGET_WIDTH / meta.width).toFixed(2);
  console.warn(`${src} is only ${meta.width}x${meta.height}; upscaling ${factor}x.`);
  console.warn("This recovers edge definition but adds no real detail. For a truly");
  console.warn("crisp hero, replace the source with an original at 2400px or wider.");
}

await sharp(src)
  .resize(TARGET_WIDTH, null, { kernel: "lanczos3" })
  .sharpen({ sigma: 1.0, m1: 0.6, m2: 2.4 })
  .webp({ quality: 92, effort: 6 })
  .toFile(out);

const done = await sharp(out).metadata();
console.log(`${out}  ${done.width}x${done.height}  ${Math.round(statSync(out).size / 1024)}KB master`);
