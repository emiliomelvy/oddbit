import React from "react";

const MultiStreamView: React.FC = () => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${2}, 1fr)`,
    gridTemplateRows: `repeat(${2}, 1fr)`,
    gap: "10px",
    width: "100%",
    height: "100%",
  };

  return (
    <div
      className="multi-stream-container"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="multi-stream-grid" style={gridStyle}></div>
    </div>
  );
};

export default MultiStreamView;
