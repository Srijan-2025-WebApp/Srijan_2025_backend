import { Announcement } from "../models/announcement.model";
const HttpError = require("../utils/HttpError");

export const createAnnouncement = async (req, res) => {
  try {
    const { title, body } = req.body;
    const announcement = new Announcement({ title, body });
    await announcement.save();
    res.status(201).json({ message: "Announcement created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(new HttpError("Error creating the announcement",400));
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ timestamp: "desc" })
      .select("title body timestamp _id");
    res.json(announcements);
  } catch (error) {
    return res.status(404).json(new HttpError("Error fetching Announcements",404));
  }
};

// export const deleteAnnouncements = async (req,res) => {
// }