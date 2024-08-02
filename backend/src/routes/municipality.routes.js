import { Router } from "express";
import { createMunicipality, deleteMunicipality, getMunicipalities, getMunicipality, updateMunicipality } from "../controllers/municipality.controller.js";

const router = Router()

router.get('/municipalities', getMunicipalities)
router.get('/municipality/:id', getMunicipality)
router.post('/municipality', createMunicipality)
router.put('/municipality/:id', updateMunicipality)
router.delete('/municipality/:id', deleteMunicipality)

export default router