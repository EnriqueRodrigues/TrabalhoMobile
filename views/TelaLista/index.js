import { Button, FlatList, SafeAreaView, StyleSheet, Text, View ,StatusBar} from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import { useState , useCallback} from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import Toast from 'react-native-toast-message';

const {getItem, setItem} = useAsyncStorage("@salao:servicos");

export default function Listaservico() {

  const [dados, setData] = useState('');

  async function handleData(){
    const response = await getItem();
    const data = response ? JSON.parse(response): [];
    setData(data);
  };

  async function handleDelete(id){
    const response = await getItem();
    const dataPrevious = response ? JSON.parse(response) : [];
    const data = dataPrevious.filter((item) => item.id !== id)
    setItem(JSON.stringify(data));
    setData(data);

    Toast.show({
      type: 'success',
      text1: 'Excluido com Sucesso!'
    });
  }

  useFocusEffect(useCallback(()=>{
    handleData();
  },[]));

  const navigation = useNavigation();
  const renderItem = ({item})=>(
  <View style={styles.card}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.duracao}</Text>
    </View>
    <View style={styles.botoes}>
        <Button onPress={()=> navigation.navigate('Editar', {item})} title='Editar'/>      
        <Button color={'red'} onPress={()=> handleDelete(item.id)} title='Excluir'/>
      </View>
  </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={dados}
        renderItem={renderItem}
        keyExtractor={servico=>servico.id.toString()}
        ListFooterComponent={Cadastrar}
        ListEmptyComponent={NenhumServico}
      />
      <Toast/>
    </SafeAreaView>
    
  );
}

function NenhumServico(){
  return(
    <View style={styles.painel}>
      <Text style={styles.texto}>Nenhum serviço cadastrado!</Text>
    </View>
  )
}

function Cadastrar(){
  const navigation = useNavigation();
  return(
    <View style={styles.painel}>
      <Button color={'#420420'} title='Cadastrar Novo Serviço' 
      onPress={()=> navigation.navigate('Cadastro')}/>
    </View>
  )
}


