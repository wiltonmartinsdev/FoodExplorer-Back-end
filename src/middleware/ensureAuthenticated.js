import jwt from "jsonwebtoken";
import CustomAppError from "../utils/CustomAppError.js";
import authConfig from "../configs/authConfig.js";

function ensureAuthenticated(request, response, next) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new CustomAppError(
			"Ops! Parece que o Token JWT não foi informado. Certifique-se de incluir o Token JWT para prosseguir.",
			401
		);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: userId } = jwt.verify(token, authConfig.jwt.secret);

		request.user = {
			Id: Number(userId),
		};

		return next();
	} catch {
		throw new CustomAppError(
			"Ops! Parece que o Token JWT que você forneceu não é válido. Verifique novamente e insira um Token JWT válido para continuar.",
			401
		);
	}
}

export default ensureAuthenticated;
