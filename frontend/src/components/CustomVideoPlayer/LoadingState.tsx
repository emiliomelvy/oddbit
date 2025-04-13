import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div
      className="loading-state"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="spinner">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          style={{
            animation: "rotate 2s linear infinite",
          }}
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeDasharray="90, 150"
            strokeDashoffset="0"
            style={{
              animation: "dash 1.5s ease-in-out infinite",
            }}
          />
        </svg>
        <style>
          {`  
            @keyframes rotate {  
              100% {  
                transform: rotate(360deg);  
              }  
            }  
            @keyframes dash {  
              0% {  
                stroke-dasharray: 1, 150;  
                stroke-dashoffset: 0;  
              }  
              50% {  
                stroke-dasharray: 90, 150;  
                stroke-dashoffset: -35;  
              }  
              100% {  
                stroke-dasharray: 90, 150;  
                stroke-dashoffset: -124;  
              }  
            }  
          `}
        </style>
      </div>
      <p style={{ color: "white", marginLeft: "15px" }}>Loading video...</p>
    </div>
  );
};

export default LoadingState;
