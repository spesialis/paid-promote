import database from "./services/database.js";
import handlers from "./handlers/index.js";
import bot from "./services/bot.js";
import cron from "./services/cron.js";
import { session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import add from "./conversations/add.js";

bot.use(
  session({
    initial() {
      return {};
    },
  }),
);
bot.use(conversations());
bot.use(createConversation(add));

bot.command("add", handlers.add);
bot.command("get", handlers.get);
bot.command("remove", handlers.remove);

await database.init();
await cron.init();

bot.start();
