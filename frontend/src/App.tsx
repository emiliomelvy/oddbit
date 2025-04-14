import { useState } from "react";
import VideoPlayer from "./components/CustomVideoPlayer";
import MultiStreamView from "./components/MultiStreamView";
import { getVideoStreamUrl } from "./api/videoService";
import "./App.css";

function App() {
  const [showMultiView, setShowMultiView] = useState(false);

  const sampleSource = {
    id: "sample-video",
    url: getVideoStreamUrl("sample"),
    title: "Sample Video Stream",
  };

  return (
    <div className="app-container">
      <header>
        <h1>Video Player</h1>
        <button onClick={() => setShowMultiView(!showMultiView)}>
          {showMultiView ? "Show Single Player" : "Show Multi-Stream View"}
        </button>
      </header>

      <main>
        {showMultiView ? (
          <MultiStreamView
            initialSources={[
              sampleSource,
              {
                id: "video2",
                url: getVideoStreamUrl("video2"),
                title: "Stream 2",
              },
              {
                id: "video3",
                url: getVideoStreamUrl("video3"),
                title: "Stream 3",
              },
              {
                id: "video4",
                url: getVideoStreamUrl("video4"),
                title: "Stream 4",
              },
            ]}
          />
        ) : (
          <div className="single-player-container">
            <VideoPlayer
              source={sampleSource}
              watermark="Demo Player"
              width="100%"
              height="auto"
              onError={(err) => console.error("Video playback error:", err)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
