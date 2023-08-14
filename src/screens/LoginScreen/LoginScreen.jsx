import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '../../components';
import styles from './styles';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [userError, setUserError] = useState(false);

  const handleInputChange = (text) => {
    setUser(text);
  };

  const handleLogin = () => {
    if (user.trim() === '') {
      setUserError(true);
    } else {
      setUserError(false);
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
