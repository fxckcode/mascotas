import { Router } from "express";
import { createVaccine, deleteVaccine, getVaccine, getVaccines, updateVaccine } from "../controllers/vaccine.controller.js";

const router = Router();

router.get("/vaccines", getVaccines)
router.get("/vaccine/:id", getVaccine)
router.post("/vaccines", createVaccine)
router.put("/vaccine/:id", updateVaccine)
router.delete("/vaccine/:id", deleteVaccine)

export default router;