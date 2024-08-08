import pool from "../database/conexion.js";

export const getCategories = async (req, res) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM categories');

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No se encontraron categorias' });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const setCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const [result] =  await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Categoria creada correctamente' });
        } else {
            return res.status(400).json({ message: 'No se pudo crear la categoria' });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}