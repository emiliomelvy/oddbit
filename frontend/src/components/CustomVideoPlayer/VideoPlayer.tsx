import React, { useEffect } from "react";
import { VideoPlayerProps } from "../../types/video";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  autoPlay = false,
  muted = false,
  width = "100%",
  height = "auto",
}) => {
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
        style={{ display: "none" }}
        crossOrigin="anonymous"
        preload="auto"
      />
    </div>
  );
};

export default VideoPlayer;
