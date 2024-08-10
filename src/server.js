import("dotenv/config.js");
import cors from "cors";
import express from "express";

import "express-async-errors";
import * as uploadConfig from "./configs/upload.js";
import routes from "./routes/index.js";
import CustomAppError from "./utils/CustomAppError.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
	if (error instanceof CustomAppError) {
		return response.status(error.statusCode).json({
			status: "Error do Usuário",
			message: error.message,
		});
	}
	console.error(error);

	return response.status(500).json({
		status: "Error do Servidor",
		message: "Internal Error Server",
	});
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
