import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

export default function MenuIcone() {
  return createDrawerNavigator({
    Accueil: {
      screen: () => (
        <View>
          <Text>Contenu de l'écran Accueil</Text>
        </View>
      ),
    },
    Profil: {
      screen: () => (
        <View>
          <Text>Contenu de l'écran Profil</Text>
        </View>
      ),
    },
  });
}
