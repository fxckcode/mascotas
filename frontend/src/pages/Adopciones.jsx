import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Base from '../layout/Base'
import axiosClient from '../utils/axiosClient'
import CardAdoption from '../components/CardAdoption'

function Adopciones() {
  const [adoptions, setAdoptions] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  const [ searchTerm, setSearchTerm ] = useState('')

  const getData = async () => {
    try {
      if (user.role == 'usuario') {
        await axiosClient.get(`/adoption/user/${user.id}`).then((response) => {
          if (response.status == 200) {
            setAdoptions(response.data)
          }
        })
      } else if (user.role == 'administrador') {
        await axiosClient.get('/adoptions').then((response) => {
          if (response.status == 200) {
            setAdoptions(response.data)
          }
        })

      }
    } catch (error) {
      console.error(error);
      setAdoptions([])
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredAdoptions = adoptions.filter((adoption) =>(
    Object.values(adoption).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )  
  ))

  return (
    <Base title="Adopciones | Petfy">
      <div className='w-full flex flex-col gap-2'>
        <div className='w-full flex flex-row justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Adoptaciones en proceso</h1>
          <div className='flex flex-row gap-2 items-center'>
            <Input placeholder="Buscar" className="w-200" value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <div className='flex w-full flex-row gap-4 flex-wrap'>
          {
            filteredAdoptions.length > 0 ? filteredAdoptions.map((a, index) => (
              <CardAdoption key={index} adoption={a} getData={getData} />
            )) : (
              <p className='text-center'>No hay adopciones en proceso</p>
            )
          }
        </div>
      </div>

    </Base>
  )
}

export default Adopciones