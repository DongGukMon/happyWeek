
import React,{useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { StackContext } from '../utils/StackContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height > 700 ? Dimensions.get('screen').height : 800;

export default function History({navigation}:any){

  const {fullData,setSelectedData,thisVol} = useContext(StackContext)

  let orderedData:any=[]
  Object.keys(fullData).sort().forEach(key=>{
    orderedData.push(fullData[key])
  })

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


  const withoutWinningData = (volume:any) =>{
    if(volume == Number(thisVol)+1){
      return(
      <View style={styles.container}>
        <Text style={styles.withoutWinningStyle}>아직 추첨전입니다.</Text>
      </View>
      )
    }else{
      return(
        <View style={styles.container}>
        <Text style={styles.withoutWinningStyle}>터치하여 추첨 결과를 다시 받아보세요.</Text>
      </View>
    )}
  }
  
  const setWinningColor = (grade:any)=>{
    switch(grade){
      case 5:
        return '#AAAAAA';
      case 4:
        return '#F2C643';
      case 3:
        return '#EE7A76';
      case 2:
        return '#B8D75B';
      case 2:
        return '#81C6EE';
      default:
        return 'rgb(250,250,250)';
    }
  }
 
  const rend_item = (item:any,index:any)=>{
    if(!item.item.game){
      return
    }
    return(
      <TouchableOpacity key={index} style={{...styles.itemContainer, height:screenHeight*0.15,backgroundColor:item.item.grade ? setWinningColor(item.item.grade):'rgb(250,250,250)'}} 
        onPress={()=>{setSelectedData(item.item),navigation.navigate('Details')}}>
        <View style={{justifyContent:'center'}}>
          <Text style={styles.lottoVolText}>{item.item.volume} 회</Text>
        </View>
        <View style={{...styles.winningContainer}}>
          {item.item.winningNumber ? item.item.winningNumber.map((winningNumber:any,index:any)=>{
            return(
              <View style={styles.ballContainer}>
                <View style={{...styles.lottoBallStyle,width:screenWidth*0.1,height:screenWidth*0.1,marginHorizontal:screenWidth*0.005, backgroundColor:returnBallColor(winningNumber)}}>
                  <Text style={styles.lottoNumber}>{winningNumber}</Text>
                </View>
                {index ==5 && <View style={{...styles.container, width:screenWidth*0.1,height:screenWidth*0.1}}>
                  <Text style={styles.addStyle}>+</Text>
                </View>}
              </View>
            )
          }):withoutWinningData(item.item.volume)
        }
        </View>
      </TouchableOpacity>
    )
  }
  
 
  return (
    <ImageBackground style={{flex:1}} source={require('../assets/backgroundImage.png')}>
      <SafeAreaView style={{flex:1}}>
        
        <View style={{height:screenHeight*0.07}}/>
        <View style={{height:screenHeight*0.07, justifyContent:'center'}}>
        <Text style={styles.historyTitle}>나의 행복 기록</Text>
      </View>

        <View style={{height: screenHeight*0.73}}>
          <FlatList
          data={orderedData.reverse()}
          renderItem={rend_item}
          //  keyExtractor={(index:any) => index}
          contentContainerStyle={{paddingHorizontal:15, paddingVertical:10}}
          />
        </View>

      <View style={{height: screenHeight*0.075, backgroundColor:'white'}}/>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent:'center', alignItems:'center'
  },
  historyTitle:{
    color:'black',
    fontSize:28,
    fontWeight:'bold',
    paddingLeft:20,
    letterSpacing:1
  },
  itemContainer:{
    justifyContent:'space-evenly',
    marginVertical:5,
    paddingVertical:5,
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
  lottoVolText:{
    color:'black',
    fontWeight:'bold',
    fontSize:22,
    paddingLeft:15,
  
  },
  winningContainer:{
    flexDirection:'row', 
    alignContent:'center', 
    justifyContent:'center',
  },
  ballContainer:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center',
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
    color:'white',
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
    textAlign:'center',
    fontSize:18,
    color:'rgb(70,70,70)',
    fontWeight:'bold'
  }
});