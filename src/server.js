import("dotenv/config.js");
import "express-async-errors";
import express from "express";
import routes from "./routes/index.js";
import * as uploadConfig from "./configs/upload.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
