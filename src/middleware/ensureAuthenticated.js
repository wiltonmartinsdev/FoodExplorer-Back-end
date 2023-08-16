import jwt from "jsonwebtoken";
import CustomAppError from "../utils/CustomAppError.js";
import authConfig from "../configs/authConfig.js";

function ensureAuthenticated(request, response, next) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new CustomAppError("JWT Token não informado!", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: userId } = jwt.verify(token, authConfig.jwt.secret);

		request.user = {
			Id: Number(userId),
		};

		return next();
	} catch {
		throw new CustomAppError("JWT Token inválido", 401);
	}
}

export default ensureAuthenticated;
