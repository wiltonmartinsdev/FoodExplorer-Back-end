import knex from "../database/knex/index.js";
import CustomAppError from "../utils/CustomAppError.js";
import "express-async-errors";

class DishesController {
	async create(request, response) {
		try {
			const { DishId } = request.body;

			const userId = request.user.Id;

			const favorite = await knex("favorites").insert({ DishId, userId });

			response.json(favorite);
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
					"Ops! Desculpe, ocorreu um erro ao tentar favoritar o prato devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}

	async index(request, response) {
		try {
			const userId = request.user.Id;

			const favorites = await knex("favorites")
				.select("dishes.*", "favorites.DishId")
				.innerJoin("dishes", "dishes.Id", "favorites.DishId")
				.groupBy("DishId")
				.where({ UserId: userId });

			return response.json(favorites);
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
					"Ops! Desculpe, ocorreu um erro ao tentar mostrar os seus pratos favoritos devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}

	async delete(request, response) {
		try {
			const { DishId } = request.params;

			const UserId = request.user.Id;

			await knex("favorites").where({ DishId, UserId }).delete();

			return response.json(
				"Seu Prato Favorito foi deletado com sucesso!"
			);
		} catch (error) {
			console.error(error);
			return response.status(500).json({
				status: "Error do Servidor",
				message:
					"Ops! Desculpe, ocorreu um erro ao tentar deletar seu prato favorito devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}
}

export default DishesController;
