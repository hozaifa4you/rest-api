require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// FIXME: custom files
const ContactRoute = require("./api/routes/contacts");

// FIXME: custom
const app = express();
const PORT = process.env.PORT || 8080;
app.use(morgan("tiny")); // morgan middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// FIXME: middleware
app.use("/api/contacts", ContactRoute); // this is contacts route

// FIXME: Basic Routers
app.get("/posts", (req, res) => {
	res.json({ msg: "This is post pages" });
});

// default route || home route
app.get("/", (req, res) => {
	res.json({ msg: "Hello World!" });
});

// FIXME: server listen
app.listen(PORT, function () {
	console.log(`SERVER IS LISTENING ON PORT: http://localhost:${PORT}`);
});
