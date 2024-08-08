// Importa el módulo multer para manejar la carga de archivos y la conexión a la base de datos
import multer from 'multer';
import pool from '../database/conexion.js';

// Configuración de multer para el almacenamiento de archivos cargados
const storage = multer.diskStorage({
  // Define el directorio de destino para los archivos cargados
  destination: function (req, file, cb) {
    cb(null, 'public/img'); // Los archivos se almacenan en el directorio 'public/img'
  },
  // Define el nombre del archivo cargado
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa el nombre original del archivo
  }
});

// Crea una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Exporta un middleware para manejar la carga de una sola imagen usando el campo 'image'
export const cargarImagen = upload.single('image');

// Función para obtener todas las mascotas con información adicional de municipios, razas y categorías
export const getPets = async (req, res) => {
  try {
    // Realiza una consulta SQL para obtener todas las mascotas y sus detalles asociados
    const [result] = await pool.query(
      `SELECT 
        pets.*, 
        municipalities.name AS municipality, 
        races.name AS race_name,
        categories.name AS category_name, 
        pets.id AS id 
      FROM pets 
      LEFT JOIN municipalities ON pets.id_municipality = municipalities.id 
      LEFT JOIN races ON pets.id_race = races.id
      LEFT JOIN categories ON pets.id_category = categories.id`
    );

    // Verifica si se obtuvieron resultados
    if (result.length > 0) {
      // Si hay resultados, responde con el estado 200 y los datos en formato JSON
      return res.status(200).json(result);
    } else {
      // Si no hay resultados, responde con el estado 404 y un mensaje de error
      return res.status(404).json({ message: 'No hay mascotas' });
    }
  } catch (error) {
    // En caso de error, responde con el estado 500 y el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Función para crear una nueva mascota en la base de datos
export const createPets = async (req, res) => {
  try {
    // Extrae los datos de la mascota del cuerpo de la solicitud
    const { name, id_race, age, sterilized, gender, description, background, location, id_municipality, vaccines, phone_admin, id_category } = req.body;

    let image = null;

    // Verifica si se ha cargado un archivo de imagen
    if (req.file) {
      image = req.file.originalname; // Obtiene el nombre del archivo cargado
    }

    // Realiza una consulta SQL para insertar una nueva mascota
    const [result] = await pool.query(
      'INSERT INTO pets (name, id_race, age, sterilized, gender, image, description, background, location, id_municipality, vaccines, phone_admin, id_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, id_race, age, sterilized, gender, image, description, background, location, id_municipality, vaccines, phone_admin, id_category]
    );

    // Verifica si la inserción fue exitosa
    if (result.affectedRows > 0) {
      // Si la inserción fue exitosa, responde con el estado 201 y un mensaje de éxito
      return res.status(201).json({ message: 'Mascota creada con éxito' });
    } else {
      // Si la inserción falló, responde con el estado 404 y un mensaje de error
      return res.status(404).json({ message: 'No se pudo crear la mascota' });
    }
  } catch (error) {
    // En caso de error, responde con el estado 500 y el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Función para obtener una mascota específica basada en el ID proporcionado
export const getPet = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID de la mascota desde los parámetros de la solicitud
    
    // Realiza una consulta SQL para obtener la mascota con el ID proporcionado
    const [result] = await pool.query(
      `SELECT 
        pets.*, 
        municipalities.name AS municipality, 
        races.name AS race_name, 
        categories.name AS category_name
      FROM pets 
      LEFT JOIN municipalities ON pets.id_municipality = municipalities.id 
      LEFT JOIN races ON pets.id_race = races.id 
      LEFT JOIN categories ON pets.id_category = categories.id
      WHERE pets.id = ?`,
      [id]
    );

    // Verifica si se obtuvieron resultados
    if (result.length > 0) {
      // Si hay resultados, responde con el estado 200 y el primer resultado en formato JSON
      return res.status(200).json(result[0]);
    } else {
      // Si no hay resultados, responde con el estado 404 y un mensaje de error
      return res.status(404).json({ message: 'No hay mascota con ese ID' });
    }
  } catch (error) {
    // En caso de error, responde con el estado 500 y el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Función para actualizar una mascota existente
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID de la mascota desde los parámetros de la solicitud
    const { name, id_race, age, sterilized, gender, description, background, location, id_municipality, vaccines, id_category } = req.body;
    
    // Obtiene los datos actuales de la mascota usando el ID proporcionado
    const [oldPet] = await pool.query('SELECT * FROM pets WHERE id = ?', [id]);

    let image = null;

    // Verifica si se ha cargado una nueva imagen
    if (req.file) {
      image = req.file.originalname; // Obtiene el nombre del nuevo archivo cargado
    }

    // Prepara los datos a actualizar, manteniendo los valores actuales si no se proporcionan nuevos
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
      vaccines: vaccines ?? oldPet[0].vaccines,
      id_category: id_category ?? oldPet[0].id_category,
    };

    // Realiza una consulta SQL para actualizar los datos de la mascota
    const [result] = await pool.query('UPDATE pets SET ? WHERE id = ?', [data, id]);
    
    // Verifica si la actualización fue exitosa
    if (result.affectedRows > 0) {
      // Si la actualización fue exitosa, responde con el estado 201 y un mensaje de éxito
      return res.status(201).json({ message: 'Mascota actualizada con éxito' });
    } else {
      // Si la actualización falló, responde con el estado 404 y un mensaje de error
      return res.status(404).json({ message: 'No se pudo actualizar la mascota' });
    }
  } catch (error) {
    // En caso de error, responde con el estado 500 y el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

// Función para eliminar una mascota existente
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID de la mascota desde los parámetros de la solicitud
    
    // Realiza una consulta SQL para eliminar la mascota con el ID proporcionado
    const [result] = await pool.query('DELETE FROM pets WHERE id = ?', [id]);

    // Verifica si la eliminación fue exitosa
    if (result.affectedRows > 0) {
      // Si la eliminación fue exitosa, responde con el estado 200 y un mensaje de éxito
      return res.status(200).json({ message: 'Se eliminó la mascota' });
    } else {
      // Si la eliminación falló, responde con el estado 404 y un mensaje de error
      return res.status(404).json({ message: 'No hay mascota con ese ID' });
    }
  } catch (error) {
    // En caso de error, responde con el estado 500 y el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};
