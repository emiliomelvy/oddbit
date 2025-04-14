import React, { useState, useEffect } from "react";
import VideoPlayer from "../CustomVideoPlayer";
import { VideoSource } from "../../types/video";
import { fetchVideoSources } from "../../api/videoService";

interface MultiStreamViewProps {
  initialSources?: VideoSource[];
  rows?: number;
  cols?: number;
}

const MultiStreamView: React.FC<MultiStreamViewProps> = ({
  initialSources,
  rows = 2,
  cols = 2,
}) => {
  const [videoSources, setVideoSources] = useState<VideoSource[]>(
    initialSources || []
  );
  const [loading, setLoading] = useState(!initialSources);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!initialSources) {
      const loadSources = async () => {
        try {
          setLoading(true);
          const sources = await fetchVideoSources();
          setVideoSources(sources);
          setError(null);
        } catch (err) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to load video sources")
          );
        } finally {
          setLoading(false);
        }
      };

      loadSources();
    }
  }, [initialSources]);

  const handleVideoError = (id: string, error: Error) => {
    console.error(`Error with video ${id}:`, error);
  };

  if (loading) {
    return (
      <div className="multi-stream-loading">
        <p>Loading video streams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="multi-stream-error">
        <h3>Error Loading Streams</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: "10px",
    width: "100%",
    height: "100%",
  };

  return (
    <div
      className="multi-stream-container"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="multi-stream-grid" style={gridStyle}>
        {videoSources.slice(0, rows * cols).map((source, index) => (
          <div key={source.id} className="stream-item">
            <VideoPlayer
              source={source}
              watermark={`Stream ${index + 1}`}
              onError={(err) => handleVideoError(source.id, err)}
              width="100%"
              height="100%"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiStreamView;
