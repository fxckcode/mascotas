import pool from "../database/conexion.js";

export const getVaccines = async (req, res) => {
    try {
        const [result] = await pool.query('select * from vaccines')
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontraron vacunas' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getVaccine = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select * from where id=?', [id])

        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontró la vacuna ' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createVaccine = async (req, res) => {
    try {
        const { name } = req.body
        const [result] = await pool.query('insert into vaccines (name) values (?)', [name])
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Vacuna creada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo crear la vacuna' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateVaccine = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const [oldVaccine] = await pool.query('select * from vaccines where id = ?', [id])
        const data = {
            name: name ? name : oldVaccine[0].name
        }

        const [result] = await pool.query('update vaccines set ? where id = ?', [data, id])

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Vacuna actualizada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo actualizar la vacuna' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteVaccine = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('delete from vaccines where id = ?', [id])
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Vacuna eliminada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo eliminar la vacuna' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

