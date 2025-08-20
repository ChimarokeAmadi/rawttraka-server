import type userDocument = require("../models/User");

declare global {
	namespace Express {
		export interface Request {
			user?: userDocument;
		}
	}
}
