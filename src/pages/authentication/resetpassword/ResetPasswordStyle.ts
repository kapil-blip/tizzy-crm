import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../../assets/themes/colors'

const { height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
  },
  content: {
    flexGrow: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  otpHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: height*0.3,
  },
  title: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    // marginTop: 10,
    color: '#9BA6B7',
    fontSize: 14,
    fontFamily: 'BalooBhai2-Regular',
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'center',
  },
  form: {
    marginTop: 6,
  },
  label: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: COLORS.GREY_800,
    marginBottom: 8,
  },
  required:{
    color:COLORS.ERROR,
  },
  input: {
    width: '100%',
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 14,
    marginBottom:5
  },
  inputFilled: {
    borderColor: '#9BA6B7',
  },
  inputEmpty: {
    borderColor: '#E7E9EB',
  },
  inputTextFilled: {
    color: '#4C4C5C',
  },
  inputTextEmpty: {
    color: '#9BA6B7',
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    height: 48,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  submitText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: 'BalooBhai2-Medium',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
  },
  footerRow: {
    marginTop: 25,
    alignItems: 'center',
  },
  footerText: {
    color: '#9BA6B7',
    fontSize: 16,
    fontFamily: 'BalooBhai2-Regular',
  },
  footerLink: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontFamily: 'BalooBhai2-Medium',
    textDecorationLine: 'underline',
  },
  // otpHeader: {
  //   alignItems: 'center',
  //   marginBottom: 30,
  // },
  otpTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 8,
    fontFamily: 'BalooBhai2-Medium',
    lineHeight: 32,
  },
  otpSubtitle: {
    color: '#9BA6B7',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'BalooBhai2-Regular',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  otpWrapper: {
    flex: 1,
    minHeight: height * 0.82,
    justifyContent: 'space-between',
    marginTop: height*0.05,
  },
  otpCenterContent: {
    flex: 1,
    justifyContent: 'center',
  },
  otpEmailText: {
    textAlign: 'center',
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
  },
  otpLabel: {
    color: '#9BA6B7',
    fontSize: 16,
    fontFamily: 'BalooBhai2-Regular',
    marginBottom: 10,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  otpInput: {
    width: 55,
    height: 53,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'BalooBhai2-Medium',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0,
    color: '#000000',
    backgroundColor: '#F5F8FC',
  },
  otpInputEmpty: {
    borderColor: '#187BE4',
  },
  otpInputFilled: {
    borderColor: '#187BE4',
  },
  otpInputError: {
    borderColor: '#c62828',
  },
  otpErrorText: {
    color: '#c62828',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 13,
  },
  otpCopyrightWrap: {
    marginTop: height * 0.32
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    height: 44,
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  passwordIconButton: {
    marginRight: 2,
  },
  passwordHint: {
    color: '#9BA6B7',
    fontSize: 12,
    fontFamily: 'BalooBhai2-Regular',
    fontWeight: '400',
    lineHeight: 16,
    marginTop: -4,
    marginBottom: 12,
  },
  copyrightText: {
    textAlign: 'center',
    color: '#9BA6B7',
    fontSize: 14,
    fontFamily: 'BalooBhai2-Regular',
    marginBottom: height * 0.03,
  },
  snackbarWrap: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  snackbar: {
    backgroundColor: '#EA5353',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4,
  },
  snackbarText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
})
