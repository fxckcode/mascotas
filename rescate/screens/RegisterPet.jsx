import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Input, Button, Image } from 'react-native-elements';
import { faTransgender, faPaw, faHeart, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axiosClient from '../utils/axiosClient';
import { launchImageLibrary } from 'react-native-image-picker';

const RegisterPet = () => {
  const navigation = useNavigation();
  const [municipality, setMunicipality] = useState([]);
  const [categories, setCategories] = useState([]);
  const [races, setRaces] = useState([]);
  const [selectImage, setSelectImage] = useState(null);
  const [nombre, setNombre] = useState('');
  const [selectRaces, setSelectRaces] = useState(null);
  const [age, setAge] = useState('');
  const [sterilized, setSterilized] = useState(null);
  const [gender, setGender] = useState(null);
  const [selectMuniciplality, setSelectMuniciplality] = useState(null);
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');
  const [vaccines, setVaccines] = useState('');
  const [uploadImage, setUploadImage] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [errors, setErrors] = useState({});

  const getData = async () => {
    try {
      await axiosClient.get('/municipalities').then((response) => {
        const formtaData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        setMunicipality(formtaData);
      });

      await axiosClient.get('/races').then((response) => {
        const formtaData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        setRaces(formtaData);
      });

      await axiosClient.get('/categories').then((response) => {
        const formtaData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        setCategories(formtaData);
      });
    } catch (error) {
      console.error(error);
      setMunicipality([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectImage = async () => {
    try {
      launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setSelectImage(response.assets[0].uri);
          const source = { uri: response.assets[0].uri, fileName: response.assets[0].fileName, type: response.assets[0].type };
          setUploadImage(source);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nombre) newErrors.nombre = 'Nombre es obligatorio';
    if (!selectRaces) newErrors.selectRaces = 'Raza es obligatoria';
    if (!age) newErrors.age = 'Edad aproximada es obligatoria';
    if (!sterilized) newErrors.sterilized = 'Esterilizado es obligatorio';
    if (!gender) newErrors.gender = 'Género es obligatorio';
    if (!selectMuniciplality) newErrors.selectMuniciplality = 'Municipio es obligatorio';
    if (!description) newErrors.description = 'Descripción es obligatoria';
    if (!background) newErrors.background = 'Antecedentes son obligatorios';
    if (!vaccines) newErrors.vaccines = 'Vacunas son obligatorias';
    if (!uploadImage) newErrors.uploadImage = 'Imagen es obligatoria';
    if (!selectCategory) newErrors.selectCategory = 'Categoria es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('name', nombre);
      formData.append('id_race', selectRaces);
      formData.append('age', age);
      formData.append('sterilized', sterilized);
      formData.append('gender', gender);
      formData.append('image', {
        uri: uploadImage.uri,
        type: uploadImage.type,
        name: uploadImage.fileName,
      });
      formData.append('id_municipality', selectMuniciplality);
      formData.append('description', description);
      formData.append('background', background);
      formData.append('vaccines', vaccines);
      formData.append('id_category', selectCategory);

      await axiosClient.post('/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        if (response.status === 201) {
          alert("Mascota creada correctamente");
          navigation.navigate('Home');
          // Clear all fields
          setNombre('');
          setSelectRaces(null);
          setAge('');
          setSterilized(null);
          setGender(null);
          setSelectMuniciplality(null);
          setDescription('');
          setBackground('');
          setVaccines('');
          setSelectImage(null);
          setUploadImage(null);
          setSelectCategory(null);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.content}>
          <Text style={{ fontSize: 25, color: '#9c50c4' }}>Crear Mascota</Text>
          <Input
            leftIcon={() => <FontAwesomeIcon icon={faUser} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
            inputContainerStyle={style.inputStyle}
            labelStyle={style.labelStyle}
            label="Nombre"
            placeholder='Nombre'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
            value={nombre}
            onChangeText={(text) => setNombre(text)}
          />
          {errors.nombre && <Text style={style.errorText}>{errors.nombre}</Text>}

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
          {errors.selectRaces && <Text style={style.errorText}>{errors.selectCategory}</Text>}

          <View style={style.pickerContainer}>
            <RNPickerSelect
              placeholder={{ label: 'Razas', value: null }}
              onValueChange={(value) => setSelectRaces(value)}
              items={races}
              style={{
                placeholder: { color: '#9C50C4' },
                inputAndroid: { color: '#9C50C4', width: '100%', height: 40, marginBottom: 10 },
              }}
            />
          </View>
          {errors.selectRaces && <Text style={style.errorText}>{errors.selectRaces}</Text>}

          <Input
            leftIcon={() => <FontAwesomeIcon icon={faHeart} size={20} style={{ color: '#9C50C4', marginLeft: 10 }} />}
            inputContainerStyle={style.inputStyle}
            labelStyle={style.labelStyle}
            label="Edad aproximada"
            placeholder='Edad aproximada'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
            value={age}
            onChangeText={(text) => setAge(text)}
          />
          {errors.age && <Text style={style.errorText}>{errors.age}</Text>}

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
            />
          </View>
          {errors.sterilized && <Text style={style.errorText}>{errors.sterilized}</Text>}

          <View style={style.pickerContainer}>
            <RNPickerSelect
              placeholder={{ label: 'Género', value: null }}
              onValueChange={(value) => setGender(value)}
              items={[
                { label: 'Macho', value: 1 },
                { label: 'Hembra', value: 2 }
              ]}
              style={{
                placeholder: { color: '#9C50C4' },
                inputAndroid: { color: '#9C50C4', width: '100%', height: 40, marginBottom: 10 },
              }}
            />
          </View>

          {errors.gender && <Text style={style.errorText}>{errors.gender}</Text>}

          {selectImage && <Image source={{ uri: selectImage }} style={{ width: 200, height: 200 }} />}
          <Button title={'Seleccionar imagen'} buttonStyle={[style.button]} onPress={() => handleSelectImage()} />
          {errors.uploadImage && <Text style={style.errorText}>{errors.uploadImage}</Text>}

          <View style={[style.pickerContainer, {marginTop: 15}]}>
            <RNPickerSelect
              placeholder={{ label: 'Municipios', value: null }}
              onValueChange={(value) => setSelectMuniciplality(value)}
              items={municipality}
              style={{
                placeholder: { color: '#9C50C4' },
                inputAndroid: { color: '#9C50C4', width: '100%', height: 50, marginBottom: 10 },
              }}
            />
          </View>
          {errors.selectMuniciplality && <Text style={style.errorText}>{errors.selectMuniciplality}</Text>}

          <Input
            leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4' }} />}
            inputContainerStyle={style.inputDescripcion}
            labelStyle={style.labelStyle}
            label="Descripción"
            placeholder='Descripción'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
          />
          {errors.description && <Text style={style.errorText}>{errors.description}</Text>}

          <Input
            leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4' }} />}
            inputContainerStyle={style.inputDescripcion}
            labelStyle={style.labelStyle}
            label="Antecedentes"
            placeholder='Antecedentes'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
            value={background}
            onChangeText={(text) => setBackground(text)}
            multiline={true}
          />
          {errors.background && <Text style={style.errorText}>{errors.background}</Text>}

          <Input
            leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4' }} />}
            inputContainerStyle={style.inputDescripcion}
            labelStyle={style.labelStyle}
            label="Vacunas"
            placeholder='Vacunas'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
            value={vaccines}
            onChangeText={(text) => setVaccines(text)}
            multiline={true}
          />
          {errors.vaccines && <Text style={style.errorText}>{errors.vaccines}</Text>}

          <Button title={'Registrar'} onPress={() => handleSubmit()} buttonStyle={[style.button]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    padding: 10,
  },
  container: {
    flex: 1,
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
    color: '#9C50C4',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#9C50C4',
    width: 350,
    padding: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default RegisterPet;
