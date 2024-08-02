import multer from 'multer';
import pool from '../database/conexion.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

export const cargarImagen = upload.single('image');

export const getPets = async (req, res) => {
    try {
        const [result] = await pool.query('select *, municipalities.name as municipality, pets.name, pets.id as id from pets left join municipalities on pets.id_municipality = municipalities.id')

        if (result.length > 0) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({ message: 'No hay mascotas' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createPets = async (req, res) => {
    try {
        const { name, race, age, sterilized, gender, description, background, location, id_municipality, vaccines } = req.body
        
        var image = null

        if (req.file) {
            image = req.file.originalname
        }

        const [result] = await pool.query('insert into pets (name, race, age, sterilized, gender, image, description, background, location, id_municipality, vaccines) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, race, age, sterilized, gender, image, description, background, location, id_municipality, vaccines])
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Mascota creada con éxito' })
        }
        else {
            return res.status(404).json({ message: 'No se pudo crear la mascota' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPet = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('select  *, municipalities.name as municipality, pets.name left from pets join municipalities on pets.id_municipality = municipalities.id where pets.id = ?', [id])

        if (result.length > 0) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({ message: 'No hay mascota con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updatePet = async (req, res) => {
    try {
        const { id } = req.params
        const { name, race, age, sterilized, gender, image, description, background, location, id_municipality } = req.body
        const [oldPet] = await pool.query('select * from pets where id = ?', [id])
        const data = {
            name: name ? name : oldPet[0].name,
            race: race ? race : oldPet[0].race,
            age: age ? age : oldPet[0].age,
            sterilized: sterilized ? sterilized : oldPet[0].sterilized,
            gender: gender ? gender : oldPet[0].gender,
            image: image ? image : oldPet[0].image,
            description: description ? description : oldPet[0].description,
            background: background ? background : oldPet[0].background,
            location: location ? location : oldPet[0].location,
            id_municipality: id_municipality ? id_municipality : oldPet[0].id_municipality
        }
        const [result] = await pool.query('update pets set ? where id = ?', [data, id])
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Mascota actualizada con éxito' })
        }
        else {
            return res.status(404).json({ message: 'No se pudo actuaizar la mascota' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePet = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('delete from pets where id = ?', [id])

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Se elimino la mascota' })
        }
        else {
            return res.status(404).json({ message: 'No hay mascota con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
} 
