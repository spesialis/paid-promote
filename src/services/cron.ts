import baseCron from "node-cron";
import database from "./database.js";
import bot from "./bot.js";
import getReplyMarkup from "../extra/getReplyMarkup.js";

export class Cron {
  async init() {
    baseCron.getTasks().forEach((task) => task.stop());
    const schedules = await database.getActive();

    schedules.forEach((schedule) => {
      baseCron.schedule(
        schedule.cronExpression,
        async () => {
          try {
            for (const chatId of schedule.chatIds) {
              const reply_markup = getReplyMarkup(
                schedule.buttonText,
                schedule.buttonUrl,
              );

              if (schedule.photoFileId) {
                const m = await bot.api.sendPhoto(
                  chatId,
                  schedule.photoFileId,
                  {
                    caption: schedule.text,
                    reply_markup,
                  },
                );
                await bot.api.pinChatMessage(chatId, m.message_id);
              } else if (schedule.videoFileId) {
                const m = await bot.api.sendVideo(
                  chatId,
                  schedule.videoFileId,
                  {
                    caption: schedule.text,
                    reply_markup,
                  },
                );
                await bot.api.pinChatMessage(chatId, m.message_id);
              } else {
                const m = await bot.api.sendMessage(chatId, schedule.text, {
                  link_preview_options: {
                    is_disabled: true,
                  },
                  reply_markup,
                });
                await bot.api.pinChatMessage(chatId, m.message_id);
              }
            }
          } catch {}
        },
        { name: schedule._id.toString(), timezone: "utc" },
      );
    });
  }
}
const cron = new Cron();

export default cron;
