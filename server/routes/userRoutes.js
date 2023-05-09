import express from "express";
import {rename, password, signin, signup} from '../controllers/userControllers.js'
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin",signin);
router.put("/rename",verifyToken,rename);
router.put("/password",password);

export default router;
