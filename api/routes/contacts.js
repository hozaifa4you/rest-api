const router = require("express").Router();

router.get("/", (req, res, next) => {
	res.status(200).json({ msg: "This contact get req." });
});

router.post("/", (req, res, next) => {
	res.status(200).json({ msg: "This contact post req." });
});

router.get("/:id", (req, res, next) => {
	res.json({ msg: "This finding by id: get" });
});

router.put("/:id", (req, res, next) => {
	res.json({ msg: "This put request " });
});

router.delete("/:id", (req, res, next) => {
	res.json({ msg: "This delete request " });
});

module.exports = router;
