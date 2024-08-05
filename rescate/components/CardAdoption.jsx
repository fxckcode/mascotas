// Importa componentes necesarios desde react-native y otras bibliotecas
import { View, Text, Image, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import axiosClient from '../utils/axiosClient'; // Importa un cliente axios para hacer solicitudes HTTP
import { UserContext } from '../context/UserContext'; // Importa el contexto de usuario
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation para la navegación entre pantallas
import { Button } from '@rneui/base'; // Importa el componente Button de @rneui/base

// Define el componente funcional CardAdoption que recibe una prop llamada pet
const CardAdoption = ({ pet }) => {
  // Usa useContext para acceder al contexto de usuario
  const { user } = useContext(UserContext);
  // Usa useNavigation para manejar la navegación
  const navigation = useNavigation();

  // Define la función handleCancel que se encarga de cancelar una adopción
  const handleCancel = async (id) => {
    try {
      // Hace una solicitud DELETE para cancelar la adopción
      await axiosClient.delete(`/adoption/user/${id}/${pet.id_pet}`).then((response) => {
        if (response.status == 200) {
          // Muestra una notificación de cancelación exitosa
          ToastAndroid.show('Adopción cancelada', ToastAndroid.SHORT);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Define la función handleAccept que se encarga de aprobar una adopción
  const handleAccept = async () => {
    try {
      // Hace una solicitud PUT para aprobar la adopción
      await axiosClient.put(`/adoption/${pet.id_pet}`, { state: 'Aprobado' }).then((response) => {
        if (response.status == 200) {
          // Muestra una notificación de aprobación exitosa
          ToastAndroid.show('Adopción aprobada', ToastAndroid.SHORT);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Define la función handleReject que se encarga de rechazar una adopción
  const handleReject = async () => {
    try {
      // Hace una solicitud PUT para rechazar la adopción
      await axiosClient.put(`/adoption/${pet.id_pet}`, { state: 'No aprobado' }).then((response) => {
        if (response.status == 200) {
          // Muestra una notificación de rechazo
          ToastAndroid.show('Adopción rechazada', ToastAndroid.SHORT);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Renderiza la tarjeta de adopción
  return (
    // TouchableOpacity es un componente que reacciona a las pulsaciones del usuario
    <TouchableOpacity
      style={{ 
        width: '100%', 
        height: 220, 
        backgroundColor: '#e6c6f7', 
        borderRadius: 7, 
        padding: 10, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 5 
      }}
      onPress={() => {
        navigation.navigate('ConsulPetAdoption', { pet }); // Navega a la pantalla ConsulPetAdoption con los detalles de la mascota
      }}
    >
      {
        // Muestra la imagen de la mascota si existe, de lo contrario muestra un texto indicando que no hay imagen
        pet.image ? (
          <Image src={`http://10.0.2.2:3333/public/img/${pet.image}`} style={{ width: '100%', height: 110 }} />
        ) : (
          <View style={{ width: '100%', height: 110, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sin Imagen</Text>
          </View>
        )
      }
      {/* Muestra el nombre y la raza de la mascota */}
      <View 
        style={{ 
          width: '100%', 
          height: 45, 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        <View style={{ width: '60%' }}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{pet.name}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.race_name}, {pet.age}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.gender}</Text>
        </View>
      </View>
      {/* Muestra diferentes botones según el rol del usuario */}
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-around', alignItems: 'center' }}>
        {
          user.role === 'usuario' ? (
            <>
              <Button
                title={pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                onPress={() => handleAdopt(pet.id)}
                disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
              />
              {pet.state === 'En proceso' && (
                <TouchableOpacity onPress={() => handleCancel(user.id)}>
                  <Text style={styles.cancelText}>Cancelar solicitud</Text>
                </TouchableOpacity>
              )}
            </>
          ) : pet.state === 'En proceso' ? (
            <View style={styles.container}>
              <Button
                title="Aprobar"
                color="green"
                onPress={handleAccept}
              />
              <Button
                title="Rechazar"
                color="red"
                onPress={handleReject}
              />
            </View>
          ) : pet.state === 'Aprobado' ? (
            <Button title="Aprobado" disabled />
          ) : pet.state === 'No aprobado' ? (
            <Button
              title="No aprobado"
              disabled
              color="#c62828" // Color rojo de fondo
              style={styles.noApprovedButton}
            />
          ) : null
        }
      </View>
    </TouchableOpacity>
  );
};

// Define los estilos para el componente
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // se alinean en fila
    justifyContent: 'space-around', // Espacio alrededor de los objetos
    alignItems: 'center', // Alinea los objetos al centro verticalmente
    width: '100%', // El contenedor ocupa el ancho completo
  },
  cancelText: {
    color: 'red', // Texto en color rojo
    textDecorationLine: 'underline', // Subraya el texto
    marginVertical: 10, // Margen vertical
    fontSize: 16, // Tamaño de fuente
  },
  noApprovedButton: {
    backgroundColor: '#c62828', // Rojo oscuro
    color: 'white', // Texto en color blanco
  },
});

// Exporta el componente para su uso en otros lugares
export default CardAdoption;
