import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import apiRoutes from "./routes/api";
import { connect } from "./utils/db";

const PORT = process.env.PORT || 5000;

(async () => {
  const app = express();

  await connect();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.use("/media", express.static(path.join(__dirname, "media")));

  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.use("/", (_, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
  });
})();
