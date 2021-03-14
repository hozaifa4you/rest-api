const { Schema, model } = require("mongoose");
const valid = require("validator");

const UserSchema = new Schema({
	username: { type: String, unique: true, required: true, trim: true },
	email: {
		type: String,
		trim: true,
		unique: true,
		validate: {
			validator: v => {
				return valid.isEmail(v);
			},
			message: `{value} is not email`,
		},
	},
	password: { type: String, required: true, trim: false },
});

const User = model("User", UserSchema);

module.exports = User;
