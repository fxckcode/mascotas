import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { Input } from '@rneui/base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import logo from '../img/logo.png'
import axiosClient from '../utils/axiosClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const { setUser} = useContext(UserContext)

  const handleSubmit = async () => {
    try {

      if (email == '' || password == '') {
        ToastAndroid.show('Todos los campos son obligatorios', ToastAndroid.SHORT)
        return
      }

      const data = {
        email,
        password
      }

      await axiosClient.post('/login', data).then(async (response) => {
        if (response.status == 200) {
          await AsyncStorage.setItem('token', response.data.token)
          await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
          setUser(response.data.user)
          ToastAndroid.show('Inicio de sesión exitoso', ToastAndroid.SHORT)
          navigation.navigate('HomeTabs')         
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <View style={{
        width: '100%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image
          source={logo}
          style={style.image}
          resizeMode='contain'
        />
      </View>
      <View style={style.container}>
        <Text
          style={{
            color: '#ffffff',
            fontWeight: '700',
            fontSize: 27,
            marginBottom: 30,
            textAlign: 'center'
          }}>Iniciar Sesión
        </Text>
        <Input leftIcon={() => <FontAwesomeIcon icon={faEnvelope} size={20} style={{ color: '#ffffff', marginLeft: 10 }} />}
          placeholder='Ingrese el correo electronico'
          inputContainerStyle={style.inputStyle}
          labelStyle={style.labelStyle}
          label="Correo electronico"
          style={{ color: '#ffffff' }}
          placeholderTextColor={'#ffffff'}
          value={email}
          keyboardType='email-address'
          onChangeText={(value) => setEmail(value)}
        />
        <Input leftIcon={() => <FontAwesomeIcon icon={faLock} size={20} style={{ color: '#ffffff', marginLeft: 10 }} />}
          placeholder='Contraseña'
          inputContainerStyle={style.inputStyle}
          labelStyle={style.labelStyle}
          label="Ingrese la contraseña"
          style={{ color: '#ffffff' }}
          placeholderTextColor={'#ffffff'}
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
        />
        <Button title={'Iniciar Sesión'} onPress={() => handleSubmit()} buttonStyle={[style.button]} />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#C683EA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '60%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30
  },
  inputStyle: {
    padding: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#ffffff',
    width: 350
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
    padding: 13,
    marginBottom: 30,
  },
  image: {
    width: '100%'
  }

})
export default Login