require("dotenv").config();
const express = require("express");
const app = express();
const config = require("./config");
const routes = require("./init/init.routes");
const initializeDb= require("./init/db.init");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initializing Routes
routes(app);
initializeDb();

app.listen(config.port, () => {
	console.log(`listening on port ${config.port}`);
});
