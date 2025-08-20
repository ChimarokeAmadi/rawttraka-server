require("./models/User");
import type { Request, Response } from "express";
import mongoose = require("mongoose");
import authRoutes = require("./routes/authRoutes");
import bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const express = require("express");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
	"mongodb+srv://workAdmin:workAdmin1.@cluster0.85rpsxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => [
	console.log("Connected to Mongo instance"),
]);
mongoose.connection.on("error", (err) => [
	console.log("Error connecting to Mongo instance", err),
]);
app.get("/", requireAuth, (req: Request, res: Response) => {
	res.send(`Your Email is ${req.user.email}`);
});

app.listen(3001, () => {
	console.log("Listening to Port 3001");
});
