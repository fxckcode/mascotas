// Importa la conexión a la base de datos desde el módulo 'conexion.js'
import pool from "../database/conexion.js";

// Función para obtener todas las razas de la base de datos
export const getRaces = async (req, res) => {
    try {
        // Realiza una consulta SQL para obtener todas las razas
        const [result] = await pool.query('SELECT * FROM races');
        
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los datos en formato JSON
            return res.status(200).json(result);
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontraron razas' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
};
