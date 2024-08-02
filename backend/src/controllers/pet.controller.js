import multer from 'multer';
import pool from '../database/conexion.js';

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
    const [result] = await pool.query(
      `SELECT 
        pets.*, 
        municipalities.name AS municipality, 
        races.name AS race_name, 
        pets.id AS id 
      FROM pets 
      LEFT JOIN municipalities ON pets.id_municipality = municipalities.id 
      LEFT JOIN races ON pets.id_race = races.id`
    );

    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'No hay mascotas' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPets = async (req, res) => {
  try {
    const { name, id_race, age, sterilized, gender, description, background, location, id_municipality, vaccines } = req.body;

    let image = null;

    if (req.file) {
      image = req.file.originalname;
    }

    const [result] = await pool.query(
      'INSERT INTO pets (name, id_race, age, sterilized, gender, image, description, background, location, id_municipality, vaccines) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, id_race, age, sterilized, gender, image, description, background, location, id_municipality, vaccines]
    );

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Mascota creada con éxito' });
    } else {
      return res.status(404).json({ message: 'No se pudo crear la mascota' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPet = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT 
        pets.*, 
        municipalities.name AS municipality, 
        races.name AS race_name 
      FROM pets 
      LEFT JOIN municipalities ON pets.id_municipality = municipalities.id 
      LEFT JOIN races ON pets.id_race = races.id 
      WHERE pets.id = ?`,
      [id]
    );

    if (result.length > 0) {
      return res.status(200).json(result[0]);
    } else {
      return res.status(404).json({ message: 'No hay mascota con ese ID' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, id_race, age, sterilized, gender, description, background, location, id_municipality, vaccines } = req.body;
    const [oldPet] = await pool.query('SELECT * FROM pets WHERE id = ?', [id]);

    let image = null;

    if (req.file) {
      image = req.file.originalname;
    }

    const data = {
      name: name ?? oldPet[0].name,
      id_race: id_race ?? oldPet[0].id_race,
      age: age ?? oldPet[0].age,
      sterilized: sterilized ?? oldPet[0].sterilized,
      gender: gender ?? oldPet[0].gender,
      image: image ?? oldPet[0].image,
      description: description ?? oldPet[0].description,
      background: background ?? oldPet[0].background,
      location: location ?? oldPet[0].location,
      id_municipality: id_municipality ?? oldPet[0].id_municipality,
      vaccines: vaccines ?? oldPet[0].vaccines
    };

    const [result] = await pool.query('UPDATE pets SET ? WHERE id = ?', [data, id]);
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Mascota actualizada con éxito' });
    } else {
      return res.status(404).json({ message: 'No se pudo actualizar la mascota' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM pets WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Se eliminó la mascota' });
    } else {
      return res.status(404).json({ message: 'No hay mascota con ese ID' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
