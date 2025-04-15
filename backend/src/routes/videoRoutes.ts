import { Router } from "express";
import * as videoController from "../controllers/videoController";

const router = Router();

router.get("/videos", videoController.getVideos);

router.get("/video/:id", videoController.streamVideo);

export default router;
