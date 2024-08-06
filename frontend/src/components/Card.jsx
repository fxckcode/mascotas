import { useEffect, useState } from "react"
import Button from "./Button"
import CustomModal from "./Modal"
import toast from "react-hot-toast"
import axiosClient from "../utils/axiosClient"
import { useNavigate } from "react-router-dom"
import { generarLinkWhatsApp } from "../utils/generarLinkWhatsapp"

function Card({ pet, getData }) {
    const [open, setOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [vaccines, setVaccines] = useState([])
    const navigate = useNavigate()
    const handleAdopt = async (id) => {
        try {
            const mensaje = prompt('¿Por qué quieres adoptar a esta mascota?')
            if (mensaje != null) {
                await axiosClient.post('/adoptions', { id_user: user.id, id_pet: id }).then((response) => {
                    if (response.status == 201) {
                        toast.success("Mascota es proceso de adopción")
                        setOpen(false)
                        getData()
                        const link = generarLinkWhatsApp(pet.phone_admin, mensaje)
                        window.location.href = link
                    }
                })
            }
        } catch (error) {
            console.error(error);
            // toast.error("No se pudo adoptar la mascota")
        }
    }

    const handleDelete = async () => {
        try {
            if (confirm('¿Estas seguro que quieres eliminar esta mascota?')) {
                await axiosClient.delete(`/pet/${pet.id}`).then((response) => {
                    if (response.status == 200) {
                        toast.success('Mascota eliminada con exito')
                        getData()
                    }
                })
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="bg-background rounded-lg shadow-lg overflow-hidden w-80 border border-gray-200">
            <CustomModal open={open} onClose={() => setOpen(false)} >
                <h2 className="text-xl font-semibold">Más sobre {pet.name}</h2>
                <div className="flex flex-row gap-3 max-h-[70%] w-full">
                    <div className="w-[50%] flex justify-center items-center bg-gray-200 rounded">
                        {
                            pet.image != null ? <img src={`http://localhost:3333/public/img/${pet.image}`} alt={pet.name} className="w-full h-full object-contain" /> : (
                                <p className="text-center">Sin imagen</p>
                            )
                        }
                    </div>
                    <div className="w-[50%] flex flex-col gap-3 justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Nombre: </p>
                                <p className="w-full">{pet.name}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Raza: </p>
                                <p className="w-full">{pet.race_name}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Edad: </p>
                                <p className="w-full">{pet.age}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Esterilizado: </p>
                                <p className="w-full">{pet.sterilized}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Vacunas: </p>
                                <p className="w-full">{pet.vaccines}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Género: </p>
                                <p className="w-full">{pet.gender}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Municipio:</p>
                                <p className="w-full">{pet.municipality}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Antecedentes:</p>
                                <p className="w-full">{pet.background}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Descripción: </p>
                                <p className="w-full">{pet.description}</p>
                            </div>

                        </div>
                        <Button
                            onClick={() => handleAdopt(pet.id)}
                            disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
                        >
                            {pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                        </Button>
                    </div>
                </div>
            </CustomModal>
            <div className="h-48 bg-cover bg-center flex justify-center items-center">
                {
                    pet.image != null ? <img src={`http://localhost:3333/public/img/${pet.image}`} alt={pet.name} className="w-full h-full object-contain" /> : (
                        <p className="text-center">Sin imagen</p>
                    )
                }
            </div>
            <div className="p-4">
                <div className="flex flex-row">
                    <div className="w-[80%]">
                        <h3 className="text-lg font-semibold">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">{pet.race_name}, {pet.age}</p>
                    </div>
                    <div>
                        <p>{pet.gender}</p>
                        <button className="underline text-[#C683EA] hover:text-[#9C50C4] transition-all" onClick={() => setOpen(true)}>Ver más</button>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    {
                        user.role == 'usuario' ? (
                            <Button
                                onClick={() => handleAdopt(pet.id)}
                                disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
                            >
                                {pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                            </Button>
                        ) : (
                            <div className="w-full flex justify-around items-center">
                                <p className="font-semibold">{pet.state}</p>
                                <button className="text-purple-700 hover:font-semibold hover:scale-105 transition-all" onClick={() => navigate(`/edit/${pet.id}`) }>Editar</button>
                                <button onClick={() => handleDelete()} className="text-red-700 hover:font-semibold hover:scale-105 transition-all">Eliminar</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Card