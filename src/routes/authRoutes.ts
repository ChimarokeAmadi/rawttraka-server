import type { Request, Response } from "express";
import Error = require("mongoose");
import mongoose = require("mongoose");

const User = mongoose.model("User");

const express = require("express");

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = new User({ email, password });
		await user.save();

		console.log(req.body);

		res.send("You Made a POST Request");
	} catch (err: any) {
		return res.status(422).send(err.message);
	}
});

module.exports = router;
