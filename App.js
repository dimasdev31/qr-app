import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Wrapper  from './src/components/layout';

import Layout from "./src/views/main/index";
import Scanner from "./src/views/scanner/index";
import OutputQr from "./src/views/output-qr/index";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from 'react-native-elements';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Layout}
          options={({ navigation }) => ({   
            title: 'Home',
            headerRight: () => (
              <View style={{flexDirection: "row", justifyContent: "flex-end", paddingRight:10}}>
                <TouchableOpacity
                  onPress={() => navigation.push('CameraQrScanner')}         
                >
                    <Icon
                      name="qrcode-scan"
                      size={24}
                      color="black"
                    />
                </TouchableOpacity>                
              </View>
            ),
             
            })} 
          />
          <Stack.Screen 
            name="CameraQrScanner" 
            component={Scanner} 
            options={() => ({
              title: 'Qr Code Scanner'
            })}
          />
          <Stack.Screen 
            name="OutputQr" 
            component={OutputQr} 
            options={() => ({
              title: 'Qr Code'
            })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
