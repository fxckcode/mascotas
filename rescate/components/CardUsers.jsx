import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, ToastAndroid } from 'react-native';
import axiosClient from '../utils/axiosClient';
import { useNavigation } from '@react-navigation/native';

const CardUsers = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardText}>Gestionar Usuarios</Text>
                <Button title="Gestionar" onPress={() => navigation.navigate('Users')} />
            </View>
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
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default CardUsers
