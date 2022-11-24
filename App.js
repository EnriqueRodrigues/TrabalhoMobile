import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import lista from './views/TelaLista/index';
import cadastro from './views/TelaCadastro/index';
import inicio from './views/TelaInicio/index';
import editar from './views/TelaEditar/index';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={inicio}/>
        <Stack.Screen name="Serviços" component={lista}/>
        <Stack.Screen name="Cadastro" component={cadastro}/>
        <Stack.Screen name="Editar" component={editar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}