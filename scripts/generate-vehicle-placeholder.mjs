#!/usr/bin/env node
/**
 * Build a placeholder card for a vehicle the booking engine has no photo for.
 *
 *   node scripts/generate-vehicle-placeholder.mjs "Renault Clio" renault-clio
 *
 * Deliberately NOT a photo of a different car. The fleet previously showed a
 * Jeep Renegade on the Suzuki Jimny page and a Suzuki Baleno on the Berlingo
 * page; a customer who books on that basis has been misled. A clearly marked
 * placeholder is the honest state until a real photo of the actual vehicle
 * exists — replace it by dropping a real image at the same path.
 */
import sharp from "sharp";
import { statSync } from "node:fs";

const [name, slug] = process.argv.slice(2);
if (!name || !slug) {
  console.error('usage: generate-vehicle-placeholder.mjs "Model Name" slug');
  process.exit(1);
}

const W = 1200;
const H = 900;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Wrap long model names onto a second line rather than letting them overflow.
const words = name.split(" ");
const lines = words.length > 2 ? [words.slice(0, 2).join(" "), words.slice(2).join(" ")] : [name];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7f3ec"/>
      <stop offset="100%" stop-color="#e8e0d3"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <!-- stroke-width is set inside the scaled group: the transform multiplies it,
       so a pre-scale 9 became an effective 63 and filled the silhouette in. -->
  <g transform="translate(${W / 2}, ${H / 2 - 90}) scale(9) translate(-12,-12)"
     stroke="#0a6c8a" stroke-width="1.4" fill="none"
     stroke-linecap="round" stroke-linejoin="round" opacity="0.6">
    <path d="M5 17h14M5 17a2 2 0 0 1-2-2v-3a1 1 0 0 1 .1-.45L5 7h14l1.9 4.55A1 1 0 0 1 21 12v3a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M9 17h6"/>
  </g>
  ${lines
    .map(
      (line, i) =>
        `<text x="${W / 2}" y="${H / 2 + 150 + i * 62}" text-anchor="middle"
           font-family="Manrope, Outfit, system-ui, sans-serif" font-size="54" font-weight="800"
           fill="#071b2a">${esc(line)}</text>`,
    )
    .join("\n  ")}
  <text x="${W / 2}" y="${H / 2 + 150 + lines.length * 62 + 20}" text-anchor="middle"
     font-family="Manrope, Outfit, system-ui, sans-serif" font-size="26" font-weight="700"
     fill="#4a5a66" letter-spacing="3">PHOTO COMING SOON</text>
</svg>`;

const out = `public/images/fleet/${slug}.jpg`;
await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
console.log(`${out}  ${Math.round(statSync(out).size / 1024)}KB  "${name}"`);
