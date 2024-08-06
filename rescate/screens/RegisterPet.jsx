import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Input } from '@rneui/base'
import { Button } from 'react-native-elements'
import { faTransgender, faPaw, faHeart, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axiosClient from '../utils/axiosClient'

const RegisterPet = () => {
  const navigation = useNavigation()
  const [selectImage, setSelectImage] = useState(null)
  const [ municipality, setMunicipality ] = useState([])
  
  const getMunicipality = async () => {
    try {
      await axiosClient.get('/municipalities').then((response) => {
        const formtaData = response.data.map((item) => {
          return { label: item.name, value: item.id }
        })
        setMunicipality(formtaData)
      })
    } catch (error) {
      console.error(error);
      setMunicipality([])
    }
  }

  useEffect(() => {
    getMunicipality()
  }, [])

  const handlePickerImage = async () => {
    try {

    } catch (error) {

    }
  }
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.content}>
          <RNPickerSelect
              placeholder={{ label: 'Municipio', value: null }}
              onValueChange={(value) => setSelectType(value)}
              items={[
                { label: 'Producción', value: 1 },
                { label: 'Barismo', value: 2 },
                { label: 'Otros', value: 3 },
              ]}
              fixAndroidTouchableBug={true}
          />
          <Input leftIcon={() => <FontAwesomeIcon icon={faUser} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
            inputContainerStyle={style.inputStyle}
            labelStyle={style.labelStyle}
            label="Nombre"
            placeholder='Nombre'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
          />
          <Input leftIcon={() => <FontAwesomeIcon icon={faHeart} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
            inputContainerStyle={style.inputStyle}
            labelStyle={style.labelStyle}
            label="Edad aproximada"
            placeholder='Edad aproximada'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
          />
          <Input leftIcon={() => <FontAwesomeIcon icon={faTransgender} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
            inputContainerStyle={style.inputStyle}
            labelStyle={style.labelStyle}
            label="Género"
            placeholder='Género'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
          />
          <Input leftIcon={() => <FontAwesomeIcon icon={faPaw} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
            inputContainerStyle={style.inputStyle}
            labelStyle={style.labelStyle}
            label="Raza"
            placeholder='Raza'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
          />

          <Input leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
            inputContainerStyle={style.inputDescripcion}
            labelStyle={style.labelStyle}
            label="Descripción"
            placeholder='Descripción'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
          />
          <Button title={'Registrar'} onPress={() => { navigation.navigate('Home') }} buttonStyle={[style.button]} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  labelStyle: {
    fontWeight: 'normal',
    marginBottom: 10,
    color: '#9C50C4'
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#9C50C4',
    width: 350,
    padding: 12
  }
})

export default RegisterPet