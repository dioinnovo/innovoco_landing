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
Innovoco brand colors must appear: cobalt/sapphire blues AND crimson/ruby reds (plus violet where they meet)—HOW you balance them changes every image (see contrast recipe below). NOT photorealistic people. No readable text, no logos, no watermarks, no UI screenshots. Abstract, sophisticated, inviting.`;

/**
 * Each card gets a distinct visual strategy so the library grid has variety, not one harmonious template repeated.
 * Intentionally rotate: temperature dominance, composition, density, symmetry, and motion axis.
 * Wording avoids "void" / "dark base" so the model does not default to grim palettes.
 */
const CONTRAST_RECIPES = [
  "CONTRAST RECIPE (this card): COOL-DOMINANT — cobalt and sapphire occupy ~70% of the frame; crimson only as horizon flare or warm edge accents. Keep a touch of warmth (peach sky or soft green hint) so it still feels inviting. Vertical stratification; focal weight in upper third.",
  "CONTRAST RECIPE (this card): WARM-DOMINANT — rose, coral, and crimson atmosphere forward; blues only as cool sky rim or distant air. Welcoming diffusion; horizontal calm. Must read warmer than the purely blue cards.",
  "CONTRAST RECIPE (this card): SPLIT FIELD — readable left-vs-right: cooler blue volume on one side, warmer red–violet on the other, soft blend at the seam. Landscape-like depth, not flat UI.",
  "CONTRAST RECIPE (this card): MINIMAL AIR — at least half the frame soft sky, mist, or pale atmosphere; one bold abstract form low or off-center. Airy negative space; NOT black empty void.",
  "CONTRAST RECIPE (this card): DENSE LAYERS — many overlapping translucent planes, rich depth, panoramic fullness; still lit like golden hour or foggy morning, not oppressive night.",
  "CONTRAST RECIPE (this card): DIAGONAL THRUST — strongest motion along a clear diagonal (e.g. top-left → bottom-right); asymmetric, uplifting energy.",
  "CONTRAST RECIPE (this card): CORNER SPARK — one concentrated crimson–amber cluster in a corner; remainder soft blue depth and misty recession, not pitch darkness.",
  "CONTRAST RECIPE (this card): HORIZON BAND — wide luminous band across the middle third (dawn/dusk); soft twilight above and below—abstract landscape rhythm without literal scenery.",
  "CONTRAST RECIPE (this card): SIDEWARD FAN — energy radiates from one vertical edge inward; directional, hopeful, not radial from a black center.",
  "CONTRAST RECIPE (this card): FROSTED LIGHT — matte glass panels over a soft warm gradient (cream, blush, or pale gold); low saturation except one sharp red or rose line. Crisp but not clinical.",
  "CONTRAST RECIPE (this card): ORGANIC FLOW — curves and liquid ribbons dominate; almost no straight lines or grids. Landscape-inspired, soft, biological.",
  "CONTRAST RECIPE (this card): STRUCTURED GRID — subtle beams or steps; keep ambient warmth (sky glow or sage mist) so it feels human, not cold control-room.",
];

/**
 * Build outcome card theme from title + outcome text.
 * The model reads the text and interprets it visually — no entity extraction.
 */
function buildThemeFromContent(title, outcome) {
  return `This image represents: "${title} — ${outcome}"

Read that description and create a visual interpretation that captures the essence of this solution. 4:3 composition. No text labels.`;
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
