import knex from "../database/knex/index.js";
import CustomAppError from "../utils/CustomAppError.js";
import authConfig from "../configs/authConfig.js";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { compare } = pkg;

class SessionsController {
	async create(request, response) {
		const { email, password } = request.body;

		try {
			await knex.transaction(async (trx) => {
				const registeredUser = await trx("users")
					.where({ email })
					.first();

				if (!registeredUser) {
					throw new CustomAppError(
						"Ops! Parece que o email e/ou senha estão incorretos. Por favor, tente novamente!",
						401
					);
				}

				const passwordMatched = await compare(
					password,
					registeredUser.Password
				);

				if (!passwordMatched) {
					throw new CustomAppError(
						"Ops! Parece que o email e/ou senha estão incorretos. Por favor, tente novamente!",
						401
					);
				}

				const { secret, expiresIn } = authConfig.jwt;
				const token = jwt.sign({}, secret, {
					subject: String(registeredUser.Id),
					expiresIn,
				});

				return response.json({ registeredUser, token });
			});
		} catch (error) {
			if (error instanceof CustomAppError) {
				return response.status(error.statusCode).json({
					status: "Error do Cliente",
					message: error.message,
				});
			}

			console.error(error);
			return response.status(500).json({
				status: "Error do Servidor",
				message:
					"Ops! Desculpe, ocorreu um erro ao tentar entrar no sistema devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}
}

export default SessionsController;
