const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// login
router.post("/login", (req, res, next) => {
	let { email, password } = req.body;

	User.findOne({ email }).then(user => {
		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				if (err) {
					res.status(401).json({ msg: "Error Occurred!" });
				}

				if (result) {
					res.status(200).json({ msg: "Successfully login!" });
				} else {
					res.status(401).json({ msg: "Invalid Credentials!" });
				}
			});
		} else {
			res.status(401).json({ msg: "Invalid Credentials!" });
		}
	});
});

// TODO: to be removed
router.get("/login", (req, res, next) => {
	res.status(200).json({ mas: "You are in login page" });
});

// signup | register
router.post("/signup", (req, res, next) => {
	const { email, password, username } = req.body;

	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			res.status(500).json({ msg: "Error hashing password" });
		}

		let user = new User({ email, password: hash, username });

		user
			.save()
			.then(data => {
				res.status(201).json({
					msg: "Welcome! new user has been created!" + username,
				});
			})
			.catch(err => {
				res.status(500).json({
					msg: "There is some error creating the new user",
					error: err,
				});
			});
	});
});

// signup | register TODO: to be removed
router.get("/signup", (req, res, next) => {
	const { email, password, username } = req.body;

	console.log("Hello! This is /signup get!");
	res.json({ msg: "Try to do something" });
});

// get all users
router.get("/", (req, res, next) => {
	User.find()
		.then(users => res.status(200).json(users))
		.catch(err => {
			mas: "There is some error finding user, maybe there is no users";
			error: err;
		});
});

module.exports = router;
