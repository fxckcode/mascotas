import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, ToastAndroid } from 'react-native';
import axiosClient from '../utils/axiosClient';

const AddMunicipalities = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [municipalityName, setMunicipalityName] = useState('');

  // Función para mostrar el modal
  const showModal = () => setModalVisible(true);

  // Función para ocultar el modal
  const hideModal = () => setModalVisible(false);

  // Función para manejar la creación del municipio
  const createMunicipality = async () => {
    // Aquí puedes manejar la lógica para crear el municipio

    await axiosClient.post('/municipality', { name: municipalityName }).then((response) => {
      if (response.status == 201) {
        console.log('Municipio creado:', response.data);
        hideModal();
        ToastAndroid.show('Municipio creado', ToastAndroid.SHORT);
        setMunicipalityName('');
      }
    });

    console.log('Crear municipio:', municipalityName);
    hideModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Añadir Municipios</Text>
        <Button title="Añadir" onPress={showModal} />
      </View>

      {/* Modal para agregar el municipio */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={hideModal} // Cierra el modal al presionar el botón de retroceso en Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Municipio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del municipio"
              value={municipalityName}
              onChangeText={setMunicipalityName}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={hideModal} />
              <Button title="Crear" onPress={createMunicipality} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AddMunicipalities;
