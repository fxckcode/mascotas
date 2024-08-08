// Importa la conexión a la base de datos desde el módulo 'conexion.js'
import pool from '../database/conexion.js'
import bcrypt from 'bcrypt'
// Función para obtener todos los usuarios de la base de datos
export const getUsers = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los usuarios
        const [result] = await pool.query('select * from users')

        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los datos en formato JSON
            return res.status(200).json(result)
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No hay usuarios' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { name, email, password, phone, identification } = req.body

        // Realiza una consulta SQL para insertar un nuevo usuario
        const [result] = await pool.query('insert into users (name, email, password, phone, identification) values (?, ?, ?, ?, ?)', [name, email, password, phone, identification])
        
        // Verifica si se realizó la inserción correctamente
        if (result.affectedRows > 0) {
            // Si la inserción fue exitosa, responde con el estado 201 y un mensaje de éxito
            return res.status(201).json({ message: 'Usuario creado con éxito' })
        } else {
            // Si no se pudo crear el usuario, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo crear el usuario' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para obtener un usuario específico por ID
export const getUser = async (req, res) => {
    try {
        // Extrae el ID del parámetro de la solicitud
        const { id } = req.params

        // Realiza una consulta SQL para seleccionar un usuario por ID
        const [result] = await pool.query('select * from users where id = ?', [id])

        // Verifica si se encontró el usuario
        if (result.length > 0) {
            // Si el usuario fue encontrado, responde con el estado 200 y los datos del usuario en formato JSON
            return res.status(200).json(result[0])
        } else {
            // Si no se encontró el usuario, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No hay usuarios con ese ID' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para actualizar los datos de un usuario
export const updateUser = async (req, res) => {
    try {
        // Extrae el ID del parámetro de la solicitud y los datos del cuerpo de la solicitud
        const { id } = req.params
        const { name, email, password, phone, role, identification } = req.body

        // Realiza una consulta SQL para obtener los datos actuales del usuario
        const [oldUser] = await pool.query('select * from users where id = ?', [id])

        // Prepara los datos actualizados para el usuario, usando los datos nuevos o manteniendo los actuales
        const data = {
            name: name ? name : oldUser[0].name,
            email: email ? email : oldUser[0].email,
            password: password ? await bcrypt.hash(password, 10) : oldUser[0].password,
            phone: phone ? phone : oldUser[0].phone,
            role: role ? role : oldUser[0].role,
            identification: identification ? identification : oldUser[0].identification
        }

        // Realiza una consulta SQL para actualizar los datos del usuario
        const [result] = await pool.query('update users set name=?, email=?, password=?, phone=?, identification=?, role=? where id = ?', [data.name, data.email, data.password, data.phone, data.identification, data.role, id])

        // Verifica si la actualización fue exitosa
        if (result.affectedRows > 0) {
            // Si la actualización fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'usuario actualizado con éxito', result })
        } else {
            // Si no se pudo actualizar el usuario, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo actualizar el usuario' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    try {
        // Extrae el ID del parámetro de la solicitud
        const { id } = req.params

        // Realiza una consulta SQL para eliminar el usuario por ID
        const [result] = await pool.query('delete from users where id = ?', [id])

        // Verifica si la eliminación fue exitosa
        if (result.affectedRows > 0) {
            // Si la eliminación fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'Se eliminó el usuario' })
        } else {
            // Si no se encontró el usuario, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No hay un usuario con ese ID' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}
