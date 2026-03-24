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

const JOBS = [
  {
    slug: "executive-self-serve-analytics",
    prompt: `${SHARED}
Theme: analytics bottleneck — queues and waiting, static dashboards vs hunger for answers, diverging light paths that meet a barrier, glass panels slightly misaligned, cerebral tension (still atmospheric, not grim).`,
  },
  {
    slug: "customer-support-voice",
    prompt: `${SHARED}
Theme: customer support strain — tangled pathways, brittle automation as fragile threads, rising call pressure as abstract waves, empathy vs overload as color tension, no faces.`,
  },
  {
    slug: "regulated-onboarding-kyc-aml",
    prompt: `${SHARED}
Theme: compliance onboarding gridlock — stacks of abstract sealed forms without text, friction between speed and scrutiny, vault-like curves, muted alarm amber, orderly but stuck.`,
  },
  {
    slug: "supply-chain-demand",
    prompt: `${SHARED}
Theme: supply chain uncertainty — broken rhythm between forecast and execution, abstract nodes drifting apart, timeline gaps as empty bands, motion interrupted mid-flow.`,
  },
  {
    slug: "field-services-iot-playbooks",
    prompt: `${SHARED}
Theme: field operations chaos — scattered signals, disconnected wrench-like geometry (abstract only), work orders as floating shards not documents, maintenance backlog as cooler receding weight, not horror darkness.`,
  },
  {
    slug: "finance-close-reconciliation",
    prompt: `${SHARED}
Theme: month-end reconciliation drag — mismatched abstract ledgers as offset bands, exceptions piling as stacked shapes, clock pressure as subtle radial tension, slate and emerald.`,
  },
  {
    slug: "hr-onboarding-policy",
    prompt: `${SHARED}
Theme: onboarding handoff chaos — diverging paths between HR, IT, facilities as split ribbons, waiting and gaps, warm human tone vs bureaucratic cool, abstract only.`,
  },
  {
    slug: "marketing-personalization",
    prompt: `${SHARED}
Theme: personalization vs control — fractured audience mosaic, brand risk as sharp contrast edges, experiment chaos without data discipline, dynamic but uneasy composition.`,
  },
  {
    slug: "reporting-audit-packs",
    prompt: `${SHARED}
Theme: reporting time pressure — layers that do not quite align, provenance fog as mist between sheets (no text), uncertainty as soft cool spotlight, not alarmist.`,
  },
  {
    slug: "governed-knowledge-copilot",
    prompt: `${SHARED}
Theme: knowledge silos and unsanctioned workarounds — walled gardens of light, blocked connections, answers behind abstract barriers, temptation of shortcuts as a risky warm edge (not evil, just human).`,
  },
  {
    slug: "healthcare-capacity-clinical-ops",
    prompt: `${SHARED}
Theme: capacity strain before the cliff — rising demand curves as soft waves, staffing gaps as negative space, supplies and time pressure, clinical blues and urgent coral hints, abstract.`,
  },
  {
    slug: "global-payroll-pay-compliance",
    prompt: `${SHARED}
Theme: global payroll complexity — meridian arcs in conflict, jurisdiction friction as intersecting grids (no flags), calculation anxiety as subtle vibration, navy and gold tension.`,
  },
  {
    slug: "predictive-maintenance-manufacturing",
    prompt: `${SHARED}
Theme: equipment failure looming on a factory floor. MUST INCLUDE: massive interlocking gear and press silhouettes showing visible stress — hairline fracture lines glowing amber/red at stress points, vibration distortion waves radiating outward from a failing bearing or shaft. A faded clock or countdown element suggesting time running out. Scattered, disconnected maintenance tools (wrench silhouettes, clipboards) suggesting reactive chaos. The production line is interrupted — a gap in the conveyor flow. Steel blue machinery going amber-red at failure points. Atmospheric factory mist. Tension, but surmountable.`,
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

  const args = process.argv.slice(2);
  const forceAll = args.includes("--all") || args.includes("--force");
  const argvFilter = args.filter((a) => !a.startsWith("-"));
  const jobsToRun =
    argvFilter.length > 0 ? JOBS.filter((j) => argvFilter.includes(j.slug)) : JOBS;

  if (argvFilter.length > 0 && jobsToRun.length === 0) {
    console.error(`No jobs matched. Valid slugs:\n${JOBS.map((j) => j.slug).join("\n")}`);
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
