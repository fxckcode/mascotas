import {Router} from 'express';
import { cargarImagen, createPets, deletePet, getPet, getPets, updatePet } from '../controllers/pet.controller.js';
import { validarToken } from '../controllers/auth.controller.js';

const router = Router()

router.get('/pets', getPets)
router.get('/pet/:id', validarToken,  getPet)
router.post('/pets', validarToken, cargarImagen, createPets)
router.put('/pet/:id', validarToken, cargarImagen, updatePet)
router.delete('/pet/:id', validarToken, deletePet)

export default router