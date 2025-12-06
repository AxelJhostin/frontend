import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Prompt del Sistema (El mismo que tenías)
const SYSTEM_PROMPT = `
Eres un planificador de viajes experto de Ecuador 🇪🇨.
Tu objetivo es generar itinerarios detallados y estructurados.

INSTRUCCIONES DE FORMATO JSON:
Siempre responde con un objeto JSON.
Analiza la intención del usuario:

CASO 1: El usuario pide una recomendación, viaje, itinerario o "qué hacer".
Genera una estructura de CRONOGRAMA:
{
  "type": "itinerary",
  "title": "Título corto del viaje",
  "region": "Costa / Sierra / Oriente / Galápagos",
  "duration": "Duración estimada",
  "budget": "Presupuesto estimado (USD)",
  "schedule": [
    { "day": "Día 1", "time": "Mañana", "activity": "Nombre actividad", "description": "Breve detalle." },
    { "day": "Día 1", "time": "Tarde", "activity": "Nombre actividad", "description": "Breve detalle." },
    { "day": "Día 2", "time": "Mañana", "activity": "Nombre actividad", "description": "Breve detalle." }
  ]
}

CASO 2: El usuario saluda o pregunta algo general.
{
  "type": "text",
  "content": "Respuesta conversacional amable."
}

NO USES MARKDOWN. SOLO JSON PURO.
`;

export async function POST(req) {
  try {
    // Leemos el mensaje del cuerpo de la petición
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ type: "text", content: "Error: No API Key configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: { responseMimeType: "application/json" },
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      ],
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
    console.error("Error en API Next.js:", error);
    return NextResponse.json(
      { type: "text", content: "Lo siento, hubo un error técnico en el servidor." },
      { status: 500 }
    );
  }
}