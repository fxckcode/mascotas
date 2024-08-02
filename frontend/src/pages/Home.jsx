import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Base from '../layout/Base'
import axiosClient from '../utils/axiosClient'
import toast from 'react-hot-toast'

function Home() {
  const [pets, setPets] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const getData = async () => {
    try {
      await axiosClient("/pets").then((response) => {
        if (response.status == 200) {
          setPets(response.data)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredPets = pets.filter((pet) =>
    Object.values(pet).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <Base title="Inicio | Petfy">
      <div className='w-full flex flex-col gap-1'>
        <div className='w-full flex flex-row justify-between items-center'>
          <h1 className='text-2xl font-semibold mb-5'>Adoptar</h1>
          <div className='flex flex-row gap-2 items-center'>
            <Input placeholder="Buscar" className="w-200" value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <div className='w-full flex flex-wrap gap-5'>
          {
            filteredPets.length > 0 ? filteredPets.map((pet) => (
              <Card key={pet.id} pet={pet} getData={getData} />
            ))
              :
              (
                <div className='w-full flex justify-center items-center'>
                  <p>No hay mascotas disponibles</p>
                </div>
              )
          }
        </div>
      </div>
    </Base>
  )
}

export default Home