import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../assets/themes/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  flex: {
    flex: 1,
  },

  header: {
    height: 58,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  headerShadow: {
    height: 2,
    backgroundColor: '#E8EEF5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  backButton: {
    width: 32,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backIcon: {
    fontSize: 36,
    lineHeight: 36,
    color: '#333333',
    fontWeight: '300',
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#252525',
    marginLeft: 0,
  },

  content: {
    paddingHorizontal: 15,
    paddingTop: 17,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#141414',
    marginBottom: 13,
  },

  fieldContainer: {
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: COLORS.GREY_800,
    marginBottom: 6,
    fontWeight: '500',
  },

  requiredMark: {
    color: COLORS.ERROR,
  },

  errorText: {
    color: COLORS.ERROR,
    fontSize: 12,
    fontFamily: 'BalooBhai2-Regular',
    marginTop: 4,
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E4E9',
    borderRadius: 5,
    paddingHorizontal: 9,
    fontSize: 14,
    color: COLORS.GREY_800,
    backgroundColor: '#FFFFFF',
  },

  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E4E9',
    borderRadius: 8,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  dropdownText: {
    fontSize: 14,
    color: '#333333',
    width: '80%',
  },

  placeholderText: {
    color: '#9AAAC0',
  },

  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inlineDropdown: {
    width: 92,
    marginRight: 8,
  },

  flexInput: {
    flex: 1,
  },

  chevron: {
    fontSize: 24,
    color: '#4E5360',
    marginTop: -7,
  },

  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 0,
  },

  addButton: {
    height: 28,
    minWidth: 65,
    paddingHorizontal: 8,
    borderRadius: 9,
    backgroundColor: '#0763B7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  plus: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '300',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 1,
  },

  planCard: {
    borderWidth: 1,
    borderColor: '#0870E8',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingTop: 0,
    paddingBottom: 3,
    marginTop: 16,
    marginBottom: 12,
  },

  serialRow: {
    height: 23,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 8,
    // backgroundColor: 'red',
  },

  serialText: {
    fontSize: 16,
    color: '#505566',
    fontFamily:'BalooBhai2-Medium',
    fontWeight: '500',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },

  planClose: {
    height: 23,
    paddingHorizontal: 8,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  serialLine: {
    height: 1,
    flex: 1,
    backgroundColor: '#0870E8',
  },

  bottomSpace: {
    height: 75,
  },

  saveContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 8,
  },

  saveButton: {
    height: 45,
    color: COLORS.WHITE,
    borderRadius: 24,
    backgroundColor: '#0763B7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveText: {
    color: '#FFFFFF',
    fontFamily:'BalooBhai2-Medium',
    fontSize: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  modalContainer: {
    maxHeight: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    overflow: 'hidden',
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222222',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  option: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  optionText: {
    fontSize: 15,
    color: '#333333',
  },

  checkAvailability: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 12,
  },

  checkAvailabilityText: {
    color: '#0561B9',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
  },

  domainStatusText: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 12,
    fontFamily: 'BalooBhai2-Regular',
  },

  domainChecking: {
    color: '#7D8797',
  },

  domainAvailable: {
    color: '#03A66A',
  },

  domainUnavailable: {
    color: COLORS.ERROR,
  },
});

export default styles;