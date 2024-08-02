import pool from "../database/conexion.js";

export const getAdoptions = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT p.id as id_pet, p.race, p.age, p.sterilized, p.gender, p.image, p.description, p.background, p.vaccines , p.location, m.name as municipality, a.state, u.name as user_name, p.name, u.email, u.phone, u.id as id_user FROM adoptions as a JOIN pets as p ON a.id_pet = p.id JOIN users u ON a.id_user = u.id LEFT JOIN municipalities m ON p.id_municipality = m.id")
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontraron adopciones' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMyAdoption = async (req, res) => {
    try {
        const { id } = req.params;

        const [ result ] = await pool.query("SELECT p.id as id_pet, p.race, p.age, p.sterilized, p.gender, p.image, p.description, p.background, p.vaccines , p.location, m.name as municipality, a.state, u.name as user_name, p.name, u.email, u.phone FROM adoptions as a JOIN pets as p ON a.id_pet = p.id JOIN users u ON a.id_user = u.id LEFT JOIN municipalities m ON p.id_municipality = m.id WHERE a.id_user = ? or a.state != 'No aprobado' ", [parseInt(id)])

        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontraron adopciones en proceso'})
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAdoption = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("select p.id as id_pet, p.race, p.age, p.sterilized, p.gender, p.image, p.description, p.background, p.location, m.name as municipality, a.state, u.name, u.email, u.phone from adoptions as a join pets as p on a.id = p.id join users u on a.id_user = u.id lEFT JOIN municipalities m on p.id_municipality = m.id where a.id=?", [id])
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontro la adopcion' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createAdoption = async (req, res) => {
    try {
        const { id_user, id_pet, location } = req.body
        const [result] = await pool.query("insert into adoptions (id_user, id_pet, location) values (?, ?, ?)", [id_user, id_pet, location])

        const [ pet ] = await pool.query("update pets set state='En proceso' where id=? ", [id_pet])

        if (result.affectedRows > 0 && pet.affectedRows > 0) {
            return res.status(201).json({ message: 'Adopción creada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo crear la adopción' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateAdoption = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, id_pet, location } = req.body;
        const [ result ] = await pool.query('update adoptions set id_user = ?, id_pet = ?, location = ? where id = ?', [id_user, id_pet, location, id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Adopción actualizada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo actualizar la adopción' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAdoption = async (req, res) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query('delete from adoptions where id = ?', [id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Adopción eliminada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo eliminar la adopción' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAdoptionByUser = async (req, res) => {
    try {
        const { id_user, id_pet } = req.params;
        const [ r ] = await pool.query('update pets set state=? where id=?', [1, id_pet])
        const [ result ] = await pool.query('delete from adoptions where id_user = ? and id_pet', [id_user, id_pet]);


        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Adopciones eliminadas con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudieron eliminar las adopciones' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const acceptAdoption = async (req, res) => {
    const { id, id_pet } = req.params;

    try {
        await pool.query('START TRANSACTION');
        const [result] = await pool.query('UPDATE adoptions SET state = 2 WHERE id_user = ? and id_pet', [id, id_pet]);
        
        if (result.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo aceptar la adopción, registro no encontrado' });
        }
        const [petResult] = await pool.query('UPDATE pets SET state = 3 WHERE id = ?', [id_pet]);
        if (petResult.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo actualizar el estado de la mascota, registro no encontrado' });
        }
        await pool.query('COMMIT');
        return res.status(200).json({ message: 'Adopción aceptada con éxito' });
    } catch (error) {
        await pool.query('ROLLBACK'); 
        return res.status(500).json({ message: error.message });
    }
};

export const rejectAdoption = async (req, res) => {
    const { id, id_pet } = req.params;

    try {
        await pool.query('START TRANSACTION');
        const [result] = await pool.query('UPDATE adoptions SET state = 3 WHERE id_user = ? and id_pet', [id, id_pet]);
        
        if (result.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo aceptar la adopción, registro no encontrado' });
        }
        const [petResult] = await pool.query('UPDATE pets SET state = 1 WHERE id = ?', [id_pet]);
        if (petResult.affectedRows === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'No se pudo actualizar el estado de la mascota, registro no encontrado' });
        }
        await pool.query('COMMIT');
        return res.status(200).json({ message: 'Solicitud de adopción cancelada con exito' });
    } catch (error) {
        await pool.query('ROLLBACK'); 
        return res.status(500).json({ message: error.message });
    }
}