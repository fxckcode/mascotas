export const isAdmin = async (req, res, next) => {
    try {
        const user = JSON.parse(req.headers['user'])

        if (user.role == 'administrador') {
            next()
        } else {
            return res.status(401).json({ message: 'Usuario no autorizado'})
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
