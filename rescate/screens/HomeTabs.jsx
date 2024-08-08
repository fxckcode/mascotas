import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDog, faHome, faPen, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import Adoptions from './Adoptions';
import Profile from './Profile';
import { UserContext } from '../context/UserContext';
import RegisterPet from './RegisterPet';

const Tab = createBottomTabNavigator()
const HomeTabs = () => {
  const {user} = useContext(UserContext)
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} options={{
        headerStyle: {
          backgroundColor: '#C683EA',
        },
        title: '',
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerLeft: () => (
          <Image source={require('../img/logo_texto_blanco.png')} resizeMode='contain' style={{ width: 90, display: 'flex' }} />
        ),
        headerRightContainerStyle: { paddingRight: 20 },
        headerRight: () => (
          <FontAwesomeIcon icon={faUser} size={25} style={{ color: 'white' }} />
        ),
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faHome} size={25} style={{ color: '#C683EA' }} />
        )
      }} />
      <Tab.Screen name='Adoptions' component={Adoptions} options={{
        headerStyle: {
          backgroundColor: '#C683EA',
        },
        title: '',
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerLeft: () => (
          <Image source={require('../img/logo_texto_blanco.png')} resizeMode='contain' style={{ width: 90, display: 'flex' }} />
        ),
        headerRightContainerStyle: { paddingRight: 20 },
        headerRight: () => (
          <FontAwesomeIcon icon={faUser} size={25} style={{ color: 'white' }} />
        ),
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faDog} size={25} style={{ color: '#C683EA' }} />
        )
      }} />
       {
        user.role == 'administrador' ? (
          <Tab.Screen name='Create' component={RegisterPet} options={{
            headerStyle: {
              backgroundColor: '#C683EA',
            },
            title: '',
            headerLeftContainerStyle: { paddingLeft: 20 },
            headerLeft: () => (
              <Image source={require('../img/logo_texto_blanco.png')} resizeMode='contain' style={{ width: 90, display: 'flex' }} />
            ),
            headerRightContainerStyle: { paddingRight: 20 },
            headerRight: () => (
              <FontAwesomeIcon icon={faUser} size={25} style={{ color: 'white' }} />
            ),
            tabBarIcon: () => (
              <FontAwesomeIcon icon={faPlus} size={25} style={{ color: '#C683EA' }} />
            )
          }} />
        ) : null
      }
      <Tab.Screen name='Profile' component={Profile} options={{
        headerStyle: {
          backgroundColor: '#C683EA',
        },
        title: '',
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerLeft: () => (
          <Image source={require('../img/logo_texto_blanco.png')} resizeMode='contain' style={{ width: 90, display: 'flex' }} />
        ),
        headerRightContainerStyle: { paddingRight: 20 },
        headerRight: () => (
          <FontAwesomeIcon icon={faUser} size={25} style={{ color: 'white' }} />
        ),
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faPen} size={25} style={{ color: '#C683EA' }} />
        )
      }} />

     
    </Tab.Navigator>
  )
}

export default HomeTabs