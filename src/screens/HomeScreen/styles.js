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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10@ms',
  },
  label: {
    fontSize: '18@ms',
    marginBottom: '10@ms',
  },
  input: {
    width: '70%',
    height: '40@ms',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: '1@ms',
    borderRadius: '8@ms',
    paddingHorizontal: '10@ms',
    marginBottom: '5@ms',
    marginRight: '10@ms',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: '14@ms',
    color: RED,
  },
});

export default styles;
