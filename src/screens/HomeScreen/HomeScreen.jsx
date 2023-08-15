import { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Overlay } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, CoinCard } from '../../components';
import { coinsSearch } from '../../api/coinlore.api';
import { filterByPercentage, roundToHundredthPlace } from '../../utils/utils';
import styles from './styles';
import { COLORS } from '../../constants/Colors';

const HomeScreen = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Missing information');
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [filterInput, setFilterInput] = useState('');

  const navigation = useNavigation();

  const getUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');

      if (storedUser) {
        navigation.setOptions({ title: `Bienvenido, ${storedUser}!` });
      }
    } catch (error) {
      console.error('Error al recuperar el nombre de usuario:', error);
    }
  };

  const searchAPI = async () => {
    try {
      const response = await coinsSearch.get();
      const localList = JSON.stringify(response.data.data);
      await AsyncStorage.setItem('myLocalList', localList);
      setCoins(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Algo salió mal');
      setIsLoading(false);
    }
  };

  const handleInputChange = (text) => {
    setFilterInput(text);
  };

  const onFilter = () => {
    if (filterInput.trim() === '') {
      setFilteredCoins([]);
    } else {
      setFilteredCoins(filterByPercentage(coins, filterInput));
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    getUser();
    searchAPI();
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        animation={'fade'}
        overlayColor={COLORS.LIGHT_BLUE}
      />
    );
  }
  return (
    <View style={styles.container}>
      {!isConnected && (
        <Overlay isVisible={!isConnected} overlayStyle={styles.overlay}>
          <Text>¡Desconectado! Verifica tu conexión a Internet.</Text>
        </Overlay>
      )}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={filterInput}
          placeholder='% de cambio mínimo en 24 hrs'
        />
        <Button label='Filtrar' onPress={onFilter} />
      </View>
      <View>
        <FlatList
          data={filteredCoins.length === 0 ? coins : filteredCoins}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => {
            return <Text style={styles.errorText}>{errorMessage}</Text>;
          }}
          renderItem={({ item }) => (
            <CoinCard
              symbol={item.symbol}
              name={item.name}
              price={roundToHundredthPlace(item.price_usd)}
              percentage={item.percent_change_24h}
              onPress={
                isConnected
                  ? () => {
                      navigation.navigate('GraphScreen', {
                        coinId: item.id,
                      });
                    }
                  : () => {}
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
