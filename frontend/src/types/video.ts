export interface VideoSource {
  id: string;
  url: string;
  title?: string;
}

export interface VideoPlayerProps {
  source: VideoSource;
  autoPlay?: boolean;
  muted?: boolean;
  watermark?: string;
  onError?: (error: Error) => void;
  width?: number | string;
  height?: number | string;
}

export interface VideoControlsState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  buffered: TimeRanges | null;
}
