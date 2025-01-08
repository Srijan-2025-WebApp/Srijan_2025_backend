import { Router } from "express";
import {handleEventRegistration} from "../controllers/eventRegistration.controller.js"
import {verifyJWT} from "../middlewares/checkAuth.middleware.js"

const router = Router();

router.post('/registerEvent',handleEventRegistration);

export default router;