// Importa React y los hooks necesarios para el manejo de estado y efectos.
import React, { createContext, useState, useEffect } from 'react';
// Importa AsyncStorage para almacenar y recuperar datos de manera local.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crea un nuevo contexto para el usuario. Este contexto será usado para compartir el estado del usuario a través de la aplicación.
export const UserContext = createContext();

// Define el componente UserProvider, que actuará como proveedor del contexto para los componentes hijos.
export const UserProvider = ({ children }) => {
  // Define el estado `user` y la función `setUser` para actualizar este estado. Inicialmente `user` es `null`.
  const [user, setUser] = useState(null);

  // Usa el hook useEffect para ejecutar código cuando el componente se monte.
  useEffect(() => {
    // Define una función asíncrona para recuperar los datos del usuario desde AsyncStorage.
    const fetchUser = async () => {
      try {
        // Intenta obtener los datos del usuario almacenados bajo la clave 'user'.
        const userData = await AsyncStorage.getItem('user');
        // Si se encuentran datos, conviértelos de JSON a un objeto JavaScript y actualiza el estado `user`.
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        // Si ocurre un error durante la recuperación de datos, muéstralo en la consola.
        console.error('Error fetching user from AsyncStorage', error);
      }
    };

    // Llama a la función fetchUser para recuperar los datos del usuario.
    fetchUser();
  }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente.

  // Devuelve el contexto `UserContext.Provider`, que proporciona el estado `user` y la función `setUser` a los componentes hijos.
  // `children` representa los componentes envueltos por el `UserProvider`.
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
