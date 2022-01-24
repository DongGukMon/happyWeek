
import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  LogBox,
  Alert
} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreAllLogs()

import { NavigationContainer } from '@react-navigation/native';
import Home from './screen/Home'
import QrScan from './screen/QrScan';
import History from './screen/History';
import Details from './screen/Details';

import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack';
import {StackContext} from './utils/StackContext'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PushNotification from "react-native-push-notification";

const Stack = createStackNavigator();

PushNotification.createChannel(
  {
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
   
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

const App = () => {

  const [fullData, setFullData] = useState({total:0})
  const [selectedData, setSelectedData] = useState()
  const [thisVol,setThisVol] = useState<any>()
  const [winningData,setWinningData] = useState<any>({})

  const [homeModalVisible,setHomeModalVisible] = useState<any>(false)
  const [detailsModalVisible,setDetailsModalVisible] = useState<any>(false)

  const [buttonIcon,setButtonIcon] = useState<any>(true)

  const standardDate:any = new Date('2022-01-22T20:35:00')
 
  const isWinning = (winning:any,my:any) =>{
    let count = 0
    let main = winning.slice(0,6)
    my.map((item:any)=>{
      if(main.includes(item)){
        count = count + 1
      }
    })
    switch(count){
      case 3:
        return 5;
      case 4:
        return 4;
      case 5:
        if(my.includes(winning[6])){
          return 2;
        }else{
          return 3;
        }
      case 6:
        return 1;
      default:
        return 6;
    }
  }

  const throwAlert = () =>{
    Alert.alert(
      "기록 삭제",
      "한번 지우면 다시는 복구할 수 없습니다. 모든 기록을 삭제하시겠습니까?",
      [
        {
        text: "아니요",
        onPress: () => {},
        },
        {
          text: "예",
          onPress: () => {AsyncStorage.clear(),setFullData({total:0})},
        }
      ]
    );
  }

  const loadData = ()=>{
    setWinningData({})
    AsyncStorage.getItem('lotto').then((result:any)=>{
      if(result != null){
        let storageData = JSON.parse(result)
        
        let tempObject:any = {}
        setFullData(JSON.parse(result))

        Object.values(storageData).map((item:any)=>{
          let higherScore = 6
          item.winningNumber && item.game.map((currentGame:any)=>{
            let thisScore = isWinning(item.winningNumber,currentGame) 
            higherScore > thisScore && (higherScore = thisScore)
          })
          item.volume && (tempObject[item.volume] = higherScore)
        })
        setWinningData({
          ...tempObject
        })
      }
    })
  }

  useEffect(()=>{
    loadData()

    const addValue = Math.floor((Date.now()-standardDate)/604800000)
    setThisVol(0+JSON.stringify(999+addValue))

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "My Notification Message", // (required)
      title:"hi",
      channelId:"channel-id",
      date: new Date(Date.now()+5*1000)
      
      /* Android Only Properties */
    
    });
  },[])

  return (
    <StackContext.Provider value={{fullData,setFullData,selectedData,setSelectedData,thisVol,loadData,winningData,homeModalVisible,setHomeModalVisible,detailsModalVisible,setDetailsModalVisible}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false , headerRight: ()=>{
            return <View style={styles.headerTwoButton}>
                <TouchableOpacity  onPress={()=>{buttonIcon && Alert.alert("알람을 켜놓으면 매주 토요일 추첨 이후 알림을 보내드립니다."),setButtonIcon(!buttonIcon)}}>
                    {buttonIcon ?<Icon name="bell-ring" size={27} color="black" />:<Icon name="bell-outline" size={30} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setHomeModalVisible(true)}>
                    <Icon name="alert-circle-outline" size={30} color="black" />
                </TouchableOpacity>
              </View>
            }
          }}/>
          <Stack.Screen name="History" component={History} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false, headerRight: ()=>{
            return <TouchableOpacity style={styles.headerButton} onPress={()=>{throwAlert()}}>
                    <Icon name="delete-empty-outline" size={30} color="black" />
                </TouchableOpacity>
            }}} />
          <Stack.Screen name="Details" component={Details} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false, headerRight: ()=>{
            return <TouchableOpacity style={styles.headerButton} onPress={()=>{setDetailsModalVisible(true)}}>
                    <Icon name="help-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            }}} />
          <Stack.Screen name="QrScan" component={QrScan} options={{headerTintColor:'#B8D75B', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false}} />
          
      </Stack.Navigator>
      </NavigationContainer>
    </StackContext.Provider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:'center', 
    alignItems:'center'
  },
  headerTwoButton:{
    marginTop:20,
    marginRight:10,
    borderRadius:15, 
    height:40,
    width:75, 
    justifyContent:'space-around', 
    alignItems:'center',
    flexDirection:'row',
  },
  headerButton:{
    marginTop:20,
    marginRight:10,
    borderRadius:15, 
    height:40,
    width:40, 
    justifyContent:'space-around', 
    alignItems:'center',
  }
});

export default App;
