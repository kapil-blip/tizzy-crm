import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets/themes/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
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

  editIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F4F8FC',
  },

  scrollContent: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F4F8FC',
    paddingBottom: 100,
  },
  spacer: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },

  // --------------------------------------------------
  // BANNER
  // --------------------------------------------------

  bannerCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#075DB3',
  },

  bannerGradientTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#5091C5',
    opacity: 0.35,
  },

  bannerContent: {
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },

  bannerCompany: {
    color: COLORS.WHITE,
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
  },

  bannerContact: {
    marginTop: 6,
    color: COLORS.WHITE,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
  },

  bannerMeta: {
    marginTop: 8,
    color: '#E6F1FD',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
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
    marginBottom: 16,
  },

  tab: {
    flex: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  activeTab: {
    backgroundColor: COLORS.WHITE,
    shadowColor: '#5D7FA3',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },

  tabText: {
    color: COLORS.GREY_800,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 18,
  },

  activeTabText: {
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
  },

  // --------------------------------------------------
  // INFO CARDS
  // --------------------------------------------------

  infoCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E6E8EB',
    shadowColor: '#7A8EA8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  cardTitle: {
    color: '#252A34',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
  },

  statusBadge: {
    minHeight: 22,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EDFF',
  },

  statusBadgeText: {
    fontSize: 12,
    color: '#6B5CE7',
    fontFamily: 'BalooBhai2-Regular',
  },

  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addContactText: {
    color: COLORS.PRIMARY,
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },

  infoRow: {
    marginBottom: 14,
  },

  infoLabel: {
    color: COLORS.GREY_400,
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 3,
    textTransform: 'capitalize',
  },

  infoValue: {
    color: COLORS.GREY_800,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 21,
  },

  // --------------------------------------------------
  // PLACEHOLDER TABS
  // --------------------------------------------------

  placeholderWrap: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E8EB',
  },

  placeholderText: {
    color: '#9AA9BF',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  // --------------------------------------------------
  // BOTTOM ACTION BAR
  // --------------------------------------------------

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 16,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: '#E8EDF3',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },

  logCallButton: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#E8F1FB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  logCallText: {
    color: COLORS.GREY_900,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 21
  },

  followUpButton: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  followUpText: {
    color: COLORS.WHITE,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
  },
  // --------------------------------------------------
// FOLLOW-UP DETAIL
// --------------------------------------------------

followUpCard: {
  backgroundColor: COLORS.WHITE,
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#E1E5EA',
  shadowColor: '#7A8EA8',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
},

followUpHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
},

followUpTitle: {
  color: '#2C3139',
  fontFamily: 'BalooBhai2-SemiBold',
  fontWeight: '600',
  fontSize: 20,
  lineHeight: 22,
},

followUpStatusBadge: {
  minHeight: 19,
  paddingHorizontal: 12,
  borderRadius: 5,
  backgroundColor: '#F0EDFF',
  alignItems: 'center',
  justifyContent: 'center',
},

followUpStatusText: {
  color: '#6B5CE7',
  fontFamily: 'BalooBhai2-Regular',
  fontSize: 14,
  lineHeight: 20,
},

followUpField: {
  marginBottom: 30,
},

followUpLabel: {
  color: '#9AA9BF',
  fontFamily: 'BalooBhai2-Regular',
  fontSize: 15,
  lineHeight: 21,
  marginBottom: 8,
},

followUpValue: {
  color: '#4C5060',
  fontFamily: 'BalooBhai2-Medium',
  fontWeight: '500',
  fontSize: 18,
  lineHeight: 26,
},

followUpDateRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

followUpNote: {
  minHeight: 66,
  padding: 10,
  borderRadius: 10,

  backgroundColor: '#F5F9FE',

  borderWidth: 1.5,
  borderColor: '#A8D2FF',

  justifyContent: 'center',
},

followUpNoteText: {
  color: COLORS.GREY_800,
  fontFamily: 'BalooBhai2-Regular',
  fontSize: 14,
  lineHeight: 20,
},

followUpNoteTitle: {
  color: '#1E1E1E',
  fontFamily: 'BalooBhai2-Medium',
  fontWeight: '500',
  fontSize: 14,
  lineHeight: 20,
},
// --------------------------------------------------
// SERVICES
// --------------------------------------------------

serviceCard: {
  backgroundColor: COLORS.WHITE,
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,

  borderWidth: 1,
  borderColor: '#E1E5EA',

  shadowColor: '#7A8EA8',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
},

serviceHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBottom: 24,
},

serviceTitle: {
  color: '#2C3139',
  fontFamily: 'BalooBhai2-SemiBold',
  fontWeight: '600',
  fontSize: 20,
  lineHeight: 26,
},

serviceStatusBadge: {
  minHeight: 19,
  paddingHorizontal: 12,
  borderRadius: 5,
  backgroundColor: '#F0EDFF',
  alignItems: 'center',
  justifyContent: 'center',
},

serviceStatusText: {
  color: '#6B5CE7',
  fontFamily: 'BalooBhai2-Regular',
  fontSize: 14,
  lineHeight: 20,
},

serviceField: {
  marginBottom: 24,
},

serviceLabel: {
  color: '#9AA9BF',
  fontFamily: 'BalooBhai2-Regular',
  fontSize: 15,
  lineHeight: 21,

  marginBottom: 7,
},

serviceValue: {
  color: '#4C5060',
  fontFamily: 'BalooBhai2-Medium',
  fontWeight: '500',
  fontSize: 18,
  lineHeight: 26,
},

serviceRateSection: {
  marginTop: 0,
},

serviceRateRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

rateLeft: {
  flexDirection: 'row',
  alignItems: 'baseline',
  flexShrink: 1,
},

rateValue: {
  color: '#555861',
  fontFamily: 'BalooBhai2-Medium',
  fontWeight: '500',
  fontSize: 20,
  lineHeight: 30,
},

billingCycle: {
  marginLeft: 8,
  color: '#666666',
  fontFamily: 'BalooBhai2-Regular',
  fontSize: 14,
  lineHeight: 20,
},

usersValue: {
  color: '#4C5060',
  fontFamily: 'BalooBhai2-Medium',
  fontWeight: '500',
  fontSize: 18,
  lineHeight: 26,
  marginLeft: 10,
},

  // --------------------------------------------------
  // SERVICES
  // --------------------------------------------------

  serviceBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F4F8FC',
    borderWidth: 1,
    borderColor: '#C9DDF3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 12,
  },

  serviceBoxCell: {
    width: '50%',
    paddingRight: 8,
    marginBottom: 12,
  },

  // --------------------------------------------------
  // DOCUMENTS
  // --------------------------------------------------

  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6E8EB',
    borderRadius: 8,
  },

  documentInfo: {
    flex: 1,
    marginHorizontal: 10,
  },

  documentType: {
    color: COLORS.GREY_800,
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
  },

  documentName: {
    color: COLORS.GREY_400,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 17,
  },

  // --------------------------------------------------
  // RECENT ACTIVITIES
  // --------------------------------------------------

  activityRow: {
    flexDirection: 'row',
  },

  activityIconColumn: {
    alignItems: 'center',
    marginRight: 12,
  },

  activityIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activityLine: {
    flex: 1,
    width: 1,
    minHeight: 16,
    backgroundColor: '#E6E8EB',
  },

  activityContent: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 16,
  },

  activityText: {
    color: COLORS.GREY_800,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
  },

  activityTime: {
    color: COLORS.GREY_400,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 17,
    marginTop: 2,
  },

});

export default styles;
