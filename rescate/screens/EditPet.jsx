import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Input } from '@rneui/base'
import { Button, Image } from 'react-native-elements'
import { faTransgender, faPaw, faHeart, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axiosClient from '../utils/axiosClient'
import { launchImageLibrary } from 'react-native-image-picker';

const EditPet = ({ route }) => {
    const navigation = useNavigation()
    const { pet } = route.params
    const [municipality, setMunicipality] = useState([])
    const [races, setRaces] = useState([])
    const [selectImage, setSelectImage] = useState(null)
    const [categories, setCategories] = useState([]);

    const [nombre, setNombre] = useState(pet.name)
    const [selectRaces, setSelectRaces] = useState(pet.id_race)
    const [age, setAge] = useState(pet.age)
    const [sterilized, setSterilized] = useState(pet.sterilized == 'SI' ? 1 : 2)
    const [gender, setGender] = useState(pet.gender == 'Macho' ? 1 : 2)
    const [selectMuniciplality, setSelectMuniciplality] = useState(pet.id_municipality)
    const [description, setDescription] = useState(pet.description)
    const [background, setBackground] = useState(pet.background)
    const [vaccines, setVaccines] = useState(pet.vaccines)
    const [uploadImage, setUploadImage] = useState(null)
    const [selectCategory, setSelectCategory] = useState(pet.id_category);

    const getData = async () => {
        try {
            await axiosClient.get('/municipalities').then((response) => {
                const formtaData = response.data.map((item) => {
                    return { label: item.name, value: item.id }
                })
                setMunicipality(formtaData)
            })

            await axiosClient.get('/races').then((response) => {
                const formtaData = response.data.map((item) => {
                    return { label: item.name, value: item.id }
                })
                setRaces(formtaData)
            })

            await axiosClient.get('/categories').then((response) => {
                const formtaData = response.data.map((item) => {
                    return { label: item.name, value: item.id };
                });
                setCategories(formtaData);
            });
        } catch (error) {
            console.error(error);
            setMunicipality([])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSelectImage = async () => {
        try {

            launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    setSelectImage(response.assets[0].uri)
                    // setUploadImage(response.assets[0])
                    const source = { uri: response.assets[0].uri, fileName: response.assets[0].fileName, type: response.assets[0].type };
                    setUploadImage(source)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append('name', nombre)
            formData.append('id_race', selectRaces)
            formData.append('age', age)
            formData.append('sterilized', sterilized)
            formData.append('gender', gender)
            if (uploadImage) {
                formData.append('image', {
                    uri: uploadImage.uri,
                    type: uploadImage.type,
                    name: uploadImage.fileName,
                })
            }
            formData.append('id_municipality', selectMuniciplality)
            formData.append('description', description)
            formData.append('background', background)
            formData.append('vaccines', vaccines)
            formData.append('id_category', selectCategory);

            await axiosClient.put(`/pet/${pet.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if (response.status == 201) {
                    alert("Mascota editada correctamente")
                    navigation.navigate('Home')
                    setNombre('')
                    setSelectRaces(null)
                    setAge('')
                    setSterilized(null)
                    setGender(null)
                    setSelectMuniciplality(null)
                    setDescription('')
                    setBackground('')
                    setVaccines('')
                    setSelectImage(null)
                    setUploadImage(null)
                }
            })

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <View style={style.content}>
                    <Text style={{ fontSize: 25, color: '#9c50c4' }}>Editar Mascota</Text>
                    <Input leftIcon={() => <FontAwesomeIcon icon={faUser} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
                        inputContainerStyle={style.inputStyle}
                        labelStyle={style.labelStyle}
                        label="Nombre"
                        placeholder='Nombre'
                        style={{ color: '#9C50C4' }}
                        placeholderTextColor={'#9C50C4'}
                        value={nombre}
                        onChangeText={(text) => setNombre(text)}
                    />
                    <View style={style.pickerContainer}>
                        <RNPickerSelect
                            placeholder={{ label: 'Categorias', value: null }}
                            onValueChange={(value) => setSelectCategory(value)}
                            items={categories}
                            value={selectCategory}
                            style={{
                                placeholder: { color: '#9C50C4' },
                                inputAndroid: { color: '#9C50C4', width: '100%', height: 40, marginBottom: 10 },
                            }}
                        />
                    </View>
                    <View style={style.pickerContainer}>
                        <RNPickerSelect
                            placeholder={{ label: 'Razas', value: null }}
                            onValueChange={(value) => setSelectRaces(value)}
                            items={races}
                            value={selectRaces}
                            style={{
                                placeholder: { color: '#9C50C4' },
                                inputAndroid: { color: '#9C50C4', width: '100%', height: 40, marginBottom: 10 },

                            }}
                        />
                    </View>
                    <Input leftIcon={() => <FontAwesomeIcon icon={faHeart} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
                        inputContainerStyle={style.inputStyle}
                        labelStyle={style.labelStyle}
                        label="Edad aproximada"
                        placeholder='Edad aproximada'
                        style={{ color: '#9C50C4' }}
                        placeholderTextColor={'#9C50C4'}
                        value={age}
                        onChangeText={(text) => setAge(text)}
                    />
                     <View style={style.pickerContainer}>
                        <RNPickerSelect
                            placeholder={{ label: 'Esterilizado', value: null }}
                            onValueChange={(value) => setSterilized(value)}
                            items={[
                                { label: 'Si', value: 1 },
                                { label: 'No', value: 2 }
                            ]}
                            style={{
                                placeholder: { color: '#9C50C4' },
                                inputAndroid: { color: '#9C50C4', width: '100%', height: 40, marginBottom: 10 },

                            }}
                            value={sterilized}
                        />
                     </View>
                     <View style={style.pickerContainer}>
                        <RNPickerSelect
                            placeholder={{ label: 'Género', value: null }}
                            onValueChange={(value) => setGender(value)}
                            items={[
                                { label: 'Macho', value: 1 },
                                { label: 'Hembra', value: 2 }
                            ]}
                            value={gender}
                            style={{
                                placeholder: { color: '#9C50C4' },
                                inputAndroid: { color: '#9C50C4', width: '100%', height: 40, marginBottom: 10 },

                            }}
                        />
                     </View>

                    {
                        selectImage && <Image source={{ uri: selectImage }} style={{ width: 200, height: 200 }} />
                    }

                    <Button title={'Seleccionar imagen'} buttonStyle={[style.button]} onPress={() => handleSelectImage()} />

                    <View style={[style.pickerContainer, {marginTop: 15}]}>
                        <RNPickerSelect
                            placeholder={{ label: 'Municipios', value: null }}
                            onValueChange={(value) => setSelectMuniciplality(value)}
                            items={municipality}
                            style={{
                                placeholder: { color: '#9C50C4' },
                                inputAndroid: { color: '#9C50C4', width: '100%', height: 50, marginBottom: 10 },

                            }}
                            value={selectMuniciplality}
                        />
                    </View>

                    <Input leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4' }} />}
                        inputContainerStyle={style.inputDescripcion}
                        labelStyle={style.labelStyle}
                        label="Descripción"
                        placeholder='Descripción'
                        style={{ color: '#9C50C4' }}
                        placeholderTextColor={'#9C50C4'}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <Input leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4' }} />}
                        inputContainerStyle={style.inputDescripcion}
                        labelStyle={style.labelStyle}
                        label="Antecedentes"
                        placeholder='Antecedentes'
                        style={{ color: '#9C50C4' }}
                        placeholderTextColor={'#9C50C4'}
                        value={background}
                        onChangeText={(text) => setBackground(text)}
                    />
                    <Input leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4' }} />}
                        inputContainerStyle={style.inputDescripcion}
                        labelStyle={style.labelStyle}
                        label="Vacunas"
                        placeholder='Vacunas'
                        style={{ color: '#9C50C4' }}
                        placeholderTextColor={'#9C50C4'}
                        value={vaccines}
                        onChangeText={(text) => setVaccines(text)}
                    />
                    <Button title={'Editar'} onPress={() => handleSubmit()} buttonStyle={[style.button]} />
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
    pickerContainer: {
        borderColor: '#9C50C4', // Color del borde
        borderWidth: 1,         // Grosor del borde
        borderRadius: 10,       // Radio de borde redondeado
        width: '95%',          // Ajusta el ancho según tus necesidades
        // height: 40,             // Ajusta la altura según tus necesidades
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginBottom: 15
    },
    inputDescripcion: {
        borderColor: '#9C50C4',
        borderWidth: 1,
        borderRadius: 5,
        color: '#9C50C4',
        padding: 10,

    },
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        display: 'flex',
        width: '100%',
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

export default EditPet