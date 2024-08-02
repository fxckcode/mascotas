import { Router } from "express";
import { createListVaccinePet, deleteListVaccinePet, getListVaccinePet, getListVaccinesPet, updateListVaccinePet } from "../controllers/list_vaccine_pet.controller.js";

const router = Router()

router.get("/listVaccinePet", getListVaccinesPet)
router.get("/listVaccinePet/:id", getListVaccinePet)
router.post("/listVaccinePet", createListVaccinePet)
router.put("/listVaccinePet/:id", updateListVaccinePet)
router.delete("/listVaccinePet/:id", deleteListVaccinePet)
router.get("/listVaccinePet/:id", getListVaccinePet)

export default router