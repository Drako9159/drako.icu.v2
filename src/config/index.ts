import dotenv from "dotenv";
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file !!");
}

export default {
  port: process.env.PORT || 3000,
  mongoDB: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};
