import { View, Text, Image, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import axiosClient from '../utils/axiosClient'
import { UserContext } from '../context/UserContext'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/base'

const CardAdoption = ({ pet }) => {
  const { user } = useContext(UserContext)
  const navigation = useNavigation()
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

  const handleAccept = async () => {
    try {
      await axiosClient.put(`/adoption/${pet.id_pet}`, { state: 'Aprobado' }).then((response) => {
        if (response.status == 200) {
          ToastAndroid.show('Adopción aprobada', ToastAndroid.SHORT)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handleReject = async () => {
    try {
      await axiosClient.put(`/adoption/${pet.id_pet}`, { state: 'No aprobado' }).then((response) => {
        if (response.status == 200) {
          ToastAndroid.show('Adopción rechazada', ToastAndroid.SHORT)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableOpacity style={{ width: '100%', height: 220, backgroundColor: '#e6c6f7', borderRadius: 7, padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }} onPress={() => {
      navigation.navigate('ConsulPetAdoption', { pet })
    }}>
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
        <View style={{ width: '60%' }}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{pet.name}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.race_name}, {pet.age}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.gender}</Text>
        </View>
      </View>
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-around', alignItems: 'center' }}>
        {
          user.role === 'usuario' ? (
            <>
              <Button
                title={pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                onPress={() => handleAdopt(pet.id)}
                disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
              />
              {pet.state === 'En proceso' && (
                <TouchableOpacity onPress={() => handleCancel(user.id)}>
                  <Text style={styles.cancelText}>Cancelar solicitud</Text>
                </TouchableOpacity>
              )}
            </>
          ) : pet.state === 'En proceso' ? (
            <View style={styles.container}>
              <Button
                title="Aprobar"
                color="green"
                onPress={handleAccept}
              />
              <Button
                title="Rechazar"
                color="red"
                onPress={handleReject}
              />
            </View>
          ) : pet.state === 'Aprobado' ? (
            <Button title="Aprobado" disabled />
          ) : pet.state === 'No aprobado' ? (
            <Button
              title="No aprobado"
              disabled
              color="#c62828" // Color rojo de fondo
              style={styles.noApprovedButton}
            />
          ) : null
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  cancelText: {
    color: 'red',
    textDecorationLine: 'underline',
    marginVertical: 10,
    fontSize: 16,
  },
  noApprovedButton: {
    backgroundColor: '#c62828', // Rojo oscuro
    color: 'white',
  },
});

export default CardAdoption