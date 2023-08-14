import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, HomeScreen, GraphScreen } from '../screens';

const MainStack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen name='HomeScreen' component={HomeScreen} />
      <MainStack.Screen name='GraphScreen' component={GraphScreen} />
    </MainStack.Navigator>
  );
};

export default AppStack;
