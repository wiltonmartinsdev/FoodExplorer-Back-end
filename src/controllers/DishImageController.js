import knex from "../database/knex/index.js";
import CustomAppError from "../utils/CustomAppError.js";
import "express-async-errors";
import DiskStorage from "../providers/DiskStorage.js";

class DishImageController {
	async update(request, response) {
		try {
			const { Id } = request.params;

			const imageFilename = request.file.filename;

			const diskStorage = new DiskStorage();

			const dish = await knex("dishes").where({ Id }).first();

			if (!dish) {
				throw new CustomAppError(
					"Ops! Parece que este prato não está cadastrado em nosso sistema. Por favor, verifique o nome ou tente um prato diferente.",
					401
				);
			}

			if (dish.Image) {
				await diskStorage.deleteFile(dish.Image);
			}

			const filename = await diskStorage.saveFile(imageFilename);
			dish.Image = filename;

			await knex("dishes").where({ Id }).update(dish);

			return response.json(dish);
		} catch (error) {
			throw new CustomAppError(
				"Ops! Infelizmente, não conseguimos atualizar a imagem desta vez. Por favor, tente novamente. ",
				400
			);
		}
	}
}

export default DishImageController;
