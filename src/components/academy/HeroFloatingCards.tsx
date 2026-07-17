import { IconCloud } from "@/components/ui/interactive-icon-cloud";
import student from "@/assets/serious-african-american-student-working-research.jpg";

const iconSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function HeroFloatingCards() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Main person image */}
      <div className="relative z-10">
        <img
          src={student}
          alt="Student holding a tablet, excited about learning"
          className="h-auto w-full max-w-md rounded-2xl object-cover shadow-2xl"
        />
      </div>

      {/* Icon Cloud - Perfectly circular around the image */}
      <div className="absolute inset-0 z-20 flex items-start justify-center pointer-events-none -mt-16">
        <div className="w-[120%] h-[120%]">
          <IconCloud iconSlugs={iconSlugs} />
        </div>
      </div>
    </div>
  );
}
