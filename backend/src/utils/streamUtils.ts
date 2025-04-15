import fs from "fs-extra";
import rangeParser from "range-parser";
import { Request, Response } from "express";
import path from "path";

export const streamVideo = async (
  req: Request,
  res: Response,
  videoPath: string
): Promise<void> => {
  try {
    if (!(await fs.pathExists(videoPath))) {
      res.status(404).send("Video not found");
      return;
    }

    const stat = await fs.stat(videoPath);
    const fileSize = stat.size;
    const { ext } = path.parse(videoPath);

    const contentType = getContentType(ext);

    const rangeHeader = req.headers.range;

    if (rangeHeader) {
      const ranges = rangeParser(fileSize, rangeHeader);

      if (ranges === -1 || ranges === -2 || !("type" in ranges)) {
        res.status(416).send("Range Not Satisfiable");
        return;
      }

      const { start, end } = ranges[0];

      const videoStream = fs.createReadStream(videoPath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": contentType,
      });

      videoStream.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
      });

      const videoStream = fs.createReadStream(videoPath);
      videoStream.pipe(res);
    }
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getContentType = (extension: string): string => {
  switch (extension.toLowerCase()) {
    case ".mp4":
      return "video/mp4";
    case ".webm":
      return "video/webm";
    case ".ogg":
      return "video/ogg";
    default:
      return "application/octet-stream";
  }
};
