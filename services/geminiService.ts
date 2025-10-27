
import { GoogleGenAI, Type } from "@google/genai";
import type { CondensedNotes } from '../types';

export async function condenseMeetingNotes(notes: string): Promise<CondensedNotes> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      summary: {
        type: Type.STRING,
        description: "A concise, professional summary of the meeting's key discussions, decisions, and outcomes. Should be in paragraph form."
      },
      actionItems: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
          description: "A specific, actionable task assigned during the meeting. Should start with a verb."
        },
        description: "A list of all action items identified in the meeting notes."
      }
    },
    required: ["summary", "actionItems"]
  };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please analyze the following meeting notes and extract a summary and a list of action items.
      
      Meeting Notes:
      ---
      ${notes}
      ---
      `,
      config: {
        systemInstruction: "You are an expert assistant skilled at summarizing messy meeting notes and extracting key action items. Your output must be in JSON format matching the provided schema.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedData: CondensedNotes = JSON.parse(jsonText);
    
    // Basic validation
    if (!parsedData.summary || !Array.isArray(parsedData.actionItems)) {
        throw new Error("Invalid data structure received from API.");
    }
    
    return parsedData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
}
