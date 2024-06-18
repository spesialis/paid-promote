import format from "../extra/format.js";
import getTimestamp from "../extra/getTimestamp.js";
import { MyContext, MyConversation } from "../interfaces.js";
import database from "../services/database.js";

export default async function add(
  conversation: MyConversation,
  ctx: MyContext,
) {
  await ctx.reply("Send the message text");
  const text = (await conversation.waitFor(":text")).msg.text;
  await ctx.reply("Send the button url");
  const buttonUrl = (await conversation.waitFor(":text")).msg.text;
  await ctx.reply("Send the button text");
  const buttonText = (await conversation.waitFor(":text")).msg.text;
  await ctx.reply("Now send me the cron expression");
  const cronExpression = (await conversation.waitFor(":text")).msg.text;
  await ctx.reply(
    "Send the chat ids you want this message to be posted, separate by space",
  );
  const chatIds = (await conversation.waitFor(":text")).msg.text
    .split(" ")
    .map(Number);
  await ctx.reply(
    "Send the media, just send me a text message if you do not want to include media on the scheduled post",
  );
  const mediaMessage = (await conversation.waitFor("message")).message;
  const photoFileId = mediaMessage.photo?.at(-1)?.file_id;
  const videoFileId = mediaMessage.video?.file_id;

  await ctx.reply("Send how many days the contract will expire");
  const contractDays = Number((await conversation.waitFor(":text")).msg.text);
  const contractTimestamp = getTimestamp(contractDays);
  const expire = Date.now() + contractTimestamp;

  const newSchedule = {
    text,
    buttonText,
    buttonUrl,
    cronExpression,
    chatIds,
    photoFileId,
    videoFileId,
    expire,
  };
  await database.add(newSchedule);

  return ctx.reply(format(newSchedule));
}
