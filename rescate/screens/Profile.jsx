import { View, Text, ScrollView, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Input } from '@rneui/base'
import { UserContext } from '../context/UserContext'
import axiosClient from '../utils/axiosClient'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
    const { user, setUser } = useContext(UserContext)
    const navigation = useNavigation()
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)


    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                name,
                email,
                phone
            }

            await axiosClient.put(`/user/${user.id}`, data).then((response) => {
                if (response.status == 200) {
                    navigation.navigate('HomeTabs', {
                        screen: 'Home',
                        params: { screen: 'Home' }
                    })

                    setUser({
                        ...user,
                        name,
                        email,
                        phone
                    })

                    ToastAndroid.show('Perfil actualizado', ToastAndroid.SHORT)
                }
            })


        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ padding: 20, width: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>Perfil de Usuario</Text>
                    <Input placeholder='Nombre' value={name} onChangeText={(text) => setName(text)} />
                    <Input placeholder='Correo' value={email} onChangeText={(text) => setEmail(text)} />
                    <Input placeholder='Teléfono' value={phone} onChangeText={(text) => setPhone(text)} />
                    <Button title={'Actualizar'} buttonStyle={{ backgroundColor: '#C71585', padding: 10, borderRadius: 10 }} onPress={handleEdit} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile