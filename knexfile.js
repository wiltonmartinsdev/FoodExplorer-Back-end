import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const development = {
	development: {
		client: "sqlite3",
		connection: {
			filename: path.resolve(__dirname, "src", "database", "database.db"),
		},

		pool: {
			afterCreate: (connection, callBack) =>
				connection.run("PRAGMA foreign_keys = ON", callBack),
		},

		migrations: {
			directory: path.resolve(
				__dirname,
				"src",
				"database",
				"knex",
				"migrations"
			),
		},
		useNullAsDefault: true,
	},
};

export default development;
