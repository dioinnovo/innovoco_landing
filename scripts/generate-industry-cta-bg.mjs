/**
 * Generate industry-specific CTA background images for the prioritization workshop section.
 *
 * Usage:
 *   pnpm run generate:industry-cta-bg                     → generate all missing
 *   pnpm run generate:industry-cta-bg -- manufacturing    → generate one by id
 *   pnpm run generate:industry-cta-bg -- --all            → regenerate all
 *
 * Requires GEMINI_API_KEY in .env.local or env.
 * Outputs: public/images/industries/{id}/cta-prioritization-bg.jpg
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

const SHARED_STYLE = `
${CINEMATIC_STYLE_ANCHOR}

ADDITIONAL STYLE LAYER — Makoto Shinkai-inspired romantic realism:
Volumetric crepuscular rays, hyper-detailed cloud edges with visible internal
luminosity, atmospheric perspective with sharp foreground wisps dissolving
into luminous haze. Color temperature split: warm golden/crimson light source
meeting cooler sapphire/violet twilight. Rich painterly texture, not photographic.

COMPOSITION: Ultra-wide panoramic (21:9 aspect ratio). Center of frame slightly
darker and more atmospheric (text will overlay here) — avoid pure white blowouts
in the center band. The overall palette must feel hopeful, not threatening.

CONSTRAINTS: No readable text, no logos, no watermarks, no UI elements, no people.
Premium editorial illustration quality.
`.trim();

const JOBS = [
  {
    id: "manufacturing",
    metaphor: `INDUSTRY METAPHOR — Manufacturing & Industry 4.0:
Abstract industrial landscape at golden hour. Massive silhouetted gear forms and
interlocking mechanical structures rise from the lower third like a stylized factory
skyline — rendered as romantic painterly shapes, NOT photorealistic machinery.
Warm amber light streams through the gaps between gear teeth, casting volumetric
rays across layers of atmospheric mist. The gears transition upward into flowing
organic forms — precision giving way to possibility. Cobalt and steel-blue shadows
in the mechanical forms, crimson and gold where light catches edges. Subtle sparks
or luminous particles drift upward like fireflies, suggesting transformation and
energy. The upper sky is vast and open — layered clouds with Shinkai-like internal
glow, representing clarity above the complexity of the factory floor.
NOT literal factories, NOT smokestacks, NOT dark/grim industrial scenes.`,
  },
  {
    id: "construction",
    metaphor: `INDUSTRY METAPHOR — Construction & Field Services:
Abstract construction landscape at dawn. Towering crane-like geometric forms and
steel I-beam silhouettes rise from morning mist in the lower third — rendered as
romantic painterly shapes, NOT photorealistic equipment. Golden sunrise light pours
through the lattice of a stylized crane boom, casting long volumetric rays across
layered fog. Scattered blueprint-like geometric fragments float in the mid-ground,
dissolving upward into organic cloud forms. The composition evokes building upward —
vertical thrust from structured forms below into open possibility above.
Cobalt shadows in the steel forms, warm amber and rose where dawn catches edges.
Fine dust particles catch the light like golden motes. Upper sky: vast Shinkai-style
layered clouds with internal luminosity.
NOT literal construction sites, NOT hard hats, NOT rubble or demolition.`,
  },
  {
    id: "healthcare",
    metaphor: `INDUSTRY METAPHOR — Healthcare & Life Sciences:
Abstract biomedical landscape at twilight. A stylized double-helix structure rises
from the lower third, its strands rendered as flowing luminous ribbons of light —
one warm rose-gold, one cool sapphire — intertwining upward. The helix dissolves
at its top into organic cloud forms, suggesting life and growth. Around the base,
soft ECG-like waveforms ripple through atmospheric mist as abstract light patterns.
Scattered luminous orbs (suggesting cells or molecules) drift through the scene
with warm inner glow. The palette balances clinical precision (cool blues, clean
whites) with human warmth (rose, amber). Crepuscular rays pierce through gaps
in layered clouds above, illuminating the helix structure.
NOT literal hospitals, NOT medical equipment, NOT patients or doctors.`,
  },
  {
    id: "energy-utilities",
    metaphor: `INDUSTRY METAPHOR — Energy & Utilities:
Abstract energy landscape at golden hour. Stylized transmission tower lattice
forms and wind turbine silhouettes rise from rolling terrain in the lower third —
rendered as romantic painterly shapes, NOT photorealistic infrastructure. Dramatic
crepuscular rays stream between the tower forms, casting long beams across layers
of valley mist. Flowing energy ribbons (abstract, luminous) arc between the
structures like visible current. In the distance, a horizon band of warm amber
light suggests both sunrise and the flow of power. The upper sky features dramatic
Shinkai-style cumulus with cobalt shadows and rose-gold lit edges.
Subtle aurora-like green and violet bands in the upper atmosphere suggest
renewable energy and the northern grid. Scale is vast and panoramic.
NOT literal power plants, NOT coal/oil imagery, NOT dark or polluted.`,
  },
  {
    id: "insurance",
    metaphor: `INDUSTRY METAPHOR — Insurance & Risk:
Abstract protective landscape at dawn. A vast stylized shield or dome form made
of overlapping translucent layers arcs across the lower-center of the frame —
rendered as luminous, layered glass-like planes with soft cobalt and violet tones.
Golden dawn light streams over and through the layered shield, creating warm
refractions and prismatic edges. Below the shield, calm misty terrain suggests
protected territory. Above, dramatic weather — towering cumulus clouds with
Shinkai-style internal luminosity — represents the risks being managed.
The contrast: turbulent sky above, serene protected space below, with the
translucent shield as the boundary. Warm amber and rose where light penetrates,
cool sapphire in the shadow regions.
NOT literal umbrellas, NOT disaster scenes, NOT threatening or dark.`,
  },
  {
    id: "retail",
    metaphor: `INDUSTRY METAPHOR — Retail & Commerce:
Abstract commercial landscape at evening golden hour. Stylized storefront
archways and display-window forms create a luminous corridor receding into
atmospheric depth — rendered as romantic painterly shapes with warm interior
glow, NOT photorealistic shops. Light streams outward from the archways,
casting warm amber rays into cool evening mist. Flowing ribbon-like forms
(suggesting customer journeys, data streams) weave between the structures
in luminous paths. Scattered prismatic light fragments (suggesting
personalization, discovery) catch and refract the golden light. The palette
is warm and inviting: amber, rose-gold, and soft coral in the lit areas,
cool indigo and sapphire in the evening sky. Upper sky: Shinkai-style
clouds with warm underbelly glow from the commercial light below.
NOT literal shopping malls, NOT product displays, NOT crowds.`,
  },
  {
    id: "financial-services",
    metaphor: `INDUSTRY METAPHOR — Financial Services & Banking:
Abstract financial landscape at dawn. Stylized classical column forms and
vault-like geometric structures rise from morning mist — rendered as romantic
painterly shapes with stone-like texture, NOT photorealistic buildings.
Golden sunrise light illuminates the columns from behind, casting long
volumetric rays through the structured forms. Abstract flowing liquidity
ribbons (luminous, translucent) stream between and around the columns,
suggesting capital flow and market movement. The columns transition upward
from rigid geometry into softer organic forms — structure giving way to
growth. Scattered geometric fragments (subtle, diamond-like) catch light
in the atmosphere. Cool emerald and sapphire tones in the shadow regions,
warm gold and amber where dawn strikes. Upper sky: vast Shinkai-style
clouds with the green-gold palette of prosperity.
NOT literal banks, NOT money/coins, NOT trading floors or screens.`,
  },
];

async function generateImage(job, force = false) {
  const outDir = path.join(root, `public/images/industries/${job.id}`);
  const outFile = path.join(outDir, "cta-prioritization-bg.jpg");

  if (fs.existsSync(outFile) && !force) {
    console.log(`  ✓ ${job.id} — already exists (skip)`);
    return;
  }

  console.log(`  ⏳ ${job.id} — generating…`);

  const prompt = `${SHARED_STYLE}\n\n${job.metaphor}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      temperature: 1.0,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini ${res.status} for ${job.id}: ${txt}`);
  }

  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.mimeType?.startsWith("image/"),
  );

  if (!part) {
    console.error(`  ✗ ${job.id} — no image in response`);
    return;
  }

  const buf = Buffer.from(part.inlineData.data, "base64");

  try {
    const sharp = (await import("sharp")).default;
    const optimized = await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, optimized);
    console.log(`  ✓ ${job.id} — ${(optimized.length / 1024).toFixed(0)} KB (mozjpeg)`);
  } catch {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, buf);
    console.log(`  ✓ ${job.id} — ${(buf.length / 1024).toFixed(0)} KB (raw)`);
  }
}

async function main() {
  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    process.exit(1);
  }

  const args = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const force = process.argv.includes("--all") || process.argv.includes("--force");

  const targets = args.length > 0
    ? JOBS.filter((j) => args.includes(j.id))
    : JOBS;

  if (targets.length === 0) {
    console.error(`No matching industry. Available: ${JOBS.map((j) => j.id).join(", ")}`);
    process.exit(1);
  }

  console.log(`Generating ${targets.length} industry CTA background(s)…\n`);

  for (const job of targets) {
    await generateImage(job, force);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
