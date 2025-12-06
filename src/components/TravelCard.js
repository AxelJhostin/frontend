import { MapPin, Calendar, DollarSign, CheckCircle } from "lucide-react";

export default function TravelCard({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 my-4 transform transition-all hover:scale-[1.02]">
      {/* Encabezado con gradiente */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
        <h3 className="text-white font-bold text-xl flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {data.title}
        </h3>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <p className="text-gray-600 mb-4 leading-relaxed">
          {data.description}
        </p>

        {/* Detalles Rápidos */}
        <div className="flex gap-4 mb-4 text-sm font-medium">
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <DollarSign className="w-4 h-4" />
            {data.budget}
          </div>
          <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4" />
            {data.bestMonth}
          </div>
        </div>

        {/* Lista de lugares */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Puntos Clave:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.places?.map((place, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                {place}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}