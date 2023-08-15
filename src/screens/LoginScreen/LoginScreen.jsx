import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components';
import styles from './styles';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [userError, setUserError] = useState(false);

  const navigation = useNavigation();

  const handleInputChange = (text) => {
    setUser(text);
  };

  const handleLogin = async () => {
    if (user.trim() === '') {
      setUserError(true);
    } else {
      try {
        await AsyncStorage.setItem('user', user);
        setUserError(false);
        navigation.navigate('HomeScreen');
      } catch (error) {
        Alert.alert(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={user}
          placeholder='Nombre de usuario...'
        />
        {userError && (
          <Text style={styles.errorText}>Introduce un usuario</Text>
        )}
      </View>
      <Button label='Iniciar sesión' onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
