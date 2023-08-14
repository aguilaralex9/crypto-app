import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';

const { RED, LIGHT_GRAY } = COLORS;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '20@ms',
    backgroundColor: LIGHT_GRAY,
  },
  userContainer: {
    justifyContent: 'start',
    alignItems: 'start',
    marginBottom: '15@ms',
  },
  label: {
    fontSize: '18@ms',
    marginBottom: '10@ms',
  },
  input: {
    width: '100%',
    height: '40@ms',
    borderColor: 'gray',
    borderWidth: '1@ms',
    borderRadius: '5@ms',
    paddingHorizontal: '10@ms',
    marginBottom: '5@ms',
  },
  displayText: {
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: '14@ms',
    color: RED,
  },
});

export default styles;
