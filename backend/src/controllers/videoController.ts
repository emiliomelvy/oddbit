import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";
import { streamVideo as streamVideoUtil } from "../utils/streamUtils";

// Directory where videos are stored
const VIDEOS_DIR = path.join(__dirname, "../../video");

// Get list of available videos
export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = await fs.readdir(VIDEOS_DIR);

    // Create a response with video information
    const videos = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".mp4", ".webm", ".ogg"].includes(ext);
      })
      .map((file) => {
        const id = path.parse(file).name;
        return {
          id,
          url: `/video/${id}`,
          title: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " "),
        };
      });

    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// Stream a specific video
export const streamVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id || /[^a-zA-Z0-9_-]/.test(id)) {
      res.status(400).send("Invalid video ID");
      return;
    }

    const files = await fs.readdir(VIDEOS_DIR);

    const videoFile = files.find((file) => {
      const fileName = path.parse(file).name;
      return fileName === id;
    });

    if (!videoFile) {
      res.status(404).send("Video not found");
      return;
    }

    const videoPath = path.join(VIDEOS_DIR, videoFile);

    await streamVideoUtil(req, res, videoPath);
  } catch (error) {
    console.error(`Error streaming video ${id}:`, error);
    res.status(500).send("Internal Server Error");
  }
};
