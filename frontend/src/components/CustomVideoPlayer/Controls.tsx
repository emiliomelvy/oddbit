import React from "react";
import { VideoControlsState } from "../../types/video";
import "./Controls.css";

interface ControlsProps {
  controls: VideoControlsState;
  onTogglePlay: () => void;
  onMute: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  onToggleFullscreen: () => void;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
};

const Controls: React.FC<ControlsProps> = ({
  controls,
  onTogglePlay,
  onMute,
  onVolumeChange,
  onSeek,
  onToggleFullscreen,
}) => {
  const { isPlaying, isMuted, volume, currentTime, duration, buffered } =
    controls;

  const getBufferedWidth = (): string => {
    if (!buffered || buffered.length === 0 || duration === 0) return "0%";

    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
        return `${(buffered.end(i) / duration) * 100}%`;
      }
    }

    return "0%";
  };

  return (
    <div className="video-controls">
      <div className="progress-container">
        <div
          className="progress-buffer"
          style={{ width: getBufferedWidth() }}
        />
        <div
          className="progress-played"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="progress-slider"
        />
      </div>

      <div className="controls-main">
        <button className="control-button" onClick={onTogglePlay}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="volume-container">
          <button className="control-button" onClick={onMute}>
            {isMuted || volume === 0 ? (
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : volume > 0.5 ? (
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>

        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span> / </span>
          <span>{formatTime(duration)}</span>
        </div>

        <button className="control-button" onClick={onToggleFullscreen}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Controls;
