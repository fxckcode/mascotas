import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../context/UserContext'

const ConsultPetAdoption = ({ route }) => {
  const { pet } = route.params
  const navigation = useNavigation()
  const { user } = useContext(UserContext)

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.content}>
          <Image src={`http://10.0.2.2:3333/public/img/${pet.image}`} style={{ width: '100%', height: 200 }} resizeMode='contain' />
          <View>
            <Text style={{ color: '#9C50C4', fontSize: 30, fontWeight: '700' }}>{pet.name}</Text>
          </View>
          <View>
            <Text style={{ color: '#9C50C4', fontSize: 20, fontWeight: '500' }}>{pet.race_name}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Edad:</Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.age}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Esterilizad@: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.sterilized}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Vaccines: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.vaccines}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Género: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.gender}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Municipio: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.municipality}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Antecedentes: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.background}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Descripcion: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.description}</Text>
          </View>

          <Text style={{ textAlign: 'center', color: '#9C50C4', fontSize: 18, fontWeight: '500' }}>Datos del adoptante</Text>

          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Nombre: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.user_name}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Correo: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.email}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Teléfono: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.phone}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Mensaje: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.description_user}</Text>
          </View>
          <Text style={{ textAlign: 'center', color: '#9C50C4', fontSize: 18, fontWeight: '500' }}>Respuesta</Text>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Mensaje: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.description_admin}</Text>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  inputStyle: {
    padding: 2,
    borderColor: '#9C50C4',
    borderWidth: 1,
    borderRadius: 5,
    color: '#9C50C4',

  },
  inputDescripcion: {
    borderColor: '#9C50C4',
    borderWidth: 1,
    borderRadius: 5,
    color: '#9C50C4',
    padding: 20,

  },
  container: {
    flex: 1
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 5,
    padding: 20,
  },
  labelStyle: {
    fontWeight: 'normal',
    color: '#9C50C4'
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#9C50C4',
    width: 350,
    padding: 12
  }
})
export default ConsultPetAdoption