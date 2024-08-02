import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Input } from '@rneui/base'
import { Button } from 'react-native-elements'
import { faTransgender, faPaw, faHeart, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import axiosClient from '../utils/axiosClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../context/UserContext'

const ConsultPet = ({ route }) => {
  const { pet } = route.params
  const navigation = useNavigation()
  const { user } = useContext(UserContext)

  const handleAdopt = async () => {
    try {
      await axiosClient.post('/adoptions', { id_user: user.id, id_pet: pet.id }).then((response) => {
        if (response.status == 201) {
          ToastAndroid.show('Adopción en proceso', ToastAndroid.SHORT)
          navigation.navigate('HomeTabs', {
            screen: 'Home',
            params: { screen: 'Home' }
          })
        }
      })
    } catch (error) {
      console.error(pet);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.content}>
          <Image src={`http://10.0.2.2:3333/public/img/${pet.image}`} style={{ width: '100%', height: 200 }} resizeMode='contain' />
          <View>
            <Text style={{ color: '#9C50C4', fontSize: 30, fontWeight: '700' }}>{pet.name}</Text>
          </View>
          <View>
            <Text style={{ color: '#9C50C4', fontSize: 20, fontWeight: '500' }}>{pet.race}</Text>
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
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Género: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.gender}</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '40%', color: '#9C50C4', fontSize: 20, fontWeight: '500' }} >Ubicación: </Text>
            <Text style={{ color: '#9C50C4', fontSize: 18 }}>{pet.location}</Text>
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
          <Button title={pet.state} onPress={() => handleAdopt()} buttonStyle={[style.button]} disabled={pet.state != 'Sin adoptar'} />
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
export default ConsultPet