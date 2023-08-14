import knex from "../database/knex/index.js";
import CustomAppError from "../utils/CustomAppError.js";
import "express-async-errors";

class DishesController {
	async create(request, response) {
		const { Name, Description, Category, Price, Ingredients } =
			request.body;

		try {
			await knex.transaction(async (trx) => {
				const registeredDish = await trx("dishes")
					.where({ Name })
					.first();

				if (registeredDish) {
					throw new CustomAppError(
						"Ops! Parece que esse prato já foi cadastrado no sistema. Por favor, tente novamente com um nome diferente."
					);
				}

				const [DishId] = await trx("dishes").insert({
					Name,
					Description,
					Category,
					Price,
				});

				const registeringIngredients = Ingredients.map((Ingredient) => {
					return { DishId, Name: Ingredient };
				});

				await trx("ingredients")
					.where({ DishId })
					.insert(registeringIngredients);

				return response
					.status(201)
					.json(
						"Ótima notícia! O prato foi cadastrado com sucesso no sistema!"
					);
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
					"Ops! Desculpe, ocorreu um erro ao tentar cadastrar o prato devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}

	async update(request, response) {
		const { Name, Description, Category, Price, Ingredients } =
			request.body;
		const { Id } = request.params;

		try {
			await knex.transaction(async (trx) => {
				const registeredDishes = await trx("dishes")
					.where({ Id })
					.first();

				if (!registeredDishes) {
					throw new CustomAppError(
						"Nenhum prato foi encontrado no sistema. Por favor, tente novamente."
					);
				}

				const dishName = await trx("dishes").where({ Name }).first();

				if (dishName && dishName.Id !== registeredDishes.Id) {
					throw new CustomAppError(
						"Ops! Parece que esse prato já foi cadastrado em nosso sistema. Por favor, tente novamente com um nome diferente."
					);
				}

				await trx("dishes").where({ Id }).update({
					Name,
					Description,
					Category,
					Price,
					UpdatedAt: trx.fn.now(),
				});

				if (Ingredients) {
					const registeredIngredients = await trx(
						"ingredients"
					).where({ DishId: Id });

					const newIngredients = Ingredients.filter((Ingredient) => {
						return !registeredIngredients.some(
							(ingredientRegistered) => {
								return ingredientRegistered.Name === Ingredient;
							}
						);
					});

					for (const ingredient of newIngredients) {
						await trx("ingredients").where({ DishId: Id }).insert({
							DishId: Id,
							Name: ingredient,
						});
					}
				}

				return response.json(
					"Ótima notícia! O prato foi atualizado com sucesso!"
				);
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
					"Ops! Desculpe, ocorreu um erro ao tentar atualizar o prato devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}

	async show(request, response) {
		const { Id } = request.params;

		try {
			await knex.transaction(async (trx) => {
				const dishInformation = await trx("dishes")
					.where({ Id })
					.first();

				const ingredientInformation = await trx("ingredients").where({
					DishId: Id,
				});

				return response.json({
					...dishInformation,
					ingredientInformation,
				});
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
					"Ops! Desculpe, ocorreu um erro ao tentar mostrar as informações do prato devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}

	async index(request, response) {
		let { name, ingredients } = request.query;

		try {
			await knex.transaction(async (trx) => {
				let dishes;

				if (!name && !ingredients) {
					throw new CustomAppError(
						"Ops! Parece que o campo está vazio. Por favor, digite o nome ou ingrediente do prato para realizar a pesquisa!"
					);
				}

				if (ingredients) {
					const ingredientsToCheck = ingredients
						.split(",")
						.map((ingredient) => {
							return ingredient.trim();
						});

					dishes = await trx("ingredients")
						.select([
							"dishes.Id",
							"dishes.Name",
							"dishes.Description",
							"dishes.Category",
							"dishes.Price",
						])
						.whereIn("ingredients.Name", ingredientsToCheck)
						.orWhere("ingredients.Name", "like", `%${ingredients}%`)
						.orderBy("dishes.Name")
						.innerJoin("dishes", "dishes.Id", "ingredients.DishId");
				} else {
					dishes = await trx("dishes").where(
						"Name",
						"like",
						`%${name}%`
					);
				}

				const dishIngredients = await trx("ingredients");

				const dishMatchingWithIngredients = dishes.map((dish) => {
					const dishWithFilteredIngredients = dishIngredients.filter(
						(ingredient) => {
							return ingredient.DishId === dish.Id;
						}
					);

					return {
						dish,
						Ingredients: dishWithFilteredIngredients,
					};
				});

				return response.json(dishMatchingWithIngredients);
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
					"Ops! Desculpe, ocorreu um erro ao tentar mostrar as informações do prato devido a algum problema no servidor. Por favor, tente novamente.",
			});
		}
	}
}

export default DishesController;