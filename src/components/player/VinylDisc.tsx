import { Play, Pause } from "lucide-react";
import cdDiscImage from "@/assets/cd-disc.png";

interface VinylDiscProps {
  isPlaying: boolean;
  progress: number;
  onTogglePlay: () => void;
}

const VinylDisc = ({ isPlaying, progress, onTogglePlay }: VinylDiscProps) => {
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Progress Ring Container */}
      <div className="relative">
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          width="320"
          height="320"
          viewBox="0 0 320 320"
        >
          {/* Background track */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="hsl(var(--progress-track))"
            strokeWidth="6"
          />
          {/* Progress arc */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="hsl(var(--progress))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
          {/* Progress indicator dot */}
          <circle
            cx={160 + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2)}
            cy={160 + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2)}
            r="8"
            fill="hsl(var(--progress))"
            className="transition-all duration-300"
          />
        </svg>

        {/* Vinyl Disc */}
        <div
          className={`w-[280px] h-[280px] rounded-full overflow-hidden ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
          style={{ margin: "20px" }}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-card flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-foreground" fill="currentColor" />
          ) : (
            <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VinylDisc;