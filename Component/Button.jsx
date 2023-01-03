
import React, { useState } from 'react';

import { View, Text, Alert } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GenerateExcel from '../App/generateExcel';

import Functions from './Function';

export default function MyMenu() {

  Functions


  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const deleteAll =() => {

    Alert.alert(
      '',
      'Il est recommandé de générer un fichier excel avant de tout supprimer',  
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
    <View style={{ height: '5%', alignSelf: 'flex-end', marginTop: 22, position: 'absolute', paddingRight: 15 }}>
      <Menu
        visible={visible}
        anchor={<Text onPress={showMenu}>Menu</Text>}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu}><GenerateExcel/></MenuItem>
        <MenuItem onPress={hideMenu}>Reset les shift d'aujourd'hui</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={deleteAll}>Delete all</MenuItem>
      </Menu>
    </View>
  );
}