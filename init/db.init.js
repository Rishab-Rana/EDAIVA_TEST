const mongoose = require('mongoose');
const config =require('../config');


module.exports=function () {
	mongoose
		.connect(config.dbUrl, config.dbOptions)
		.then(() => {
			console.log(`Connected to database ${config.dbUrl}`);
		})
		.catch((err) => {
			console.error("Error connecting to database", err);
		});
}
