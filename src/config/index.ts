import dotenv from "dotenv";
const envFound = dotenv.config();

if (envFound.error) {
  //throw new Error("Couldn't find .env file !!");
  console.log("[server] please set the environment variables ");
}
export default {
  port: process.env.PORT || 3000,
  mongoDB: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientFly: process.env.CLIENT_URL_FLY || "",
  clientSecure: process.env.CLIENT_URL_SECURE || "",
  clientVercel: process.env.CLIENT_URL_VERCEL || "",
};
