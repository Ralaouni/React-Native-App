
import { StyleSheet, Text, View } from 'react-native';

import Functions from './Component/Function';



export default function App() {
  
  return (
    <View style={styles.container}>
    
        <Text style={styles.sectionTitle}>Shifter Pro</Text>

        <Functions/>
        
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
  sectionTitle: {
    marginTop:20,
    marginBottom:20,
    textAlign:'center',
    fontSize: 20,
  },
});
