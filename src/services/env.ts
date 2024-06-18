import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  BOT_TOKEN: str(),
  DATABASE_URI: str(),
  CHANNEL_ID: num(),
});

export default env;
