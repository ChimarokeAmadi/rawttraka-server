import type { Request, Response } from "express";
import mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const express = require("express");

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = new User({ email, password });

		await user.save();

		console.log(req.body);
		const token = jwt.sign({ userId: user._id }, "MY_SECRET_TOKEN");
		res.send({ token });
	} catch (err: any) {
		return res.status(422).send(err.message);
	}
});

router.post("/signin", async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).send({ error: "Must provide email and password" });
	}
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(422).send({ error: "Invalid email or password" });
	}

	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, "MY_SECRET_TOKEN");
		res.send({ token });
	} catch (err) {
		return res.status(422).send({ error: "Invalid email or password" });
	}
});

module.exports = router;
