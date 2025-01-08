import { Router } from "express";
import {handleRegister} from "../controllers/register.controller.js"
import { handleLogin } from "../controllers/login.controller.js";
import {handleLogout} from "../controllers/logout.controller.js"
import {handleGetUser} from "../controllers/getUser.controller.js"
import {verifyJWT} from "../middlewares/checkAuth.middleware.js"

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.post('/getUser',verifyJWT,handleGetUser);

export default router;