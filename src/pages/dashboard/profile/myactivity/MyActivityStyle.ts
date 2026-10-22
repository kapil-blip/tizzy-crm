import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets/themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  bottomShadow: {
    height: 1,
    borderColor: '#FFFFFF',
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1,
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  subtitle: {
    color: COLORS.GREY_400,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },

  listLabel: {
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
  },
});
