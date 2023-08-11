class App_Error {
	message;
	statusCode;

	constructor(message, statusCode = 400) {
		this.message = message;
		this.statusCode = statusCode;
	}
}

export default App_Error;
