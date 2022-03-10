
const APP_NAME = "EDAIVA_TEST";

const JWT_KEY= process.env.JWT_KEY || "TEST_JWT_KEY";
//For mongo db

const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	retryWrites: false,
};

const MONGO_HOST = process.env.MONGO_URL || `mongodb://localhost/${APP_NAME}`;

//For server
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const PORT = process.env.SERVER_PORT || 5000;

const config = {
	hostname: SERVER_HOSTNAME,
	port: PORT,
	dbUrl: MONGO_HOST,
	dbOptions: MONGO_OPTIONS,
    JWT_KEY,
};

module.exports= config;
