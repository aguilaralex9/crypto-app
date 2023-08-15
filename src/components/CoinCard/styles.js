import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';

const { STEEL_BLUE } = COLORS;

const styles = ScaledSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: STEEL_BLUE,
    borderRadius: '5@ms',
    paddingVertical: '10@ms',
    paddingHorizontal: '20@ms',
    marginBottom: '10@ms',
  },
  nameContainer: {},
  priceContainer: {
    width: '48%',
  },
  cardText: {
    color: 'white',
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
});

export default styles;
