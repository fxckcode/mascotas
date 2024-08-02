import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginHome from './screens/LoginHome'
import Login from './screens/Login'
import SingUp from './screens/SingUp'
import Home from './screens/Home'
import RegisterPet from './screens/RegisterPet'
import ConsultPet from './screens/ConsultPet'
import HomeTabs from './screens/HomeTabs'
import { UserProvider } from './context/UserContext'

const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginHome"
            component={LoginHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerTitle: 'Iniciar Sesión' }}
          />
          <Stack.Screen
            name='SingUp'
            component={SingUp}
            options={{ headerTitle: '' }}
          />
          <Stack.Screen
            name='HomeTabs'
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name='RegisterPet'
          component={RegisterPet}
        />  */}
          <Stack.Screen
            name='ConsultPet'
            component={ConsultPet}
            options={{
              headerTitle: 'Adoptar mascota',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}

export default App