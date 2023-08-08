import "express-async-errors";
import AppError from "./utils/AppError.js";
import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "Error do Cliente",
			message: error.message,
		});
	}

	return response.status(500).json({
		status: "Error do Servidor",
		message: "O Servidor não esta respondendo, tente novamente!",
	});
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
