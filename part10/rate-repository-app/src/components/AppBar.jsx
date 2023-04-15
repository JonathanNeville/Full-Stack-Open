import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row"
  },
  text: {
    color: "white"
  },
  flexItem: {
    flexGrow: 1,
    margin: 10
  }
  // ...
});


const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab text="Repositories" />
    </View>
  );
};

export default AppBar;