import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import styles from './styles';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(30); // Tiempo en segundos para la próxima actualización
  const [isConnected, setIsConnected] = useState(true);

  const timerAnimation = new Animated.Value(timeRemaining);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setTimeRemaining(30);
    timerAnimation.setValue(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
        Animated.timing(timerAnimation, {
          toValue: timeRemaining - 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      } else {
        resetTimer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  return (
    <View>
      <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
      {!isConnected && <Text style={styles.overlay}>Desconectado</Text>}
    </View>
  );
};

export default Timer;
