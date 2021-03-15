const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decode = jwt.verify(token, secretKey);
		req.user = decode;
		next();
	} catch (err) {
		res.status(401).json({ msg: "Authentication Failed!" + err });
	}
};

module.exports = authentication;
