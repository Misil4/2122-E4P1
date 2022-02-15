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
    flex : 1,
    backgroundColor : "#F5F5F5"
  },
  darkContainer : {
    flex : 1,
    backgroundColor : "#232322",
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
      fontFamily : "Gotham-Black"
  },
  darkUserText : {
    textAlign: "center",
    fontFamily : "Gotham-Black",
    color : theme ? "#F5F5F5" : "#232322"
}
});
  return (
    <SafeAreaView style={theme ? styles.darkContainer : styles.constainer}>
      <View style ={{bottom : 10}}>
      {/*Top Large Image */}
      <Image
        source={{uri: props.userPhoto}}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={theme ? styles.darkUserText : styles.userText}>{props.userName}</Text>
      </View>
      <DrawerContentScrollView style={{top : 25}} {...props}>
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