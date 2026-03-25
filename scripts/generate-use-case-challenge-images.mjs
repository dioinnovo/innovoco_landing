/**
 * Generate "The challenge" section art (1:1) per use-case slug with Gemini
 * gemini-3.1-flash-image-preview — problem/tension metaphors, not solutions.
 *
 * Usage:
 *   pnpm run generate:use-case-challenges
 *     → only writes challenge/{slug}.jpg when that file is missing (saves API cost).
 *   pnpm run generate:use-case-challenges -- --all
 *     → regenerate every slug (use after prompt/brand updates). Use `--` so pnpm forwards flags.
 *   pnpm run generate:use-case-challenges executive-self-serve-analytics
 *     → that slug only (still skips if file exists unless `-- --all`).
 *
 * Requires GEMINI_API_KEY in .env.local or env.
 * Outputs: public/images/case-studies/use-cases/challenge/{slug}.jpg
 *
 * Parallelism: one API call per slug. Often run alongside `generate-use-case-story-images.mjs --parallel`
 * for the same slug (≈6 concurrent Gemini image calls total — see story script header for planning).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { CINEMATIC_STYLE_ANCHOR } from "./ai-art-style-anchor.mjs";
import { buildChallengePromptFromNarrative } from "./use-case-story-prompts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.1-flash-image-preview";

const SHARED = `Premium editorial illustration for an enterprise AI case study "challenge" section — convey FRICTION, bottlenecks, fragmentation, or risk as abstract metaphor only (obstacles as weather, fog, distance, or crossed paths—not horror, doom, or neon dystopia).
${CINEMATIC_STYLE_ANCHOR}
Tension should still feel human and surmountable: soft storm light, mist obscuring a route, or cool-vs-warm air—not a void or apocalypse. Innovoco blues and crimson as sky vs horizon, not flat UI slabs. Optional faint grid or glass ribbons. Square 1:1. NOT photorealistic people. No readable text, no logos, no watermarks, no UI screenshots, no brand names.

IMPORTANT — SEMANTIC GROUNDING: The illustration MUST include recognizable domain-specific silhouettes or abstract forms that visually represent the industry and challenge topic. Pure landscapes without domain context are NOT acceptable. Include stylized versions of industry objects (equipment, tools, documents, flows) rendered as painterly silhouettes integrated into the atmospheric scene. The viewer should immediately understand what DOMAIN and PROBLEM this image represents.`;

// All manual overrides removed — every slug uses auto-generated prompts from narrative content
const JOBS = [];

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
          aspectRatio: "1:1",
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
    console.error("Missing GEMINI_API_KEY. Set it in .env.local or the environment.");
    process.exit(1);
  }

  const sharp = (await import("sharp")).default;
  const outDir = path.join(root, "public", "images", "case-studies", "use-cases", "challenge");
  fs.mkdirSync(outDir, { recursive: true });

  // Load narratives for auto-prompt generation (same parser as story script)
  const effectiveJobs = [...JOBS];
  const manualSlugs = new Set(JOBS.map((j) => j.slug));
  try {
    const detailsPath = path.join(root, "lib", "content", "use-case-study-details.tsx");
    const detailsSrc = fs.readFileSync(detailsPath, "utf-8");
    const slugMatches = [...detailsSrc.matchAll(/"([a-z][\w-]*)"\s*:\s*\{/g)].map((m) => m[1]);
    for (const slug of slugMatches) {
      if (manualSlugs.has(slug)) continue;
      const startIdx = detailsSrc.indexOf(`"${slug}": {`);
      if (startIdx === -1) continue;
      const pattern = /challenge:\s*"([^"]*(?:\\.[^"]*)*)"/s;
      const sub = detailsSrc.slice(startIdx, startIdx + 3000);
      const m = sub.match(pattern);
      if (m) {
        const challenge = m[1].replace(/\\"/g, '"').replace(/\\n/g, " ");
        effectiveJobs.push({
          slug,
          prompt: buildChallengePromptFromNarrative({ challenge }),
        });
        console.log(`  Auto-generated challenge prompt for: ${slug}`);
      }
    }
    console.log(`Total challenge jobs: ${effectiveJobs.length} (${JOBS.length} manual + ${effectiveJobs.length - JOBS.length} auto)`);
  } catch (err) {
    console.warn(`Could not load narratives (auto-prompts disabled): ${err.message}`);
  }

  const args = process.argv.slice(2);
  const forceAll = args.includes("--all") || args.includes("--force");
  const argvFilter = args.filter((a) => !a.startsWith("-"));
  const jobsToRun =
    argvFilter.length > 0 ? effectiveJobs.filter((j) => argvFilter.includes(j.slug)) : effectiveJobs;

  if (argvFilter.length > 0 && jobsToRun.length === 0) {
    console.error(`No jobs matched. Valid slugs:\n${effectiveJobs.map((j) => j.slug).join("\n")}`);
    process.exit(1);
  }

  console.log(
    forceAll
      ? "Mode: --all — regenerating every selected output."
      : "Mode: missing files only — existing JPEGs are skipped. Use --all to regenerate."
  );

  let generated = 0;
  let skipped = 0;

  for (const job of jobsToRun) {
    const outPath = path.join(outDir, `${job.slug}.jpg`);
    if (!forceAll && fs.existsSync(outPath)) {
      console.log(`Skip (exists): ${outPath}`);
      skipped++;
      continue;
    }
    console.log(`Generating challenge art: ${job.slug}…`);
    const { data, mimeType } = await generateImage(job.prompt);
    await sharp(data).jpeg({ quality: 86, mozjpeg: true }).toFile(outPath);
    console.log(`Wrote ${outPath} (from ${mimeType})`);
    generated++;
    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log(`Done. Generated: ${generated}, skipped (already present): ${skipped}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
