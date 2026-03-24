/**
 * Art for the INNER frame only on /case-studies hero (production AI → shipped outcomes).
 *
 *   pnpm run generate:case-studies-hero-frame
 *
 * Output: public/images/case-studies/hero-framed-production-ai.jpg
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

const PROMPT = `Square 1:1 premium abstract editorial illustration for an enterprise consulting website about PRODUCTION AI THAT SHIPS REAL OUTCOMES—not experiments or slide decks.

Visual metaphor: ideas becoming operational—abstract "launch" or "delivery" energy: soft geometric modules locking into place, a gentle upward arc suggesting deployment to production, subtle checkpoint or gate shapes implying human-in-the-loop governance (no literal people). Suggest reliability: repeated rhythm, calm completion, not chaos. Mood: aspirational and warm—dawn light, horizon optimism—not dark, dystopian, or cold-corporate.

Color: Innovoco brand—rich royal blue and electric cyan on the left, transitioning through deep indigo to crimson and rose on the right; luminous ribbon or light-trail accents; avoid muddy grey and avoid oppressive black voids.

${CINEMATIC_STYLE_ANCHOR}

Hard constraints: no readable text, no letters, no logos, no watermarks, no company names, no faces. NOT a UI screenshot, NOT photorealistic office, NOT 3D cartoon.`;

async function generateImage(prompt, aspectRatio) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(API_KEY)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
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

  return {
    data: Buffer.from(imagePart.inlineData.data, "base64"),
    mimeType: imagePart.inlineData.mimeType || "image/png",
  };
}

async function main() {
  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY in .env.local or environment.");
    process.exit(1);
  }

  const sharp = (await import("sharp")).default;
  const outDir = path.join(root, "public", "images", "case-studies");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "hero-framed-production-ai.jpg");

  console.log("Generating framed hero inner art (1:1)…");
  const { data, mimeType } = await generateImage(PROMPT, "1:1");
  await sharp(data).jpeg({ quality: 88, mozjpeg: true }).toFile(outPath);
  console.log(`Wrote ${outPath} (from ${mimeType})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
