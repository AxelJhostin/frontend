import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Eres un planificador de viajes experto de Ecuador 🇪🇨.
Tu objetivo es generar itinerarios detallados y estructurados.

INSTRUCCIONES DE FORMATO JSON (STRICT):
Siempre responde con un objeto JSON válido. NO uses Markdown.

CASO 1: El usuario pide recomendación/itinerario.
{
  "type": "itinerary",
  "title": "Título corto",
  "region": "Región",
  "duration": "Duración",
  "budget": "Presupuesto",
  "schedule": [
    { "day": "Día 1", "time": "Mañana", "activity": "Actividad", "description": "Detalle breve" },
    { "day": "Día 1", "time": "Tarde", "activity": "Actividad", "description": "Detalle breve" }
  ]
}

CASO 2: Saludo o general.
{
  "type": "text",
  "content": "Respuesta conversacional."
}
`;

export async function POST(req) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ type: "text", content: "Error: Falta la API Key en Vercel" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: { responseMimeType: "application/json" },
      history: [{ role: "user", parts: [{ text: SYSTEM_PROMPT }] }],
    });

    const result = await chat.sendMessage({ message });
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(result.text);
    } catch (e) {
      jsonResponse = { type: "text", content: result.text };
    }

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("Error API:", error);
    return NextResponse.json({ type: "text", content: "Error técnico en el servidor." }, { status: 500 });
  }
}