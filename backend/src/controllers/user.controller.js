import pool from '../database/conexion.js'

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query('select * from users')

        if (result.length > 0) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({ message: 'No hay usuarios' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        const [result] = await pool.query('insert into users (name, email, password, phone) values (?, ?, ?, ?)', [name, email, password, phone])
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Usuario creado con éxito' })
        }
        else {
            return res.status(404).json({ message: 'No se pudo crear el usuario' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('select * from users where id = ?', [id])

        if (result.length > 0) {
            return res.status(200).json(result[0])
        }
        else {
            return res.status(404).json({ message: 'No hay usuarios con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password, phone, role } = req.body
        const [oldUser] = await pool.query('select * from users where id = ?', [id])
        const data = {
            name: name ? name : oldUser[0].name,
            email: email ? email : oldUser[0].email,
            password: password ? password : oldUser[0].password,
            phone: phone ? phone : oldUser[0].phone,
            role: role ? role : oldUser[0].role
        }
        const [result] = await pool.query('update users set name=?, email=?, password=?, phone=? where id = ?', [data.name, data.email, data.password, data.phone, id])
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'usuario actualizado con éxito', result })
        }
        else {
            return res.status(404).json({ message: 'No se pudo actuaizar el usuario' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('delete from users where id = ?', [id])

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Se elimino el usuario' })
        }
        else {
            return res.status(404).json({ message: 'No hay un usuario con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
} 
