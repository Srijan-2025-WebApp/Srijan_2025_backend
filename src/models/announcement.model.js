import { mongoose } from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Announcement = mongoose.model("Announcement", announcementSchema);