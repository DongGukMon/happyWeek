
import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Home from './screen/Home'
import QrScan from './screen/QrScan';
import History from './screen/History';
import Details from './screen/Details';

import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack';
import {StackContext} from './utils/StackContext'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {

  const [fullData, setFullData] = useState({total:0})
  const [selectedData, setSelectedData] = useState()
 
  useEffect(()=>{
    AsyncStorage.getItem('lotto').then((result:any)=>{
      if(result != null){
        setFullData(JSON.parse(result))
      }
    })

    async () =>{
    let responseJSON = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1000`)
    .then(res=>res.json())
    console.log(responseJSON)
  }

  },[])

  return (
    <StackContext.Provider value={{fullData,setFullData,selectedData,setSelectedData}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false , headerRight: ()=>{
            return <TouchableOpacity style={{backgroundColor:'tomato', marginTop:20,marginRight:20,borderRadius:15, height:40,width:40, justifyContent:'center', alignItems:'center'}} onPress={()=>{}}>
                    
                </TouchableOpacity>
            }
          }}/>
          <Stack.Screen name="History" component={History} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false, headerRight: ()=>{
            return <TouchableOpacity style={{backgroundColor:'tomato', marginTop:20,marginRight:20,borderRadius:15, height:40,width:40, justifyContent:'center', alignItems:'center'}} onPress={()=>{AsyncStorage.clear(),setFullData({total:0})}}>
                    
                </TouchableOpacity>
            }}} />
          <Stack.Screen name="Details" component={Details} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false}} />
          <Stack.Screen name="QrScan" component={QrScan} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false}} />
          
      </Stack.Navigator>
      </NavigationContainer>
    </StackContext.Provider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1, justifyContent:'center', alignItems:'center'
  }
});

export default App;
