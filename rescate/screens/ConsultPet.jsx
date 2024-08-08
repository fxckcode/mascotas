import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, ToastAndroid } from 'react-native';
import React, { useContext } from 'react';
import { Button } from 'react-native-elements';
import axiosClient from '../utils/axiosClient';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const ConsultPet = ({ route }) => {
  const { pet } = route.params;
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const handleAdopt = async () => {
    try {
      await axiosClient.post('/adoptions', { id_user: user.id, id_pet: pet.id }).then((response) => {
        if (response.status == 201) {
          ToastAndroid.show('Adopción en proceso', ToastAndroid.SHORT);
          navigation.navigate('HomeTabs', { screen: 'Home' });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: `http://10.0.2.2:3333/public/img/${pet.image}` }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{pet.name}</Text>
        <Text style={styles.subtitle}>{pet.race_name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Edad:</Text>
          <Text style={styles.infoValue}>{pet.age}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Esterilizado:</Text>
          <Text style={styles.infoValue}>{pet.sterilized}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Vacunas:</Text>
          <Text style={styles.infoValue}>{pet.vaccines}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Categoria:</Text>
          <Text style={styles.infoValue}>{pet.category_name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Género:</Text>
          <Text style={styles.infoValue}>{pet.gender}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Municipio:</Text>
          <Text style={styles.infoValue}>{pet.municipality}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Antecedentes:</Text>
          <Text style={styles.infoValue}>{pet.background}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Descripción:</Text>
          <Text style={styles.infoValue}>{pet.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#9C50C4',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#9C50C4',
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  infoLabel: {
    width: '40%',
    fontSize: 20,
    fontWeight: '500',
    color: '#9C50C4',
  },
  infoValue: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#9C50C4',
    width: '100%',
    padding: 12,
    marginVertical: 20,
  },
});

export default ConsultPet;
