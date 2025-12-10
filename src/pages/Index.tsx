import { useState } from "react";
import Header from "@/components/player/Header";
import VinylDisc from "@/components/player/VinylDisc";
import SongInfo from "@/components/player/SongInfo";
import QueueList from "@/components/player/QueueList";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { demoTracks } from "@/data/demoTracks";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"queue" | "playlists">("queue");
  
  const {
    currentTrack,
    currentTrackId,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlay,
    selectTrack,
  } = useAudioPlayer(demoTracks);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Left Side - Vinyl Disc (partially hidden on left) */}
          <div className="relative lg:fixed lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-[30%]">
            <VinylDisc
              isPlaying={isPlaying}
              progress={progress}
              onTogglePlay={togglePlay}
            />
          </div>

          {/* Right Side - Song Info & Queue */}
          <div className="w-full lg:ml-auto lg:w-[45%] lg:pr-12 px-6 py-8 lg:py-16">
            <SongInfo
              title={currentTrack.title}
              artist={currentTrack.artist}
              currentTime={currentTime}
              duration={duration}
            />

            {activeTab === "queue" && (
              <QueueList
                tracks={demoTracks}
                currentTrackId={currentTrackId}
                onTrackSelect={selectTrack}
              />
            )}

            {activeTab === "playlists" && (
              <div className="mt-8 md:mt-12 text-center py-12 text-muted-foreground">
                <p>Playlists feature coming soon</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;