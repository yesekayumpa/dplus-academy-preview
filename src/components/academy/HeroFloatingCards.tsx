import student from "@/assets/serious-african-american-student-working-research.jpg";
import { Star, Users, Zap } from "lucide-react";

export function HeroFloatingCards() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Photo principale */}
      <img
        src={student}
        alt="Étudiante concentrée sur son apprentissage"
        className="h-auto w-full max-w-md rounded-2xl object-cover shadow-2xl"
      />

      {/* Badge "Live maintenant" — haut droite */}
      <div className="absolute top-4 right-0 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-gray-100">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold text-gray-800">Live maintenant</span>
        <Zap className="w-3 h-3 text-yellow-500" />
      </div>

      {/* Card satisfaction — haut gauche */}
      <div className="absolute top-4 -left-2 lg:-left-6 bg-white rounded-xl shadow-lg p-3 border border-gray-100 min-w-[130px]">
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-xs font-black text-gray-900 leading-relaxed">97% satisfaction</p>
        <p className="text-[10px] text-gray-400 leading-relaxed">apprenants formés</p>
      </div>

      {/* Card apprenants — bas gauche */}
      <div className="absolute bottom-6 -left-2 lg:-left-6 bg-[#1D0000] rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-black text-white leading-none">2 000+</p>
          <p className="text-[10px] text-white/60 leading-relaxed">apprenants</p>
        </div>
      </div>
    </div>
  );
}

