import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
    backgroundColor: '#F4F8FC',
  },

  content: {
    paddingHorizontal: 17,
    paddingTop: 16,
    paddingBottom: 30,
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

  /* =========================
     HEADER
  ========================= */

  header: {
    height: 55,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingBottom: 9,
    shadowColor: '#B8C9DB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    zIndex: 10,
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#CC0808',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 23,
    lineHeight: 27,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  greetingContainer: {
    marginLeft: 15,
    flex: 1,
  },

  greeting: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: '#A1ACBD',
  },
  headerIconWrap: {
    position: 'relative',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    marginTop: 4,
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
    color: '#2C3139',
  },
  notificationBadge: {
    position: 'absolute',
    // top: -2,
    // right: -6,
    marginLeft: 25,
    marginBottom: 25,
    minWidth: 20,
    height: 20,
    // paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: '#FF4D4F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    fontFamily: 'BalooBhai2-SemiBold',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },

  headerButton: {
    width: 30,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerNotificationDot: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF4D7A',
    right: -1,
    top: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  /* =========================
     SEARCH
  ========================= */

  searchContainer: {
    height: 42,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E1E6EC',
    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 13,
    marginBottom: 21,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,

    paddingVertical: 0,

    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 18,

    color: '#30343B',
  },

  /* =========================
     SECTION HEADER
  ========================= */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 11,
    marginTop: 0,
  },

  sectionTitle: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '600',
    color: '#0F1724',
  },

  viewAll: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    color: '#0355AC',
    textDecorationLine: 'underline',
  },

  /* =========================
     TODAY SUMMARY
  ========================= */

  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    marginBottom: 19,
  },

  summaryCard: {
    width: '48.6%',
    height: 130,

    backgroundColor: '#FFFFFF',
    borderRadius: 10,

    paddingHorizontal: 17,
    paddingTop: 16,
    paddingBottom: 12,

    marginBottom: 9,

    shadowColor: '#A8BCD1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 7,

    elevation: 3,
  },

  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,

    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryValue: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#444444',
    marginTop: 8,
  },

  summaryLabel: {
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    includeFontPadding: false,
    color: '#4C4C5C',
    marginTop: 8,
  },

  /* =========================
     TASK OVERVIEW
  ========================= */

  taskContainer: {
    marginBottom: 20,
  },

  taskRow: {
    // minHeight: 48,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 8,
    shadowColor: '#A8BCD1',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 2,
  },

  taskIcon: {
    width: 38,
    height: 38,
    borderRadius: 9,

    alignItems: 'center',
    justifyContent: 'center',
  },

  taskTitle: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 18,
    lineHeight: 21,
    color: '#1E1E1E',
  },

  taskValue: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 0,
    includeFontPadding: false,
    color: '#444444',
    paddingRight: 9,
  },

  /* =========================
     QUICK ACTION
  ========================= */

  quickActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 24,
  },

  quickAction: {
    width: '23%',
    alignItems: 'center',
  },

  quickActionIcon: {
    width: 61,
    height: 61,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#9FCBFF',

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 5,
  },

  quickActionTitle: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 17,

    color: '#596071',

    textAlign: 'center',
  },

  quickActionSubtitle: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 17,

    color: '#596071',

    textAlign: 'center',
  },

  /* =========================
     TEAM PERFORMANCE
  ========================= */

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  filterButton: {
    height: 32,
    borderRadius: 18,
    backgroundColor: '#C2DEFA',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  filterButtonActive: {
    backgroundColor: '#0565B8',
  },

  filterText: {
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    includeFontPadding: false,
    color: '#000000',
  },

  filterTextActive: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 16,

    color: '#FFFFFF',
  },

  teamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 8,
    shadowColor: '#A8BCD1',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 7,
    elevation: 3,
  },

  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  teamAvatar: {
    width: 39,
    height: 39,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },

  teamAvatarText: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',

    color: '#FFFFFF',
  },

  teamInfo: {
    flex: 1,

    marginLeft: 12,
  },

  teamName: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '500',

    color: '#30343B',
  },

  teamDesignation: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 17,

    color: '#9BA9BD',

    marginTop: 1,
  },

  topBadge: {
    backgroundColor: '#FFB83E',

    borderRadius: 4,

    paddingHorizontal: 9,
    paddingVertical: 3,

    alignSelf: 'flex-start',
  },

  topBadgeText: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',

    color: '#FFFFFF',
  },

  performanceRow: {
    height: 57,
    backgroundColor: '#F5F8FC',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },

  performanceItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  performanceValue: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    includeFontPadding: false,
    color: '#1E1E1E',
  },

  performanceLabel: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 10,
    lineHeight: 13,

    color: '#9BA9BD',

    marginTop: 1,
  },

  /* =========================
     RECENT ACTIVITIES
  ========================= */

  activitiesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 11,
    shadowColor: '#A8BCD1',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 7,
    elevation: 3,
  },

  activityRow: {
    flexDirection: 'row',

    minHeight: 61,
  },

  activityIconContainer: {
    width: 39,

    alignItems: 'center',
  },

  activityIcon: {
    width: 33,
    height: 33,

    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 2,
  },

  activityLine: {
    position: 'absolute',

    top: 33,
    bottom: -1,

    width: 1,

    backgroundColor: '#E1E8F0',
  },

  activityContent: {
    flex: 1,

    paddingLeft: 9,
    paddingTop: 1,
  },

  activityTitle: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 15,
    lineHeight: 20,

    color: '#3F4652',
  },

  activityTime: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 11,
    lineHeight: 15,

    color: '#9BA9BD',

    marginTop: 2,
  },

  bottomSpace: {
    height: 10,
  },
});