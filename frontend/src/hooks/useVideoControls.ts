import { useState, useRef, useEffect, useCallback } from "react";
import { VideoControlsState } from "../types/video";

export const useVideoControls = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const [controls, setControls] = useState<VideoControlsState>({
    isPlaying: false,
    isMuted: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    buffered: null,
  });

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setControls((prev) => ({ ...prev, isPlaying: true }));
        })
        .catch((err) => {
          setError(new Error("Failed to play video: " + err.message));
        });
    }
  }, []);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setControls((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (controls.isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [controls.isPlaying, handlePause, handlePlay]);

  const handleMute = useCallback(() => {
    if (videoRef.current) {
      const newMutedState = !controls.isMuted;
      videoRef.current.muted = newMutedState;
      setControls((prev) => ({ ...prev, isMuted: newMutedState }));
    }
  }, [controls.isMuted]);

  const handleVolumeChange = useCallback((value: number) => {
    if (videoRef.current) {
      const volume = Math.max(0, Math.min(1, value));
      videoRef.current.volume = volume;
      setControls((prev) => ({
        ...prev,
        volume,
        isMuted: volume === 0,
      }));
    }
  }, []);

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setControls((prev) => ({ ...prev, currentTime: time }));
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = canvasRef.current?.parentElement;

    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        setError(
          new Error(`Error attempting to enable fullscreen: ${err.message}`)
        );
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleTimeUpdate = () => {
      setControls((prev) => ({
        ...prev,
        currentTime: video.currentTime,
        buffered: video.buffered,
      }));
    };

    const handleDurationChange = () => {
      setControls((prev) => ({ ...prev, duration: video.duration }));
    };

    const handleLoadedMetadata = () => {
      setControls((prev) => ({
        ...prev,
        duration: video.duration,
        buffered: video.buffered,
      }));
      setLoading(false);
    };

    const handleError = (e: ErrorEvent) => {
      setError(new Error("Video playback error: " + e.message));
      setLoading(false);
    };

    const handleFullscreenChange = () => {
      setControls((prev) => ({
        ...prev,
        isFullscreen: !!document.fullscreenElement,
      }));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError as EventListener);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError as EventListener);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    controls,
    loading,
    error,
    togglePlay,
    handleMute,
    handleVolumeChange,
    handleSeek,
    toggleFullscreen,
    retryOnError: () => setError(null),
  };
};
