// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AppContext from '../../../context/context';

const CustomSidebarMenu = (props) => {
const {theme} = useContext(AppContext)
const styles = StyleSheet.create({
  constainer : {
    flex : 1
  },
  darkContainer : {
    flex : 1,
    backgroundColor : "black",
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText : {
      textAlign: "center",
      fontWeight: "bold"
  },
  darkUserText : {
    textAlign: "center",
    fontWeight: "bold",
    color : theme ? "white" : "black"
}
});
  return (
    <SafeAreaView style={theme ? styles.darkContainer : styles.constainer}>
      {/*Top Large Image */}
      <Image
        source={{uri: props.userPhoto}}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={theme ? styles.darkUserText : styles.userText}>{props.userName}</Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        Ballin {new Date().getFullYear()}®
      </Text>
    </SafeAreaView>
  );
};


export default CustomSidebarMenu;