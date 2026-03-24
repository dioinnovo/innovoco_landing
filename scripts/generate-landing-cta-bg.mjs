/**
 * Generate the full-bleed background for the main landing page final CTA (“Book consultation”).
 *
 * Pipeline (aligned with `generate-industry-cta-bg.mjs` + `generate-cta-prioritization-bg.mjs`):
 * - Gemini `gemini-3.1-flash-image-preview`
 * - `CINEMATIC_STYLE_ANCHOR` + Makoto Shinkai–style volumetric light
 * - Ultra-wide 21:9 — center band kept atmospheric for headline + cards (no blowout white)
 *
 * Usage:
 *   pnpm run generate:landing-cta-bg
 *   pnpm run generate:landing-cta-bg -- --force   # regenerate
 *
 * Requires GEMINI_API_KEY in .env.local or env.
 * Output: public/images/landing/final-cta-bg.jpg
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { CINEMATIC_STYLE_ANCHOR } from "./ai-art-style-anchor.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.1-flash-image-preview";

const OUT_DIR = path.join(root, "public/images/landing");
const OUT_FILE = path.join(OUT_DIR, "final-cta-bg.jpg");

const PROMPT = `
${CINEMATIC_STYLE_ANCHOR}

ADDITIONAL STYLE — Makoto Shinkai–inspired romantic realism (same family as industry CTA backgrounds):
Volumetric crepuscular rays, hyper-detailed cloud or light strata with internal luminosity, atmospheric depth.
Warm golden and crimson light meeting cooler sapphire and violet twilight. Rich painterly texture—not a photograph.

METAPHOR — Enterprise AI transformation (homepage, all industries):
A vast panoramic sky where many faint, tangled ribbons or layers (suggesting complexity, legacy systems, and data noise)
in the lower and mid frame resolve upward into fewer, clearer luminous pathways converging toward an open horizon—
orchestration, clarity, and scale without depicting a single sector. Suggest possibility: bridges of light, gentle arcs,
or a broad calm band of clarity above busier layers. Innovoco palette: cobalt and sapphire in shadows; crimson and rose-gold
where light gathers.

COMPOSITION: Ultra-wide panoramic (21:9). Keep the vertical center band slightly softer and mid-toned so white/light UI
can sit on top with a light frosted overlay—avoid pure white in the middle third. Lower third may carry more visual density;
upper sky stays open and hopeful.

CONSTRAINTS: No readable text, no logos, no watermarks, no UI screenshots, no photorealistic people or faces.
No literal office desks or laptop screens. Premium editorial illustration.
`.trim();

async function generateImage(aspectRatio) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(API_KEY)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio,
          imageSize: "2K",
        },
      },
    }),
  });

  const json = await res.json();
  if (!res.ok) {
    const msg = json?.error?.message || JSON.stringify(json);
    throw new Error(`Gemini API error: ${msg}`);
  }

  const parts = json.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart) {
    throw new Error(`No image in response: ${JSON.stringify(json).slice(0, 1500)}`);
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

async function main() {
  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    process.exit(1);
  }

  const force = process.argv.includes("--force") || process.argv.includes("--all");
  if (fs.existsSync(OUT_FILE) && !force) {
    console.log(`Already exists: ${OUT_FILE} (use --force to regenerate)`);
    return;
  }

  console.log("Generating landing page final CTA background …");

  let buf;
  try {
    buf = await generateImage("21:9");
  } catch (e) {
    console.warn("21:9 failed, retrying 16:9 …", e.message);
    buf = await generateImage("16:9");
  }

  try {
    const sharp = (await import("sharp")).default;
    const optimized = await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(OUT_FILE, optimized);
    console.log(`Wrote ${OUT_FILE} (${(optimized.length / 1024).toFixed(0)} KB, mozjpeg)`);
  } catch {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(OUT_FILE, buf);
    console.log(`Wrote ${OUT_FILE} (${(buf.length / 1024).toFixed(0)} KB, raw)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
