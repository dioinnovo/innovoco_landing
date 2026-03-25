/**
 * Generate business-outcome card images (12) with Gemini gemini-3.1-flash-image-preview.
 *
 * Usage:
 *   pnpm run generate:outcome-cards
 *     → only writes a card JPEG when that file is missing (`pnpm run generate:outcome-cards -- --all` to regenerate all).
 *
 * Requires GEMINI_API_KEY in .env.local or env.
 * Outputs: public/images/case-studies/outcomes/*.jpg
 *
 * Contrast strategy: `CONTRAST_RECIPES` (one per card, in JOBS order) forces variety in
 * temperature balance, composition, density, and motion so the grid is cohesive but not
 * interchangeable. After changing recipes, regenerate affected cards with `-- --all` or by id.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { CINEMATIC_STYLE_ANCHOR } from "./ai-art-style-anchor.mjs";
// Entity extraction removed — model interprets text context directly

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.1-flash-image-preview";

/** Brand guardrails only—per-card contrast is what stops the grid from looking identical. */
const SHARED = `Premium editorial illustration for an enterprise AI consulting website—warm, aspirational tech romanticism; never cold corporate minimalism or dark dystopian futurism.
${CINEMATIC_STYLE_ANCHOR}
Color palette: Use the Innovoco brand range (cobalt, sapphire, indigo, violet, rose, amber, gold) but let the subject matter guide the dominant palette. NOT every image needs red or crimson — cool blues, warm ambers, soft teals, or muted neutrals are all valid depending on what the topic calls for. Aim for variety across the grid. NOT photorealistic people. No readable text, no logos, no watermarks, no UI screenshots. Abstract, sophisticated, inviting.`;

/**
 * Each card gets a distinct visual strategy so the library grid has variety, not one harmonious template repeated.
 * Intentionally rotate: temperature dominance, composition, density, symmetry, and motion axis.
 * Wording avoids "void" / "dark base" so the model does not default to grim palettes.
 */
/**
 * Composition recipes — focus on LAYOUT and MOOD, not color dominance.
 * No single color should overtake the entire image. Brand colors (cobalt, crimson, violet, amber)
 * should appear as accents and highlights, never as a monochrome wash.
 * The subject matter and domain should drive the primary palette.
 */
const CONTRAST_RECIPES = [
  "COMPOSITION: Vertical stratification — focal weight in the upper third, depth receding downward. Use a balanced mix of warm and cool tones.",
  "COMPOSITION: Horizontal calm — wide, panoramic feel with subjects spread across the frame. Natural, balanced color palette driven by the subject matter.",
  "COMPOSITION: Split field — distinct left and right zones with a soft blend at center. Each side can have different color temperature but neither should dominate entirely.",
  "COMPOSITION: Generous negative space — at least half the frame is atmospheric (sky, mist, light). One clear focal subject. Airy and open.",
  "COMPOSITION: Rich layered depth — overlapping translucent planes, panoramic fullness. Lit like golden hour or foggy morning. Multiple depth levels.",
  "COMPOSITION: Diagonal energy — strongest motion along a clear diagonal. Asymmetric, uplifting momentum.",
  "COMPOSITION: Corner focus — one concentrated bright area in a corner drawing the eye. Remainder is softer and more atmospheric.",
  "COMPOSITION: Central band — a luminous horizontal band across the middle third. Softer above and below. Dawn or dusk feeling.",
  "COMPOSITION: Directional flow — energy radiates from one edge inward. Clear direction and movement.",
  "COMPOSITION: Soft and crisp — matte, frosted quality with low saturation overall but one or two sharp accent colors. Elegant restraint.",
  "COMPOSITION: Organic curves — flowing forms dominate. Almost no straight lines or rigid grids. Soft, biological, natural.",
  "COMPOSITION: Architectural structure — subtle geometric framework (beams, platforms, pathways). Organized but warm, not cold or clinical.",
];

/**
 * Build outcome card theme from title + outcome text.
 * The model reads the text and interprets it visually — no entity extraction.
 */
function buildThemeFromContent(title, outcome) {
  return `This image represents: "${title} — ${outcome}"

Include recognizable elements from this domain rendered artistically — the viewer should know what industry and topic this is at a glance. Balance: enough domain detail to be specific, enough artistry to be sublime. Not a literal depiction, not pure abstraction. 4:3 composition. No text labels.`;
}

/**
 * Load use case entries from case-studies-page-content.ts and build JOBS automatically.
 * Reads the content registry and extracts visual entities from title + outcome.
 */
function loadJobsFromContent() {
  const contentPath = path.join(root, "lib", "content", "case-studies-page-content.ts");
  const src = fs.readFileSync(contentPath, "utf-8");

  const entries = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?outcome:\s*\n?\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const [, slug, title, outcome, imagePath] = m;
    const filename = imagePath.split("/").pop();
    entries.push({
      id: slug,
      filename,
      theme: buildThemeFromContent(title, outcome),
    });
  }
  return entries;
}

const autoJobs = loadJobsFromContent();
console.log(`Loaded ${autoJobs.length} outcome card jobs from content registry.`);

const JOBS = autoJobs.map((job, index) => ({
  ...job,
  prompt: `${SHARED}

${CONTRAST_RECIPES[index % CONTRAST_RECIPES.length]}

Theme: ${job.theme}`,
}));

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
          aspectRatio: "4:3",
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
  const outDir = path.join(root, "public", "images", "case-studies", "outcomes");
  fs.mkdirSync(outDir, { recursive: true });

  const args = process.argv.slice(2);
  const forceAll = args.includes("--all") || args.includes("--force");
  const argvFilter = args.filter((a) => !a.startsWith("-"));
  const jobsToRun =
    argvFilter.length > 0 ? JOBS.filter((j) => argvFilter.includes(j.id)) : JOBS;

  if (argvFilter.length > 0 && jobsToRun.length === 0) {
    console.error(
      `No jobs matched. Valid ids: ${JOBS.map((j) => j.id).join(", ")}`
    );
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
    const outPath = path.join(outDir, job.filename);
    if (!forceAll && fs.existsSync(outPath)) {
      console.log(`Skip (exists): ${outPath}`);
      skipped++;
      continue;
    }
    console.log(`Generating ${job.id}…`);
    const { data, mimeType } = await generateImage(job.prompt);
    await sharp(data)
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(outPath);
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
