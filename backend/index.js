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
import racesRoutes from './src/routes/race.routes.js'
import pool from './src/database/conexion.js'
import bcrypt from 'bcrypt'
import categoriesRoutes from './src/routes/category.routes.js'

const server = express()

// Configuracion
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))
server.use(cors())

server.use('/public', express.static('./public'))

server.post("/users", async (req, res) => {
    try {
        const { name, email, password, phone, identification } = req.body;

        // Encripta la contraseña antes de guardarla en la base de datos.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserta el usuario en la base de datos con la contraseña encriptada.
        const [result] = await pool.query('INSERT INTO users (name, email, password, phone, identification) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, phone, identification]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Usuario creado con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo crear el usuario' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

server.use(authRoutes)
server.use(petRoutes)
server.use(validarToken, userRoutes)
server.use(validarToken, vaccineRoutes)
server.use(validarToken, listVaccinePetRoutes)
server.use(validarToken, adoptionRoutes)
server.use(validarToken, municipalityRoutes)
server.use(validarToken, racesRoutes)
server.use(validarToken, categoriesRoutes)

server.listen(3333, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3333/');
})