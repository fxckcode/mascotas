// Importa la conexión a la base de datos desde el archivo de configuración
import pool from "../database/conexion.js";

// Función para obtener la lista completa de vacunas para mascotas
export const getListVaccinesPet = async (req, res) => {
    try {
        // Realiza una consulta para obtener todas las entradas de la tabla 'list_vaccine_pet'
        const [result] = await pool.query('select * from list_vaccine_pet');
        
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los resultados en formato JSON
            return res.status(200).json(result);
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontraron vacunas' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para obtener una vacuna específica para una mascota basada en el ID
export const getListVaccinePet = async (req, res) => {
    try {
        const { id } = req.params;
        // Realiza una consulta para obtener la vacuna correspondiente al ID proporcionado
        const [result] = await pool.query('select * from list_vaccine_pet where id=?', [id]);
        
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los resultados en formato JSON
            return res.status(200).json(result);
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontró la vacuna' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para crear una nueva entrada de vacuna para una mascota
export const createListVaccinePet = async (req, res) => {
    try {
        const { id_pet, id_vaccine } = req.body;
        // Realiza una consulta para insertar una nueva vacuna en la tabla 'list_vaccine_pet'
        const [result] = await pool.query('insert into list_vaccine_pet (id_pet, id_vaccine) values (?, ?)', [id_pet, id_vaccine]);
        
        // Verifica si se realizó la inserción correctamente
        if (result.affectedRows > 0) {
            // Si la inserción fue exitosa, responde con el estado 201 y un mensaje de éxito
            return res.status(201).json({ message: 'Vacuna creada con éxito' });
        } else {
            // Si la inserción falló, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo crear la vacuna' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para actualizar una entrada de vacuna para una mascota
export const updateListVaccinePet = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pet, id_vaccine } = req.body;

        // Obtiene la vacuna actual usando el ID proporcionado
        const [oldVaccine] = await pool.query('select * from list_vaccine_pet where id = ?', [id]);
        
        // Prepara los datos a actualizar, manteniendo los valores actuales si no se proporcionan nuevos
        const data = {
            id_pet: id_pet ? id_pet : oldVaccine[0].id_pet,
            id_vaccine: id_vaccine ? id_vaccine : oldVaccine[0].id_vaccine
        };

        // Realiza una consulta para actualizar la vacuna en la tabla 'list_vaccine_pet'
        const [result] = await pool.query('update list_vaccine_pet set ? where id = ?', [data, id]);

        // Verifica si se realizó la actualización correctamente
        if (result.affectedRows > 0) {
            // Si la actualización fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'Vacuna actualizada con éxito' });
        } else {
            // Si la actualización falló, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo actualizar la vacuna' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para eliminar una entrada de vacuna para una mascota
export const deleteListVaccinePet = async (req, res) => {
    try {
        const { id } = req.params;
        // Realiza una consulta para eliminar la vacuna correspondiente al ID proporcionado
        const [result] = await pool.query('delete from list_vaccine_pet where id = ?', [id]);
        
        // Verifica si se realizó la eliminación correctamente
        if (result.affectedRows > 0) {
            // Si la eliminación fue exitosa, responde con el estado 200 y un mensaje de éxito
            return res.status(200).json({ message: 'Vacuna eliminada con éxito' });
        } else {
            // Si la eliminación falló, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se pudo eliminar la vacuna' });
        }
    } catch (error) {
        // En caso de error, responde con el estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
}

// Función para obtener las vacunas asociadas a una mascota específica
export const getVaccineByPet = async (req, res) => {
    try {
        const { id_pet } = req.params;
        // Realiza una consulta para obtener los nombres de las vacunas asociadas a la mascota
        const [result] = await pool.query("select v.name from list_vaccine_pet join vaccines v on v.id = list_vaccine_pet.id_vaccine where list_vaccine_pet.id_pet=?", [id_pet]);
        
        // Verifica si se obtuvieron resultados
        if (result.length > 0) {
            // Si hay resultados, responde con el estado 200 y los resultados en formato JSON
            return res.status(200).json(result);
        } else {
            // Si no hay resultados, responde con el estado 404 y un mensaje de error
            return res.status(404).json({ message: 'No se encontraron vacunas' });
        }
    } catch (error) {
        // En caso de error, muestra el mensaje de error en la consola
        console.log(error.message);
    }
}
