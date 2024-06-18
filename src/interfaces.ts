import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { Context } from "grammy";

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

export interface ScheduleType {
  text: string;
  buttonText: string;
  buttonUrl: string;
  cronExpression: string;
  chatIds: number[];
  photoFileId?: string;
  videoFileId?: string;
  expire: number;
}
