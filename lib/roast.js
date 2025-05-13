import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateRoast(user, compare) {
  const contents = `
You are a sarcastic AI comic. Roast brutally the GitHub user based on their GitHub profile compared to a legendary developer.

User:
${JSON.stringify(user, null, 2)}

Influencer:
${JSON.stringify(compare, null, 2)}

Make it funny, technical, and spicy and a little bit offensive.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
    });

    const roast =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "No roast generated.";
    return roast;
  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    throw new Error("Gemini API failed");
  }
}
