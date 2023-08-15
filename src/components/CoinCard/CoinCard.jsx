import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CoinCard = ({ symbol, name, price, percentage, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View>
        <Text style={styles.cardText}>{symbol}</Text>
        <Text style={styles.cardText}>{name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.cardText}>Precio: </Text>
        <Text style={styles.cardText}>${price} USD</Text>
        <Text style={styles.cardText}>Cambio en 24 hrs: </Text>
        <Text style={styles.cardText}>{percentage}%</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CoinCard;
