import { useState, useRef, useEffect, useCallback } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

export const useAudioPlayer = (tracks: Track[]) => {
  const [currentTrackId, setCurrentTrackId] = useState(tracks[0]?.id || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks.find((t) => t.id === currentTrackId) || tracks[0];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = currentTrack.audioUrl;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const handleEnded = () => {
      const currentIndex = tracks.findIndex((t) => t.id === currentTrackId);
      if (currentIndex < tracks.length - 1) {
        setCurrentTrackId(tracks[currentIndex + 1].id);
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackId, currentTrack.audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const selectTrack = useCallback((id: number) => {
    if (id !== currentTrackId) {
      setCurrentTrackId(id);
      setProgress(0);
      setCurrentTime("0:00");
      setIsPlaying(true);
    } else {
      togglePlay();
    }
  }, [currentTrackId, togglePlay]);

  return {
    currentTrack,
    currentTrackId,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlay,
    selectTrack,
  };
};