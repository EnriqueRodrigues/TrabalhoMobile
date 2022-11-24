
import { Button, StyleSheet, View, Text } from 'react-native';

export default function Iniciar({ navigation }) {
  return (
    <View style={styles.container}>
        <Button title='Entrar' color={'#420420'} onPress={()=> navigation.navigate('Serviços')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    padding:10,
    backgroundColor:'#DEDBD8'
  },
});