require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// FIXME: custom files
const ContactRoute = require("./api/routes/contacts");
const usersRoute = require("./api/routes/user");

// FIXME: custom
const app = express();
const PORT = process.env.PORT || 8080;
app.use(morgan("tiny")); // morgan middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// FIXME: middleware
app.use("/api/contacts", ContactRoute); // this is contacts route
app.use("/api/user", usersRoute); // This is login/signup route

// FIXME: Basic Routers
app.get("/posts", (req, res) => {
	res.json({ msg: "This is post pages" });
});

// default route || home route
app.get("/", (req, res) => {
	res.json({ msg: "Hello World!" });
});

// FIXME: server listen and database connection
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", () => {
	console.log(`Database connection failed.`);
});

db.on("open", () => {
	console.log(`Successfully Database connected (: `.toUpperCase() + db.host);
});

app.listen(PORT, function () {
	console.log(`SERVER IS LISTENING ON PORT (: http://localhost:${PORT}`);
});
