import { View, Text, Image, TouchableOpacity, ToastAndroid, StyleSheet, Modal, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'react-native-elements';

const CardAdoption = ({ pet }) => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null); // 'accept' or 'reject'
  const [mensaje, setMensaje] = useState('');

  const openModal = (type) => {
    setActionType(type);
    setModalVisible(true);
  };

  const handleModalAction = async () => {
    try {      
      await axiosClient.put(`/${actionType}/${pet.id_user}/${pet.id_pet}`, { description_admin: mensaje }).then((response) => {
      
        if (response.status === 200) {
          ToastAndroid.show(`Gestión hecha con exito`, ToastAndroid.SHORT);
          setModalVisible(false);
          setMensaje('');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axiosClient.delete(`/adoption/user/${id}/${pet.id_pet}`).then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Adopción cancelada', ToastAndroid.SHORT);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdopt = async (id) => {
    try {
      await axiosClient.post('/adoptions', { id_user: user.id, id_pet: id }).then((response) => {
        if (response.status === 201) {
          ToastAndroid.show('Solicitud de adopción enviada', ToastAndroid.SHORT);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ConsulPetAdoption', { pet })}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Motivo:</Text>
          <Input
            leftIcon={() => <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: '#9C50C4' }} />}
            inputContainerStyle={styles.inputDescripcion}
            labelStyle={styles.labelStyle}
            label="Mensaje"
            placeholder='Mensaje'
            style={{ color: '#9C50C4' }}
            placeholderTextColor={'#9C50C4'}
            multiline={true}
            value={mensaje}
            onChangeText={(text) => setMensaje(text)}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={actionType === 'accept' ? "Aceptar" : "Rechazar"}
              buttonStyle={actionType === 'accept' ? styles.acceptButton : styles.rejectButton}
              onPress={handleModalAction}
            />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </Modal>
      {pet.image ? (
        <Image
          source={{ uri: `http://10.0.2.2:3333/public/img/${pet.image}` }}
          style={styles.image}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>Sin Imagen</Text>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.info}>{pet.race_name}, {pet.age}</Text>
        <Text style={styles.gender}>{pet.gender}</Text>
      </View>
      <View style={styles.actions}>
        {user.role === 'usuario' ? (
          <View style={styles.userActions}>
            <Button
              title={pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
              onPress={() => handleAdopt(pet.id_pet)}
              disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
              buttonStyle={styles.userButton}
            />
            {pet.state === 'En proceso' && (
              <TouchableOpacity onPress={() => handleCancel(user.id)}>
                <Text style={styles.cancelText}>Cancelar solicitud</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : pet.state === 'En proceso' ? (
          <View style={styles.adminActions}>
            <Button
              title="Aprobar"
              buttonStyle={styles.acceptButton}
              onPress={() => openModal('accept')}
            />
            <Button
              title="Rechazar"
              buttonStyle={styles.rejectButton}
              onPress={() => openModal('reject')}
            />
          </View>
        ) : pet.state === 'Aprobado' ? (
          <Button title="Aprobado" disabled buttonStyle={styles.approvedButton} />
        ) : pet.state === 'No aprobado' ? (
          <Button
            title="No aprobado"
            disabled
            buttonStyle={styles.noApprovedButton}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 300,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  noImageContainer: {
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
  },
  details: {
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  gender: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userButton: {
    borderRadius: 10,
    backgroundColor: '#6c63ff',
  },
  adminActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
  },
  approvedButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
  noApprovedButton: {
    backgroundColor: '#c62828',
    borderRadius: 10,
  },
  cancelText: {
    color: 'red',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputDescripcion: {
    borderColor: '#9C50C4',
    borderWidth: 1,
    borderRadius: 5,
    color: '#9C50C4',
    padding: 10,
  },
  labelStyle: {
    fontWeight: 'normal',
    marginBottom: 10,
    color: '#9C50C4',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#9C50C4',
    padding: 5,
  },
});

export default CardAdoption;
