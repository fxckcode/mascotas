import React, { useState } from 'react'
import Button from './Button'
import axiosClient from '../utils/axiosClient'
import toast from 'react-hot-toast'
import CustomModal from './Modal'

function CardAdoption({ adoption, getData }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [open, setOpen] = useState(false)
  const handleCancel = async (id) => {
    try {
      if (confirm("Estas seguro que quieres eliminar de adopción de estas mascota?")) {
        await axiosClient.delete(`/adoption/user/${id}/${adoption.id_pet}`).then((response) => {
          if (response.status == 200) {
            toast.success('Solicitud cancelada con exito')
            getData()
          }
        })

      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleAccept = async () => {
    try {
      if (confirm('¿Estas seguro que quieres aceptar esta adopción?')) {
        await axiosClient.put(`/accept/${adoption.id_user}/${adoption.id_pet}`).then((response) => {
          if (response.status == 200) {
            toast.success('Adopción aceptada')
            getData()
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleReject = async () => {
    try {
      if (confirm('¿Estas seguro que quieres rechazar esta adopción?')) {
        await axiosClient.put(`/reject/${adoption.id_user}/${adoption.id_pet}`).then((response) => {
          if (response.status == 200) {
            toast.success('Adopción rechazada')
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
        <h2 className="text-xl font-semibold">Más sobre {adoption.name}</h2>
        <div className="flex flex-row gap-3 w-full h-full">
          <div className="w-[50%] flex justify-center items-center bg-gray-200 rounded">
            {
              adoption.image != null ? <img src={`http://localhost:3333/public/img/${adoption.image}`} alt={adoption.name} className="w-full h-full object-contain" /> : (
                <p className="text-center">Sin imagen</p>
              )
            }
          </div>
          <div className="w-[50%] flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Nombre: </p>
                <p className="w-full">{adoption.name || adoption.pet_name}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Raza: </p>
                <p className="w-full">{adoption.race_name}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Edad: </p>
                <p className="w-full">{adoption.age}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Esterilizado: </p>
                <p className="w-full">{adoption.sterilized}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Vacunas: </p>
                <p className="w-full">{adoption.vaccines}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Género: </p>
                <p className="w-full">{adoption.gender}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Ubicación:</p>
                <p className="w-full">{adoption.location}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Municipio:</p>
                <p className="w-full">{adoption.municipality}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Antecedentes:</p>
                <p className="w-full">{adoption.background}</p>
              </div>
              <div className="w-full flex flex-row">
                <p className="w-1/3 font-bold">Descripción: </p>
                <p className="w-full">{adoption.description}</p>
              </div>

              <h2 className='text-xl font-semibold text-center'>Datos del Adoptante</h2>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex flex-row">
                  <p className="w-1/3 font-bold">Nombre:</p>
                  <p className="w-full">{adoption.user_name}</p>
                </div>
                <div className="w-full flex flex-row">
                  <p className="w-1/3 font-bold">Correo:</p>
                  <p className="w-full">{adoption.email}</p>
                </div>
                <div className="w-full flex flex-row">
                  <p className="w-1/3 font-bold">Telefono:</p>
                  <p className="w-full">{adoption.phone}</p>
                </div>
              </div>

            </div>
            <div className="flex items-center justify-between mt-4 flex-row gap-3">
              {
                user.role == 'usuario' ? (
                  <>
                    <Button
                      onClick={() => handleAdopt(adoption.id)}
                      disabled={adoption.state === 'En proceso' || adoption.state === 'Adoptado'}
                    >
                      {adoption.state === 'En proceso' ? 'En proceso' : adoption.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                    </Button>
                    {
                      adoption.state == 'En proceso' ? (
                        <p onClick={() => handleCancel(user.id)} className='w-72 text-red-800 hover:scale-105 transition-all cursor-pointer'>Cancelar solicitud</p>
                      ) : ''
                    }
                  </>
                ) : adoption.state == 'En proceso' ? (
                  <div className='w-full flex justify-around items-center'>
                    <button className='text-green-600 hover:font-semibold hover:scale-105 transition-all' onClick={() => handleAccept()}>Aprobar</button>
                    <button className='text-red-600 hover:font-semibold hover-scale-105 transition-all'>Rechazar</button>
                  </div>
                ) : adoption.state == 'Aprobado' ? (
                  <Button disabled>Aprobado</Button>
                ) : adoption.state == 'No aprobado' ? (
                  <button disabled className='w-full p-2 bg-red-700 text-white rounded'>No aprobado</button>
                ) : (<></>)
              }
            </div>
          </div>
        </div>
      </CustomModal>
      <div className="h-48 bg-cover bg-center flex justify-center items-center">
        {
          adoption.image != null ? <img src={`http://localhost:3333/public/img/${adoption.image}`} alt={adoption.name} className="w-full h-full object-" /> : (
            <p className="text-center">Sin imagen</p>
          )
        }
      </div>
      <div className="p-4">
        <div className="flex flex-row">
          <div className="w-[80%]">
            <h3 className="text-lg font-semibold">{adoption.name}</h3>
            <p className="text-sm text-muted-foreground">{adoption.race_name}, {adoption.age}</p>
          </div>
          <div>
            <p>{adoption.gender}</p>
            <button className="underline text-[#C683EA] hover:text-[#9C50C4] transition-all" onClick={() => setOpen(true)}>Ver más</button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 flex-row gap-3">
          {
            user.role == 'usuario' ? (
              <>
                <Button
                  onClick={() => handleAdopt(adoption.id)}
                  disabled={adoption.state === 'En proceso' || adoption.state === 'Aprobado'}
                >
                  {adoption.state === 'En proceso' ? 'En proceso' : adoption.state === 'Aprobado' ? 'Adoptado' : 'Adoptar'}
                </Button>
                {
                  adoption.state == 'En proceso' ? (
                    <p onClick={() => handleCancel(user.id)} className='w-72 text-red-800 hover:scale-105 transition-all cursor-pointer'>Cancelar solicitud</p>
                  ) : ''
                }
              </>
            ) : adoption.state == 'En proceso' ? (
              <div className='w-full flex justify-around items-center'>
                <button className='text-green-600 hover:font-semibold hover:scale-105 transition-all' onClick={() => handleAccept()}>Aprobar</button>
                <button className='text-red-600 hover:font-semibold hover-scale-105 transition-all' onClick={() => handleReject()}>Rechazar</button>
              </div>
            ) : adoption.state == 'Aprobado' ? (
              <Button disabled>Aprobado</Button>
            ) : adoption.state == 'No aprobado' ? (
              <button disabled className='w-full p-2 bg-red-700 text-white rounded'>No aprobado</button>
            ) : (<></>)
          }
        </div>
      </div>
    </div>
  )
}

export default CardAdoption