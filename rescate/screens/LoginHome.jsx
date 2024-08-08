import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import logo from '../img/logo.png'

const LoginHome = () => {
  const navigation = useNavigation()
  return (
    <View style={{
      width: '100%',
      height: '100%',
      flex: 1
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        paddingHorizontal: 50,
        paddingVertical: 50,
        width: '100%',
        height: '90%'
      }}>
        <View style={{
          width: '100%',
          height: '50%',
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
        <View style={{
          width: '100%',
          height: '50%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexDirection: 'column'
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 20,
            color: 'black'
          }}>En cada pata, en cada mirada, hay un universo de amor esperando por ti. Adopta una mascota y cambia dos vidas, la tuya y la de ellos. Descubre el verdadero significado de lealtad y compañía.
            <Text style={{
              color:'#000000',
              fontWeight: '700',
              fontSize: 16
            }}>
              ¡Haz la diferencia hoy!
            </Text>
          </Text>

          <View style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 30
          }}>
            <Button buttonStyle={[style.button]}
              title={"Iniciar Sesión"} onPress={() => { navigation.navigate('Login') }} />
            <Text style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '600',
              color: 'black'
            }}>¿No tienes cuenta?</Text>
            <Button buttonStyle={[style.button, style.btnLogin]}
              title={"Registrarse"} onPress={() => { navigation.navigate('SingUp') }} />
            <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('HomeGuest')}>Sesión de invitado</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: '#9C50C4',
    padding: 12,
    width: 350
  },
  btnLogin: {
    marginBottom: 70
  },
  image: {
    width: '100%'
  }
})

export default LoginHome