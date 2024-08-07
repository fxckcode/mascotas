import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ToastAndroid, Modal, TextInput, Linking } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useContext, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { generarLinkWhatsApp } from '../utils/generarLinkWhatsapp';

const Card = ({ pet }) => {
    const { user } = useContext(UserContext);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [ mensaje, setMensaje ] = useState('')

    const handleDelete = async () => {
        try {
            await axiosClient.delete(`/pet/${pet.id}`).then((response) => {
                if (response.status == 200) {
                    ToastAndroid.show('Mascota eliminada con éxito', ToastAndroid.SHORT);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = () => {
        setModalVisible(true)
    }

    const handleAdopt = async (id) => {
        try {
            await axiosClient.post('/adoptions', { id_user: user.id, id_pet: pet.id, description_user: mensaje }).then((response) => {
                if (response.status == 201) {
                    ToastAndroid.show('Adopción en proceso', ToastAndroid.SHORT);
                    setModalVisible(false)
                    const link = generarLinkWhatsApp(pet.phone_admin, mensaje)
                    Linking.openURL(link)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ConsultPet', { pet: pet })}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>¿Por qué quieres adoptarl@?</Text>
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
                        <Button title="Adoptar" onPress={handleAdopt} buttonStyle={styles.button} />
                        <Button title="Cancelar" onPress={handleCancel} buttonStyle={styles.button}  />
                    </View>
                </View>
            </Modal>
            <Image
                source={{ uri: `http://10.0.2.2:3333/public/img/${pet.image}` }}
                style={styles.image}
                resizeMode='cover'
            />
            <View style={styles.details}>
                <Text style={styles.name}>{pet.name}</Text>
                <Text style={styles.info}>{pet.race_name}, {pet.age}</Text>
                <Text style={styles.gender}>{pet.gender}</Text>
            </View>
            {user.role == 'usuario' ? (
                <Button
                    title={pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                    onPress={() => openModal()}
                    disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
                    buttonStyle={styles.button}
                />
            ) : (
                <View style={styles.adminActions}>
                    <Text style={styles.stateText}>{pet.state}</Text>
                    <View style={styles.actionButtons}>
                        <Button
                            title="Editar"
                            buttonStyle={styles.editButton}
                            onPress={() => navigation.navigate('EditPet', { pet })}
                        />
                        <Button
                            title="Eliminar"
                            buttonStyle={styles.deleteButton}
                            onPress={() => Alert.alert('Confirmar', '¿Estás seguro de que deseas eliminar?', [
                                { text: 'Cancelar', style: 'cancel' },
                                { text: 'Eliminar', onPress: handleDelete },
                            ])}
                        />
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '50%',
        height: 330,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
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
    userButton: {
        borderRadius: 20,
        backgroundColor: '#6c63ff',
        marginTop: 10,
    },
    adminActions: {
        marginTop: 5,
    },
    stateText: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: '100%',
    },
    editButton: {
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        borderRadius: 10,
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

export default Card;
