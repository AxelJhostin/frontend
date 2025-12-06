import { Mountain, Palmtree, Trees, Waves } from "lucide-react";

export default function Destinations() {
  const destinations = [
    {
      region: "Galápagos",
      icon: <Waves className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-600",
      places: [
        { name: "Isla Santa Cruz", desc: "Centro turístico con tortugas gigantes", img: "🐢" },
        { name: "Isla Isabela", desc: "Volcanes activos y pingüinos", img: "🦭" },
        { name: "Isla San Cristóbal", desc: "Lobos marinos y playas únicas", img: "🦭" }
      ]
    },
    {
      region: "Costa",
      icon: <Palmtree className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
      places: [
        { name: "Montañita", desc: "Surf, vida nocturna y playas", img: "🏄" },
        { name: "Puerto López", desc: "Avistamiento de ballenas", img: "🐋" },
        { name: "Manta", desc: "Ciudad portuaria y gastronomía", img: "🍤" }
      ]
    },
    {
      region: "Sierra",
      icon: <Mountain className="w-8 h-8" />,
      color: "from-green-500 to-emerald-700",
      places: [
        { name: "Quito", desc: "Centro histórico Patrimonio de la Humanidad", img: "🏛️" },
        { name: "Baños", desc: "Aventura, cascadas y aguas termales", img: "💦" },
        { name: "Cuenca", desc: "Arquitectura colonial y artesanías", img: "🎨" }
      ]
    },
    {
      region: "Amazonía",
      icon: <Trees className="w-8 h-8" />,
      color: "from-lime-500 to-green-600",
      places: [
        { name: "Cuyabeno", desc: "Reserva natural con vida silvestre", img: "🦜" },
        { name: "Yasuní", desc: "Parque nacional biodiverso", img: "🐆" },
        { name: "Tena", desc: "Rafting y comunidades indígenas", img: "🛶" }
      ]
    }
  ];

  return (
    <section id="destinos" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
          Destinos Recomendados
        </h2>
        
        <div className="space-y-16">
          {destinations.map((dest, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className={`bg-gradient-to-r ${dest.color} p-6 flex items-center gap-4`}>
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur">
                  {dest.icon}
                </div>
                <h3 className="text-3xl font-bold text-white">{dest.region}</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 p-8">
                {dest.places.map((place, pidx) => (
                  <div key={pidx} className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {place.img}
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{place.name}</h4>
                      <p className="text-gray-600">{place.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}