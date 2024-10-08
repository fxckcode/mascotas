import { View, Text, StyleSheet, SafeAreaView, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Input } from '@rneui/base'
import { Button } from 'react-native-elements'
import { faAddressCard, faEnvelope, faEye, faEyeSlash, faHashtag, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import axiosClient from '../utils/axiosClient'

const SingUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const navigation = useNavigation()
  const [identification, setIdentification] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const handleSubmit = async () => {

    // Validate input fields
    if (name === '' || email === '' || password === '' || phone === '' || identification === '') {
      ToastAndroid.show('Todos los campos son obligatorios', ToastAndroid.SHORT);
      return;
    }

    // Validate email format
    if (!email.includes('@')) {
      ToastAndroid.show('Ingrese un correo electrónico válido', ToastAndroid.SHORT);
      return;
    }

    // Validate phone number and identification length
    if (phone.length !== 10) {
      ToastAndroid.show('El número de teléfono debe tener 10 dígitos', ToastAndroid.SHORT);
      return;
    }

    if (identification.length !== 10) {
      ToastAndroid.show('La cédula debe tener 10 dígitos', ToastAndroid.SHORT);
      return;
    }
    try {
      const data = {
        name,
        email,
        password,
        phone,
        identification
      }

      if (name == '' || email == '' || password == '' || phone == '' || identification == '') {
        ToastAndroid.show('Todos los campos son obligatorios', ToastAndroid.SHORT)
        return
      }
      await axiosClient.post('/users', data).then((response) => {
        if (response.status == 201) {
          ToastAndroid.show('Usuario registrado exitosamente', ToastAndroid.SHORT)
          navigation.navigate('Login')
        }
      })

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <Text style={{
          color: '#ffffff',
          fontWeight: '700',
          fontSize: 30,
          marginBottom: 50
        }}>Registrarse</Text>
        <Input leftIcon={() => <FontAwesomeIcon icon={faUser} size={20} style={{ color: '#ffffff', marginLeft: 10 }} />}
          inputContainerStyle={style.inputStyle}
          labelStyle={style.labelStyle}
          label="Nombre"
          placeholder='Nombre'
          style={{ color: '#ffffff' }}
          placeholderTextColor={'#ffffff'}
          value={name}
          onChangeText={setName}
        />
        <Input leftIcon={() => <FontAwesomeIcon icon={faEnvelope} size={20} style={{ color: '#ffffff', marginLeft: 10 }} />}
          inputContainerStyle={style.inputStyle}
          labelStyle={style.labelStyle}
          label="Correo"
          placeholder='Correo'
          style={{ color: '#ffffff' }}
          placeholderTextColor={'#ffffff'}
          value={email}
          onChangeText={setEmail}
        />
        <Input leftIcon={() => <FontAwesomeIcon icon={faHashtag} size={20} style={{ color: '#ffffff', marginLeft: 10 }} />}
          inputContainerStyle={style.inputStyle}
          labelStyle={style.labelStyle}
          label="Cédula"
          placeholder='Cédula'
          style={{ color: '#ffffff' }}
          placeholderTextColor={'#ffffff'}
          value={identification}
          onChangeText={setIdentification}
          keyboardType='numeric'
          maxLength={10}
        />
        <Input leftIcon={() => <FontAwesomeIcon icon={faLock} size={20} style={{ color: '#ffffff', marginLeft: 10 }} />}
          inputContainerStyle={style.inputStyle}
          labelStyle={style.labelStyle}
          label="Contraseña"
          placeholder='Contraseña'
          style={{ color: '#ffffff' }}
          placeholderTextColor={'#ffffff'}
          value={password}
          secureTextEntry={secureTextEntry}
          onChangeText={setPassword}
          rightIcon={() => <TouchableOpacity  onPress={() => setSecureTextEntry(!secureTextEntry)}><Text> <FontAwesomeIcon icon={secureTextEntry ? faEye : faEyeSlash} size={20} style={{ color: '#ffffff' }} /></Text></TouchableOpacity>}
        />
        <Input leftIcon={() => <FontAwesomeIcon icon={faPhone} size={20} style={{ color: '#ffffff', marginLeft: 10 }} />}
          inputContainerStyle={style.inputStyle}
          labelStyle={style.labelStyle}
          label="Teléfono"
          placeholder='Teléfono'
          style={{ color: '#ffffff' }}
          placeholderTextColor={'#ffffff'}
          value={phone}
          onChangeText={setPhone}
          keyboardType='number-pad'
          maxLength={10}
        />
        <Button title={'Registrarse'} onPress={() => { handleSubmit() }} buttonStyle={[style.button]} />
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  inputStyle: {
    padding: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#ffffff',

  },
  container: {
    flex: 1,
    backgroundColor: '#C683EA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  labelStyle: {
    fontWeight: 'normal',
    marginBottom: 10,
    color: '#ffffff'
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#9C50C4',
    width: 350,
    padding: 12,
    marginBottom: 20
  }
})

export default SingUp