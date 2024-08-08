import pool from "../database/conexion.js"; // Importa el pool de conexiones a la base de datos desde el archivo de configuración.
import jwt from 'jsonwebtoken'; // Importa la librería jsonwebtoken para la gestión de tokens JWT.
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try {
        // Extrae el email y la contraseña del cuerpo de la solicitud.
        const { email, password } = req.body;

        // Ejecuta una consulta SQL para buscar un usuario en la base de datos que coincida con el email proporcionado.
        const [result] = await pool.query('SELECT id, name, email, phone, role, identification, password FROM users WHERE email=?', [email]);

        // Verifica si se encontró algún usuario con el email proporcionado.
        if (result.length > 0) {
            const user = result[0]; // Extrae el primer usuario del resultado.

            // Compara la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos.
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Si la contraseña coincide, crea un token JWT con los datos del usuario, que expira en 24 horas.
                const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, 'tokensecreto', { expiresIn: '24h' });

                // Devuelve una respuesta con el token y los datos del usuario, con un código de estado 200 (OK).
                return res.status(200).json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                        identification: user.identification
                    }
                });
            } else {
                // Si la contraseña no coincide, devuelve un mensaje de error con un código de estado 401 (No autorizado).
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } else {
            // Si no se encontró ningún usuario con el email proporcionado, devuelve un mensaje de error con un código de estado 404 (No encontrado).
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
