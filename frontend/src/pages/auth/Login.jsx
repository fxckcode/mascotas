import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Label from "../../components/Label"
import logo from '/logo_morado.svg'
import { useEffect, useRef } from "react"
import axiosClient from "../../utils/axiosClient"
import toast from "react-hot-toast"

function Login() {
    const navigate = useNavigate()

    const email = useRef(null)
    const password = useRef(null)

    useEffect(() => {
        document.title = 'Petfy | Iniciar Sesión'
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: email.current.value,
                password: password.current.value
            }
            await axiosClient.post('/login', data).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    navigate('/dashboard') 
                    toast.success('Bienvenido a Petfy')
                } else {
                    toast.error('Credenciales incorrectas')
                }
            })
        } catch (error) {
            console.error(error);
            toast.error('Credenciales incorrectas')
        }
    } 

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96 p-4 bg-white shadow-xl rounded-lg border-[#C683EA] border flex items-center flex-col gap-3">
                <img src={logo} alt="petfy_logo" width={100} />
                <form className="mt-6 space-y-6 w-full" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="email">Correo</Label>
                        <Input type="email" id="email" required ref={email} />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input type="password" id="password" required ref={password} />
                    </div>
                    <div>
                        <Button type="submit">Iniciar Sesión</Button>
                    </div>
                    <Link to="/singup">
                        <p className="text-[#C683EA] hover:underline transition-all text-sm text-center mt-3">
                            ¿No tienes cuenta? Regístrate
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login