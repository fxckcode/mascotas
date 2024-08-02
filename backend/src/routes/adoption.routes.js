import { Router } from "express";
import { acceptAdoption, createAdoption, deleteAdoption, deleteAdoptionByUser, getAdoption, getAdoptions, getMyAdoption, rejectAdoption, updateAdoption } from "../controllers/adoption.controller.js";

const router = Router();

router.get("/adoptions", getAdoptions);
router.get("/adoption/:id", getAdoption);
router.get("/adoption/user/:id", getMyAdoption)
router.post("/adoptions", createAdoption);
router.put("/adoption/:id", updateAdoption);
router.delete("/adoption/:id", deleteAdoption);
router.delete("/adoption/user/:id_user/:id_pet", deleteAdoptionByUser)
router.put("/accept/:id/:id_pet", acceptAdoption);
router.put("/reject/:id/:id_pet", rejectAdoption);


export default router