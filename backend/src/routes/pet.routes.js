import {Router} from 'express';
import { cargarImagen, createPets, deletePet, getPet, getPets, updatePet } from '../controllers/pet.controller.js';

const router = Router()

router.get('/pets', getPets)
router.get('/pet/:id', getPet)
router.post('/pets', cargarImagen, createPets)
router.put('/pet/:id', cargarImagen, updatePet)
router.delete('/pet/:id', deletePet)

export default router