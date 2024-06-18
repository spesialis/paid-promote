import { CommandContext } from "grammy";
import { MyContext } from "../interfaces.js";
import database from "../services/database.js";

export default async function remove(ctx: CommandContext<MyContext>) {
  const scheduleId = ctx.message?.text.split(" ")[1];
  scheduleId && (await database.remove(scheduleId));

  return ctx.reply("Success");
}
