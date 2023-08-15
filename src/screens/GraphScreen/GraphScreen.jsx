import { useState, useEffect } from 'react';
import { View, Text, Overlay, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { singleCoinSearch } from '../../api/coinlore.api';
import { getCurrentTime, formatTime } from '../../utils/utils';
import styles from './styles';
import { COLORS } from '../../constants/Colors';

const GraphScreen = ({ route }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [refreshCount, setRefreshCount] = useState(0);
  const [coinInfo, setCoinInfo] = useState({});
  const [coinPrice, setCoinPrice] = useState([]);
  const [time, setTime] = useState([]);
  const { coinId } = route.params;

  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  const searchAPI = async () => {
    try {
      const response = await singleCoinSearch.get('', {
        params: {
          id: coinId,
        },
      });
      setCoinInfo(response.data[0]);
      setCoinPrice((prevData) => [...prevData, response.data[0].price_usd]);
      await AsyncStorage.setItem('coinPrices', JSON.stringify(coinPrice));
      setTime((prevData) => [...prevData, getCurrentTime()]);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Algo salió mal');
      setIsLoading(false);
    }
  };

  const resetTimer = () => {
    setTimeRemaining(30);
    setRefreshCount(refreshCount + 1);
  };

  useEffect(() => {
    if (refreshCount < 5) {
      const interval = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          resetTimer();
          searchAPI();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
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
      <Text style={styles.coinName}>{coinInfo.symbol}</Text>
      <Text style={styles.coinName}>{coinInfo.name}</Text>
      <View style={styles.graphContainer}>
        <YAxis
          data={coinPrice}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={coinPrice}
            contentInset={verticalContentInset}
            svg={{ stroke: 'rgb(134, 65, 244)' }}>
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={coinPrice}
            formatLabel={(value, index) => time[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Siguiente actualización: </Text>
        {isConnected ? (
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        ) : (
          <Text style={styles.timerText}>No hay conexión</Text>
        )}
      </View>
    </View>
  );
};

export default GraphScreen;
