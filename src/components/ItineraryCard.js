import { Calendar, Clock, MapPin, DollarSign, Sun, Moon } from "lucide-react";

export default function ItineraryCard({ data }) {
  return (
    <div className="bg-white w-full sm:w-[28rem] rounded-3xl shadow-xl overflow-hidden border border-gray-100 my-4 font-sans transform transition-all hover:scale-[1.01]">
      
      {/* --- CABECERA TIPO TICKET --- */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
          <Calendar className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            {data.duration}
          </span>
          <h3 className="text-2xl font-bold mt-3 leading-tight">{data.title}</h3>
          <p className="text-blue-100 text-sm mt-1 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {data.region}
          </p>
        </div>
      </div>

      {/* --- CUERPO DEL CRONOGRAMA --- */}
      <div className="p-0 bg-gray-50">
        
        {/* Iteramos sobre los días/actividades */}
        {data.schedule?.map((item, index) => (
          <div key={index} className="flex group border-b border-gray-100 last:border-0 bg-white hover:bg-blue-50 transition-colors">
            
            {/* Columna Izquierda: Tiempo/Día */}
            <div className="w-20 p-4 border-r border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-gray-400 uppercase mb-1">{item.day}</span>
              <div className={`p-2 rounded-full ${item.time === 'Mañana' ? 'bg-yellow-100 text-yellow-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {item.time === 'Mañana' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </div>
            </div>

            {/* Columna Derecha: La Actividad */}
            <div className="p-4 flex-1 flex flex-col justify-center">
              <h4 className="font-bold text-gray-800 text-sm md:text-base mb-1">
                {item.activity}
              </h4>
              <p className="text-xs text-gray-500 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* --- FOOTER CON RESUMEN --- */}
      <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1.5 rounded-lg text-sm font-bold">
          <DollarSign className="w-4 h-4" />
          {data.budget}
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide">
          Ver detalles →
        </button>
      </div>
    </div>
  );
}