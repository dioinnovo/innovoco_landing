/**
 * Generate industry hero JPEGs with Gemini (gemini-3.1-flash-image-preview).
 *
 * Usage:
 *   export GEMINI_API_KEY=your_key
 *   node scripts/generate-industry-hero-images.mjs
 *
 * Or with .env.local (loaded via dotenv):
 *   node scripts/generate-industry-hero-images.mjs
 *
 * Generate only selected jobs (job ids):
 *   node scripts/generate-industry-hero-images.mjs energy-utilities insurance
 *
 * Outputs to public/images/industries/*-hero.jpg
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
    prompt: `Photorealistic ultrawide 16:9 editorial photograph for a retail and e-commerce consulting website.
Scene: real flagship or department store interior at dusk—warm practical lighting on fixtures, real shoppers in soft motion blur, merchandise and aisles in focus, documentary retail photography feel. No sci-fi, no holograms, no floating UI.
Mood: trustworthy, calm, premium but believable.
Hard constraints: no readable text, no logos, no brand names, no watermarks, no faces in sharp focus. Suitable for dark navy text overlay.`,
  },
  {
    id: "construction",
    filename: "construction-hero.jpg",
    prompt: `Photorealistic ultrawide 16:9 editorial hero image for a construction and home services AI technology website.
Scene: active commercial construction site at golden hour—steel structure, crane silhouette, workers in proper PPE at medium distance (not identifiable), warm dust in light beams, engineering precision mood.
Hard constraints: no readable text, no company logos, no watermarks. Cinematic documentary style with strong depth; suitable for dark gradient overlay.`,
  },
  {
    id: "energy-utilities",
    filename: "energy-utilities-hero-v2.jpg",
    prompt: `Photorealistic ultrawide 16:9 editorial hero image for a utilities and energy sector AI technology website.
Scene: modern electrical substation or utility-scale solar array at dawn—cool teal sky, warm horizon light on steel structures and insulators, faint atmospheric haze, transmission lines receding into depth, subtle sense of reliable grid and renewable generation (no charts, no UI).
Mood: industrial resilience, clean infrastructure, operational excellence.
Hard constraints: no readable text, no company logos, no watermarks, no people (omit workers entirely—pure infrastructure only). Cinematic wide shot with strong depth; suitable for dark cyan-teal gradient text overlay.`,
  },
  {
    id: "insurance",
    filename: "insurance-hero-v2.jpg",
    prompt: `Photorealistic ultrawide 16:9 editorial hero image for an insurance and insurtech AI consulting website.
Scene: empty modern corporate lobby or glass corridor at blue hour—floor-to-ceiling windows, soft indigo and violet ambient light, polished floor with reflections, architectural lines only. Absolutely no people, no faces, no human silhouettes. No monitors, no projections, no charts, no documents.
Mood: quiet trust, stability, protection through architecture and light alone.
Hard constraints: zero human figures, no readable text, no logos, no watermarks, no screens. Premium empty-space advertising photography; suitable for dark indigo-purple gradient overlay.`,
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

  const argvFilter = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const jobsToRun =
    argvFilter.length > 0
      ? JOBS.filter((j) => argvFilter.includes(j.id))
      : JOBS;

  if (argvFilter.length > 0 && jobsToRun.length === 0) {
    console.error(
      `No jobs matched ${JSON.stringify(argvFilter)}. Valid ids: ${JOBS.map((j) => j.id).join(", ")}`
    );
    process.exit(1);
  }

  for (const job of jobsToRun) {
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
