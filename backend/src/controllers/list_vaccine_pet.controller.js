import pool from "../database/conexion.js";

export const getListVaccinesPet = async (req, res) => {
    try {
        const [result] = await pool.query('select * from list_vaccine_pet')
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontraron vacunas' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getListVaccinePet = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select * from list_vaccine_pet where id=?', [id])
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontró la vacuna ' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createListVaccinePet = async (req, res) => {
    try {
        const { id_pet, id_vaccine } = req.body
        const [result] = await pool.query('insert into list_vaccine_pet (id_pet, id_vaccine) values (?, ?)', [id_pet, id_vaccine])
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Vacuna creada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo crear la vacuna' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateListVaccinePet = async (req, res) => {
    try {
        const { id } = req.params
        const { id_pet, id_vaccine } = req.body

        const [oldVaccine] = await pool.query('select * from list_vaccine_pet where id = ?', [id])
        const data = {
            id_pet: id_pet ? id_pet : oldVaccine[0].id_pet,
            id_vaccine: id_vaccine ? id_vaccine : oldVaccine[0].id_vaccine
        }

        const [result] = await pool.query('update list_vaccine_pet set ? where id = ?', [data, id])

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Vacuna actualizada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo actualizar la vacuna' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteListVaccinePet = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('delete from list_vaccine_pet where id = ?', [id])
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Vacuna eliminada con éxito' })
        } else {
            return res.status(404).json({ message: 'No se pudo eliminar la vacuna' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getVaccineByPet = async (req, res) => {
    try {
        const { id_pet } = req.params;
        const [result] = await pool.query("select v.name from list_vaccine_pet join vaccines v on v.id = list_vaccine_pet.id_vaccine where list_vaccine_pet.id_pet=?", [id_pet])
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontraron vacunas' })
        }
    } catch (error) {
        console.log(error.message);
    }
}