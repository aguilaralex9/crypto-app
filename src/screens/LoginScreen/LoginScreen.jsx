import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '../../components';
import styles from './styles';

const LoginScreen = () => {
  const [user, setUser] = useState('');

  const handleInputChange = (text) => {
    setUser(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your text:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={user}
        placeholder='Type something...'
      />
      <Text style={styles.displayText}>You typed: {user}</Text>
      <Button label='Iniciar sesión' />
    </View>
  );
};

export default LoginScreen;
