import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { LoginScreen } from './src/screens';

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
