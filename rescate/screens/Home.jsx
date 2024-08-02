import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axiosClient from '../utils/axiosClient'
import Card from '../components/Card'

const Home = () => {
  const [pets, setPets] = useState([])
  const navigation = useNavigation()

  const getData = async () => {
    try {
      await axiosClient.get('/pets').then((response) => {
        if (response.status == 200) {
          setPets(response.data)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getData()
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 20}}>
          {
            pets.length > 0 ? pets.map((pet) => (
              <Card key={pet.id} pet={pet}/>
            )) : <Text>No hay mascotas</Text>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home