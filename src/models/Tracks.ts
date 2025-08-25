import console = require("console");
import mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
	timeStamp: Number,
	coordinates: {
		latitude: Number,
		longitude: Number,
		altitude: Number,
		accuracy: Number,
		heading: Number,
		speed: Number,
	},
});

const trackSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	name: {
		type: String,
		default: "",
	},
	location: [pointSchema],
});

mongoose.model("Track", trackSchema);
