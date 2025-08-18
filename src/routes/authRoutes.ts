import type { Request, Response } from "express";
import mongoose = require("mongoose");

const User = mongoose.model("User");

const express = require("express");

const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = new User({ email, password });
	user.save();

	console.log(req.body);

	res.send("You Are Signed Up");
});

module.exports = router;
