// Importa la conexión a la base de datos desde el archivo de configuración
import pool from "../database/conexion.js"

// Función para obtener todos los municipios
export const getMunicipalities = async (req, res) => { 
    try {
        // Realiza una consulta para obtener todas las entradas de la tabla 'municipalities'
        const [result] = await pool.query('select * from municipalities');
        
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los resultados en formato JSON
            return res.status(200).json(result);
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontraron municipios' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para obtener un municipio específico basado en el ID
export const getMunicipality = async (req, res) => {
    try {
        const { id } = req.params; // Debe ser 'req.params' en lugar de 'res.params'
        
        // Realiza una consulta para obtener el municipio correspondiente al ID proporcionado
        const [result] = await pool.query('select * from municipalities where id=?', [id]);
        
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los resultados en formato JSON
            return res.status(200).json(result);
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontró el municipio' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para crear un nuevo municipio
export const createMunicipality = async (req, res) => {
    try {
        const { name } = req.body; // Obtiene el nombre del municipio del cuerpo de la solicitud
        
        // Realiza una consulta para insertar un nuevo municipio en la tabla 'municipalities'
        const [result] = await pool.query('insert into municipalities (name) values (?)', [name]);
        
        // Verifica si se realizó la inserción correctamente
        if (result.affectedRows > 0) {
            // Si la inserción fue exitosa, responde con el estado 201 y un mensaje de éxito
            return res.status(201).json({ message: 'Municipio creado con éxito' });
        } else {
            // Si la inserción falló, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo crear el municipio' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para actualizar un municipio existente
export const updateMunicipality = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del municipio desde los parámetros de la solicitud
        const { name } = req.body; // Obtiene el nuevo nombre del municipio del cuerpo de la solicitud

        // Obtiene el municipio actual usando el ID proporcionado
        const [oldMunicipality] = await pool.query('select * from municipalities where id = ?', [id]);
        
        // Prepara los datos a actualizar, manteniendo el nombre actual si no se proporciona uno nuevo
        const data = {
            name: name ? name : oldMunicipality[0].name
        };

        // Realiza una consulta para actualizar el municipio en la tabla 'municipalities'
        const [result] = await pool.query('update municipalities set ? where id = ?', [data, id]);

        // Verifica si se realizó la actualización correctamente
        if (result.affectedRows > 0) {
            // Si la actualización fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'Municipio actualizado con éxito' });
        } else {
            // Si la actualización falló, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo actualizar el municipio' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para eliminar un municipio existente
export const deleteMunicipality = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del municipio desde los parámetros de la solicitud
        
        // Realiza una consulta para eliminar el municipio correspondiente al ID proporcionado
        const [result] = await pool.query('delete from municipalities where id = ?', [id]);
        
        // Verifica si se realizó la eliminación correctamente
        if (result.affectedRows > 0) {
            // Si la eliminación fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'Municipio eliminado con éxito' });
        } else {
            // Si la eliminación falló, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo eliminar el municipio' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}
