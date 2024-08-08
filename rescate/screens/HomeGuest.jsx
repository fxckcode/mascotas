import { View, Text, SafeAreaView, ScrollView, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axiosClient from '../utils/axiosClient'
import Card from '../components/Card'
import { Image } from 'react-native-elements'

const HomeGuest = () => {
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
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getData()
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    const handleConsult = () => {
        navigation.navigate('SingUp')
        ToastAndroid.show('Inicia sesión para adoptar una mascota', ToastAndroid.SHORT)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 20 }}>
                    {
                        pets.length > 0 ? pets.map((pet) => (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => handleConsult()}
                                key={pet.id}
                            >

                                <Image
                                    source={{ uri: `http://10.0.2.2:3333/public/img/${pet.image}` }}
                                    style={styles.image}
                                    resizeMode='cover'
                                />
                                <View style={styles.details}>
                                    <Text style={styles.name}>{pet.name}</Text>
                                    <Text style={styles.info}>{pet.race_name}, {pet.age}</Text>
                                    <Text style={styles.gender}>{pet.gender}</Text>
                                </View>
                            </TouchableOpacity>
                        )) : <Text>No hay mascotas</Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '45%',
        height: 250,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    details: {
        marginVertical: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    info: {
        fontSize: 14,
        color: '#666',
    },
    gender: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999',
    },
    userButton: {
        borderRadius: 20,
        backgroundColor: '#6c63ff',
        marginTop: 10,
    },
    adminActions: {
        marginTop: 5,
    },
    stateText: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: '100%',
    },
    editButton: {
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        borderRadius: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default HomeGuest