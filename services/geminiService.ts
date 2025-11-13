
import { GoogleGenAI, Chat, Type } from "@google/genai";
import type { DataFlowStep } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// This chat session instance is created once and reused.
let chatSession: Chat | null = null;

export const getChatSession = (systemInstruction: string): Chat => {
  if (!chatSession) {
    console.log("Initializing new chat session.");
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
    });
  }
  return chatSession;
};


export const generateDataFlow = async (context: string): Promise<DataFlowStep[]> => {
  try {
    // Using Pro for better structured data generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: context,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: { type: Type.INTEGER },
              actor: { type: Type.STRING },
              system: { type: Type.STRING },
              action: { type: Type.STRING },
              from: { type: Type.STRING },
              to: { type: Type.STRING },
            },
            required: ["step", "actor", "system", "action", "from", "to"],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch data flow from Gemini API.");
  }
};
