/**
 * Grounded, documentary-style solution illustrations (4:3) for all industry pages.
 * Uses Gemini gemini-3.1-flash-image-preview + sharp → JPEG.
 *
 *   node scripts/generate-industry-solution-images.mjs
 *   node scripts/generate-industry-solution-images.mjs manufacturing retail   # subset by id prefix
 *
 * Requires GEMINI_API_KEY in .env.local
 *
 * After replacing JPEGs in place: bump `INDUSTRY_SOLUTION_IMAGES_REVISION` in
 * `lib/industry-solution-image-cache.ts` so `next/image` and browsers fetch new bytes.
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

/** Appended to every prompt — avoids sci-fi / hologram / neon “future” clichés */
const GROUNDED =
  " Visual style: documentary or editorial photography only—natural daylight or normal workplace/industrial lighting. Real equipment, real rooms, real sites. No science fiction, no holograms, no neon cyberpunk, no floating transparent UI, no futuristic cityscapes, no lens-flare sci-fi hero shots. Should feel credible in a trade journal or corporate annual report. No readable text, logos, or watermarks.";

const JOBS = [
  // Manufacturing
  {
    id: "mfg-pm",
    out: "public/images/industries/manufacturing/solutions/predictive-maintenance.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: manufacturing reliability engineer or maintenance planner at a desk with two monitors showing abstract line charts, bar charts, and gauge-style readouts (no readable text, labels, or logos)—clearly a condition-monitoring or predictive analytics dashboard for rotating equipment. Optional small inset of vibration spectrum or trend plot as abstract graphics only. Ordinary office or plant engineering room with daylight or overhead office light; credible Industry 4.0 analytics workflow, not a generic wrench-on-pump shot.${GROUNDED}`,
  },
  {
    id: "mfg-vision",
    out: "public/images/industries/manufacturing/solutions/vision-quality-control.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: industrial automated optical inspection on a factory line—overhead or gantry-mounted machine-vision cameras, coaxial or ring LED illumination, metal or PCB assembly on conveyor or fixturing. Emphasize real machine vision hardware (lenses, camera housings, calibration plate optional) in a warehouse or plant setting; suggest object detection / AOI context without adding fake on-screen bounding boxes or sci-fi HUD. No handheld phone inspection.${GROUNDED}`,
  },
  {
    id: "mfg-sc",
    out: "public/images/industries/manufacturing/solutions/supply-chain-optimization.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: busy distribution warehouse with pallets, forklift in motion blur, concrete floor and high racking—daytime interior, believable logistics operation.${GROUNDED}`,
  },
  // Retail
  {
    id: "retail-360",
    out: "public/images/industries/retail/solutions/customer-360-identity.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: modern retail store associates helping customers at checkout and fitting area, warm interior lighting, real merchandise—no holographic displays.${GROUNDED}`,
  },
  {
    id: "retail-personalization",
    out: "public/images/industries/retail/solutions/ai-personalization-search.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: shopper browsing clothing on racks with smartphone in hand, ordinary mall or boutique lighting—real commerce, no sci-fi interfaces.${GROUNDED}`,
  },
  {
    id: "retail-forecast",
    out: "public/images/industries/retail/solutions/demand-forecasting-pricing.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: back-of-store stockroom with shelves of boxed inventory, manager with clipboard or tablet in natural posture—operational retail planning feel.${GROUNDED}`,
  },
  // Construction
  {
    id: "constr-inspect",
    out: "public/images/industries/construction/solutions/visual-inspections-estimating.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: building exterior or roof inspection—contractor on ladder or lift with phone camera documenting siding or shingles, clear daylight, professional trades context.${GROUNDED}`,
  },
  {
    id: "constr-reports",
    out: "public/images/industries/construction/solutions/automated-field-reports.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: construction site trailer desk with hard hat, printed plans, coffee mug—supervisor writing notes, ordinary jobsite office light.${GROUNDED}`,
  },
  {
    id: "constr-hvac",
    out: "public/images/industries/construction/solutions/equipment-hvac-predictive.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: commercial rooftop HVAC units, technician with toolbag checking unit, blue sky—real facilities maintenance.${GROUNDED}`,
  },
  // Energy
  {
    id: "energy-forecast",
    out: "public/images/industries/energy-utilities/solutions/load-renewable-forecasting.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: control room or planning office with multiple monitors showing abstract curves (no readable text), operators in business casual at desks—credible utility operations center.${GROUNDED}`,
  },
  {
    id: "energy-grid",
    out: "public/images/industries/energy-utilities/solutions/grid-generation-asset-health.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: electrical substation equipment in daylight, steel and insulators, clear sky—real infrastructure photography.${GROUNDED}`,
  },
  {
    id: "energy-der",
    out: "public/images/industries/energy-utilities/solutions/der-visibility-operations.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: residential and small commercial rooftops with solar panels, suburban setting, sunny day—grounded DER context.${GROUNDED}`,
  },
  // Insurance
  {
    id: "ins-fnol",
    out: "public/images/industries/insurance/solutions/fnol-document-ai.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: insurance claims professional at desk with stacked folders, laptop, office window light—ordinary claims intake environment.${GROUNDED}`,
  },
  {
    id: "ins-damage",
    out: "public/images/industries/insurance/solutions/damage-assessment-field.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: adjuster photographing storm damage to a home exterior with phone or tablet, daylight—real field claims work.${GROUNDED}`,
  },
  {
    id: "ins-fraud",
    out: "public/images/industries/insurance/solutions/fraud-siu-analytics.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: two investigators in business attire reviewing paper files in a modest office—serious but mundane SIU setting, no Hollywood drama lighting.${GROUNDED}`,
  },
  // Healthcare
  {
    id: "hc-cds",
    out: "public/images/industries/healthcare/solutions/clinical-decision-support.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: physician and nurse at bedside reviewing patient chart on workstation on wheels, hospital room, soft daylight—real clinical workflow.${GROUNDED}`,
  },
  {
    id: "hc-imaging",
    out: "public/images/industries/healthcare/solutions/medical-imaging-ai.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: radiologist at diagnostic monitors in reading room, grayscale images on screens without readable patient text, dimmed clinical lighting.${GROUNDED}`,
  },
  {
    id: "hc-pop",
    out: "public/images/industries/healthcare/solutions/population-health-management.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: care team huddle at a conference table with printed population health charts (no legible text), hospital office, daylight.${GROUNDED}`,
  },
  {
    id: "hc-sepsis",
    out: "public/images/industries/healthcare/solutions/sepsis-early-warning.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: ICU monitor wall with waveforms (no readable PHI), nurse at bedside, tense but realistic hospital lighting.${GROUNDED}`,
  },
  // Financial services
  {
    id: "fs-fraud",
    out: "public/images/industries/financial-services/solutions/real-time-fraud-detection.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: bank fraud operations center with analysts at desks, multiple screens showing abstract graphs, office lighting—no sci-fi.${GROUNDED}`,
  },
  {
    id: "fs-aml",
    out: "public/images/industries/financial-services/solutions/aml-transaction-monitoring.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: compliance officer reviewing printed reports and spreadsheets at desk, serious office environment, no futuristic glass towers.${GROUNDED}`,
  },
  {
    id: "fs-credit",
    out: "public/images/industries/financial-services/solutions/credit-risk-modeling.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: loan officer meeting with small business owners at a conference table, papers and laptop, natural office light—grounded lending context.${GROUNDED}`,
  },
  {
    id: "fs-trading",
    out: "public/images/industries/financial-services/solutions/algorithmic-trading-sentiment.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: trading floor or open office with rows of monitors, professionals in business attire, daylight from windows—real markets workplace, not neon cyber trading.${GROUNDED}`,
  },
  {
    id: "fs-pe",
    out: "public/images/industries/financial-services/solutions/private-equity-sponsor-intelligence.jpg",
    prompt: `Photorealistic 4:3 documentary photograph: investment professionals in a boardroom reviewing printed binders and laptops, city view window, neutral corporate lighting—no futuristic holograms.${GROUNDED}`,
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
    console.error("Missing GEMINI_API_KEY in .env.local");
    process.exit(1);
  }

  const argv = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const sharp = (await import("sharp")).default;

  let jobs = JOBS;
  if (argv.length > 0) {
    jobs = JOBS.filter((j) => argv.some((a) => j.id.includes(a) || j.out.includes(a)));
    if (jobs.length === 0) {
      console.error("No jobs matched. Ids look like: mfg-pm, retail-360, …");
      process.exit(1);
    }
  }

  for (const job of jobs) {
    const outPath = path.join(root, job.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    console.log(`Generating ${job.id} → ${job.out}`);
    const { data, mimeType } = await generateImage(job.prompt);
    await sharp(data).jpeg({ quality: 88, mozjpeg: true }).toFile(outPath);
    console.log(`  wrote (${mimeType})`);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
