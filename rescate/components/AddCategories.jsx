import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, ToastAndroid } from 'react-native';
import axiosClient from '../utils/axiosClient';

const AddCategories = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  // Función para mostrar el modal
  const showModal = () => setModalVisible(true);

  // Función para ocultar el modal
  const hideModal = () => setModalVisible(false);

  // Función para manejar la creación de la categoría
  const createCategory = async () => {
    // Aquí puedes manejar la lógica para crear la categoría
    await axiosClient.post('/categories', { name: categoryName }).then((response) => {
      if (response.status === 201) {
        console.log('Categoría creada:', response.data);
        ToastAndroid.show('Categoría creada', ToastAndroid.SHORT);
        hideModal();
        setCategoryName('');
      }
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Añadir Categorías</Text>
        <Button title="Añadir" onPress={showModal} />
      </View>

      {/* Modal para agregar la categoría */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={hideModal} // Cierra el modal al presionar el botón de retroceso en Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Categoría</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la categoría"
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={hideModal} />
              <Button title="Crear" onPress={createCategory} />
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
    color: 'black'
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

export default AddCategories;
