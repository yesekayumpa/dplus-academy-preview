import { Award, Trophy, Star, Heart } from "lucide-react";
import student from "@/assets/serious-african-american-student-working-research.jpg";
export function HeroFloatingCards() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Main person image */}
      <div className="relative z-10">
        <img
          src={student}
          alt="Student holding a tablet, excited about learning"
          className="h-auto w-full max-w-md rounded-2xl object-cover"
        />
      </div>

      {/* Certificates Earned Card */}
      <div className="absolute left-0 top-4 z-20 rounded-xl bg-background p-3 shadow-lg lg:left-2 lg:top-8 lg:p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
            <Award className="h-4 w-4 text-red-500" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Certificates Earned
          </span>
        </div>
        <p className="mt-1 text-2xl font-bold text-foreground">2</p>
      </div>

      {/* Quiz Master Badge */}
      <div className="absolute right-0 top-16 z-20 flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-lg lg:-right-4 lg:top-20">
        <Heart className="h-4 w-4 text-red-500" />
        <span className="text-xs font-semibold text-foreground">
          Quiz Master
        </span>
      </div>

      {/* Monthly Champion Badge */}
      <div className="absolute left-8 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 rounded-full bg-background px-3 py-2 shadow-lg lg:left-4">
        <Trophy className="h-4 w-4 text-yellow-500" />
        <span className="text-xs font-medium text-foreground">
          Monthly Champ
        </span>
      </div>

      {/* Course Card */}
      <div className="absolute -right-2 bottom-20 z-20 w-44 rounded-xl bg-background p-3 shadow-lg lg:bottom-24 lg:right-0">
        <div className="mb-2 h-16 w-full rounded-lg bg-gradient-to-br from-primary/20 to-primary/5" />
        <p className="text-xs font-semibold text-foreground">
          UI/UX Design Fundamentals
        </p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">25 lessons</p>
      </div>

      {/* Instructor Card */}
      <div className="absolute bottom-8 right-12 z-20 flex items-center gap-2 rounded-full bg-background px-3 py-2 shadow-lg lg:bottom-10 lg:right-16">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <Star className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-foreground leading-tight">
            Michael R.
          </p>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Instructor
          </p>
        </div>
      </div>

      {/* Small floating icon */}
      <div className="absolute bottom-24 left-2 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 shadow-md lg:left-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="#ec4899" strokeWidth="2" />
          <path d="M8 12l3 3 5-5" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
