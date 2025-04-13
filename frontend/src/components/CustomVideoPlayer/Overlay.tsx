import React from "react";

interface OverlayProps {
  watermark?: string;
  timestamp: number;
  duration: number;
}

const Overlay: React.FC<OverlayProps> = ({
  watermark,
  timestamp,
  duration,
}) => {
  const formatTimestamp = () => {
    const date = new Date(0);
    date.setSeconds(timestamp);
    return date.toISOString().substr(11, 8);
  };

  return (
    <div className="video-overlay">
      {watermark && (
        <div
          className="watermark"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "rgba(255, 255, 255, 0.7)",
            padding: "5px 10px",
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        >
          {watermark}
        </div>
      )}

      <div
        className="timestamp"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.9)",
          padding: "3px 8px",
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "4px",
          pointerEvents: "none",
        }}
      >
        {formatTimestamp()} /{" "}
        {duration > 0
          ? new Date(duration * 1000).toISOString().substr(11, 8)
          : "00:00:00"}
      </div>
    </div>
  );
};

export default Overlay;
