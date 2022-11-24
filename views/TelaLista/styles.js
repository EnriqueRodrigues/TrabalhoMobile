import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({

    painel:{
      paddingTop:10,
      padding:10,
    },
    texto:{
      fontSize:20,
      textAlign:'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#DEDBD8',
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      flex:1,
      backgroundColor: '#BC8F8F',
      padding: 10,
      marginVertical: 8,
      marginLeft:10,
      borderRadius:15
    },
    title: {
      fontSize: 32,
    },
    botoes:{
      paddingTop: 10,
      paddingBottom:10,
      paddingRight:10,
      paddingLeft:5,
      flexDirection:'row',
    },
    card:{
      flexDirection:'row',
    }
  });