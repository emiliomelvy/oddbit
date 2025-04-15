import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use("/", videoRoutes);

app.use("/static", express.static(path.join(__dirname, "../videos")));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

app.listen(PORT, () => {
  console.log(`Video streaming server running on port ${PORT}`);
});
