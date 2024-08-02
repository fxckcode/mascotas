import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import userRoutes from './src/routes/user.routes.js'
import petRoutes from './src/routes/pet.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import vaccineRoutes from './src/routes/vaccine.routes.js'
import listVaccinePetRoutes from './src/routes/list_vaccine_pet.routes.js'
import adoptionRoutes from './src/routes/adoption.routes.js'
import municipalityRoutes from './src/routes/municipality.routes.js'
import { validarToken } from './src/controllers/auth.controller.js'

const server = express()

// Configuracion
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))
server.use(cors())

server.use('/public', express.static('./public'))

server.use(authRoutes)
server.use(validarToken, petRoutes)
server.use(validarToken, userRoutes)
server.use(validarToken, vaccineRoutes)
server.use(validarToken, listVaccinePetRoutes)
server.use(validarToken, adoptionRoutes)
server.use(validarToken, municipalityRoutes)

server.listen(3333, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3333/');
})