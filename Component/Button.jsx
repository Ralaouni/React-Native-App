
import React, { useState } from 'react';

import { View, Text, Alert } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GenerateExcel from '../App/generateExcel';

export default function MyMenu() {


  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const deleteAll =() => {

    Alert.alert(
      '',
      'It is recommended to send an excel before deleting all',  
      [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'Delete', onPress: () => {
          AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => alert('Everything has been deleted'));
          hideMenu
         }},
      ],
      { cancelable: false }
    )


  }



  return (
    <View style={{ height: '5%', alignSelf: 'flex-end', marginTop: 15, position: 'absolute' }}>
      <Menu
        visible={visible}
        anchor={<Text onPress={showMenu}>Show menu</Text>}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu}><GenerateExcel/></MenuItem>
        <MenuItem onPress={hideMenu}>change Time</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={deleteAll}>Delete all</MenuItem>
      </Menu>
    </View>
  );
}