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

const Controls: React.FC<ControlsProps> = ({
  onTogglePlay,
  onMute,
  onToggleFullscreen,
}) => {
  return (
    <div className="video-controls">
      <div className="progress-container">
        <div className="progress-buffer" />
        <div className="progress-played" />
        <input
          type="range"
          min="0"
          max={0}
          step="0.1"
          value={0}
          onChange={() => {}}
          className="progress-slider"
        />
      </div>

      <div className="controls-main">
        <button className="control-button" onClick={onTogglePlay}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <div className="volume-container">
          <button className="control-button" onClick={onMute}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={0}
            onChange={() => {}}
            className="volume-slider"
          />
        </div>

        <div className="time-display"></div>

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
