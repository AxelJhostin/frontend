"use client";
import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
// Importamos el componente visual que creamos para los itinerarios
import ItineraryCard from "./ItineraryCard";

export default function ChatBot({ isOpen, onClose }) {
  const [input, setInput] = useState("");
  
  // Estado inicial del chat
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      type: "text", 
      content: "¡Hola! 🇪🇨 Soy tu planificador de viajes experto. Pídeme un itinerario, por ejemplo: 'Plan de 3 días en Galápagos' o 'Fin de semana en Baños'." 
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Referencia para el scroll automático
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efecto para bajar el scroll cuando llega un mensaje nuevo o se abre el chat
  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Agregamos el mensaje del usuario a la lista (siempre es tipo texto)
    const userMessage = { role: "user", type: "text", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      // 2. Enviamos al backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      // 3. Recibimos la respuesta (que ahora es un JSON estructurado)
      const data = await response.json();
      
      // 4. Agregamos la respuesta del bot al estado
      // Usamos "...data" para que se guarden propiedades como 'schedule', 'budget', etc.
      setMessages((prev) => [...prev, { role: "bot", ...data }]);

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "bot", type: "text", content: "Lo siento, tuve un problema de conexión. Por favor intenta de nuevo." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Si el modal está cerrado, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-gray-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-scale-in border border-gray-200">
        
        {/* --- CABECERA --- */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-5 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">Agente de Viajes IA</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-blue-100 text-xs font-medium">En línea ahora</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* --- ÁREA DE MENSAJES --- */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#f3f4f6]">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[95%] sm:max-w-[85%] transition-all duration-300 ${msg.role === "user" ? "ml-auto" : ""}`}>
                
                {/* Lógica de Renderizado: ¿Es Texto o Itinerario? */}
                
                {/* 1. CASO TEXTO SIMPLE */}
                {msg.type === "text" && (
                  <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}>
                    {msg.content}
                  </div>
                )}

                {/* 2. CASO ITINERARIO (Tarjeta Especial) */}
                {msg.type === "itinerary" && (
                  <div className="mt-2">
                    {/* Renderizamos el componente ItineraryCard pasándole los datos */}
                    <ItineraryCard data={msg} />
                  </div>
                )}

              </div>
            </div>
          ))}
          
          {/* Indicador de carga */}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 text-xs ml-4 font-medium animate-pulse">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              </div>
              <span>Diseñando tu experiencia...</span>
            </div>
          )}
          
          {/* Div invisible para anclar el scroll al final */}
          <div ref={messagesEndRef} />
        </div>

        {/* --- INPUT --- */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3 items-center bg-gray-50 rounded-full px-2 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all shadow-sm">
            <input
              type="text"
              className="flex-1 p-3.5 bg-transparent text-gray-800 focus:outline-none placeholder-gray-400 ml-2"
              placeholder="Ej: Aventura en Mindo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()} 
              className="bg-blue-600 text-white p-3 my-1.5 rounded-full hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Powered by Gemini AI</p>
          </div>
        </div>

      </div>
    </div>
  );
}