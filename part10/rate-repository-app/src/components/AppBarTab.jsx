import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: "white"
  },
  flexItem: {
    flexGrow: 1,
    margin: 10
  }
  // ...
});


const AppBarTab = (props) => {
  return (
        <Pressable style={styles.flexItem}>
            <Text fontSize="subheading" fontWeight="bold" style={styles.text} >{props.text}</Text>
        </Pressable>
  );
};

export default AppBarTab;