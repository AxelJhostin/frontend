"use client";
import { useState } from "react";
import { MessageCircle, MapPin, Compass, Camera, ArrowRight } from "lucide-react";
import ChatBot from "../components/ChatBot";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Datos de las regiones con tus IMÁGENES LOCALES
  const regions = [
    {
      title: "Islas Galápagos",
      subtitle: "El Laboratorio Viviente",
      description: "Un paraíso único en el mundo donde la vida silvestre no teme al ser humano. Nada junto a leones marinos, camina entre tortugas gigantes y descubre playas de arena blanca.",
      highlights: ["Snorkel en León Dormido", "Estación Charles Darwin", "Playa Tortuga Bay"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200", // Esta de internet funcionaba bien
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "La Sierra Andina",
      subtitle: "Avenida de los Volcanes",
      description: "Hogar de nevados majestuosos, lagunas de colores y ciudades patrimonio. Desde el centro histórico de Quito hasta las aguas termales de Baños.",
      highlights: ["Volcán Cotopaxi", "Centro Histórico de Quito", "Tren de la Nariz del Diablo"],
      image: "/ima/ecu.jpg", // <--- AQUÍ TU IMAGEN LOCAL (Sierra)
      color: "text-emerald-700",
      bg: "bg-white"
    },
    {
      title: "La Costa del Pacífico",
      subtitle: "Sol, Playa y Gastronomía",
      description: "Kilómetros de playas para todos los gustos: desde la fiesta y el surf en Montañita hasta la tranquilidad de los Frailes. Disfruta de la mejor gastronomía del mar.",
      highlights: ["Avistamiento de Ballenas", "Surf en Montañita", "Parque Nacional Machalilla"],
      image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200", // Esta de internet funcionaba bien
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      title: "La Amazonía",
      subtitle: "El Pulmón del Mundo",
      description: "Adéntrate en la selva más biodiversa del planeta. Navega por ríos inmensos, conoce comunidades ancestrales y descubre una flora y fauna única.",
      highlights: ["Reserva Cuyabeno", "Rafting en el Río Jatunyacu", "Comunidades Kichwa"],
      image: "/ima/ecu2.jpg", // <--- AQUÍ TU IMAGEN LOCAL (Amazonía)
      color: "text-green-700",
      bg: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800">
      
      {/* --- HERO SECTION (PORTADA) --- */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo oscuro (Usamos la de la Sierra también aquí o una genérica) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/ima/ecu.jpg" 
            alt="Ecuador Landscape" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl text-white">
          <span className="uppercase tracking-[0.3em] text-sm md:text-base font-light mb-4 block animate-fade-in">
            Bienvenido a la mitad del mundo
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl animate-fade-in">
            Ecuador: Cuatro Mundos <br/> Un Solo País
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Desde las cumbres de los Andes hasta las profundidades de la Amazonía. 
            Déjanos organizar tu aventura perfecta con inteligencia artificial.
          </p>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-xl hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Compass className="w-6 h-6" />
            Planificar mi Itinerario
          </button>
        </div>
      </div>

      {/* --- SECCIÓN INTRODUCCIÓN --- */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Tu Asistente de Viajes Personal</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            No pierdas horas buscando qué hacer. Nuestro <strong>Chatbot IA</strong> conoce cada rincón de Ecuador. 
            Solo dile qué te gusta y recibirás un <strong>cronograma detallado día por día</strong> con actividades, horarios y presupuesto.
          </p>
        </div>
      </section>

      {/* --- REGIONES DE ECUADOR (Diseño Alternado) --- */}
      <div className="flex flex-col">
        {regions.map((region, index) => (
          <section key={index} className={`py-20 px-6 ${region.bg}`}>
            <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Texto */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className={`w-5 h-5 ${region.color}`} />
                  <span className={`font-bold uppercase tracking-wider text-sm ${region.color}`}>Región {index + 1}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {region.title}
                </h2>
                <h3 className="text-xl font-medium text-gray-500 italic">
                  {region.subtitle}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {region.description}
                </p>
                
                {/* Highlights */}
                <div className="pt-4">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase">Imperdibles:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {region.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <Camera className="w-4 h-4 text-gray-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="group inline-flex items-center gap-2 font-bold text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
                  >
                    Crear itinerario para {region.title.split(' ')[1] || region.title} 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Imagen */}
              <div className="flex-1 w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  {/* Aquí renderizamos la imagen dinámica */}
                  <img 
                    src={region.image} 
                    alt={region.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* --- CTA FINAL --- */}
      <section className="py-24 bg-gray-900 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           {/* Patrón de puntos */}
           <svg className="h-full w-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                 <circle cx="2" cy="2" r="1" fill="white" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#smallGrid)" />
           </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">¿Listo para armar tu maleta?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Deja que nuestra Inteligencia Artificial organice los detalles. <br/>
            Tú solo preocúpate por disfrutar.
          </p>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
          >
            <MessageCircle className="w-6 h-6" />
            Empezar Conversación
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">✈️ Viaja Ecuador IA</h3>
            <p className="text-sm">Explorando el centro del mundo, un algoritmo a la vez.</p>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Nosotros</a>
            <a href="#" className="hover:text-white transition-colors">Destinos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
          <p className="text-xs text-gray-600">© 2024 Powered by Google Gemini</p>
        </div>
      </footer>

      {/* --- BOTÓN FLOTANTE --- */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl z-50 transition-all hover:scale-110 animate-bounce"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {/* --- MODAL DEL CHAT --- */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
}