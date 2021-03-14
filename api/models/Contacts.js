const { Schema, model } = require("mongoose");
const valid = require("validator");

const ContactSchema = new Schema(
	{
		name: { type: String, required: true, trim: true, minlength: 5 },
		phone: { type: String, required: true, unique: true, trim: true },
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
	},
	{ timestamp: true }
);

const Contact = model("Contact", ContactSchema);

module.exports = Contact;
