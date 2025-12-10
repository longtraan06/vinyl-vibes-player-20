import { Play, Pause } from "lucide-react";
import cdDiscImage from "@/assets/cd-disc.png";

interface VinylDiscProps {
  isPlaying: boolean;
  progress: number;
  onTogglePlay: () => void;
}

const VinylDisc = ({ isPlaying, progress, onTogglePlay }: VinylDiscProps) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Progress Ring Container */}
      <div className="relative w-[80vw] h-[80vw] max-w-[850px] max-h-[850px] md:w-[75vw] md:h-[75vw] lg:w-[70vw] lg:h-[70vw]">
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 -rotate-90 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--progress-track))"
            strokeWidth="1.5"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--progress))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
          {/* Progress indicator dot */}
          <circle
            cx={50 + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2)}
            cy={50 + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2)}
            r="2"
            fill="hsl(var(--progress))"
            className="transition-all duration-300"
          />
        </svg>

        {/* Vinyl Disc */}
        <div
          className={`absolute inset-[8%] rounded-full overflow-hidden ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        >
          <img
            src={cdDiscImage}
            alt="Vinyl disc"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Play Button */}
        <button
          onClick={onTogglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-card flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-foreground" fill="currentColor" />
          ) : (
            <Play className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-foreground ml-1" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VinylDisc;