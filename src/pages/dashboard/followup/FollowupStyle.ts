import { StyleSheet } from 'react-native';
import { COLORS } from '../../../assets/themes/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  // ---------------------------------------
  // HEADER
  // ---------------------------------------

  header: {
    height: 58,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: '#292D35',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 26,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  headerIcon: {
    width: 26,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E94B73',
    right: 0,
    top: 4,
  },

  headerShadow: {
    height: 1,
    backgroundColor: '#E4EAF1',
    shadowColor: '#5A7898',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },

  // ---------------------------------------
  // SEARCH
  // ---------------------------------------

  topSection: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  searchContainer: {
    flex: 1,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: '#E0E5EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 0,
    marginLeft: 8,
    color: '#3E4652',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 13,
    lineHeight: 18,
  },

  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: '#E0E5EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ---------------------------------------
  // FILTER TABS
  // ---------------------------------------

  filterTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    gap: 8,
  },

  filterTab: {
    height: 32,
    minWidth: 62,
    paddingHorizontal: 17,
    borderRadius: 17,
    backgroundColor: '#BBD9F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeFilterTab: {
    backgroundColor: COLORS.PRIMARY,
  },

  filterTabText: {
    color: '#000000',
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },

  activeFilterTabText: {
    color: COLORS.WHITE,
  },

  // ---------------------------------------
  // LIST
  // ---------------------------------------

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  // ---------------------------------------
  // CARD
  // ---------------------------------------

  followUpCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E7E9EB',
    shadowColor: '#7B91A8',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  nameContainer: {
    flex: 1,
  },

  name: {
    color: '#292D35',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 20,
  },

  company: {
    marginTop: 4,
    color: '#9AA9BF',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 14,
  },

  // ---------------------------------------
  // STATUS
  // ---------------------------------------

  overdueBadge: {
    minWidth: 55,
    height: 20,
    paddingHorizontal: 7,
    borderRadius: 3,
    backgroundColor: '#FFF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  overdueText: {
    color: '#F05C7C',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 12,
  },

  todayBadge: {
    minWidth: 40,
    height: 20,
    paddingHorizontal: 7,
    borderRadius: 3,
    backgroundColor: '#E8FBF6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  todayText: {
    color: '#25BBA2',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 12,
  },

  pendingBadge: {
    minWidth: 52,
    height: 20,
    paddingHorizontal: 7,
    borderRadius: 3,
    backgroundColor: '#FFF9E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pendingText: {
    color: '#E8B04A',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 12,
    lineHeight: 12,
  },

  // ---------------------------------------
  // DIVIDER
  // ---------------------------------------

  divider: {
    height: 1,
    backgroundColor: '#E5E8EC',
    marginTop: 9,
    marginBottom: 9,
  },

  // ---------------------------------------
  // DETAILS
  // ---------------------------------------

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  detailText: {
    marginLeft: 8,
    color: '#666666',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 14,
  },

  dateText: {
    color: COLORS.GREY_900,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
  },

  // ---------------------------------------
  // NOTE
  // ---------------------------------------

  noteBox: {
    marginTop: 6,
    paddingHorizontal: 9,
    paddingVertical: 8,
    minHeight: 64,
    borderRadius: 6,
    backgroundColor: '#F4F8FC',
    borderWidth: 1,
    borderColor: '#A9D3FF',
    justifyContent: 'center',
  },

  noteText: {
    color: '#505665',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 14,
  },

  noteTitle: {
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },

  // ---------------------------------------
  // REMINDER
  // ---------------------------------------

  reminderBox: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 27,
    marginTop: 7,
    borderRadius: 4,
    backgroundColor: '#F7FBFF',
    borderWidth: 1,
    borderColor: '#9CCBFF',
  },

  reminderText: {
    marginLeft: 5,
    color: COLORS.PRIMARY,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 10,
    lineHeight: 14,
  },

  // ---------------------------------------
  // ACTIONS
  // ---------------------------------------

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  secondaryButton: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#BCDAF9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  secondaryButtonText: {
    color: '#28323F',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
  },

  primaryButton: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  primaryButtonText: {
    color: COLORS.WHITE,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
  },

  // ---------------------------------------
  // EMPTY
  // ---------------------------------------

  emptyContainer: {
    paddingTop: 80,
    alignItems: 'center',
  },

  emptyText: {
    color: '#9AA9BF',
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
  },
});

export default styles;