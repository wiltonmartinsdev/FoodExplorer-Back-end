import knex from "../database/knex/index.js";
import App_Error from "../utils/App_Error.js";
import "express-async-errors";
import pkg from "bcryptjs";
const { hash } = pkg;

class Users_Controller {
	async create(request, response) {
		let { Name, Email, Password } = request.body;

		const registered_User = await knex("users").where({ Email }).first();

		if (registered_User) {
			throw new App_Error(
				"Ops! Parece que esse email já está em uso por outro usuário. Por favor, tente novamente com um email diferente."
			);
		}

		const hashed_Password = await hash(Password, 8);
		Password = hashed_Password;

		await knex("users").insert({ Name, Email, Password });

		return response
			.status(201)
			.json("Parabéns! Seu cadastro foi realizado com sucesso!");
	}
}

export default Users_Controller;
