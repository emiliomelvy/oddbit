interface CanvasRendererProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  width: number | string;
  height: number | string;
}

const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  canvasRef,
  width,
  height,
}) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        display: "block",
        objectFit: "contain",
      }}
    />
  );
};

export default CanvasRenderer;
