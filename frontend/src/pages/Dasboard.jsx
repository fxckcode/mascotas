import React, { useEffect, useState } from 'react'
import Base from '../layout/Base'
import axiosClient from '../utils/axiosClient'
import PetsGrafica from '../components/PetsGrafica'
import AdoptionStatusGrafica from '../components/AdoptionStatusGrafica'
import GenderPieChart from '../components/GenderPieChart'

function Dasboard() {

  const [ countPets, setCountPets ] = useState(0)
  const [ countAdoptions, setCountAdoptions ] = useState(0)
  const [pets, setPets] = useState([])
  const [adoptions, setAdoptions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosClient.get('/pets').then((response) => {
          if (response.status == 200) {
            setCountPets(response.data.length)
            setPets(response.data)
          }
        })
        await axiosClient.get('/adoptions').then((response) => {
          if (response.status == 200) {
            setCountAdoptions(response.data.length)
            setAdoptions(response.data)
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Base title="Dashboard | Petfy">
      <div className='w-full flex flex-col'>
        <section className="bg-[#C683EA] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Encuentra a tu nuevo mejor amigo</h1>
            <p className="text-lg mb-8">Explora nuestra aplicación y descubre mascotas adorables que buscan un hogar.</p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Características de nuestra app</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-4">Búsqueda Avanzada</h3>
                <p className="text-gray-600">Filtra y encuentra la mascota perfecta para ti por raza, tamaño, edad y más.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-4">Perfil de Mascota</h3>
                <p className="text-gray-600">Conoce detalles importantes sobre cada mascota y encuentra tu compañero ideal.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-4">Proceso de Adopción Simple</h3>
                <p className="text-gray-600">Sigue un proceso de adopción sencillo y claro para llevar a casa a tu nueva mascota.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold mb-4">Mascotas en Adopción</h3>
                <p className="text-3xl font-bold text-blue-600">{countPets}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold mb-4">Adopciones en proceso</h3>
                <p className="text-3xl font-bold text-blue-600">{countAdoptions}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <PetsGrafica data={pets} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <AdoptionStatusGrafica data={adoptions} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <GenderPieChart data={pets} />
          </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 PetAdopt. Todos los derechos reservados.</p>
            <div className="mt-4">
              <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">Instagram</a>
            </div>
          </div>
        </footer>
      </div>
    </Base>
  )
}

export default Dasboard