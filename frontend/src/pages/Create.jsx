import Base from "../layout/Base"
import Label from "../components/Label"
import Input from "../components/Input"
import Select from "../components/Select"
import TextArea from "../components/TextArea"
import Button from "../components/Button"
import { useEffect, useState } from "react"
import axiosClient from "../utils/axiosClient"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
function Create() {
  const [races, setRaces] = useState([])
  const [ municipalities, setMunicipalities ] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        await axiosClient.get('/municipalities').then((response) => {
          if (response.status === 200) {
            setMunicipalities(response.data)
          }
        })

        await axiosClient.get('/races').then((response) => {
          if (response.status === 200) {
            setRaces(response.data)
          }
        })

      } catch (error) {
        console.error(error)
      }
    }

    fetchMunicipalities()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', e.target.name_pet.value)
      formData.append('id_race', e.target.race.value)
      formData.append('age', e.target.age.value)
      formData.append('sterilized', e.target.sterilized.value)
      formData.append('gender', e.target.gender.value)
      formData.append('description', e.target.description.value)
      formData.append('image', e.target.image.files[0])
      formData.append('location', e.target.location.value)
      formData.append('id_municipality', e.target.municipality.value)
      formData.append('background', e.target.background.value)
      formData.append('vaccines', e.target.vaccines.value)

      await axiosClient.post('/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.status === 201) {
          toast.success('Mascota creada correctamente')
          e.target.reset()
          navigate('/home')
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Base title="Crear | Petfy">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">Crear una mascota</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-5">
            <div className="w-1/2">
              <Label htmlFor="name_pet">Nombre</Label>
              <Input name="name_pet" type="text" required id="name_pet" />
            </div>
            <div className="w-1/2">
              <Label htmlFor="race">Raza</Label>
              <Select name="race" required id="race" >
                <option value="">Seleccione...</option>
                {
                  races.length > 0 && races.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))
                }
              </Select>
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="w-1/2">
              <Label htmlFor="age">Edad</Label>
              <Input name="age" type="text" required id="age" />
            </div>
            <div className="w-1/2">
              <Label htmlFor="sterilized">Esterilizado</Label>
              <Select name="sterilized" id="sterilized" required>
                <option value={1}>Sí</option>
                <option value={2}>No</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div>
              <Label htmlFor="gender">Género</Label>
              <Select name="gender" id="gender" required>
                <option value={1}>Macho</option>
                <option value={2}>Hembra</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="image">Imagen</Label>
              <Input name="image" type="file" id="image" />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="w-1/2">
              <Label htmlFor="location">Ubicación</Label>
              <Input name="location" type="text" id="location" required />
            </div>
            <div className="w-1/2">
              <Label htmlFor="municipality">Municipio</Label>
              <Select name="municipality" id="municipality" required> 
                {
                  municipalities.length > 0 && municipalities.map((municipality) => (
                    <option key={municipality.id} value={municipality.id}>{municipality.name}</option>
                  ))
                }
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <TextArea name="description" id="descripcion" required />
          </div>
          <div>
            <Label htmlFor="background">Antecendentes</Label>
            <TextArea name="background" id="background" required />
          </div>
          <div>
            <Label htmlFor="vaccines">Vacunas</Label>
            <TextArea name="vaccines" id="vaccines" required />
          </div>
          <Button type="submit">Crear</Button>
        </form>
      </div>
    </Base>
  )
}

export default Create