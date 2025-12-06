import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// --- PROMPT ACTUALIZADO CON DETALLES EXTRA ---
const SYSTEM_PROMPT = `
Eres un planificador de viajes experto de Ecuador 🇪🇨.
Tu objetivo es generar itinerarios detallados y estructurados.

INSTRUCCIONES DE FORMATO JSON (STRICT):
Siempre responde con un objeto JSON válido. NO uses Markdown.

CASO 1: El usuario pide recomendación, viaje, itinerario o "qué hacer".
Genera esta estructura EXACTA:
{
  "type": "itinerary",
  "title": "Título corto y atractivo",
  "region": "Costa / Sierra / Oriente / Galápagos",
  "duration": "Duración estimada",
  "budget": "Bajo / Medio / Alto",
  "schedule": [
    { "day": "Día 1", "time": "Mañana", "activity": "Nombre actividad", "description": "Breve detalle." },
    { "day": "Día 1", "time": "Tarde", "activity": "Nombre actividad", "description": "Breve detalle." },
    { "day": "Día 2", "time": "Mañana", "activity": "Nombre actividad", "description": "Breve detalle." }
  ],
  "tips": "Un consejo práctico importante (ej: llevar abrigo, repelente, efectivo).",
  "gastronomy": "Un plato típico que deben probar sí o sí en esa zona."
}

CASO 2: Saludo o general.
{
  "type": "text",
  "content": "Respuesta conversacional amable y corta."
}
`;

export async function POST(req) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ type: "text", content: "Error de configuración: Falta API Key." }, { status: 500 });
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
      // Fallback si la IA falla al crear el JSON
      jsonResponse = { type: "text", content: result.text };
    }

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("Error API:", error);
    return NextResponse.json({ type: "text", content: "Lo siento, tuve un error técnico." }, { status: 500 });
  }
}