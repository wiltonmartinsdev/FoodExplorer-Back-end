import multer from "multer";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import crypto from "crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
	storage: multer.diskStorage({
		destination: TMP_FOLDER,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString("hex");

			const fileName = `${fileHash}-${file.originalname}`;

			return callback(null, fileName);
		},
	}),
};

export { TMP_FOLDER, UPLOADS_FOLDER, MULTER };
