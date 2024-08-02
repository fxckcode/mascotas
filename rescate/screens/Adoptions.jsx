import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../utils/axiosClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CardAdoption from '../components/CardAdoption'
import { UserContext } from '../context/UserContext'

const Adoptions = () => {
    const { user } = useContext(UserContext)
    const [adoptions, setAdoptions] = useState([]);

    const getAdoptions = async () => {
        if (user) {
            try {
                const response = await axiosClient.get(`/adoption/user/${user.id}`);
                if (response.status === 200) {
                    setAdoptions(response.data);
                }
            } catch (error) {
                // console.error(error);
            }
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await getAdoptions();
        };

        const interval = setInterval(() => {
            fetchData();
        }, 1500);

        return () => clearInterval(interval);
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ width: '100%', paddingHorizontal: 10, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>Mis adopciones</Text>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {
                            adoptions.length > 0 ? adoptions.map((adoption, index) => (
                                <CardAdoption key={index} pet={adoption} />
                            )) : <Text style={{ fontSize: 15, color: 'black', fontWeight: 500, textAlign: 'center', paddingHorizontal: 10 }}>No tienes adopciones</Text>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Adoptions