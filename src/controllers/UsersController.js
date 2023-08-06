import AppError from "../Utils/AppError.js";

class UserController {
	create(request, response) {
		const { name, email, password } = request.body;

		if (!name) {
			throw new AppError("O nome do usuário é obrigatório!");
		}

		return response.status(201).json({ name, email, password });
	}
}

export default UserController;
