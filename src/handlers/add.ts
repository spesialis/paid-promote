import { CommandContext } from "grammy";
import { MyContext } from "../interfaces.js";

export default async function add(ctx: CommandContext<MyContext>) {
  await ctx.conversation.enter("add");
}
