import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/base'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const Card = ({ pet }) => {
    const user = useContext(UserContext)
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={{ width: '45%', height: 250, backgroundColor: '#e6c6f7', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }} onPress={() => navigation.navigate('ConsultPet', { pet: pet })}>
            <Image src={`http://10.0.2.2:3333/public/img/${pet.image}`} style={{ width: "100%", height: 150 }} resizeMode='contain' />
            <View style={{ width: '100%', height: 45, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: '60%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{pet.name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.race_name}, {pet.age}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.gender}</Text>
                </View>
            </View>
            {
                user.role === 'usuario' ? (
                    <Button
                        title={pet.state === 'En proceso' ? 'En proceso' : pet.state === 'Adoptado' ? 'Adoptado' : 'Adoptar'}
                        onPress={() => handleAdopt(pet.id)}
                        disabled={pet.state === 'En proceso' || pet.state === 'Adoptado'}
                    />
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.stateText}>{pet.state}</Text>
                        <Button
                            title="Editar"
                            color="purple"
                            onPress={() => navigation.navigate('Edit', { id: pet.id })}
                        />
                        <Button
                            title="Eliminar"
                            color="red"
                            onPress={() => Alert.alert('Confirmar', '¿Estás seguro de que deseas eliminar?', [
                                { text: 'Cancelar', style: 'cancel' },
                                { text: 'Eliminar', onPress: handleDelete },
                            ])}
                        />
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    stateText: {
        fontWeight: 'bold',
    },
})

export default Card