import { Router } from "express";
import { getAnnouncements, createAnnouncement } from "../controllers/announcement.controller";
const router = Router();

router.post('/api/announcements' , createAnnouncement );
router.get('/api/announcements', getAnnouncements);

export default router;