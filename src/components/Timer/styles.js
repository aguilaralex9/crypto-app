import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';

const styles = ScaledSheet.create({
  timerText: {
    fontSize: '18@ms',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: '24@ms',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '20@ms',
  },
});

export default styles;
