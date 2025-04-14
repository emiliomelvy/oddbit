import React, { useEffect } from "react";
import { VideoPlayerProps } from "../../types/video";
import { useVideoControls } from "../../hooks/useVideoControls";
import CanvasRenderer from "./CanvasRenderer";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  autoPlay = false,
  muted = false,
  onError,
  width = "100%",
  height = "auto",
}) => {
  const { videoRef, canvasRef, loading, error, retryOnError } =
    useVideoControls();

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.src = source.url;
    video.autoplay = autoPlay;
    video.muted = muted;

    return () => {
      video.src = "";
    };
  }, [source.url, autoPlay, muted, videoRef]);

  return (
    <div
      className="video-player-container"
      style={{
        position: "relative",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        style={{ display: "none" }}
        crossOrigin="anonymous"
        preload="auto"
      />

      <CanvasRenderer
        videoRef={videoRef}
        canvasRef={canvasRef}
        width={width}
        height={height}
      />
      {loading && <LoadingState />}
      {error && <ErrorState error={error} onRetry={retryOnError} />}
    </div>
  );
};

export default VideoPlayer;
