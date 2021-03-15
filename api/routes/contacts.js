const router = require("express").Router();

const Contact = require("../models/Contacts");
const authentication = require("../middlewares/authenticate");

router.get("/", (req, res, next) => {
	Contact.find()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({ msg: "Error during retrieving contacts" });
		});
});

router.post("/", authentication, (req, res, next) => {
	// this is post method to store in data base
	let { name, phone, email } = req.body;
	const contact = new Contact({ name, phone, email });

	contact
		.save()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.status(500).json({ msg: error.message + "err to save data" });
		});
});

// get a single contact
router.get("/:id", (req, res, next) => {
	let id = req.params.id;

	Contact.findById(id)
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			res.status(500).json({
				msg: `Can't find contact with id: ${id}` + err.message,
			});
		});
});

// modify a contact
router.put("/:id", authentication, (req, res, next) => {
	let id = req.params.id;
	const { name, phone, email } = req.body;

	Contact.findOneAndUpdate(id, { $set: { name, phone, email } })
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			res.status(500).json({
				msg: "You cant modify contact with id: " + id,
				why: err,
			});
		});
});

// delete a contact
router.delete("/:id", authentication, (req, res, next) => {
	let id = req.params.id;

	Contact.findOneAndDelete(id)
		.then(contact =>
			res.status(200).json({
				msg: "Contact has been deleted with the id: " + id,
				contact,
			})
		)
		.catch(err => {
			res.status(401).json({ msg: "Can't be removed with the id" });
		});
});

module.exports = router;
