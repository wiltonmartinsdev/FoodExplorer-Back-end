import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import "express-async-errors";
import pkg from "bcryptjs";
const { hash } = pkg;

class UsersController {
	async create(request, response) {
		let { name, email, password} = request.body;

		const checkingUsersExist = await knex("users").where({ email }).first();

		if (checkingUsersExist) {
			throw new AppError(
				"E-mail já está em uso! Tente outro endereço de email."
			);
		}

		const hashedPassword = await hash(password, 8);
		password = hashedPassword;

		await knex("users").insert({ name, email, password});

		response.status(201).json("Usuário Cadastrado com Sucesso!");
	}
}

export default UsersController;
