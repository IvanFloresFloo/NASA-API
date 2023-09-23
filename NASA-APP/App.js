import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Definición del componente principal de la aplicación
export default function App() {
  // Estado para almacenar los datos de la NASA
  const [nasaData, setNasaData] = useState(null);
  // Estado para controlar si se muestran los datos de la NASA o el botón "Mostrar"
  const [showData, setShowData] = useState(false);

  // Efecto que se ejecuta cuando showData cambia
  useEffect(() => {
    // Función asincrónica para obtener los datos de la NASA
    const fetchNasaData = async () => {
      try {
        // Realizamos una solicitud HTTP a la API de la NASA
        const response = await axios.get(
          "https://api.nasa.gov/planetary/earth/imagery?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.15&api_key=Twh8sx5cAbhMqW54ZDbhNqFXI3Ow0gUWPK7xXqqi"
        );
        // Actualizamos el estado nasaData con los datos obtenidos
        setNasaData(response.data);
      } catch (error) {
        console.error('Error al obtener datos de la NASA', error);
      }
    };

    // Si showData es true, llamamos a fetchNasaData para obtener los datos
    if (showData) {
      fetchNasaData();
    }
  }, [showData]);

  // Función para mostrar los datos de la NASA al hacer clic en "Mostrar"
  const handleShowData = () => {
    setShowData(true);
  };

  // Función para ocultar los datos de la NASA al hacer clic en "Regresar"
  const handleReturn = () => {
    setShowData(false);
  };

  // Renderizado de la interfaz de usuario
  return (
    <View style={styles.container}>
      {/* Muestra el logo de la NASA */}
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      {/* Muestra el título "Información de la NASA" */}
      <Text style={styles.header}>Información de la NASA</Text>

      {/* Si showData es true, muestra los datos de la NASA */}
      {showData ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Muestra el título de los datos de la NASA */}
          <Text style={styles.title}>{nasaData?.title}</Text>
          {/* Muestra una imagen de los datos de la NASA */}
          <Image source={{ uri: nasaData?.hdurl }} style={styles.image} />
          {/* Muestra la fecha de los datos de la NASA */}
          <Text style={styles.date}>Fecha: {nasaData?.date}</Text>
          {/* Muestra la explicación de los datos de la NASA */}
          <Text style={styles.explanation}>{nasaData?.explanation}</Text>
          {/* Muestra el tipo de medio de los datos de la NASA */}
          <Text style={styles.media_type}>Tipo de media: {nasaData?.media_type}</Text>
          {/* Muestra la versión del servicio de los datos de la NASA */}
          <Text style={styles.service_version}>Versión del servicio: {nasaData?.service_version}</Text>
          {/* Muestra la URL de los datos de la NASA */}
          <Text style={styles.url}>URL: {nasaData?.url}</Text>
          {/* Botón "Regresar" para ocultar los datos */}
          <TouchableOpacity style={styles.button} onPress={handleReturn}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        // Si showData es false, muestra el logotipo y el botón "Mostrar"
        <View>
          {/* Muestra el logotipo */}
          <Image source={require('./assets/logotipo.png')} style={styles.logotipo} />
          {/* Botón "Mostrar" para mostrar los datos de la NASA */}
          <TouchableOpacity style={styles.button} onPress={handleShowData}>
            <Text style={styles.buttonText}>Mostrar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Pie de página con información del desarrollador e instituto */}
      <Text style={styles.footer}>
        Desarrollado por Edilson Guillin | Quinto ciclo | Materia: Aplicaciones Móviles II | Instituto Nuestra Señora del Rosario
      </Text>

      {/* Barra de estado */}
      <StatusBar style="auto" />
    </View>
  );
}

// Estilos para la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logotipo: {
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 24,
    color: 'blue',
  },
  scrollContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  date: {
    fontStyle: 'italic',
    marginTop: 10,
  },
  explanation: {
    marginTop: 10,
  },
  media_type: {
    marginTop: 10,
  },
  service_version: {
    marginTop: 10,
  },
  url: {
    marginTop: 10,
    color: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
