import type { Request, Response, NextFunction } from "express";
import mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

interface Payload {
	userId: string;
}

module.exports = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).send({ error: "You must be logged in." });
	}

	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, "MY_SECRET_TOKEN", async (err: Error, payload: Payload) => {
		if (err || !payload) {
			return res.status(401).send({ error: "Invalid or expired token" });
		}

		const { userId } = payload;
		const user = await User.findById(userId);
		req.user = user;
		next();
	});
};
