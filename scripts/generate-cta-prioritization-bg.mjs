/**
 * Generate the CTA background image for the AI Prioritization Workshop section.
 *
 * Usage:
 *   pnpm run generate:cta-prioritization-bg
 *
 * Requires GEMINI_API_KEY in .env.local or env.
 * Output: public/images/case-studies/cta-prioritization-bg.jpg
 *
 * Art direction: wide panoramic (roughly 21:9) Makoto Shinkai-inflected
 * romantic realism — dawn light breaking through layered cloud strata,
 * suggesting clarity emerging from overwhelming complexity. The image will
 * sit behind white/translucent text, so the middle band must remain
 * atmospheric and mid-dark (not blown-out highlights).
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

const OUT_DIR = path.join(root, "public/images/case-studies");
const OUT_FILE = path.join(OUT_DIR, "cta-prioritization-bg.jpg");

const PROMPT = `
${CINEMATIC_STYLE_ANCHOR}

ADDITIONAL STYLE LAYER — Makoto Shinkai-inspired romantic realism:
Volumetric crepuscular rays piercing layered cumulus clouds at golden hour.
Hyper-detailed cloud edges with visible internal luminosity — sunlit amber
and rose on near sides, deep cobalt and indigo in shadow. Atmospheric
perspective: foreground cloud wisps sharp and textured, mid-ground softer,
far distance dissolves into a luminous haze. Subtle lens-flare quality where
light breaks through gaps. Color temperature split: warm golden/crimson
light source on left, cooler sapphire/violet twilight receding right.

METAPHOR: A vast sky where a single, clear beam of golden light cuts
through a towering wall of layered, overlapping cloud strata — the beam
illuminates a calm valley of rolling fog below. The clouds represent
overwhelming complexity; the beam represents clarity and prioritized focus.
NOT literal office scenes, NOT charts/graphs, NOT people.

COMPOSITION: Ultra-wide panoramic (21:9 aspect ratio). The light beam
enters from upper-left at ~30°. Cloud layers fill the upper 60%, luminous
valley fog fills the lower 40%. Center of frame slightly darker and more
atmospheric (text will overlay here) — avoid pure white blowouts in the
center band.

BRAND COLORS: Innovoco cobalt and sapphire blues in the shadow regions;
crimson and rose-gold in the light-struck cloud edges. Violet where warm
and cool meet. The overall palette must feel hopeful, not threatening.

CONSTRAINTS: No text, no logos, no watermarks, no UI elements, no people,
no buildings, no literal objects. Pure atmospheric landscape abstraction.
Premium editorial illustration quality — rich painterly texture, not
photographic.
`.trim();

async function generate() {
  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    process.exit(1);
  }

  if (fs.existsSync(OUT_FILE) && !process.argv.includes("--force")) {
    console.log(`Already exists: ${OUT_FILE} (use --force to regenerate)`);
    return;
  }

  console.log("Generating CTA prioritization background …");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: PROMPT }] }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      temperature: 1.0,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini ${res.status}: ${txt}`);
  }

  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.mimeType?.startsWith("image/"),
  );

  if (!part) {
    console.error("No image in response", JSON.stringify(json, null, 2));
    process.exit(1);
  }

  const buf = Buffer.from(part.inlineData.data, "base64");

  // Try sharp for optimized JPEG, fall back to raw buffer
  try {
    const sharp = (await import("sharp")).default;
    const optimized = await sharp(buf)
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, optimized);
    console.log(`Wrote ${OUT_FILE} (${(optimized.length / 1024).toFixed(0)} KB, mozjpeg)`);
  } catch {
    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, buf);
    console.log(`Wrote ${OUT_FILE} (${(buf.length / 1024).toFixed(0)} KB, raw)`);
  }
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
