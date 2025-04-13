import { VideoSource } from "../types/video";

const API_URL = "http://localhost:3001";

export const fetchVideoSources = async (): Promise<VideoSource[]> => {
  try {
    const response = await fetch(`${API_URL}/videos`);

    if (!response.ok) {
      throw new Error(`Failed to fetch video sources: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching video sources:", error);
    throw error;
  }
};

export const getVideoStreamUrl = (videoId: string): string => {
  return `${API_URL}/video/${videoId}`;
};
