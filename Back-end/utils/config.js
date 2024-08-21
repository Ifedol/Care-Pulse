require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URL = process.env.MONGODB_URL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

module.exports = {
  PORT,
  SECRET,
  DATABASE_URL,
  EMAIL_USER,
  EMAIL_PASS,
  MONGODB_URI,
  MONGODB_URL,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET
};
