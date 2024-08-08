import { View, Text, SafeAreaView, ScrollView, StyleSheet, Alert, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../utils/axiosClient'
import { Button } from '@rneui/base'
import { UserContext } from '../context/UserContext'
import { useNavigation } from '@react-navigation/native'

const Users = () => {
    const [users, setUsers] = useState([])
    const { user } = useContext(UserContext)
    const navigation = useNavigation()
    const getUsers = async () => {
        try {
            await axiosClient.get('/users').then((response) => {
                if (response.status == 200) {
                    setUsers(response.data.filter(u => u.id !== user.id))
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getUsers()
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    const onDelete = async (id) => {
        try {
            await axiosClient.delete(`/user/${id}`).then((response) => {
                if (response.status == 200) {
                    getUsers()
                    ToastAndroid.show('Usuario eliminado con éxito', ToastAndroid.SHORT)
                }
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'col', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Usuarios</Text>
                    {
                        users.length > 0 ? users.map((u) => (
                            <View style={styles.card} key={u.id}>
                                <Text style={styles.name}>{u.name}</Text>
                                <Text style={styles.role}>{u.role}</Text>
                                <View style={styles.buttonContainer}>
                                    <Button title="Editar" onPress={() => navigation.navigate('EditUser', { user: u})} />
                                    <Button title="Eliminar" onPress={() => Alert.alert('Confirmar', '¿Estás seguro de que deseas eliminar?', [
                                        { text: 'Cancelar', style: 'cancel' },
                                        { text: 'Eliminar', onPress: () => onDelete(u.id) },
                                    ])} />
                                </View>
                            </View>
                        )) : <Text style={{ textAlign: 'center' }}>No hay usuarios</Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    role: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});


export default Users