import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateAndSave(prompt, filename) {
    console.log(`Generating ${filename}...`);
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: prompt,
            config: {
                imageConfig: { aspectRatio: "16:9" }
            }
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const buffer = Buffer.from(part.inlineData.data, 'base64');
                fs.writeFileSync(`public/${filename}`, buffer);
                console.log(`Saved ${filename}`);
                return;
            }
        }
    } catch (e) {
        console.error(`Failed to generate ${filename}:`, e);
    }
}

async function main() {
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public');
    }
    await generateAndSave("A frustrated customer on the phone at night, dark room, looking stressed, looking out a window showing closed shops and dark streets, cinematic lighting, highly detailed.", "story-1.png");
    await generateAndSave("A futuristic glowing AI assistant named Erica processing data, glowing blue and neon lights, digital interface, highly detailed, conceptual representation of an AI agent in action.", "story-2.png");
    await generateAndSave("A friendly HVAC technician arriving at a house in the bright morning sunlight, holding two or three copper pipes in his left hand, and a yellow Bernzomatic blowtorch in his right hand, smiling, bright and optimistic lighting, highly detailed.", "story-3.png");
}

main();
