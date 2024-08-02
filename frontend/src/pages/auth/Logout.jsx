import { useEffect } from "react"
import toast from "react-hot-toast"

function Logout() {

    useEffect(() => {
        localStorage.clear()
        window.location.href = '/'
        toast.success('Sesión cerrada')
    }, [])

    return (
        <div>Cargando...</div>
    )
}

export default Logout