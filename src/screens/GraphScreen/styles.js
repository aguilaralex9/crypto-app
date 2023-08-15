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
  errorText: {
    fontSize: '14@ms',
    color: RED,
  },
});

export default styles;
