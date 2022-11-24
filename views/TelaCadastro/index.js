import React, { useState } from 'react';
import { Button, Text, TextInput, View, StatusBar, Keyboard} from 'react-native';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { styles} from './styles';


export default function Cadastro({navigation}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [duracao, setDuracao] = useState("");
  const {setItem, getItem} = useAsyncStorage("@salao:servicos");

  async function handleNew(){
    try{

      const id = uuid.v4();
      const novoData={
        id,
        name,
        desc,
        duracao
      }
      const response = await getItem();
      const dataPrevious = response ? JSON.parse(response) : [];
      const data = [...dataPrevious, novoData];

      const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      await  setItem(JSON.stringify(data));
      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso!"
      });
      await delay(2000);
      await navigation. goBack();
      
    }catch(error){
      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar!"
      });
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Adicionar serviço </Text>
      <Text style={styles.Info}>Nome:</Text>
      <TextInput onChangeText={setName} style={styles.input}></TextInput>
      <Text style={styles.Info}>Descrição:</Text>
      <TextInput onChangeText={setDesc} style={styles.input}></TextInput>
      <Text style={styles.Info}>Duração:</Text>
      <TextInput onChangeText={setDuracao} style={styles.input}></TextInput>
      <View style={styles.botoes}>
        <Button onPress={()=>{navigation.goBack()}} color={'red'} title='Cancelar'/>
        <Button onPress={handleNew} color={'green'} title='Salvar'/>
      </View>
      <StatusBar style="auto"/>
      <Toast />
    </View>
  );
}
