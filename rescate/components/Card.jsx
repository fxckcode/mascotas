import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const Card = ({ pet }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={{ width: '45%', height: 250, backgroundColor: '#e6c6f7', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }} onPress={() => navigation.navigate('ConsultPet', { pet: pet })}>
            <Image src={`http://10.0.2.2:3333/public/img/${pet.image}`} style={{ width: "100%", height: 150 }} resizeMode='contain' />
            <View style={{ width: '100%', height: 45, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{pet.name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.race}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.age}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>{pet.gender}</Text>
                </View>
            </View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{pet.state}</Text>
        </TouchableOpacity>
    )
}

export default Card