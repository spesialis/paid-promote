import { InlineKeyboardMarkup } from "grammy/types";

export default function getReplyMarkup(
  text: string,
  url: string,
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        {
          text: text,
          url: url,
        },
      ],
    ],
  };
}
