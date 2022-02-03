
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
  Alert,
  Platform
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

import SplashScreen from 'react-native-splash-screen'

import { ToastProvider } from 'react-native-toast-notifications'

const Stack = createStackNavigator();

PushNotification.createChannel(
  {
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
   
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
   permissions: {
       alert: true,
       badge: true,
       sound: true,
   },
   popInitialNotification: true,
   requestPermissions: true,
});

const App = () => {

  const [fullData, setFullData] = useState({total:0})
  const [selectedData, setSelectedData] = useState()
  const [thisVol,setThisVol] = useState<any>()
  const [winningData,setWinningData] = useState<any>({})

  const [homeModalVisible,setHomeModalVisible] = useState<any>(false)
  const [detailsModalVisible,setDetailsModalVisible] = useState<any>(false)

  const [allowNotification,setAllowNotification] = useState(true)

  const standardDate:any = new Date('2022-01-29T20:50:00')
  const addValue = Math.floor((Date.now()-standardDate)/604800000)
 
  const isWinning = (winning:any,my:any) =>{
    let myToNumber = my.map(Number)
    let count = 0
    let main = winning.slice(0,6)
    myToNumber.map((item:any)=>{
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
        if(myToNumber.includes(winning[6])){
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
          onPress: () => {AsyncStorage.removeItem('lotto'),setFullData({total:0})},
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

  const weeklyNotification = ()=>{
    let tempDate = standardDate
    PushNotification.localNotificationSchedule({
    
      //... You can use all the options from localNotifications
      title:"번호 맞춰보러 가시죠!",
      message: "상금은 어디에 쓸지 생각해보셨나요?",
      color:"#81C6EE",
      largeIcon:"",
      channelId:"channel-id",
      allowWhileIdle:true,
      
      // 아직 오지않은 토요일 추첨시간
      date: new Date(tempDate.setDate(tempDate.getDate()+(addValue+1)*7))
      // date: new Date(Date.now()+20*1000)
      
      /* Android Only Properties */
    
    });
  }

  const cancelNotification=()=>{
    Alert.alert("알람을 켜놓으면 매주 토요일 추첨 이후 알림을 보내드립니다.")
    PushNotification.cancelAllLocalNotifications()
  }

  const restartNotification=()=>{
    PushNotification.getScheduledLocalNotifications((item:any)=>{
      //현재 실행중인 알림이 없으면 알림 재시작
      item.length == 0 && weeklyNotification()
    })
  }

  useEffect(()=>{

    loadData()
    
    setThisVol(JSON.stringify(1000+addValue))

    //스플래시 숨기기
    setTimeout(() => { SplashScreen.hide(); }, 1500)

    //notification 활성화 여부 판단
    AsyncStorage.getItem('notification').then((notificationState:any)=>{
      //최초 실행일 경우
      if (notificationState == null) {
        //true로 초기값 설정 후 푸시 예약 걸어놓기
        AsyncStorage.setItem('notification',JSON.stringify(true)).then(()=>{
          weeklyNotification()
        })
        //최초 실행이 아닐경우
      } else{ 
        //true일 때 현재 진행중인 push가 없으면 푸시 재실행 (문제점. 사용자가 앱을 안키면 재등록을 할수가 없다. 일주일에 한번은 접속하셔야할텐데)
        //false일 때 아이콘을 outline으로 바꾼다.
        JSON.parse(notificationState) ? restartNotification(): setAllowNotification(false)
      }
    })

  },[])

  return (
    <ToastProvider offsetBottom={40} successColor="#81C6EE">
      <StackContext.Provider value={{fullData,setFullData,selectedData,setSelectedData,thisVol,loadData,winningData,homeModalVisible,setHomeModalVisible,detailsModalVisible,setDetailsModalVisible}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerTintColor:'black', title:"", headerTransparent:true, headerStyle:{}, headerBackTitleVisible:false , headerRight: ()=>{
              return <View style={styles.headerTwoButton}>
                  <TouchableOpacity  onPress={()=>{
                    //알람을 끌때는 등록해놓은 푸시 삭제, 알람을 켤때는 푸시 활성화
                    allowNotification ? cancelNotification() : weeklyNotification(),
                    //스토리지에 현재 상태 입력
                    AsyncStorage.setItem('notification',JSON.stringify(!allowNotification))
                    //알림 설정 상태에 맞춰 아이콘 모양 변경
                    setAllowNotification(!allowNotification)
                    }}>
                    
                    {allowNotification ?<Icon name="bell-ring" size={27} color="black" />:<Icon name="bell-outline" size={30} color="black" />}
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
    </ToastProvider>
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
