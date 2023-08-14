import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';

const { LIGHT_BLUE } = COLORS;

const styles = ScaledSheet.create({
  button: {
    backgroundColor: LIGHT_BLUE,
    borderRadius: '20@ms',
    paddingVertical: '10@ms',
    paddingHorizontal: '20@ms',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
});

export default styles;
