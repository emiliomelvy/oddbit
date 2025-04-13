import React from "react";

interface ErrorStateProps {
  error: Error;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div
      className="error-state"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "20px",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="64"
        height="64"
        style={{ fill: "#f44336", marginBottom: "15px" }}
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <h3 style={{ color: "white", marginBottom: "10px" }}>
        Video Playback Error
      </h3>
      <p style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
        {error.message}
      </p>
      <button
        onClick={onRetry}
        style={{
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
