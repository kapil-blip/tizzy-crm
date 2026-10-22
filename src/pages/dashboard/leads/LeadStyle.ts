import { StyleSheet } from 'react-native';
import { COLORS } from '../../../assets/themes/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    padding: 16,
    paddingTop:0,
    backgroundColor: '#F4F8FC',
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

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
    marginTop:16,
  },

  searchContainer: {
    flex: 1,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E5EA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#9BA6B7',
    fontFamily: 'BalooBhai2-Regular',
    paddingVertical: 0,
  },
  filterButton: {
    width: 40,
    height: 40,
    marginLeft: 9,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --------------------------------------------------
  // ADD LEAD BANNER
  // --------------------------------------------------

  addLeadBanner: {
    height: 197,
    borderRadius: 13,
    backgroundColor: '#075DB3',
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 19,
  },

  bannerIcon: {
    width: 51,
    height: 51,

    borderRadius: 9,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 18,
  },

  bannerContent: {
    marginLeft: 12,
    flex: 1,
    zIndex: 2,
  },

  bannerTitle: {
    fontSize: 23,
    lineHeight: 29,

    color: '#FFFFFF',

    fontFamily: 'BalooBhai2-Medium',
  },

  bannerDescription: {
    marginTop: 4,

    fontSize: 16,
    lineHeight: 24,

    color: '#FFFFFF',

    fontFamily: 'BalooBhai2-Regular',
  },

  addLeadButton: {
    width: 137,
    height: 46,
    marginTop: 12,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLeadButtonText: {
    fontSize: 16,
    color: '#424754',
    fontFamily: 'BalooBhai2-SemiBold',
  },

  // Decorative shapes
  bannerDecorationOne: {
    position: 'absolute',

    width: 105,
    height: 105,

    right: -18,
    top: 84,

    borderRadius: 25,

    backgroundColor: 'rgba(255,255,255,0.08)',

    transform: [
      {
        rotate: '45deg',
      },
    ],
  },

  bannerDecorationTwo: {
    position: 'absolute',

    width: 65,
    height: 65,

    right: -12,
    bottom: -12,

    borderRadius: 50,

    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  // --------------------------------------------------
  // FILTER TABS
  // --------------------------------------------------

  filterTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  filterTab: {
    minWidth: 63,
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: '#C9E1FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  filterTabActive: {
    backgroundColor: '#075DB3',
  },
  filterTabText: {
    fontSize: 12,
    color: '#252A34',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
  },

  filterTabTextActive: {
    color: '#FFFFFF',
    fontFamily: 'BalooBhai2-SemiBold',
  },

  // --------------------------------------------------
  // LIST
  // --------------------------------------------------

  listContent: {
    paddingBottom: 100,
  },

  // --------------------------------------------------
  // LEAD CARD
  // --------------------------------------------------
  leadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 17,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#E6E8EB',
    shadowColor: '#7A8EA8',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  leadTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  leadTitleContainer: {
    flex: 1,
    paddingRight: 8,
  },

  leadName: {
    fontSize: 18,
    lineHeight: 24,
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
  },
  leadCompany: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 21,
    color: '#9AA9BF',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
  },

  // --------------------------------------------------
  // STATUS
  // --------------------------------------------------

  statusBadge: {
    minHeight: 20,
    paddingHorizontal: 9,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusText: {
    fontSize: 12,
    color: '#02BC9C',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
  },

  statusNew: {
    backgroundColor: '#E3F8F4',
  },

//   statusNew: {
//     backgroundColor: '#E3F8F4',
//   },

  statusNotInterested: {
    backgroundColor: '#FFE8EE',
  },

  statusInProcess: {
    backgroundColor: '#F0EDFF',
  },

  statusDealDone: {
    backgroundColor: '#E8F1FA',
  },

  cardDivider: {
    height: 1,

    backgroundColor: '#E5E7EB',

    marginTop: 12,
    marginBottom: 12,
  },

  // --------------------------------------------------
  // CONTACT
  // --------------------------------------------------

  contactRow: {
    flexDirection: 'row',
  },

  contactColumn: {
    flex: 1,
    minWidth: 0,
  },

  fieldLabel: {
    fontSize: 12,
    color: '#91A0B5',
    fontFamily: 'BalooBhai2-Medium',
    letterSpacing: 0.2,
    fontWeight:'500'
  },

  fieldValue: {
    fontSize: 16,
    color: '#4C4C5C',
    fontFamily: 'BalooBhai2-Medium',
    paddingRight: 8,
  },

  // --------------------------------------------------
  // BOTTOM
  // --------------------------------------------------

  leadBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',

    flexShrink: 1,
  },

  assignedLabel: {
    marginLeft: 7,
    fontSize: 12,
    color: '#666666',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
  },

  assignedValue: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666666',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 8,
  },

  dateText: {
    marginLeft: 7,
    fontSize: 12,
    color: '#666666',
    fontFamily: 'BalooBhai2-Regular',
  },

  // --------------------------------------------------
  // EMPTY
  // --------------------------------------------------

  footerLoader: {
    marginVertical: 16,
  },

  emptyContainer: {
    alignItems: 'center',

    paddingTop: 70,
  },

  emptyTitle: {
    marginTop: 12,

    fontSize: 18,

    color: '#424754',

    fontFamily: 'BalooBhai2-SemiBold',
  },

  emptyText: {
    marginTop: 3,

    fontSize: 14,

    color: '#98A2B3',

    fontFamily: 'BalooBhai2-Regular',
  },

  // --------------------------------------------------
  // FLOATING BUTTON
  // --------------------------------------------------

  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,

    elevation: 7,
  },
  // --------------------------------------------------
// ADD NEW LEAD CARD
// --------------------------------------------------

addLeadCard: {
    width: '100%',
    // minHeight: 160,
    backgroundColor: '#075DB3',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 16,
  },
  
  addLeadCardContent: {
    zIndex: 2,
  },
  
  // --------------------------------------------------
  // TOP ROW
  // --------------------------------------------------
  
  addLeadTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // --------------------------------------------------
  // ICON
  // --------------------------------------------------
  
  addLeadIconTile: {
    width: 42,
    height: 42,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  
  // --------------------------------------------------
  // TEXT
  // --------------------------------------------------
  
  addLeadTextWrap: {
    flex: 1,
  
    marginLeft: 12,
  
    paddingRight: 10,
  
    minWidth: 0,
  },
  
  addLeadTitle: {
    color: '#FFFFFF',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 29,
  },
  
  addLeadSubtitle: {
    marginTop: 4,
    color: '#FFFFFF',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    opacity: 0.98,
  },
  
  // --------------------------------------------------
  // BUTTON
  // --------------------------------------------------
  
  addLeadCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },

  addLeadCtaButton: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  addLeadCtaButtonText: {
    color: '#2C3139',
  
    fontFamily: 'BalooBhai2-Medium',
  
    fontWeight: '500',
  
    fontSize: 16,
  
    lineHeight: 22,
  
    textAlign: 'center',
  },
  
  // --------------------------------------------------
  // BACKGROUND PATTERN
  // --------------------------------------------------
  
  addLeadPatternBg: {
    position: 'absolute',
    right: -10,
    bottom: -20,
    width: 188,
    height: 188,
    zIndex: 1,
  },

  uploadOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
  },

  uploadTitle: {
    color: '#1E2A3A',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.4,
    marginBottom: 16,
  },

  uploadBox: {
    borderWidth: 1,
    borderColor: '#0561B9',
    borderRadius: 10,
    backgroundColor: '#F4F8FC',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 28,
  },

  uploadBoxTitle: {
    marginTop: 10,
    color: '#1E2A3A',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },

  uploadBoxHint: {
    marginTop: 4,
    color: '#7D8797',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },

  uploadBoxNote: {
    marginTop: 10,
    color: '#5F6878',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },

  uploadFileName: {
    marginTop: 12,
    color: '#0561B9',
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },

  sampleLink: {
    marginTop: 12,
    alignSelf: 'center',
  },

  sampleLinkText: {
    color: '#0561B9',
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 13,
    lineHeight: 18,
  },

  uploadSubmitButton: {
    alignSelf: 'center',
    minWidth: 140,
    height: 44,
    marginTop: 20,
    paddingHorizontal: 28,
    borderRadius: 22,
    backgroundColor: '#075DB6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadSubmitText: {
    color: '#FFFFFF',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
  },
});

export default styles;