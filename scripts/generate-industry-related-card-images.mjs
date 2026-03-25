/**
 * Generate "Explore Other Industries" card art (one per industry route) with Gemini.
 * Same visual bar as business-outcome / use-case card imagery (see generate-business-outcome-card-images.mjs).
 *
 * Usage:
 *   pnpm run generate:industry-related-cards
 *     → only writes when JPEG missing (use -- --all to regenerate all).
 *   pnpm run generate:industry-related-cards -- financial-services
 *     → single slug.
 *
 * Requires GEMINI_API_KEY in .env.local or env.
 * Outputs: public/images/industries/related-cards/{slug}.jpg
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

const SHARED = `Premium editorial illustration for an enterprise AI consulting website card—warm tech romanticism (see style anchor). ${CINEMATIC_STYLE_ANCHOR}

NON-NEGOTIABLE RECOGNITION: The image must read as THIS INDUSTRY within 2 seconds at thumbnail size. Use bold, iconic silhouettes and sector-specific objects rendered as illustration—not vague fog, generic clouds, or interchangeable abstract gradients. Pair atmosphere WITH unmistakable motifs.

BRAND: Innovoco cobalt/sapphire blues AND crimson/ruby accents must appear. NOT photorealistic people or faces. No readable text, numbers, tickers, brand marks, watermarks, or UI screenshots.

COMPOSITION: Wide 4:3, hero subject in upper/middle third so it survives a 16:10 crop.

LIGHTING & WORLD DIVERSITY (critical): Do NOT default to golden sunset over grass, meadows, pastures, or generic “pastoral” fields. That look is overused—explore varied environments freely: cool clinical interiors, overcast silver daylight, blue-hour city glass, moonlit snow or salt flats, deep ocean teal, desert midday minimalism, humid tropical bloom, foggy fjord, neon night, clean studio spotlight, noon cerulean sky, aurora curtains, rain on glass, underwater caustics, alpine mist, volcanic ash dawn. Warm sunset is allowed sparingly when it truly fits the brief—not as the automatic background for every card.`;

const CONTRAST_RECIPES = [
  "COLOR BALANCE: COOL-DOMINANT — cobalt/sapphire ~70%; crimson only as edge light, reflection, or small warm accent (not necessarily a sunset).",
  "COLOR BALANCE: WARM-DOMINANT — coral/crimson atmosphere forward; cool blue in shadows, glass, or distance.",
  "COLOR BALANCE: SPLIT FIELD — cool vs warm halves with soft blend—environment may be urban night, fog, or interior—not a field at dusk by default.",
  "COLOR BALANCE: MINIMAL AIR — generous negative space; subject reads huge; sky may be flat overcast, night, or studio—not only orange horizon.",
  "COLOR BALANCE: DENSE LAYERS — rich depth; crisp foreground silhouettes; setting can be factory night, storm coast, or jungle canopy light.",
  "COLOR BALANCE: DIAGONAL THRUST — strong diagonal motion; pair with weather or architecture that fits the industry.",
  "COLOR BALANCE: LUMINOUS BACKDROP — a bright band behind the subject from moonrise, lightning, aurora, stadium of spotlights, or breaking storm—not only sunset.",
];

const JOBS = [
  {
    id: "financial-services",
    filename: "financial-services.jpg",
    atmosphere: `SETTING & LIGHT: Cool marble atrium, night skyline through curtain wall, OR steel-blue overcast—avoid orange sunset over farmland or grass foreground.`,
    theme: `INDUSTRY: BANKING & CAPITAL MARKETS.

MUST SHOW at least THREE readable motifs: (1) Classical bank / courthouse columns OR a rounded vault door arc as large silhouette; (2) stacked coin discs OR bullion bars as pure cylinders/rectangles with NO numbers; (3) a flowing “liquidity ribbon” or marble steps suggesting wealth management.

OPTIONAL extras: abstract candlestick towers as simple vertical rounded rectangles (no chart grid), subtle keyhole or shield curve suggesting trust.

MOOD: authoritative, liquid light, precious-metal highlights with Innovoco blue shadows. Avoid generic landscapes without finance architecture.`,
  },
  {
    id: "healthcare",
    filename: "healthcare.jpg",
    atmosphere: `SETTING & LIGHT: Bright cath-lab / hospital corridor glow, abstract OR suite, OR macro biology floating in deep teal space—NEVER an outdoor graveyard, cemetery, rows of headstones, iron gates, religious cruciform in landscape, stone angels, or dusk pastoral crosses.`,
    theme: `INDUSTRY: HEALTHCARE & LIFE SCIENCES.

STRICT NEGATIVES: NO cemetery, tombstones, headstones, memorial rows, Latin crosses in grass, iron cemetery gates, gloomy burial dusk, or anything that reads as “graveyard.” If you use a “plus” symbol it must be a flat medical/pharmacy plus inside a rounded square or circle—never a tall cross silhouetted against sky.

MUST SHOW at least THREE readable motifs: (1) a bold ECG / heartbeat polyline as the hero—bright cyan or white on deep sapphire/teal (clinical, alive); (2) double-helix ribbon OR capsule/pill silhouettes OR petri-dish glow; (3) stethoscope curve OR abstract MRI radial rings.

OPTIONAL: soft microscope silhouette, bioluminescent cell dots—keep mood hopeful and clinical, not mournful.

MOOD: healing, modern medicine, sterile-warm—think “living heartbeat in a bright hospital future,” not memorial park.`,
  },
  {
    id: "manufacturing",
    filename: "manufacturing.jpg",
    atmosphere: `SETTING & LIGHT: Factory floor at night with welding sparks, sodium/blue mix, OR rainy industrial yard—avoid postcard sunset meadow.`,
    theme: `INDUSTRY: MANUFACTURING & INDUSTRY 4.0.

MUST SHOW at least THREE readable motifs: (1) interlocking gears OR a cog cluster as clear foreground silhouette; (2) parallel conveyor / production lines in perspective; (3) a robotic arm made of simple hinged segments OR welding arc sparks as bright crescents.

OPTIONAL: smokestack or factory roofline as distant silhouette, QC laser line.

MOOD: metal, torque, motion—industrial NOT office. Avoid mist-only compositions.`,
  },
  {
    id: "retail",
    filename: "retail.jpg",
    atmosphere: `SETTING & LIGHT: Boutique spotlights, mall atrium daylight, OR neon night storefront—interior retail energy, not wheat fields.`,
    theme: `INDUSTRY: RETAIL & E-COMMERCE.

MUST SHOW at least THREE readable motifs: (1) a wireframe shopping cart silhouette OR basket weave arc; (2) stacked shelf aisles OR a grid of product blocks (no labels); (3) a simple price-tag shape with a punched hole but NO numbers OR a storefront awning / window grid.

OPTIONAL: hanger arc, barcode as abstract vertical lines without digits, shopping bag outline (plain, no logo).

MOOD: merchandising, display lighting, bustling but elegant. Must feel like a store, not a meadow.`,
  },
  {
    id: "construction",
    filename: "construction.jpg",
    atmosphere: `SETTING & LIGHT: Urban jobsite, flat industrial sky (overcast grey, white haze, or clear blue)—NOT mountains, foothills, alpine ridges, grassy hills, meadows, pastures, or golden-hour sunset over nature.`,
    theme: `INDUSTRY: CONSTRUCTION & HOME SERVICES.

STRICT NEGATIVES: NO mountain ranges, peaks, scenic ridges, green rolling hills, grass foregrounds, fields, meadows, trees-on-hills postcard, or orange sunset behind landscape. This is urban/industrial build, not outdoor tourism.

MUST SHOW at least THREE readable motifs: (1) tower crane OR boom against a plain sky (city infill, not wilderness); (2) steel I-beam, rebar grid, OR concrete pour edge; (3) residential roofline / framed shell under construction OR ladder & scaffold suggestion for “home services.”

OPTIONAL: hard-hat curve, blueprint grid (no text), high-vis stripes, aggregate pile, curb & sidewalk—keep ground concrete/asphalt/dirt lot, not lawn.

MOOD: steel, dust, vertical build—jobsite energy with zero nature-calendar clichés.`,
  },
  {
    id: "energy-utilities",
    filename: "energy-utilities.jpg",
    atmosphere: `SETTING & LIGHT: Industrial energy corridor—flat desert, scrub, brownfield, or coastal flatland under clear or stormy sky. NOT scenic mountains, green hills, or pastoral sunset meadows.`,
    theme: `INDUSTRY: ENERGY & UTILITIES (POWER + GAS PIPELINE).

KEEP solar: include a clear solar panel array (checker grid, glinting cells)—do NOT remove or replace solar; it stays a hero element.

ADD pipelines: integrate large-diameter natural-gas transmission pipelines—above-ground pipe runs on supports, valve/meter station silhouettes, OR parallel pipelines snaking through the same landscape as the solar field (shared right-of-way / energy corridor feel). Pipelines read as cylindrical metal, flange hints, or buried trench line with markers—no company logos or text.

ALSO include at least ONE of: transmission tower lattice, wind turbine, power-line catenary, or substation silhouette—grid-scale mix.

OPTIONAL: lightning, cooling tower curve, hydro arc.

MOOD: integrated electricity + solar + gas transport infrastructure—one cohesive industrial landscape, not a nature postcard.`,
  },
  {
    id: "insurance",
    filename: "insurance.jpg",
    atmosphere: `SETTING & LIGHT: Urban/suburban abstract, rain on office window, soft studio void, OR grey overcast city roofline—NOT mountains, grass hills, meadows, or golden sunset over countryside.`,
    theme: `INDUSTRY: INSURANCE & PUBLIC ADJUSTERS.

STRICT NEGATIVES: NO mountain ranges, alpine scenery, green pastures, lawns in foreground, scenic sunset hills, or “national park” atmosphere. Protection metaphors belong in built environment or neutral space—not landscape photography clichés.

MUST SHOW at least THREE readable motifs: (1) open umbrella dome as dominant arc; (2) shield OR life-preserver overlapping simplified house roofline OR car silhouette (abstract, no logos); (3) layered translucent “coverage” shells.

OPTIONAL: umbrella ribs, rain streaks on glass, modest city block shapes in mist—claims / property / vehicle context without pastoral backdrop.

MOOD: safety and underwriting in the modern built world—umbrella or shield clearly dominant.`,
  },
  {
    id: "government",
    filename: "government.jpg",
    atmosphere: `SETTING & LIGHT: Civic architecture, grand but approachable—dawn or golden light on classical columns and domes, atmospheric mist in public spaces.`,
    theme: `INDUSTRY: GOVERNMENT & PUBLIC SECTOR.

MUST SHOW at least THREE readable motifs: (1) classical column or dome as civic architecture silhouette; (2) shield or protective barrier suggesting security and compliance; (3) interconnected pathways or bridges suggesting inter-agency collaboration and citizen services.

OPTIONAL: luminous data streams connecting buildings, scales of justice as abstract form, document/policy shapes flowing between structures.

MOOD: civic dignity, trust, transparency, and service—not surveillance, military, or dystopian control.`,
  },
].map((job, index) => ({
  ...job,
  prompt: `${SHARED}

${job.atmosphere}

${CONTRAST_RECIPES[index] ?? CONTRAST_RECIPES[index % CONTRAST_RECIPES.length]}

${job.theme}`,
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
  const outDir = path.join(root, "public", "images", "industries", "related-cards");
  fs.mkdirSync(outDir, { recursive: true });

  const args = process.argv.slice(2);
  const forceAll = args.includes("--all") || args.includes("--force");
  const argvFilter = args.filter((a) => !a.startsWith("-"));
  const jobsToRun =
    argvFilter.length > 0 ? JOBS.filter((j) => argvFilter.includes(j.id)) : JOBS;

  if (argvFilter.length > 0 && jobsToRun.length === 0) {
    console.error(`No jobs matched. Valid ids: ${JOBS.map((j) => j.id).join(", ")}`);
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
