import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import axiosClient from '../utils/axiosClient'
import { UserContext } from '../context/UserContext'

const CardAdoption = ({ pet }) => {
  const { user } = useContext(UserContext)
  const handleCancel = async (id) => {
    try {
      await axiosClient.delete(`/adoption/user/${id}/${pet.id_pet}`).then((response) => {
        if (response.status == 200) {
          ToastAndroid.show('Adopción cancelada', ToastAndroid.SHORT)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ width: '100%', height: 220, backgroundColor: '#e6c6f7', borderRadius: 7, padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {
        pet.image ? (
          <Image src={`http://10.0.2.2:3333/public/img/${pet.image}`} style={{ width: '100%', height: 110 }} />
        ) : (
          <View style={{ width: '100%', height: 110, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sin Imagen</Text>
          </View>
        )
      }
      <View style={{ width: '100%', height: 45, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{pet.name}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.race}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.age}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.gender}</Text>
        </View>
      </View>
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{pet.state}</Text>
        <TouchableOpacity onPress={() => handleCancel(user.id)}   style={{ backgroundColor: '#C71585', padding: 7, borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>Cancelar solicitud</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CardAdoption