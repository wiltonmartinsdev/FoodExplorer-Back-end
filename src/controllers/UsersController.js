import knex from "../database/knex/index.js";
import CustomAppError from "../utils/CustomAppError.js";
import "express-async-errors";
import pkg from "bcryptjs";
const { hash } = pkg;

class UsersController {
	async create(request, response) {
		let { name, email, password } = request.body;

		try {
			await knex.transaction(async (trx) => {
				const registeredUser = await trx("users")
					.where({ email })
					.first();

				if (registeredUser) {
					throw new CustomAppError(
						"Ops! Parece que esse email já está em uso por outro usuário. Por favor, tente novamente com um email diferente."
					);
				}

				const hashedPassword = await hash(password, 8);
				password = hashedPassword;

				await trx("users").insert({ name, email, password });

				return response
					.status(201)
					.json("Parabéns! Seu cadastro foi realizado com sucesso!");
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
					"Ops! Desculpe, ocorreu um erro ao tentar cadastrar um usuário devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}
}

export default UsersController;
