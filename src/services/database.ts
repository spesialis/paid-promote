import mongoose from "mongoose";
import env from "./env.js";
import format from "../extra/format.js";
import { ScheduleType } from "../interfaces.js";
import cron from "./cron.js";

export const Schedule = mongoose.model(
  "schedule",
  new mongoose.Schema({
    text: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonUrl: { type: String, required: true },
    cronExpression: { type: String, required: true },
    chatIds: { type: [Number], required: true },
    photoFileId: { type: String },
    videoFileId: { type: String },
    expire: { type: Number, required: true },
  }),
);
export class Database {
  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async init() {
    return new Promise((resolve) => {
      mongoose.connect(this.uri).then(() => {
        console.log("Database connected successfully");
        resolve(true);
      });
    });
  }

  async add(schedule: ScheduleType) {
    await new Schedule(schedule).save();
    await cron.init();
  }

  async getStr(chatId: number) {
    const schedules = await Schedule.find({ chatIds: chatId });

    return (
      schedules
        .map((scheduleData) => {
          const schedule = scheduleData.toObject();
          return format(schedule);
        })
        .join("\n\n") || undefined
    );
  }

  async getAll() {
    return Schedule.find();
  }

  async getActive() {
    return Schedule.find({
      expire: { $gt: Date.now() },
    });
  }

  async get(id: string) {
    return Schedule.findOne({ _id: id });
  }

  async remove(id: string) {
    await Schedule.deleteOne({ _id: id });
    await cron.init();
  }
}
const database = new Database(env.DATABASE_URI);

export default database;
