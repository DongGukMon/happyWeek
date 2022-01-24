
import React,{useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';

import { StackContext } from '../utils/StackContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight=Dimensions.get('screen').height
const screenWidth=Dimensions.get('screen').width

import QRCodeScanner from 'react-native-qrcode-scanner';

export default function QrScan({navigation}:any){

  const [isActivated,setIsActivated] = useState(true)
  const {fullData,setFullData,loadData} = useContext(StackContext)

  const throwAlert = (text:string) =>{
    Alert.alert(
      "",
      text,
      [
        {
          text: "확인",
          onPress: () => {setIsActivated(true)},
        }
      ]
    );
  }

  const notDuple = (volume:string,game:string,total:number,dupleChecker:string) => {
    let tempGame = fullData[volume]['game'].concat(game)
    let tempDupleChecker = fullData[volume]['dupleChecker'].concat(dupleChecker)
    let tempObject = {
      ...fullData,
      total:Number(fullData['total']) + total,
      [volume]:{
        ...fullData[volume], // winningNumber 때문에
        game:tempGame,
        dupleChecker:tempDupleChecker,
        volume:volume
      }
    }
    // setFullData(tempObject)
    AsyncStorage.setItem('lotto',JSON.stringify(tempObject),()=>loadData())
    Alert.alert("등록 완료")
    navigation.goBack()
  }

  const firstSet = async(volume:string,game:string,total:number,dupleChecker:string) =>{
    let responseJSON = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${volume}`).then(res=>res.json())
    if(responseJSON.returnValue !="success"){
      let tempObject = {
        ...fullData,
        total:Number(fullData['total']) + total,
        [volume]:{
          game:game,
          dupleChecker:[dupleChecker],
          volume:volume,
        }
      }
      // setFullData(tempObject)
      AsyncStorage.setItem('lotto',JSON.stringify(tempObject),()=>loadData())
      responseJSON ? Alert.alert("등록 완료!"):Alert.alert("서버로부터 당첨번호는 받아오지 못했습니다.")
      navigation.goBack()
      
    } else {
        let tempObject = {
          ...fullData,
          total:Number(fullData['total']) + total,
          [volume]:{
            game:game,
            dupleChecker:[dupleChecker],
            volume:volume,
            winningNumber:[responseJSON.drwtNo1,responseJSON.drwtNo2,responseJSON.drwtNo3,responseJSON.drwtNo4,responseJSON.drwtNo5,responseJSON.drwtNo6,responseJSON.bnusNo]
          }
        }
        // setFullData(tempObject)
        AsyncStorage.setItem('lotto',JSON.stringify(tempObject),()=>loadData())
        Alert.alert("등록 완료")
        navigation.goBack()
        // console.log(tempObject)   
    }        
  }

  const dataFromQR = (data:any)=>{
    let volume:any = "";
    let game: any = []
    let total:any = ''
    let dupleChecker:any = []

    let lottoData = data.data.split("q");
    lottoData.map((item:any,index:any)=>{
      if(index == 0 ){
        volume = item.slice(-4)
      } else{
        let currentGame = [item.slice(0,2),item.slice(2,4),item.slice(4,6),item.slice(6,8),item.slice(8,10),item.slice(10,12)]
        game.push(currentGame)
      }

      if(index == lottoData.length-1){
        dupleChecker = item.slice(12)
      }
    })
    total = game.length

    return [volume, game, total, dupleChecker]
  }

  const onSuccess = async (data:any) => {
    setIsActivated(false)
    if(data.data.slice(0,24)!="http://m.dhlottery.co.kr"){
      throwAlert("올바른 QR을 입력해주세요.")  
      return
    }

    try {
      //내가 찍은 복권의 정보 가져오는 부분
      const [volume, game, total, dupleChecker] = dataFromQR(data)
      //이번 회차에 다른 복권이 이미 등록되어 있었을 경우
      if(fullData[volume]){
        
        if(!fullData[volume]['dupleChecker'].includes(dupleChecker)){
          //복권 중복 등록이 아닐 때
          notDuple(volume,game,total,dupleChecker)
        
        } else{ //동일한 복권으로 중복 등록할 경우
          navigation.goBack()
          throwAlert("이미 등록한 번호입니다.")
        }

        //이번 회차 등록이 처음일 경우
      } else{ 
          firstSet(volume,game,total,dupleChecker)
      }
    } catch(e:any) {
      console.log(e)
      throwAlert("QR코드 스캔 중 오류가 발생했습니다.")

    }
  }
  
  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={isActivated}
      reactivateTimeout={1000}
      showMarker={true}
      customMarker={<View style={{borderWidth:3, borderColor:'#B8D75B', width:screenWidth*0.7, height:screenWidth*0.7}}/>}
      cameraStyle={{height:screenHeight}}
    />
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1, justifyContent:'center', alignItems:'center'
  }
});