import { StyleSheet } from 'react-native';
import { COLORS } from '../../../assets/themes/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  headerShadow: {
    height: 2,
    backgroundColor: '#E5EDF5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  content: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },

  /* ================= SEARCH ================= */

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 16,
  },

  searchContainer: {
    flex: 1,
    height: 41,

    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 22,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 13,
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

  searchInput: {
    flex: 1,
    marginLeft: 10,

    paddingVertical: 0,

    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 18,

    color: '#333A45',
  },

  /* ================= CREATE BANNER ================= */

  createBanner: {
    minHeight: 172,

    backgroundColor: '#075DB6',

    borderRadius: 11,

    overflow: 'hidden',

    flexDirection: 'row',

    paddingTop: 39,
    paddingLeft: 21,
    paddingRight: 15,

    marginBottom: 19,

    position: 'relative',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  bannerIcon: {
    width: 43,
    height: 44,

    borderRadius: 8,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 10,
  },

  bannerContent: {
    flex: 1,
    zIndex: 5,
  },

  bannerTitle: {
    color: '#FFFFFF',

    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',

    fontSize: 19,
    lineHeight: 23,
  },

  bannerDescription: {
    marginTop: 3,

    color: '#FFFFFF',

    fontFamily: 'BalooBhai2-Regular',

    fontSize: 14,
    lineHeight: 21,
  },

  addQuotationButton: {
    marginTop: 10,

    width: 160,
    height: 40,

    borderRadius: 10,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  addQuotationText: {
    color: '#303641',

    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',

    fontSize: 15,
    lineHeight: 19,
  },

  /* Decorative banner shapes */

  bannerCircleOne: {
    position: 'absolute',

    width: 50,
    height: 50,

    borderRadius: 25,

    right: -1,
    bottom: -1,

    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  bannerCircleTwo: {
    position: 'absolute',

    width: 50,
    height: 50,

    borderRadius: 25,

    right: 49,
    bottom: 0,

    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  bannerSquareOne: {
    position: 'absolute',

    width: 50,
    height: 50,

    right: 0,
    bottom: 49,

    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  bannerSquareTwo: {
    position: 'absolute',

    width: 50,
    height: 50,

    right: 50,
    bottom: 49,

    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  /* ================= FILTERS ================= */

  filterTabs: {
    height: 42,

    backgroundColor: COLORS.BACKGROUND_COLOR,

    borderWidth: 1,
    borderColor: '#E0E5EB',

    borderRadius: 22,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 3,

    marginBottom: 17,
  },

  filterTab: {
    flex: 1,
    height: 36,

    borderRadius: 19,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 4,
  },

  activeFilterTab: {
    backgroundColor: '#075DB6',
  },

  filterTabText: {
    color: '#555B69',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
  },

  activeFilterTabText: {
    color: '#FFFFFF',
  },

  /* ================= LIST ================= */

  listContent: {
    paddingBottom: 110,
  },

  /* ================= CARD ================= */

  quotationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E7EB',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 17,
    paddingBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    minHeight: 48,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
  },
  companyName: {
    marginTop: 8,
    color: COLORS.GREY_400,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 17,
  },
  menuButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= DROPDOWN ================= */

  menuOverlay: {
    flex: 1,
  },

  dropdownMenu: {
    position: 'absolute',

    top: 45,
    right: 13,

    width: 155,

    backgroundColor: '#FFFFFF',

    borderRadius: 8,

    borderWidth: 1,
    borderColor: '#E1E5EA',

    paddingVertical: 5,

    zIndex: 20,

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  dropdownItem: {
    height: 38,

    paddingHorizontal: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdownText: {
    marginLeft: 9,

    color: '#3D444F',

    fontFamily: 'BalooBhai2-Regular',

    fontSize: 14,
    lineHeight: 18,
  },

  /* ================= QUOTATION NUMBER ================= */

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },

  quotationNumberContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9EDF1',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  quotationNumber: {
    color: COLORS.GREY_900,
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EA',
    marginTop: 10,
    marginBottom: 12,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 1,
    gap: 6,
  },

  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  customerStatusBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    minWidth: 78,
    alignItems: 'center',
  },

  statusPending: {
    backgroundColor: '#F5C14D',
  },

  statusApproved: {
    backgroundColor: '#3CB371',
  },

  statusRejected: {
    backgroundColor: '#E57373',
  },

  statusBadgeText: {
    color: '#FFFFFF',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.4,
  },

  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  serviceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },

  serviceIconGrid: {
    width: 16,
    height: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  serviceIconCell: {
    width: 8,
    height: 8,
  },

  serviceIconBlue: {
    backgroundColor: '#2E7CF6',
    borderTopLeftRadius: 1,
  },

  serviceIconRed: {
    backgroundColor: '#E8453C',
    borderTopRightRadius: 1,
  },

  serviceIconGreen: {
    backgroundColor: '#2EBA4F',
    borderBottomLeftRadius: 1,
  },

  serviceIconYellow: {
    backgroundColor: '#F4B400',
    borderBottomRightRadius: 1,
  },

  serviceInfo: {
    flex: 1,
  },

  serviceName: {
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
  },

  serviceMeta: {
    marginTop: 2,
    color: '#5F6878',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 18,
  },

  createdByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    gap: 8,
  },

  createdByRowCustomer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },

  createdByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    paddingBottom: 2,
    marginRight: 8,
  },

  customerStatusGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexShrink: 0,
    marginLeft: 'auto',
    gap: 12,
  },

  customerStatusCol: {
    alignItems: 'center',
  },

  customerStatusLabel: {
    color: '#8A94A3',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 6,
  },

  createdByText: {
    flexShrink: 1,
    marginLeft: 5,
    color: '#666666',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 18,
  },

  /* ================= ACTIONS ================= */

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  editButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#B8D7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButtonText: {
    color: '#28313C',

    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',

    fontSize: 15,
    lineHeight: 19,
  },

  sendButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#075DB6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonText: {
    color: '#FFFFFF',

    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',

    fontSize: 15,
    lineHeight: 19,
  },

  quotationList: {
    flex: 1,
  },

  footerLoader: {
    marginVertical: 16,
  },

  /* ================= EMPTY ================= */

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 60,
  },

  emptyText: {
    color: '#8A94A3',

    fontFamily: 'BalooBhai2-Regular',

    fontSize: 15,
  },

  /* ================= FLOATING BUTTON ================= */

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
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  quotationCardBanner: {
    width: '100%',
    backgroundColor: '#075DB3',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 16,
  },

  quotationPatternBg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 188,
    height: 188,
    zIndex: 1,
  },

  quotationCardContent: {
    zIndex: 2,
  },

  quotationTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quotationIconTile: {
    width: 42,
    height: 42,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  quotationTextWrap: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 10,
    minWidth: 0,
  },

  quotationTitle: {
    color: '#FFFFFF',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 20,
  },

  quotationSubtitle: {
    marginTop: 8,
    color: '#FFFFFF',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    // opacity: 0.98,
  },

  quotationCtaButton: {
    width: 152,
    height: 38,
    marginTop: 12,
    marginLeft: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quotationCtaButtonText: {
    color: '#2C3139',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  statusTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    gap: 14,
    marginBottom: 16,
  },
  
  statusTab: {
    flex: 1,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#B5D6F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  activeStatusTab: {
    backgroundColor: '#0864B9',
  },
  
  statusTabText: {
    fontSize: 12,
    fontFamily:'BalooBhai2-Regular',
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  
  activeStatusTabText: {
    color: '#FFFFFF',
  },
});

export default styles;