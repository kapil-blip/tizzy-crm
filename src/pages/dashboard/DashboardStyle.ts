import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabBar: {
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EDF3',
    paddingTop: 7,
    paddingBottom: 7,
    elevation: 10,
    shadowColor: '#8CA2B8',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  tabBarItem: {
    flex: 1,
  },
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
    textAlign: 'center',
  },
  tabIconWrap: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabScene: {
    backgroundColor: '#F4F8FC',
  },
  tabIconWrapActive: {
    backgroundColor: '#ffffff',
  },
});