// Importa la conexión a la base de datos desde el módulo 'conexion.js'
import pool from "../database/conexion.js";

// Función para obtener todas las vacunas de la base de datos
export const getVaccines = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todas las vacunas
        const [result] = await pool.query('select * from vaccines')
        
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los datos en formato JSON
            return res.status(200).json(result)
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontraron vacunas' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para obtener una vacuna específica por ID
export const getVaccine = async (req, res) => {
    try {
        // Extrae el ID del parámetro de la solicitud
        const { id } = req.params;

        // Realiza una consulta SQL para seleccionar una vacuna por ID
        const [result] = await pool.query('select * from vaccines where id=?', [id])

        // Verifica si se encontró la vacuna
        if (result.length > 0) {
            // Si la vacuna fue encontrada, responde con el estado 200 y los datos en formato JSON
            return res.status(200).json(result)
        } else {
            // Si no se encontró la vacuna, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontró la vacuna' })
        }

    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para crear una nueva vacuna
export const createVaccine = async (req, res) => {
    try {
        // Extrae el nombre de la vacuna del cuerpo de la solicitud
        const { name } = req.body

        // Realiza una consulta SQL para insertar una nueva vacuna
        const [result] = await pool.query('insert into vaccines (name) values (?)', [name])
        
        // Verifica si la inserción fue exitosa
        if (result.affectedRows > 0) {
            // Si la inserción fue exitosa, responde con el estado 201 y un mensaje de éxito
            return res.status(201).json({ message: 'Vacuna creada con éxito' })
        } else {
            // Si no se pudo crear la vacuna, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo crear la vacuna' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para actualizar los datos de una vacuna existente
export const updateVaccine = async (req, res) => {
    try {
        // Extrae el ID del parámetro de la solicitud y el nuevo nombre del cuerpo de la solicitud
        const { id } = req.params
        const { name } = req.body

        // Realiza una consulta SQL para obtener los datos actuales de la vacuna
        const [oldVaccine] = await pool.query('select * from vaccines where id = ?', [id])

        // Prepara los datos actualizados para la vacuna, usando el nombre nuevo o manteniendo el actual
        const data = {
            name: name ? name : oldVaccine[0].name
        }

        // Realiza una consulta SQL para actualizar los datos de la vacuna
        const [result] = await pool.query('update vaccines set ? where id = ?', [data, id])

        // Verifica si la actualización fue exitosa
        if (result.affectedRows > 0) {
            // Si la actualización fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'Vacuna actualizada con éxito' })
        } else {
            // Si no se pudo actualizar la vacuna, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo actualizar la vacuna' })
        }

    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}

// Función para eliminar una vacuna por ID
export const deleteVaccine = async (req, res) => {
    try {
        // Extrae el ID del parámetro de la solicitud
        const { id } = req.params;

        // Realiza una consulta SQL para eliminar la vacuna por ID
        const [result] = await pool.query('delete from vaccines where id = ?', [id])
        
        // Verifica si la eliminación fue exitosa
        if (result.affectedRows > 0) {
            // Si la eliminación fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'Vacuna eliminada con éxito' })
        } else {
            // Si no se encontró la vacuna, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo eliminar la vacuna' })
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message })
    }
}
