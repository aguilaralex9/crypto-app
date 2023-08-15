import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { singleCoinSearch } from '../../api/coinlore.api';
import { Timer } from '../../components';
import styles from './styles';
import { COLORS } from '../../constants/Colors';

const GraphScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Missing information');
  const [coinInfo, setCoinInfo] = useState({});
  const [coinPrice, setCoinPrice] = useState([]);
  const { coinId } = route.params;

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

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
      console.log(response.data[0].price_usd);
      setCoinPrice((prevData) => [...prevData, response.data[0].price_usd]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchAPI();
    const intervalId = setInterval(searchAPI, 30000);

    return () => clearInterval(intervalId);
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
      <Text style={styles.coinName}>{coinInfo.name}</Text>
      <View style={styles.graphContainer}>
        <YAxis
          data={data}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={verticalContentInset}
            svg={{ stroke: 'rgb(134, 65, 244)' }}>
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={data}
            formatLabel={(value, index) => index}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Siguiente actualización: </Text>
        <Timer />
      </View>
    </View>
  );
};

export default GraphScreen;
