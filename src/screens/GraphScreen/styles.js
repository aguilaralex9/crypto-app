import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';

const { RED, LIGHT_GRAY } = COLORS;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '40@ms',
    paddingBottom: '20@ms',
    paddingHorizontal: '20@ms',
    backgroundColor: LIGHT_GRAY,
  },
  graphContainer: {
    height: '200@ms',
    padding: '20@ms',
    flexDirection: 'row',
  },
  timerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  coinName: {
    fontSize: '20@ms',
    marginBottom: '10@ms',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  timerText: {
    fontSize: '16@ms',
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
