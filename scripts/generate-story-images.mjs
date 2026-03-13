import { GoogleGenAI } from '@google/genai';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

const PROMPTS = [
  "A woman in her mid 30s, sitting on a couch in a cozy well-lit living room at night, holding a smartphone to her ear, worried expression on her face, wearing casual pajamas, warm lamp light in the background, normal suburban home interior, realistic photography style, no dark or dystopian elements.",
  "A glowing blue female humanoid figure made entirely of light particles and wireframe mesh, standing upright with arms slightly open, centered in a dark server room corridor with racks of servers on both sides glowing with neon blue and pink lights, the word ERICKA displayed above her head as a holographic label, wide shot, cinematic, highly detailed digital art.",
  "A confident male plumber in his 30s, wearing a blue button-up work uniform, standing in a driveway in front of a large suburban house at golden hour morning, holding 3 copper pipes in his left hand and a yellow Bernzomatic blowtorch in his right hand, smiling directly at the camera, white service van visible behind him, photorealistic, sharp and vivid."
];

const FILENAMES = [
  'story-1-customer.jpg',
  'story-2-ericka.jpg',
  'story-3-plumber.jpg'
];

console.log('Generating story images...\n');

for (let i = 0; i < PROMPTS.length; i++) {
  console.log(`Generating image ${i + 1} of 3...`);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: PROMPTS[i],
    config: {
      imageConfig: { aspectRatio: "16:9" }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      const outPath = join(__dirname, '..', 'public', FILENAMES[i]);
      writeFileSync(outPath, buffer);
      console.log(`✓ Saved ${FILENAMES[i]}`);
      break;
    }
  }
}

console.log('\nDone! All 3 images saved to /public/');
