// Importa useNavigation de @react-navigation/native para la navegación entre pantallas
import { useNavigation } from '@react-navigation/native';
// Importa el componente Button de @rneui/base
import { Button } from '@rneui/base';
// Importa componentes de React Native
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// Importa UserContext desde el contexto de la aplicación
import { UserContext } from '../context/UserContext';
// Importa useContext desde React
import { useContext } from 'react';

// Define el componente funcional Card que recibe una prop llamada pet
const Card = ({ pet }) => {
    // Usa useContext para acceder al contexto de usuario
    const user = useContext(UserContext);
    // Usa useNavigation para manejar la navegación
    const navigation = useNavigation();

    // Renderiza la tarjeta de mascota
    return (
        // TouchableOpacity es un componente que reacciona a las pulsaciones del usuario
        <TouchableOpacity 
            style={{ 
                width: '45%', 
                height: 250, 
                backgroundColor: '#e6c6f7', 
                borderRadius: 10, 
                padding: 10, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 5 
            }} 
            onPress={() => navigation.navigate('ConsultPet', { pet: pet })} // Navega a la pantalla ConsultPet con los detalles de la mascota
        >
            {/* Muestra la imagen de la mascota */}
            <Image 
                src={`http://10.0.2.2:3333/public/img/${pet.image}`} 
                style={{ width: "100%", height: 150 }} 
                resizeMode='contain' 
            />
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
            {
                // Muestra diferentes botones según el rol del usuario
                user.role === 'usuario' ? (
                    // Si el rol es 'usuario', muestra el botón de adoptar
                    <Button
                        title={pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                        onPress={() => handleAdopt(pet.id)} // Llama a handleAdopt con el ID de la mascota
                        disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'} // Deshabilita el botón si la mascota está en proceso o adoptada
                    />
                ) : (
                    // Si el rol no es 'usuario'o sea que es 'administrador', muestra los botones de editar y eliminar
                    <View style={styles.container}>
                        <Text style={styles.stateText}>{pet.state}</Text>
                        <Button
                            title="Editar"
                            color="purple"
                            onPress={() => navigation.navigate('Edit', { id: pet.id })} // Navega a la pantalla Edit con el ID de la mascota
                        />
                        <Button
                            title="Eliminar"
                            color="red"
                            onPress={() => alert.alert('Confirmar', '¿Estás seguro de que deseas eliminar?', [
                                { text: 'Cancelar', style: 'cancel' },
                                { text: 'Eliminar', onPress: handleDelete }, // Llama a handleDelete cuando se confirma la eliminación
                            ])}
                        />
                    </View>
                )
            }
        </TouchableOpacity>
    );
}

// Define los estilos para el componente
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Los hijos se alinean en fila
        justifyContent: 'space-around', // Espacio alrededor de los hijos
        alignItems: 'center', // Alinea los hijos al centro verticalmente
        width: '100%', // El contenedor ocupa el ancho completo
    },
    stateText: {
        fontWeight: 'bold', // Texto en negrita
    },
})

// Exporta el componente para su uso en otros lugares
export default Card;
