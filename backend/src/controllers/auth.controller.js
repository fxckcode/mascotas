import pool from "../database/conexion.js"
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const [ result ] = await pool.query('select id, name, email, phone, role from users where email=? and password=?', [email, password])
        if (result.length > 0) {
            const token = jwt.sign({ result }, 'tokensecreto', { expiresIn: '24h' })
            const user = result[0]

            return res.status(200).json({
                token,
                user
            })
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado'})
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


export const validarToken = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(401).json({
                message: 'Token no válido'
            })
        } else {
            jwt.verify(token, 'tokensecreto', (error) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Token no válido'
                    })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}