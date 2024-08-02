import pool from "../database/conexion.js"

export const getMunicipalities = async (req, res) => { 
    try {
        const [result] = await pool.query('select * from municipalities')
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontraron municipios' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMunicipality = async (req, res) => {
    try {
        const { id } = res.params
        const [ result ] = await pool.query('select * from municipalities where id=?', [id])
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontró el municipio' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createMunicipality = async (req, res) => {
    try {
        const { name } = req.body
        const [result] = await pool.query('insert into municipalities (name) values (?)', [name])
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Municipio creado con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo crear el municipio' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateMunicipality = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const [oldMunicipality] = await pool.query('select * from municipalities where id = ?', [id])
        const data = {
            name: name ? name : oldMunicipality[0].name
        }

        const [result] = await pool.query('update municipalities set ? where id = ?', [data, id])

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Municipio actualizado con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo actualizar el municipio' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteMunicipality = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('delete from municipalities where id = ?', [id])
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Municipio eliminado con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo eliminar el municipio' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
