
import React,{useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackContext } from '../utils/StackContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height > 700 ? Dimensions.get('screen').height : 800;

let higherScore = 6

export default function Details(){

  const {selectedData,thisVol,fullData,setSelectedData,loadData,setFullData} = useContext(StackContext)

  const returnBallColor = (ball:any) =>{
    let number =Number(ball)
    switch(true){
      case (number<11):
        return "#F2C643";
      case (number<21):
        return "#81C6EE";
      case (number<31):
        return "#EE7A76";
      case (number<41):
        return "#AAAAAA";
      default:
        return "#B8D75B"; 
  }}

  //이거 테스트 한번 해봐야됨
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
        higherScore > 5 && (higherScore = 5)
        return '#AAAAAA';
      case 4:
        higherScore > 4 && (higherScore = 4)
        return '#F2C643';
      case 5:
        if(my.includes(winning[6])){
          higherScore > 2 && (higherScore = 2)
          return '#B8D75B';
        }else{
          higherScore > 3 && (higherScore = 3)
          return '#EE7A76';
        }
      case 6:
        higherScore = 1
        return '#81C6EE';
      default:
        return 'rgb(250,250,250)';
    }
  }

  const loadWinningData =async()=>{
    let responseJSON = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${selectedData.volume}`).then(res=>res.json())
    if(responseJSON.returnValue =="success"){
      setSelectedData({
        ...selectedData,
        winningNumber:[responseJSON.drwtNo1,responseJSON.drwtNo2,responseJSON.drwtNo3,responseJSON.drwtNo4,responseJSON.drwtNo5,responseJSON.drwtNo6,responseJSON.bnusNo]
      })

      let tempObject ={
        ...fullData,
        [selectedData.volume]:{
          ...fullData[selectedData.volume],
          winningNumber:[responseJSON.drwtNo1,responseJSON.drwtNo2,responseJSON.drwtNo3,responseJSON.drwtNo4,responseJSON.drwtNo5,responseJSON.drwtNo6,responseJSON.bnusNo]
        }
      }

      AsyncStorage.setItem('lotto',JSON.stringify(tempObject),()=>{loadData()})
      
  }}


  const withoutWinningData = () =>{
    if(selectedData.volume == Number(thisVol)+1){
      return(
      <View style={styles.container}>
        <Text style={styles.withoutWinningStyle}>이번에는 느낌이 좋다</Text>
      </View>
      )
    }else{
      return(
        <View style={{...styles.withoutWinningContainer}}>
          <Text style={{...styles.withoutWinningStyle, paddingHorizontal:10}}>추첨 결과 다시 받아오기</Text>
          <TouchableOpacity style={{height:screenHeight*0.06,width:screenHeight*0.06, backgroundColor:'tomato'}} onPress={()=>loadWinningData()}>

          </TouchableOpacity>
        </View>
    )}
  }

 
  const rend_item = (item:any,index:any) =>{
    let grade = isWinning(selectedData.winningNumber,item.item)
    let condition = (grade =='#B8D75B') ? selectedData.winningNumber: selectedData.winningNumber.slice(0,6)

    return (
    <View key={index} style={{...styles.itemContainer, height: screenHeight <= 800 ? screenHeight*0.09 : screenHeight*0.1, backgroundColor:grade}}>
      {item.item.map((myBall:any)=>{
        return <View style={{...styles.lottoBallStyle,width:screenWidth*0.13,height:screenWidth*0.13,marginHorizontal:screenWidth*0.008, backgroundColor:condition.includes(Number(myBall)) ? returnBallColor(myBall):'rgb(250,250,250)'}}>
          <Text style={{...styles.lottoNumber, color: condition.includes(Number(myBall)) ? 'white' : 'rgb(70,70,70)'}}>{myBall}</Text>
        </View>
      
      })}
    </View>)
  }

  // useEffect(()=>{
  //   setSelectedData({"dupleChecker": "1846335928", "game": [[1,3,9,14,18,28]], "volume": "0999", "winningNumber": [1, 3, 9, 14, 18, 28,25]})
  // },[])

  return (
    <ImageBackground style={{flex:1}} source={require('../assets/backgroundImage.png')}>
      <SafeAreaView style={{flex:1}}>

      <View style={{height: screenHeight ==800 ? screenHeight*0.06 : screenHeight*0.07}}/>

      <View style={{height:screenHeight*0.07, justifyContent:'center'}}>
        <Text style={styles.detailTitle}>{Number(selectedData.volume)}회차 당첨번호</Text>
      </View>
      
      <View style={{...styles.winningContainer, height: screenHeight*0.09}}>
        {selectedData.winningNumber ? selectedData.winningNumber.map((winningNumber:any,index:any)=>{
          return(
            <View style={styles.ballContainer}>
              <View style={{...styles.lottoBallStyle,width:screenWidth*0.11,height:screenWidth*0.11,marginHorizontal:screenWidth*0.005, backgroundColor:returnBallColor(winningNumber)}}>
                <Text style={styles.lottoNumber}>{winningNumber}</Text>
              </View>
              {index ==5 && <View style={{...styles.container, width:screenWidth*0.1,height:screenWidth*0.11}}>
                <Text style={styles.addStyle}>+</Text>
              </View>}
            </View>
          )
        }) : withoutWinningData()
      }
      </View>

      <View style={{...styles.myContainer, height: screenHeight*0.6, marginTop: screenHeight*0.05}}>
        <FlatList
         data={selectedData.game}
         // data={testArr}
         renderItem={rend_item}
        //  keyExtractor={(index:any) => index}
         contentContainerStyle={{paddingHorizontal:15,paddingVertical:15}}
         />
      </View>

      <View style={{height:screenHeight*0.1, backgroundColor:'white'}}/>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent:'center', alignItems:'center'
  },
  detailTitle:{
    color:'black',
    fontSize:24,
    fontWeight:'bold',
    paddingLeft:20,
    letterSpacing:1
  },
  winningContainer:{
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation:3
  },
  ballContainer:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center'
  },
  lottoBallStyle:{
    borderRadius:30, 
    justifyContent:'center', 
    alignItems:'center',
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation:3
  },
  lottoNumber:{
    textAlign:'center',
    fontWeight:'bold',
    color:'white',
    fontSize:16,
  },
  shadowStyle:{
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation:3
  },
  addStyle:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    color:'rgb(255,255,255)',
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation:3
  },
  myContainer:{
    backgroundColor:'white', 
    borderTopRightRadius:15, 
    borderTopLeftRadius:15,
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation:3
  },
  itemContainer:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center',
    marginVertical:5, 
    borderRadius:15,
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation:3
  },
  withoutWinningStyle:{
    fontSize:18,
    color:'rgb(70,70,70)',
    fontWeight:'bold'
  },
  withoutWinningContainer:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignContent:'center', 
    alignItems:'center'
  }
});