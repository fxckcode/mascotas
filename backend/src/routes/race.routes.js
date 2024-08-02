import { Router } from "express";
import { getRaces } from "../controllers/race.controller.js";

const router = Router();

router.get("/races", getRaces)

export default router