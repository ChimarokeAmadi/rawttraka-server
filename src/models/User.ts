import Error = require("mongoose");
import mongoose = require("mongoose");
import Document = require("mongoose");
const bcrypt = require("bcrypt");

export interface userDocument extends Document {
	_id: string;
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified) {
		return next();
	}

	bcrypt.genSalt(10, (err: Error, salt: string) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
	const user = this;
	return new Promise((resolve, reject) => {
		bcrypt.compare(
			candidatePassword,
			user.password,
			(err: Error, isMatch: boolean) => {
				if (err) {
					return reject(err);
				}
				if (!isMatch) {
					reject(false);
				}

				resolve(true);
			}
		);
	});
};

mongoose.model("User", userSchema);
