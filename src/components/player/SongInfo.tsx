interface SongInfoProps {
  title: string;
  artist: string;
  currentTime: string;
  duration: string;
}

const SongInfo = ({ title, artist, currentTime, duration }: SongInfoProps) => {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase mb-2">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground mb-4">{artist}</p>
      <p className="text-sm text-muted-foreground">
        {currentTime} / {duration}
      </p>
    </div>
  );
};

export default SongInfo;