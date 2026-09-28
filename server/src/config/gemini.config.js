import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_NAMES = ["gemini-3.5-flash-lite", "gemini-2.5-flash"];

const generateContent = async (prompt) => {
  let lastError;

  for (const model of MODEL_NAMES) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      lastError = error;
      console.error(`Gemini API Error (${model}):`, error.message);
    }
  }

  throw new Error(`Gemini API failed: ${lastError.message}`);
};

export { generateContent };
