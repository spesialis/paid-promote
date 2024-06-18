import { Bot } from "grammy";
import env from "./env.js";
import { MyContext } from "../interfaces.js";

const bot = new Bot<MyContext>(env.BOT_TOKEN);

export default bot;
