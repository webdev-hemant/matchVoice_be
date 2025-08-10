require("dotenv").config();
const path = require("path");
const {
  DB,
  SERVER_PORT,
  NODE_ENV,
  CURRENT_HOST,
  JWT_SECRET,
} = require("./allEnv");
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_URL, DB_USERNAME } = DB;

const DEV = {
  ENV: NODE_ENV,
  FRONTEND_HOST: CURRENT_HOST,
  APP_PORT: SERVER_PORT,
  DB_URL: DB_URL,
  dialect: "postgres",
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  migrationStoragePath: path.join(__dirname, "../migrations"),
  JWT_KEY: JWT_SECRET,
  define: {
    schema: process.env.SCHEMA || "public",
  },
};

const PROD = {
  ENV: NODE_ENV,
  FRONTEND_HOST: CURRENT_HOST,
  APP_PORT: SERVER_PORT,
  DB_URL: DB_URL,
  dialect: "postgres",
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  migrationStoragePath: path.join(__dirname, "../migrations"),
  JWT_KEY: JWT_SECRET,
  define: {
    schema: process.env.SCHEMA || "public",
  },
};

const config = {
  DEV,
  PROD,
};

module.exports = config[NODE_ENV];
