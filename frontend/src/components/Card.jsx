import { useEffect, useState } from "react"
import Button from "./Button"
import CustomModal from "./Modal"
import toast from "react-hot-toast"
import axiosClient from "../utils/axiosClient"

function Card({ pet, getData }) {
    const [open, setOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [vaccines, setVaccines] = useState([])
    const handleAdopt = async (id) => {
        try {
            if (confirm('¿Estas que quieres iniciar el proceso de adopción?')) {
                await axiosClient.post('/adoptions', { id_user: user.id, id_pet: id }).then((response) => {
                    if (response.status == 201) {
                        toast.success("Mascota es proceso de adopción")
                        setOpen(false)
                        getData()
                    }
                })
            }
        } catch (error) {
            console.error(error);
            toast.error("No se pudo adoptar la mascota")
        }
    }

    useEffect(() => {
        const getVaccines = async () => {
            try {
                await axiosClient(`/listVaccinePet/${pet.id}`).then((response) => {
                    if (response.status == 200) {
                        setVaccines(response.data)
                        console.log(response.data);
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }

        if (open) {
            getVaccines()
        }

    }, [open])


    return (
        <div className="bg-background rounded-lg shadow-lg overflow-hidden w-80 border border-gray-200">
            <CustomModal open={open} onClose={() => setOpen(false)} >
                <h2 className="text-xl font-semibold">Más sobre {pet.name}</h2>
                <div className="flex flex-row gap-3 w-full">
                    <div className="w-[50%] flex justify-center items-center h-96 bg-gray-200 rounded">
                        {
                            pet.image != null ? <img src={`http://localhost:3333/public/img/${pet.image}`} alt={pet.name} className="w-full h-full object-cover" /> : (
                                <p className="text-center">Sin imagen</p>
                            )
                        }
                    </div>
                    <div className="w-[50%] flex flex-col gap-3 h-80 justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Nombre: </p>
                                <p className="w-full">{pet.name}</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <p className="w-1/3 font-bold">Raza: </p>
                                <p className="w-full">{pet.race}</p>
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
                                <p className="w-1/3 font-bold">Ubicación:</p>
                                <p className="w-full">{pet.location}</p>
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
                    pet.image != null ? <img src={`http://localhost:3333/public/img/${pet.image}`} alt={pet.name} className="w-full h-full object-cover" /> : (
                        <p className="text-center">Sin imagen</p>
                    )
                }
            </div>
            <div className="p-4">
                <div className="flex flex-row">
                    <div className="w-[80%]">
                        <h3 className="text-lg font-semibold">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">{pet.race}, {pet.age}</p>
                    </div>
                    <div>
                        <p>{pet.gender}</p>
                        <button className="underline text-[#C683EA] hover:text-[#9C50C4] transition-all" onClick={() => setOpen(true)}>Ver más</button>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Button
                        onClick={() => handleAdopt(pet.id)}
                        disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
                    >
                        {pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Card