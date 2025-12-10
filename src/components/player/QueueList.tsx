interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface QueueListProps {
  tracks: Track[];
  currentTrackId: number;
  onTrackSelect: (id: number) => void;
}

const QueueList = ({ tracks, currentTrackId, onTrackSelect }: QueueListProps) => {
  return (
    <div className="mt-8 md:mt-12">
      <h2 className="text-lg font-semibold mb-4 tracking-wide">QUEUE</h2>
      
      <div className="space-y-3">
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => onTrackSelect(track.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-secondary/70 ${
              currentTrackId === track.id ? "bg-secondary" : ""
            }`}
          >
            {/* Track Number */}
            <span className="w-8 text-sm text-muted-foreground font-medium">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Album Cover */}
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Track Info */}
            <div className="flex-1 text-left min-w-0">
              <p className="font-medium truncate">{track.title}</p>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>

            {/* Duration */}
            <span className="text-sm text-muted-foreground">{track.duration}</span>
          </button>
        ))}
      </div>

      <button className="mt-4 text-sm text-primary font-medium hover:underline">
        VIEW MORE
      </button>
    </div>
  );
};

export default QueueList;