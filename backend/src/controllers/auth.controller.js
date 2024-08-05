import pool from "../database/conexion.js"; // Importa el pool de conexiones a la base de datos desde el archivo de configuración.
import jwt from 'jsonwebtoken'; // Importa la librería jsonwebtoken para la gestión de tokens JWT.

export const login = async (req, res) => {
    try {
        // Extrae el email y la contraseña del cuerpo de la solicitud.
        const { email, password } = req.body;

        // Ejecuta una consulta SQL para buscar un usuario en la base de datos que coincida con el email y la contraseña proporcionados.
        const [result] = await pool.query('select id, name, email, phone, role, identification from users where email=? and password=?', [email, password]);

        // Verifica si se encontró algún usuario con las credenciales proporcionadas.
        if (result.length > 0) {
            // Si se encontró el usuario, crea un token JWT con los datos del usuario, que expira en 24 horas.
            const token = jwt.sign({ result }, 'tokensecreto', { expiresIn: '24h' });
            const user = result[0]; // Extrae el primer usuario del resultado.

            // Devuelve una respuesta con el token y los datos del usuario, con un código de estado 200 (OK).
            return res.status(200).json({
                token,
                user
            });
        } else {
            // Si no se encontró ningún usuario, devuelve un mensaje de error con un código de estado 404 (No encontrado).
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        // Si ocurre un error durante la consulta o el proceso de autenticación, devuelve un mensaje de error con un código de estado 500 (Error interno del servidor).
        return res.status(500).json({ error: error.message });
    }
};

export const validarToken = async (req, res, next) => {
    try {
        // Extrae el token de los encabezados de la solicitud.
        const token = req.headers['token'];

        // Verifica si el token está presente en los encabezados.
        if (!token) {
            // Si no hay token, devuelve un mensaje de error con un código de estado 401 (No autorizado).
            return res.status(401).json({
                message: 'Token no válido'
            });
        } else {
            // Verifica la validez del token usando la clave secreta.
            jwt.verify(token, 'tokensecreto', (error) => {
                if (error) {
                    // Si el token no es válido, devuelve un mensaje de error con un código de estado 401 (No autorizado).
                    return res.status(401).json({
                        message: 'Token no válido'
                    });
                } else {
                    // Si el token es válido, pasa el control al siguiente middleware o ruta.
                    next();
                }
            });
        }
    } catch (error) {
        // Si ocurre un error durante la verificación del token, devuelve un mensaje de error con un código de estado 500 (Error interno del servidor).
        return res.status(500).json({ message: error.message });
    }
};
