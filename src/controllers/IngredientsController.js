import knex from "../database/knex/index.js";
import "express-async-errors";

class IngredientsController {
	async delete(request, response) {
		const { Id } = request.params;

		try {
			await knex.transaction(async (trx) => {
				await trx("ingredients").where({ Id }).delete();

				return response.json(
					"Ingrediente deletado com sucesso do sistema!"
				);
			});
		} catch (error) {
			console.error(error);
			return response.status(500).json({
				status: "Error do Servidor",
				message:
					"Ops! Desculpe, ocorreu um erro ao tentar deletar as informações do ingrediente devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}
}

export default IngredientsController;
