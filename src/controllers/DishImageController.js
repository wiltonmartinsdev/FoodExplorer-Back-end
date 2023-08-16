import knex from "../database/knex/index.js";
import CustomAppError from "../utils/CustomAppError.js";
import "express-async-errors";
import DiskStorage from "../providers/DiskStorage.js";

class DishImageController {
	async update(request, response) {
		const userId = request.user.Id;

		const imageFilename = request.file.filename;

		const diskStorage = new DiskStorage();

		const dish = await knex("dishes").where({ Id: userId }).first();

		if (!dish) {
			throw new CustomAppError("Este prato não existe!", 401);
		}

		if (dish.Image) {
			await diskStorage.deleteFile(dish.Image);
		}

		const filename = await diskStorage.saveFile(imageFilename);
		dish.Image = filename;

		await knex("dishes").where({ Id: userId }).update(dish);

		return response.json(dish);
	}
}

export default DishImageController;
