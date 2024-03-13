import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Screen/LoginPage';
import SignupPage from './Screen/SignupPage';
import SubmitForm from './Screen/SubmitForm';
import GetForm from './Screen/GetForm';
import { Button } from "@rneui/themed";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: "#2C6BED"},
        headerTitleAlign: 'center',
        headerBackVisible: false,
      }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={SignupPage} />
        <Stack.Screen name="Form" component={SubmitForm} 
        options={{
          headerRight:()=>{
            return(
              <Button title="logout"/>
            )
          }
        }}/>
        <Stack.Screen name="Data" component={GetForm}  options={{
          headerBackVisible: true,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
