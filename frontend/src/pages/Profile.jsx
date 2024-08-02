import Base from "../layout/Base"
import Label from "../components/Label"
import Input from "../components/Input"
import Button from '../components/Button'
import toast from "react-hot-toast"
import axiosClient from "../utils/axiosClient"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [editUser, setEditUser] = useState({})

  const getUser = async () => {
    try {
      await axiosClient.get(`/user/${user.id}`).then((response) => {
        setEditUser(response.data)
      })
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        name: e.target.nombre.value,
        phone: e.target.telefono.value,
        email: e.target.email.value
      }

      if (confirm('¿Estás seguro de guardar los cambios?')) {
        await axiosClient.put(`/user/${user.id}`, data).then((response) => {
          if (response.status == 200) {
            toast.success('Datos guardados correctamente')
            getUser()
          }
        })
      }

    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al guardar los datos')
    }
  }

  return (
    <Base title="Perfil | Petfy">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Perfil</h1>
          <form className="grid gap-6 shadow-xl p-4 rounded border border-gray-300" onSubmit={handleEdit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name">Nombre</Label>
                <Input type="text" id="nombre" name="nombre" defaultValue={editUser.name} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="telefono">Télefono</Label>
                <Input type="number" id="telefono" name="telefono" defaultValue={editUser.phone} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" defaultValue={editUser.email} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Guardar cambios</Button>
            </div>
          </form>
          <Link to="/logout">
            <p className="underline text-center">Cerrar sesión</p>
          </Link>
        </div>
      </div>

    </Base>
  )
}

export default Profile