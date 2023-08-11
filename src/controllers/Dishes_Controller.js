import knex from "../database/knex/index.js";
import App_Error from "../utils/App_Error.js";
import "express-async-errors";

class Dishes_Controller {
	async create(request, response) {
		const { Name, Description, Category, Price, Ingredients } =
			request.body;

		try {
			await knex.transaction(async (trx) => {
				const checking_Dish_Register = await trx("dishes")
					.where({ Name })
					.first();

				if (checking_Dish_Register) {
					throw new App_Error(
						"Ops! Parece que esse prato já foi cadastrado no sistema. Por favor, tente novamente com um nome diferente."
					);
				}

				const [Dish_ID] = await trx("dishes").insert({
					Name,
					Description,
					Category,
					Price,
				});

				const registering_Ingredients = Ingredients.map(
					(Ingredient) => {
						return { Dish_ID, Name: Ingredient };
					}
				);

				await trx("ingredients").insert(registering_Ingredients);

				return response
					.status(201)
					.json(
						"Ótima notícia! O prato foi cadastrado com sucesso no sistema!"
					);
			});
		} catch (error) {
			if (error instanceof App_Error) {
				return response.status(error.statusCode).json({
					status: "Error do Cliente",
					message: error.message,
				});
			}

			console.error(error);
			return response.status(500).json({
				status: "Error do Servidor",
				message:
					"Ops! Desculpe, ocorreu um erro ao tentar cadastrar o prato devido a um problema no servidor. Por favor, tente novamente.",
			});
		}
	}

	async update(request, response) {
		const { Name, Description, Category, Price, Ingredients } =
			request.body;
		const { ID } = request.params;

		try {
			await knex.transaction(async (trx) => {
				const registered_Dishes = await trx("dishes")
					.where({ ID })
					.first();

				if (!registered_Dishes) {
					throw new App_Error(
						"Nenhum prato foi encontrado no sistema. Por favor, tente novamente."
					);
				}

				const checking_Dish_Name = await trx("dishes")
					.where({ Name })
					.first();

				if (
					checking_Dish_Name &&
					checking_Dish_Name.ID !== registered_Dishes.ID
				) {
					throw new App_Error(
						"Ops! Parece que esse prato já foi cadastrado em nosso sistema. Por favor, tente novamente com um nome diferente."
					);
				}

				await trx("dishes").where({ ID }).update({
					Name,
					Description,
					Category,
					Price,
					Updated_at: trx.fn.now(),
				});

				if (Ingredients) {
					const ingredients_Registered = await trx(
						"ingredients"
					).where({ Dish_ID: ID });

					const new_Ingredients = Ingredients.filter((Ingredient) => {
						return !ingredients_Registered.some(
							(ingredient_Registered) => {
								return (
									ingredient_Registered.Name === Ingredient
								);
							}
						);
					});

					for (const ingredient of new_Ingredients) {
						await trx("ingredients").where({ Dish_ID: ID }).insert({
							Dish_ID: ID,
							Name: ingredient,
						});
					}
				}

				return response.json(
					"Ótima notícia! O prato foi atualizado com sucesso!"
				);
			});
		} catch (error) {
			if (error instanceof App_Error) {
				return response.status(error.statusCode).json({
					status: "Error do Cliente",
					message: error.message,
				});
			}

			console.error(error);
			return response.status(500).json({
				status: "Error do Servidor",
				message:
					"Ops! Desculpe, ocorreu um erro ao tentar atualizar o prato devido a um problema no servidor. Por favor, tente novamente.",
			});
		}
	}
}

export default Dishes_Controller;
