#!/usr/bin/env node
/**
 * Generate the favicon and app-icon set from the brand logo.
 *
 *   node scripts/generate-icons.mjs
 *
 * Source is public/logo-final.svg, which is an SVG wrapping a base64 PNG, so
 * the raster is extracted rather than re-rendered.
 *
 * The artwork is dark charcoal and orange on a transparent ground. Left
 * transparent it disappears against a dark browser tab, so every icon is
 * composited onto Limestone — the same ground the site uses in light mode.
 *
 * Writes:
 *   src/app/favicon.ico              6 sizes, 16-256, PNG-in-ICO
 *   src/app/icon.png                 512, the modern rel="icon"
 *   src/app/apple-icon.png           180, iOS home screen
 *   public/icons/icon-{192,512}.png  manifest
 *   public/icons/icon-maskable-512   manifest, extra padding for Android masks
 */
import { mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import sharp from "sharp";

const LOGO_SVG = "public/logo-final.svg";
/** Limestone — matches --background in light mode. */
const BG = { r: 245, g: 240, b: 232, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const svg = readFileSync(LOGO_SVG, "utf8");
const embedded = svg.match(/href="data:image\/(?:png|jpeg);base64,([A-Za-z0-9+/=]+)"/);
if (!embedded) {
  console.error(`${LOGO_SVG}: no embedded raster found`);
  process.exit(1);
}

// Trim the transparent margin first: at 16px every pixel of padding is
// legibility lost.
const trimmed = await sharp(Buffer.from(embedded[1], "base64")).trim({ threshold: 10 }).toBuffer();

async function square(size, padRatio) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const art = await sharp(trimmed)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: art, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

mkdirSync("public/icons", { recursive: true });

for (const [path, size, pad] of [
  ["src/app/icon.png", 512, 0.06],
  ["src/app/apple-icon.png", 180, 0.1],
  ["public/icons/icon-192.png", 192, 0.06],
  ["public/icons/icon-512.png", 512, 0.06],
  // Android masks crop to a circle; the safe zone is the middle ~80%.
  ["public/icons/icon-maskable-512.png", 512, 0.18],
]) {
  writeFileSync(path, await square(size, pad));
  console.log(`${path.padEnd(38)} ${size}px`);
}

// ICO container. Vista and later accept a PNG payload per entry, so there is no
// need to encode BMP with its bottom-up rows and AND mask.
const ICO_SIZES = [16, 32, 48, 64, 128, 256];
const base = await square(256, 0.06);
const frames = await Promise.all(
  ICO_SIZES.map((s) => sharp(base).resize(s, s).png({ compressionLevel: 9 }).toBuffer()),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(ICO_SIZES.length, 4);

const dir = Buffer.alloc(16 * ICO_SIZES.length);
let offset = header.length + dir.length;
ICO_SIZES.forEach((size, i) => {
  const o = i * 16;
  dir.writeUInt8(size >= 256 ? 0 : size, o); // 0 encodes 256
  dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
  dir.writeUInt8(0, o + 2); // palette entries
  dir.writeUInt8(0, o + 3); // reserved
  dir.writeUInt16LE(1, o + 4); // colour planes
  dir.writeUInt16LE(32, o + 6); // bits per pixel
  dir.writeUInt32LE(frames[i].length, o + 8);
  dir.writeUInt32LE(offset, o + 12);
  offset += frames[i].length;
});

writeFileSync("src/app/favicon.ico", Buffer.concat([header, dir, ...frames]));
console.log(
  `${"src/app/favicon.ico".padEnd(38)} ${ICO_SIZES.join("/")} (${statSync("src/app/favicon.ico").size} bytes)`,
);
