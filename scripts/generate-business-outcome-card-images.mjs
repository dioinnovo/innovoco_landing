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

const JOBS = [
  {
    id: "executive-analytics",
    filename: "executive-analytics.jpg",
    theme: `executive data intelligence—abstract flowing ribbons of light suggesting natural-language queries over a data warehouse, floating geometric glass panels, depth and atmosphere, wide 4:3 composition.`,
  },
  {
    id: "customer-support",
    filename: "customer-support.jpg",
    theme: `customer experience and voice support—abstract sound waves merging with soft chat bubbles as pure shapes, headset suggested as minimal line art only, warm helpful mood, 4:3.`,
  },
  {
    id: "regulated-onboarding",
    filename: "regulated-onboarding.jpg",
    theme: `trust and compliance for financial onboarding—abstract shield motif, layered parchment-like textures without letters, vault-door curves as abstract geometry, serious but modern, 4:3.`,
  },
  {
    id: "supply-chain",
    filename: "supply-chain.jpg",
    theme: `supply chain and logistics—abstract network nodes and routes, cargo motion as streaks of color, warehouse depth as blurred architectural forms, no trucks with logos, 4:3.`,
  },
  {
    id: "field-services",
    filename: "field-services.jpg",
    theme: `field operations and IoT—abstract sensor pulses, gear-like circles as pure shapes, maintenance energy as copper and teal light, industrial poetry not literal workers, 4:3.`,
  },
  {
    id: "finance-reconciliation",
    filename: "finance-reconciliation.jpg",
    theme: `finance and reconciliation—abstract balance scales as minimalist sculpture, ledger rhythm as horizontal bands of tone (no numbers), emerald and slate mood, 4:3.`,
  },
  {
    id: "hr-onboarding",
    filename: "hr-onboarding.jpg",
    theme: `people operations and onboarding—abstract connected silhouettes as blurred shapes only, growth arcs, welcoming gradient sunrise feel, inclusive and calm, 4:3.`,
  },
  {
    id: "marketing-personalization",
    filename: "marketing-personalization.jpg",
    theme: `marketing personalization—abstract mosaic of color tiles suggesting segments, megaphone as pure geometric form, dynamic but elegant, 4:3.`,
  },
  {
    id: "reporting-audit",
    filename: "reporting-audit.jpg",
    theme: `reporting and audit readiness—abstract stacked translucent layers suggesting documents without text, seal of quality as circular glow, authoritative calm, 4:3.`,
  },
  {
    id: "knowledge-copilot",
    filename: "knowledge-copilot.jpg",
    theme: `enterprise knowledge and governed RAG—abstract open book as pure geometry, threads of light connecting floating document shards (no text), trust and discoverability, teal and indigo, 4:3.`,
  },
  {
    id: "healthcare-ops",
    filename: "healthcare-ops.jpg",
    theme: `healthcare operations and care delivery rhythm—abstract pulse line as soft wave, cross shapes suggesting care without medical logos, calm clinical blues and mint, 4:3.`,
  },
  {
    id: "global-payroll",
    filename: "global-payroll.jpg",
    theme: `global workforce and payroll compliance—abstract meridian arcs suggesting time zones, soft coin-circle shapes without currency symbols, navy and gold accents, 4:3.`,
  },
  {
    id: "predictive-maintenance-manufacturing",
    filename: "predictive-maintenance-manufacturing.jpg",
    theme: `predictive maintenance and equipment health—abstract industrial gear forms with pulsing health signals, vibration waveforms settling into recognized patterns, amber warmth on steel, reliability as solid foundation, 4:3.`,
  },
].map((job, index) => ({
  ...job,
  prompt: `${SHARED}

${CONTRAST_RECIPES[index] ?? CONTRAST_RECIPES[index % CONTRAST_RECIPES.length]}

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
