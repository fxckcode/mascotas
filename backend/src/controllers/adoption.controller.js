import pool from "../database/conexion.js";

// Obtiene todas las adopciones registradas
export const getAdoptions = async (req, res) => {
    try {
        // Ejecuta una consulta SQL para obtener información detallada sobre las adopciones
        const [result] = await pool.query(
            `SELECT 
                p.id AS id_pet, 
                p.race, 
                p.age, 
                p.sterilized, 
                p.gender, 
                p.image, 
                p.description, 
                p.background, 
                p.vaccines, 
                p.location, 
                p.phone_admin,
                m.name AS municipality, 
                a.state, 
                u.name AS user_name, 
                p.name, 
                u.email, 
                u.phone, 
                u.id AS id_user, 
                r.name AS race_name, 
                r.id AS id_race,
                a.description_admin,
                a.description_user
            FROM adoptions AS a 
            JOIN pets AS p ON a.id_pet = p.id 
            JOIN users u ON a.id_user = u.id 
            LEFT JOIN municipalities m ON p.id_municipality = m.id 
            LEFT JOIN races r ON p.id_race = r.id`
        );
        
        // Verifica si se encontraron resultados
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No se encontraron adopciones' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtiene las adopciones de un usuario específico
export const getMyAdoption = async (req, res) => {
    try {
        // Extrae el ID del usuario desde los parámetros de la solicitud
        const { id } = req.params;

        // Ejecuta una consulta SQL para obtener las adopciones del usuario
        const [result] = await pool.query(
            `SELECT 
                p.id AS id_pet, 
                p.race, 
                p.age, 
                p.sterilized, 
                p.gender, 
                p.image, 
                p.description, 
                p.background, 
                p.vaccines, 
                p.location, 
                m.name AS municipality, 
                a.state, 
                u.name AS user_name, 
                p.name, 
                u.email, 
                u.phone, 
                r.name AS race_name, 
                r.id AS id_race,
                a.description_admin,
                a.description_user
            FROM adoptions AS a 
            JOIN pets AS p ON a.id_pet = p.id 
            JOIN users u ON a.id_user = u.id 
            LEFT JOIN municipalities m ON p.id_municipality = m.id 
            LEFT JOIN races r ON p.id_race = r.id 
            WHERE a.id_user = ? AND a.state != 'No aprobado'`,
            [parseInt(id)]
        );

        // Verifica si se encontraron resultados
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No se encontraron adopciones en proceso' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtiene información detallada sobre una adopción específica
export const getAdoption = async (req, res) => {
    try {
        // Extrae el ID de la adopción desde los parámetros de la solicitud
        const { id } = req.params;

        // Ejecuta una consulta SQL para obtener detalles de una adopción
        const [result] = await pool.query(
            `SELECT 
                p.id AS id_pet, 
                p.race, 
                p.age, 
                p.sterilized, 
                p.gender, 
                p.image, 
                p.description, 
                p.background, 
                p.location, 
                m.name AS municipality, 
                a.state, 
                u.name, 
                u.email, 
                u.phone, 
                r.name AS race_name, 
                r.id AS id_race 
            FROM adoptions AS a 
            JOIN pets AS p ON a.id_pet = p.id 
            JOIN users u ON a.id_user = u.id 
            LEFT JOIN municipalities m ON p.id_municipality = m.id 
            LEFT JOIN races r ON p.id_race = r.id 
            WHERE a.id = ?`,
            [id]
        );

        // Verifica si se encontraron resultados
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No se encontró la adopción' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crea una nueva adopción
export const createAdoption = async (req, res) => {
    try {
        // Extrae los datos de la solicitud
        const { id_user, id_pet, location, description_user } = req.body;

        // Ejecuta una consulta SQL para insertar una nueva adopción
        const [result] = await pool.query(
            "INSERT INTO adoptions (id_user, id_pet, location, description_user) VALUES (?, ?, ?, ?)",
            [id_user, id_pet, location, description_user]
        );

        // Actualiza el estado de la mascota a 'En proceso'
        const [pet] = await pool.query(
            "UPDATE pets SET state = 'En proceso' WHERE id = ?",
            [id_pet]
        );

        // Verifica si las operaciones fueron exitosas
        if (result.affectedRows > 0 && pet.affectedRows > 0) {
            return res.status(201).json({ message: 'Adopción creada con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo crear la adopción' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Actualiza una adopción existente
export const updateAdoption = async (req, res) => {
    try {
        // Extrae el ID de la adopción desde los parámetros y los datos de la solicitud
        const { id } = req.params;
        const { id_user, id_pet, location } = req.body;

        // Ejecuta una consulta SQL para actualizar una adopción
        const [result] = await pool.query(
            'UPDATE adoptions SET id_user = ?, id_pet = ?, location = ? WHERE id = ?',
            [id_user, id_pet, location, id]
        );

        // Verifica si la operación fue exitosa
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Adopción actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo actualizar la adopción' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Elimina una adopción existente
export const deleteAdoption = async (req, res) => {
    try {
        // Extrae el ID de la adopción desde los parámetros de la solicitud
        const { id } = req.params;

        // Ejecuta una consulta SQL para eliminar una adopción
        const [result] = await pool.query('DELETE FROM adoptions WHERE id = ?', [id]);

        // Verifica si la operación fue exitosa
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Adopción eliminada con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo eliminar la adopción' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Elimina una adopción específica de un usuario
export const deleteAdoptionByUser = async (req, res) => {
    try {
        // Extrae el ID del usuario y el ID de la mascota desde los parámetros de la solicitud
        const { id_user, id_pet } = req.params;

        // Actualiza el estado de la mascota a sin adoptar
        const [r] = await pool.query('UPDATE pets SET state = ? WHERE id = ?', [1, id_pet]);

        // Elimina la adopción del usuario y la mascota
        const [result] = await pool.query('DELETE FROM adoptions WHERE id_user = ? AND id_pet = ?', [id_user, id_pet]);

        // Verifica si la operación fue exitosa
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Adopciones eliminadas con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudieron eliminar las adopciones' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Acepta una adopción y actualiza el estado de la mascota
export const acceptAdoption = async (req, res) => {
    const { id, id_pet } = req.params;
    const { description_admin } = req.body;

    try {
        // Inicia una transacción
        await pool.query('START TRANSACTION');

        // Actualiza el estado de la adopción a 'Aceptada'
        const [result] = await pool.query(
            'UPDATE adoptions SET state = 2, description_admin=? WHERE id_user = ? AND id_pet = ?',
            [description_admin, id, id_pet]
        );

        // Verifica si la adopción fue actualizada
        if (result.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo aceptar la adopción, registro no encontrado' });
        }

        // Actualiza el estado de la mascota a 'Adoptada'
        const [petResult] = await pool.query('UPDATE pets SET state = 3 WHERE id = ?', [id_pet]);
        if (petResult.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo actualizar el estado de la mascota, registro no encontrado' });
        }

        // Confirma la transacción
        await pool.query('COMMIT');
        return res.status(200).json({ message: 'Adopción aceptada con éxito' });
    } catch (error) {
        await pool.query('ROLLBACK');
        return res.status(500).json({ message: error.message });
    }
};

// Rechaza una adopción y actualiza el estado de la mascota
export const rejectAdoption = async (req, res) => {
    const { id, id_pet } = req.params;
    const { description_admin } = req.body;
    try {
        // Inicia una transacción
        await pool.query('START TRANSACTION');

        // Actualiza el estado de la adopción a 'Rechazada'
        const [result] = await pool.query('UPDATE adoptions SET state = 3, description_admin=? WHERE id_user = ? AND id_pet = ?', [description_admin, id, id_pet]);

        // Verifica si la adopción fue actualizada
        if (result.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo rechazar la adopción, registro no encontrado' });
        }

        // Actualiza el estado de la mascota a 'Sin adoptar'
        const [petResult] = await pool.query('UPDATE pets SET state = 1 WHERE id = ?', [id_pet]);
        if (petResult.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo actualizar el estado de la mascota, registro no encontrado' });
        }

        // Confirma la transacción
        await pool.query('COMMIT');
        return res.status(200).json({ message: 'Solicitud de adopción cancelada con éxito' });
    } catch (error) {
        await pool.query('ROLLBACK');
        return res.status(500).json({ message: error.message });
    }
};
