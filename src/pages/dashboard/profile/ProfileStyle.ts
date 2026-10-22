import { StyleSheet } from 'react-native';
import { COLORS } from '../../../assets/themes/colors';

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
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // --------------------------------------------------
  // HEADER
  // --------------------------------------------------

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.WHITE,
  },

  headerTitle: {
    color: '#2C3139',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  headerIconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4D4F',
    borderWidth: 1.5,
    borderColor: COLORS.WHITE,
  },

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  searchContainer: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E1E5EA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.GREY_800,
    fontFamily: 'BalooBhai2-Regular',
    paddingVertical: 0,
  },

  // --------------------------------------------------
  // PROFILE CARD
  // --------------------------------------------------

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: COLORS.WHITE,
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 30,
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },

  profileName: {
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
  },

  profileMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
    gap: 8,
  },

  profileRole: {
    color: COLORS.GREY_400,
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 16,
    lineHeight: 20,
  },

  empBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#E8F1FB',
  },

  empBadgeText: {
    color: COLORS.PRIMARY,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
  },

  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --------------------------------------------------
  // MENU
  // --------------------------------------------------

  menuList: {
    marginBottom: 28,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  menuIconWrap: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  menuLabel: {
    flex: 1,
    color: '#1E1E1E',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
  },

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  logoutButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#FDECEC',
    borderWidth: 1,
    borderColor: '#F5B8B8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  logoutText: {
    color: '#E04B4B',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
  },
});
