import { useRef, useEffect, useCallback } from "react";

interface CanvasRendererProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  width: number | string;
  height: number | string;
}

const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  videoRef,
  canvasRef,
  width,
  height,
}) => {
  const animationRef = useRef<number | null>(null);

  const renderFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && video.readyState >= 2) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        if (
          canvas.width !== video.videoWidth ||
          canvas.height !== video.videoHeight
        ) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }

    animationRef.current = requestAnimationFrame(renderFrame);
  }, [videoRef, canvasRef]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [renderFrame]);

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
