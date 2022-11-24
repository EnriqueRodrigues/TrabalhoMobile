import React, { useState } from 'react';
import { Button, Text, TextInput, View, StatusBar, Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { styles} from './styles'


export default function Editar({route,navigation}) {

    const [id] = useState(route.params.item.id);
    const [name, editName] = useState(route.params.item.name);
    const [desc, editDesc] = useState(route.params.item.desc);
    const [duracao, editDuracao] = useState(route.params.item.duracao);
    const {setItem, getItem} = useAsyncStorage("@salao:servicos");

    async function handleUpdate(){
        try{

        const response = await getItem();
        const data = response ? JSON.parse(response) : [];
       
        const novoDado = data.filter(s =>{
            if(s.id === id){
                s.name = name
                s.desc = desc
                s.duracao = duracao
            }
            return s;
        })
        

        const delay = ms => new Promise(
            resolve => setTimeout(resolve, ms)
        );

        await  setItem(JSON.stringify(novoDado));
        console.log(novoDado);
        Toast.show({
            type: "success",
            text1: "Editado com sucesso!"
        });
        await delay(2000);
        await navigation.goBack();

        }catch(error){
        Toast.show({
            type: "error",
            text1: "Não foi possível editar!"
        });
        console.log(error);
        }
    }

    return (
        <View style={styles.container}>
        <Text style={styles.titulo}> Editar serviço </Text>
        <Text style={styles.Info}>Nome:</Text>
        <TextInput onChangeText={editName} value={name} style={styles.input}></TextInput>
        <Text style={styles.Info}>Descrição:</Text>
        <TextInput onChangeText={editDesc} value={desc} style={styles.input}></TextInput>
        <Text style={styles.Info}>Duração:</Text>
        <TextInput onChangeText={editDuracao} value={duracao} style={styles.input}></TextInput>
        <View style={styles.botoes}>
            <Button onPress={()=>{navigation.goBack()}} color={'red'} title='Cancelar'/>
            <Button onPress={handleUpdate} color={'green'} title='Salvar'/>
        </View>
        <StatusBar style="auto"/>
        <Toast />
        </View>
    );
}
