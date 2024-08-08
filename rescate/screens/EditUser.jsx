import { View, Text, SafeAreaView, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@rneui/base'
import { text } from '@fortawesome/fontawesome-svg-core'
import { useNavigation } from '@react-navigation/native'
import axiosClient from '../utils/axiosClient'
import RNPickerSelect from 'react-native-picker-select';

const EditUser = ({ route }) => {
    const navigation = useNavigation()
    const { user } = route.params
    const [name, setName] = useState(user.name)
    const [role, setRole] = useState(user.role == 'administrador' ? 1 : 2)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(null)
    const [phone, setPhone] = useState(user.phone)
    const [identification, setIdentification] = useState(user.identification)

    const handleEdit = async () => {
        try {
            await axiosClient.put(`/user/${user.id}`, {
                name,
                role,
                email,
                password,
                phone,
                identification
            }).then((response) => {
                if (response.status == 200) {
                    ToastAndroid.show('Usuario editado con éxito', ToastAndroid.SHORT)
                    navigation.navigate('Users')
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'col', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 20, alignItems: 'center' }}>
                    <Input
                        label="Nombre"
                        placeholder='Nombre'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <RNPickerSelect
                        placeholder={{ label: 'Rol', value: null }}
                        onValueChange={(value) => setRole(value)}
                        items={[
                            { label: 'Administrador', value: 1 },
                            { label: 'Usuario', value: 2 },
                        ]}
                        value={role}
                        style={{
                            placeholder: { color: '#9C50C4' },
                            inputAndroid: { color: '#9C50C4', width: '100%', height: 50, marginBottom: 10 },
                        }}
                    />
                    <Input
                        label="Correo"
                        placeholder='Correo'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        label="Contraseña"
                        placeholder='Contraseña'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Input
                        label="Teléfono"
                        placeholder='Teléfono'
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <Input
                        label="Identificación"
                        placeholder='Identificación'
                        value={identification}
                        onChangeText={(text) => setIdentification(text)}
                    />
                    <Button title="Guardar" onPress={() => handleEdit()} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditUser