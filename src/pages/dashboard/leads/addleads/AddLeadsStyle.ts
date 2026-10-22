import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets/themes/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  flex: {
    flex: 1,
  },

  // --------------------------------------------------
  // HEADER
  // --------------------------------------------------

  header: {
    height: 58,
    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 15,

    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF3',

    shadowColor: '#4D7094',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
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
    zIndex: 1
  },

  backButton: {
    width: 32,
    height: 40,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  headerTitle: {
    marginLeft: 0,

    color: '#303540',

    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '600',
  },

  // --------------------------------------------------
  // SCROLL
  // --------------------------------------------------

  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  // --------------------------------------------------
  // TABS
  // --------------------------------------------------

  tabsContainer: {
    height: 44,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#E5F0FC',

    borderRadius: 9,

    padding: 3,

    marginBottom: 18,
  },

  tab: {
    flex: 1,
    height: 38,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 7,
  },

  activeTab: {
    backgroundColor: '#FFFFFF',

    shadowColor: '#5D7FA3',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,

    elevation: 1,
  },

  tabText: {
    color: '#566175',

    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 18,
  },

  activeTabText: {
    color: '#303540',

    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
  },

  // --------------------------------------------------
  // SECTION
  // --------------------------------------------------

  sectionTitle: {
    color: '#252A34',

    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',

    fontSize: 17,
    lineHeight: 22,

    marginBottom: 13,
  },

  sectionTitleNoMargin: {
    color: '#252A34',

    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',

    fontSize: 17,
    lineHeight: 22,
  },

  // --------------------------------------------------
  // FIELD
  // --------------------------------------------------

  fieldContainer: {
    marginBottom: 10,
  },

  fieldLabel: {
    color: '#4D5261',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,

    marginBottom: 5,
  },

  textInput: {
    height: 39,

    borderWidth: 1,
    borderColor: '#DFE3E8',

    borderRadius: 6,

    backgroundColor: '#FFFFFF',

    paddingHorizontal: 10,

    color: '#555B6B',

    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,

    paddingVertical: 0,
  },

  multilineInput: {
    height: 54,

    paddingTop: 8,
    paddingBottom: 8,
  },

  // --------------------------------------------------
  // SELECT
  // --------------------------------------------------

  selectInput: {
    height: 39,

    borderWidth: 1,
    borderColor: '#DFE3E8',

    borderRadius: 6,

    backgroundColor: '#FFFFFF',

    paddingHorizontal: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectText: {
    color: '#555B6B',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 19,
  },

  selectPlaceholder: {
    color: '#9AA9BF',
  },

  // --------------------------------------------------
  // PHONE
  // --------------------------------------------------

  phoneInputContainer: {
    height: 39,

    borderWidth: 1,
    borderColor: '#DFE3E8',

    borderRadius: 6,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'center',

    overflow: 'hidden',
  },

  countryCode: {
    height: '100%',
    width: 63,

    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 9,

    borderRightWidth: 1,
    borderRightColor: '#E2E6EB',
  },

  countryCodeText: {
    color: '#9AA9BF',

    fontFamily: 'BalooBhai2-Regular',

    fontSize: 14,
  },

  phoneInput: {
    flex: 1,

    height: '100%',

    paddingHorizontal: 10,

    paddingVertical: 0,

    color: '#555B6B',

    fontFamily: 'BalooBhai2-Regular',

    fontSize: 14,
  },

  // --------------------------------------------------
  // CITY + PINCODE
  // --------------------------------------------------

  twoColumnRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    gap: 8,
  },

  cityColumn: {
    flex: 1,
  },

  pincodeColumn: {
    flex: 1,
  },

  // --------------------------------------------------
  // LEAD SPECIFICATION BOX
  // --------------------------------------------------

  leadSpecificationBox: {
    backgroundColor: '#F4F8FC',

    borderRadius: 5,

    borderWidth: 1,
    borderColor: '#E7EEF7',

    paddingHorizontal: 15,
    paddingTop: 17,
    paddingBottom: 8,

    marginTop: 2,
    marginBottom: 16,
  },

  boxTitle: {
    color: '#2D323C',

    fontFamily: 'BalooBhai2-SemiBold',

    fontWeight: '600',

    fontSize: 16,
    lineHeight: 21,

    marginBottom: 13,
  },

  // --------------------------------------------------
  // ADDITIONAL CONTACT
  // --------------------------------------------------

  additionalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  addText: {
    color: '#0561B9',

    fontFamily: 'BalooBhai2-SemiBold',

    fontWeight: '600',

    fontSize: 13,
    lineHeight: 18,
  },

  // --------------------------------------------------
  // TAB PLACEHOLDER
  // --------------------------------------------------

  placeholderTab: {
    minHeight: 300,

    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderTitle: {
    color: '#303540',

    fontFamily: 'BalooBhai2-SemiBold',

    fontSize: 20,
  },

  placeholderText: {
    marginTop: 5,

    color: '#9AA9BF',

    fontFamily: 'BalooBhai2-Regular',

    fontSize: 14,
  },

  // --------------------------------------------------
  // BOTTOM
  // --------------------------------------------------

  bottomSpacing: {
    height: 40,
  },

  submitContainer: {
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 10,

    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },

  submitButton: {
    height: 47,

    borderRadius: 25,

    backgroundColor: '#075DB3',

    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButtonText: {
    color: '#FFFFFF',

    fontFamily: 'BalooBhai2-SemiBold',

    fontWeight: '600',

    fontSize: 16,
    lineHeight: 22,
  },
  // --------------------------------------------------
// FOLLOW UP
// --------------------------------------------------

followUpSectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    lineHeight: 18,
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    letterSpacing: 0,
    color: '#1E1E1E',
  },
  
  followUpFieldContainer: {
    width: '100%',
    marginBottom: 22,
    marginTop: 12,
  },
  
  followUpFieldLabel: {
    marginBottom: 4,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: '#4C4C5C',
  },
  
  followUpDateInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical:7,
  },
  
  followUpDateText: {
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#9BA6B7',
  },
  
  followUpNoteInput: {
    width: '100%',
    height: 118,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical:7,
    fontSize: 16,
    lineHeight: 27,
    color: '#9BA6B7',
    fontFamily: 'BalooBhai2-Regular',
  },
  // --------------------------------------------------
// SERVICES
// --------------------------------------------------

servicesSectionTitle: {
    color: '#1E1E1E',
  
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
  
    fontSize: 18,
    lineHeight: 18,
  
    letterSpacing: 0,
  
    marginBottom: 28,
  },
  
  servicesFieldContainer: {
    width: '100%',
    // marginBottom: 22,
    marginTop: 8,
  },
  
  servicesFieldLabel: {
    marginBottom: 8,
    color: '#4C4C5C',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
  },
  
  servicesTextInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 0,
    color: '#555B6B',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
  },
  
  servicesDateInput: {
    width: '100%',
    height: 40,
  
    borderWidth: 1,
    borderColor: '#E1E5EA',
  
    borderRadius: 11,
  
    backgroundColor: '#FFFFFF',
  
    paddingHorizontal: 18,
  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  servicesDateText: {
    color: '#9BA6B7',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
  },
  
  servicesRateInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  servicesRateText: {
    color: '#9BA6B7',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
  },

  requiredMark: {
    color: COLORS.ERROR,
  },

  servicesSelectText: {
    flex: 1,
    marginRight: 8,
  },

  domainStatusText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'BalooBhai2-Regular',
  },

  documentCard: {
    marginTop: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E1E8F2',
    borderRadius: 12,
    backgroundColor: '#F8FAFD',
  },

  documentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  documentIconTile: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E6EFFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  documentTextWrap: {
    flex: 1,
  },

  documentTitle: {
    color: '#252A34',
    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: 17,
    lineHeight: 22,
  },

  documentSubtitle: {
    color: '#5F6878',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },

  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#8DB4E2',
    borderRadius: 10,
    backgroundColor: '#F1F6FD',
  },

  uploadTitle: {
    color: '#252A34',
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 8,
  },

  uploadHint: {
    color: '#7D8797',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },

  selectedFilesTitle: {
    color: '#252A34',
    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    marginTop: 14,
    marginBottom: 8,
  },

  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  fileInfo: {
    flex: 1,
    marginHorizontal: 10,
  },

  fileName: {
    color: '#252A34',
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 14,
    lineHeight: 18,
  },

  fileType: {
    color: '#7D8797',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 16,
  },

  dateValueText: {
    color: '#252A34',
  },

  currentServiceHint: {
    color: '#5F6878',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 18,
    marginTop: -6,
    marginBottom: 12,
  },

  sectionGap: {
    marginTop: 16,
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 4,
    // marginBottom: 8,
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#9AA9BF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterActive: {
    borderColor: COLORS.PRIMARY,
  },

  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
  },

  radioText: {
    color: '#555B6B',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 19,
  },

  checkAvailability: {
    alignSelf: 'flex-start',
    marginTop: 8,
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
    fontFamily: 'BalooBhai2-SemiBold',
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
    fontFamily: 'BalooBhai2-Regular',
    color: '#333333',
  },
});

export default styles;