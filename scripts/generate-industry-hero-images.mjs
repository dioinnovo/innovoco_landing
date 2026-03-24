/**
 * Generate retail & construction industry hero images with Gemini
 * "Nano Banana 2" (gemini-3.1-flash-image-preview).
 *
 * Usage:
 *   export GEMINI_API_KEY=your_key
 *   node scripts/generate-industry-hero-images.mjs
 *
 * Or with .env.local (loaded via dotenv):
 *   node scripts/generate-industry-hero-images.mjs
 *
 * Outputs JPEGs to public/images/industries/{retail,construction}-hero.jpg
 * Requires: sharp (devDependency) to normalize API PNG/WebP to JPEG for Next/Image.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.1-flash-image-preview";

const JOBS = [
  {
    id: "retail",
    filename: "retail-hero.jpg",
    prompt: `Photorealistic ultrawide 16:9 editorial hero image for a premium retail and e-commerce AI consulting website.
Scene: modern flagship store interior at dusk with soft cool blue accent lighting on fixtures, subtle abstract holographic data particles suggesting personalization (no UI, no charts with text), diverse shoppers in soft motion blur, shallow depth of field, cinematic advertising photography.
Mood: trustworthy, innovative, calm luxury.
Hard constraints: no readable text, no logos, no brand names, no watermarks, no people's faces in sharp focus. Suitable for dark navy text overlay at top.`,
  },
  {
    id: "construction",
    filename: "construction-hero.jpg",
    prompt: `Photorealistic ultrawide 16:9 editorial hero image for a construction and home services AI technology website.
Scene: active commercial construction site at golden hour—steel structure, crane silhouette, workers in proper PPE at medium distance (not identifiable), warm dust in light beams, engineering precision mood.
Hard constraints: no readable text, no company logos, no watermarks. Cinematic documentary style with strong depth; suitable for dark gradient overlay.`,
  },
];

async function generateImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(API_KEY)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
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
    console.error("Missing GEMINI_API_KEY. Set it in the environment or .env.local");
    process.exit(1);
  }

  const sharp = (await import("sharp")).default;
  const outDir = path.join(root, "public", "images", "industries");
  fs.mkdirSync(outDir, { recursive: true });

  for (const job of JOBS) {
    console.log(`Generating ${job.id}…`);
    const { data, mimeType } = await generateImage(job.prompt);
    const outPath = path.join(outDir, job.filename);
    await sharp(data)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);
    console.log(`Wrote ${outPath} (from ${mimeType})`);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
