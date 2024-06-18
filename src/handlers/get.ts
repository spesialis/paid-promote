import { CommandContext } from "grammy";
import { MyContext } from "../interfaces";
import database from "../services/database.js";

export default async function get(ctx: CommandContext<MyContext>) {
  const chatId = Number(ctx.message?.text.split(" ")[1]);
  if (!chatId) return;

  const dataText = await database.getStr(chatId);
  const fallbackText = "There is no pattern on " + chatId;

  await ctx.reply(dataText || fallbackText);
}
