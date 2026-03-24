/**
 * Generate distinct story art per use-case slug:
 *   phases:   public/images/case-studies/use-cases/phases/{slug}-p1.jpg, -p2.jpg  (1:1)
 *   story:    public/images/case-studies/use-cases/story/{slug}-implementations.jpg (1:1)
 *             public/images/case-studies/use-cases/story/{slug}-technical.jpg       (4:3)
 *             public/images/case-studies/use-cases/story/{slug}-impact.jpg          (4:3)
 *
 * Usage:
 *   pnpm run generate:use-case-story
 *     → only generates each output file if that path is missing (per-file; saves API cost).
 *   pnpm run generate:use-case-story -- --all
 *     → regenerate all phases + story images for every slug.
 *   pnpm run generate:use-case-story new-use-case-slug
 *     → that slug only (still skips existing files unless --all).
 *   pnpm run generate:use-case-story -- --all --only=phases,implementations slug
 *     → only Phase 1..N tiles + key implementations image (skip technical & impact).
 *     Comma list: phases | implementations | technical | impact
 *   pnpm run generate:use-case-story -- --all --parallel slug
 *     → run all selected Gemini calls for that slug concurrently (faster; may hit rate limits).
 *
 * Parallelism & planning (heuristic — depends on API quota):
 *   • `--parallel` for one slug = up to 5 concurrent image calls (2 phases + implementations + technical + impact).
 *   • Running challenge + story `--parallel` in two shell processes ≈ 6 concurrent calls total; validated OK in practice.
 *   • Full refresh of all 12 use cases: prefer sequential slugs, or parallel with small concurrency if you see 429/errors.
 *   • Default (no `--parallel`) stays sequential with a short delay between requests — safest for tight quotas.
 *
 * Requires GEMINI_API_KEY. Prompts: scripts/use-case-story-prompts.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { STORY_PROMPTS_BY_SLUG } from "./use-case-story-prompts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.1-flash-image-preview";

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
    console.error("Missing GEMINI_API_KEY. Set it in .env.local or the environment.");
    process.exit(1);
  }

  const sharp = (await import("sharp")).default;
  const phasesDir = path.join(root, "public", "images", "case-studies", "use-cases", "phases");
  const storyDir = path.join(root, "public", "images", "case-studies", "use-cases", "story");
  fs.mkdirSync(phasesDir, { recursive: true });
  fs.mkdirSync(storyDir, { recursive: true });

  const args = process.argv.slice(2);
  const forceAll = args.includes("--all") || args.includes("--force");
  const parallel = args.includes("--parallel") || args.includes("-p");
  const onlyArg = args.find((a) => a.startsWith("--only="));
  /** @type {Set<string> | null} */
  let onlySet = null;
  if (onlyArg) {
    const parts = onlyArg
      .slice("--only=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const allowed = new Set(["phases", "implementations", "technical", "impact"]);
    for (const p of parts) {
      if (!allowed.has(p)) {
        console.error(
          `Invalid --only segment "${p}". Use one or more of: phases, implementations, technical, impact`
        );
        process.exit(1);
      }
    }
    onlySet = new Set(parts);
  }
  const runPhases = !onlySet || onlySet.has("phases");
  const runImplementations = !onlySet || onlySet.has("implementations");
  const runTechnical = !onlySet || onlySet.has("technical");
  const runImpact = !onlySet || onlySet.has("impact");

  const argvFilter = args.filter((a) => !a.startsWith("-"));
  const slugs = Object.keys(STORY_PROMPTS_BY_SLUG);
  const slugsToRun = argvFilter.length > 0 ? slugs.filter((s) => argvFilter.includes(s)) : slugs;

  if (argvFilter.length > 0 && slugsToRun.length === 0) {
    console.error(`No slugs matched. Valid:\n${slugs.join("\n")}`);
    process.exit(1);
  }

  console.log(
    forceAll
      ? "Mode: --all — regenerating every selected output file."
      : "Mode: missing files only — existing JPEGs are skipped. Use --all to regenerate."
  );
  if (onlySet) {
    console.log(`Scope: --only=${[...onlySet].join(",")} (other story outputs skipped).`);
  }
  if (parallel) {
    console.log("Mode: --parallel — API calls per slug run concurrently (no inter-request delay).");
  }

  let generated = 0;
  let skipped = 0;

  for (const slug of slugsToRun) {
    const data = STORY_PROMPTS_BY_SLUG[slug];
    if (!data) continue;

    /** @type {{ outPath: string; prompt: string; aspect: string }[]} */
    const tasks = [];

    if (runPhases) {
      for (let i = 0; i < data.phases.length; i++) {
        const outPath = path.join(phasesDir, `${slug}-p${i + 1}.jpg`);
        if (!forceAll && fs.existsSync(outPath)) {
          console.log(`Skip (exists): ${outPath}`);
          skipped++;
          continue;
        }
        tasks.push({ outPath, prompt: data.phases[i], aspect: "1:1" });
      }
    }

    const storyJobs = [
      { kind: "implementations", aspect: "1:1", prompt: data.implementations, run: runImplementations },
      { kind: "technical", aspect: "4:3", prompt: data.technical, run: runTechnical },
      { kind: "impact", aspect: "4:3", prompt: data.impact, run: runImpact },
    ];
    for (const { kind, aspect, prompt, run } of storyJobs) {
      if (!run) continue;
      const outPath = path.join(storyDir, `${slug}-${kind}.jpg`);
      if (!forceAll && fs.existsSync(outPath)) {
        console.log(`Skip (exists): ${outPath}`);
        skipped++;
        continue;
      }
      tasks.push({ outPath, prompt, aspect });
    }

    if (tasks.length === 0) {
      continue;
    }

    if (parallel) {
      await Promise.all(
        tasks.map(async ({ outPath, prompt: p, aspect }) => {
          console.log(`Generating ${outPath}…`);
          const { data: buf, mimeType } = await generateImage(p, aspect);
          await sharp(buf).jpeg({ quality: 86, mozjpeg: true }).toFile(outPath);
          console.log(`  wrote ${outPath} (${mimeType})`);
        })
      );
      generated += tasks.length;
    } else {
      for (const { outPath, prompt: p, aspect } of tasks) {
        console.log(`Generating ${outPath}…`);
        const { data: buf, mimeType } = await generateImage(p, aspect);
        await sharp(buf).jpeg({ quality: 86, mozjpeg: true }).toFile(outPath);
        console.log(`  wrote (${mimeType})`);
        generated++;
        await new Promise((r) => setTimeout(r, 1200));
      }
    }
  }

  console.log(`Done. Generated: ${generated}, skipped (already present): ${skipped}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
