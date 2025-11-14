import { GoogleGenAI, Chat, Type, FunctionDeclaration } from "@google/genai";
import type { DataFlowStep, Policy } from "@iniity/types";

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
    description: "Creates a structured security policy based on a natural language description. Also provides a rationale for the chosen configuration.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: "A short, descriptive name for the policy. E.g., 'Block Phone After Hours'."
            },
            rationale: {
                type: Type.STRING,
                description: "A brief explanation for why this policy is configured this way. Explain the choice of DIDs, conditions, and actions."
            },
            if: {
                type: Type.OBJECT,
                description: "The conditions under which the policy applies.",
                properties: {
                    sourceDID: { type: Type.STRING, description: "The DID of the source device, or 'any'. Map device names to DIDs from the provided context." },
                    destinationDID: { type: Type.STRING, description: "The DID of the destination device, or 'any'. Map device names to DIDs from the provided context." },
                    condition: { type: Type.STRING, description: "Any other condition, e.g., 'user.group == \"admins\"' or 'time > 19:00'. Use 'always' if no specific condition is given." },
                    networkLayer: { type: Type.STRING, description: "Optional network layer if specified, e.g., 'Netbird', 'Headscale', 'ZeroTier'." }
                },
                required: ["sourceDID", "destinationDID", "condition"]
            },
            then: {
                type: Type.OBJECT,
                description: "The action to take if the conditions are met.",
                properties: {
                    action: { type: Type.STRING, description: "The action to take: 'allow' or 'deny'." },
                    protocol: { type: Type.STRING, description: "The network protocol mentioned: 'ssh', 'https', or 'all'." }
                },
                required: ["action", "protocol"]
            }
        },
        required: ["name", "if", "then", "rationale"]
    }
};

/**
 * Generates a structured policy object from a natural language prompt.
 * @param prompt The user's natural language request for a policy.
 * @returns A promise that resolves to a structured Policy object or null.
 */
export const generatePolicyFromPrompt = async (prompt: string): Promise<Policy | null> => {
    try {
        const fullPrompt = `You are an expert security policy architect. Your task is to translate a user's request into a precise, structured policy.
        Use the following device DID context to map friendly names to their identifiers. Be intelligent about interpreting the user's intent.
        
        Device DID Context:
        - Aarons-MacBook-Pro: did:iniity:device:macbook-pro-aaron
        - iPhone 15 Pro: did:iniity:device:iphone-15-pro
        - Home Server: did:iniity:device:home-server-truenas
        - Work Dell XPS: did:iniity:device:work-laptop-dell
        
        User Request: "${prompt}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                tools: [{ functionDeclarations: [createPolicyFunctionDeclaration] }]
            }
        });

        const functionCall = response.functionCalls?.[0];

        if (functionCall && functionCall.name === 'createPolicy') {
            const args = functionCall.args as any;
            const newPolicy: Policy = {
                id: `pol_${Date.now()}`,
                enabled: true,
                name: args.name,
                if: {
                    sourceDID: args.if.sourceDID,
                    destinationDID: args.if.destinationDID,
                    condition: args.if.condition,
                    ...(args.if.networkLayer && { networkLayer: args.if.networkLayer }),
                },
                then: {
                    action: args.then.action,
                    protocol: args.then.protocol,
                },
                generatedBy: 'AI',
                rationale: args.rationale,
            };
            return newPolicy;
        }
        return null;
    } catch (error) {
        console.error("Error generating policy from prompt:", error);
        return null;
    }
};