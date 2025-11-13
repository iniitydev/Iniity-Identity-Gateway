import { GoogleGenAI, Chat, Type, FunctionDeclaration } from "@google/genai";
import type { DataFlowStep, Policy } from "@iniity/types";

// Fix: Initialize the GoogleGenAI client once using the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Store the active chat session.
let chatSession: Chat | null = null;

/**
 * Gets a reusable chat session.
 * @param systemInstruction The system instruction for the chat model.
 * @returns A Chat instance.
 */
export const getChatSession = (systemInstruction: string): Chat => {
  // If no session exists, create a new session.
  if (!chatSession) {
    console.log("Initializing new chat session.");
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        tools: [{googleSearch: {}}],
      },
    });
  }
  return chatSession;
};


/**
 * Generates the data flow steps using the Gemini Pro model.
 * @param context The architectural context.
 * @returns A promise that resolves to an array of data flow steps.
 */
export const generateDataFlow = async (context: string): Promise<DataFlowStep[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: context,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
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

/**
 * Generates a quick analysis of a component using a low-latency model.
 * @param componentName The name of the component.
 * @param componentDescription The description of the component.
 * @returns A promise that resolves to the analysis text.
 */
export const getQuickAnalysis = async (componentName: string, componentDescription: string): Promise<string> => {
    const prompt = `Provide a concise, expert analysis of the "${componentName}" component in an IT architecture. Focus on its primary role, benefits, and potential challenges. Component description: "${componentDescription}"`;
    try {
        const response = await ai.models.generateContent({
            // Fix: Use the correct latest model alias for gemini flash lite.
            model: 'gemini-flash-lite-latest',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Quick analysis error:", error);
        return "Failed to generate analysis. The API key might be invalid or the service is unavailable.";
    }
};


const createPolicyFunctionDeclaration: FunctionDeclaration = {
    name: "createPolicy",
    description: "Creates a structured security policy based on user input.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: "A short, descriptive name for the policy. E.g., 'Block Phone After Hours'."
            },
            if: {
                type: Type.OBJECT,
                properties: {
                    device: { type: Type.STRING, description: "The device type, e.g., 'Phone', 'Laptop'." },
                    userGroup: { type: Type.STRING, description: "The user group, e.g., 'Employees', 'Admins'." },
                    condition: { type: Type.STRING, description: "The condition to check, e.g., 'Time is after 7 PM'." },
                },
                required: ["device", "userGroup", "condition"]
            },
            then: {
                type: Type.OBJECT,
                properties: {
                    action: { type: Type.STRING, description: "The action to take, e.g., 'Deny'." },
                    resource: { type: Type.STRING, description: "The resource the action applies to, e.g., 'Work Files'." }
                },
                required: ["action", "resource"]
            }
        },
        required: ["name", "if", "then"]
    }
};

/**
 * Generates a structured policy object from a natural language prompt.
 * @param prompt The user's natural language request for a policy.
 * @returns A promise that resolves to a structured Policy object or null.
 */
export const generatePolicyFromPrompt = async (prompt: string): Promise<Policy | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the user's request, create a policy. Request: "${prompt}"`,
            config: {
                tools: [{ functionDeclarations: [createPolicyFunctionDeclaration] }]
            }
        });

        const functionCall = response.functionCalls?.[0];

        if (functionCall && functionCall.name === 'createPolicy') {
            // The arguments from the model are already a structured object
            const policyArgs = functionCall.args;
            const newPolicy: Policy = {
                id: `pol_${Date.now()}`,
                enabled: true,
                ...policyArgs as Omit<Policy, 'id' | 'enabled'>,
            };
            return newPolicy;
        }
        return null;
    } catch (error) {
        console.error("Error generating policy from prompt:", error);
        return null;
    }
};