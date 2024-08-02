import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Label from "../../components/Label"
import logo from '/logo_morado.svg'
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import axiosClient from "../../utils/axiosClient"

function SignUp() {
    const navigate = useNavigate()

    const nombre = useRef(null)
    const email = useRef(null)
    const telefono = useRef(null)
    const password = useRef(null)
    const identification = useRef(null)

    useEffect(() => {
        document.title = 'Petfy | Registrarse'
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name: nombre.current.value,
                email: email.current.value,
                phone: telefono.current.value,
                password: password.current.value,
                identification: identification.current.value
            }

            await axiosClient.post('/users', data).then((response) => {
                if (response.status == 201) {
                    navigate('/')
                    toast.success('Registro exitoso')
                } else {
                    toast.error('Error al registrarse')
                }
            })

        } catch (error) {
            console.error(error);
            toast.error('Error al registrarse')
        }
    } 

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96 p-4 bg-white shadow-xl rounded-lg border-[#C683EA] border flex items-center flex-col gap-3">
                <img src={logo} alt="petfy_logo" width={100} />
                <form className="mt-6 space-y-6 w-full" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input type="text" id="nombre" ref={nombre} required />
                    </div>
                    <div>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input type="number" id="telefono" ref={telefono} required />
                    </div>
                    <div>
                        <Label htmlFor="identification">Identificación</Label>
                        <Input type="number" id="identification" ref={identification} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo</Label>
                        <Input type="email" id="email" ref={email} required />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input type="password" id="password" ref={password} required />
                    </div>
                    <div>
                        <Button type="submit">Registrarse</Button>
                    </div>
                    <Link to="/">
                        <p className="text-[#C683EA] hover:underline transition-all text-sm text-center mt-3">
                            ¿Ya tienes una cuenta? Inicia Sesión
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp