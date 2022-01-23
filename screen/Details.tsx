
import React,{useContext} from 'react';
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
  FlatList
} from 'react-native';

import { StackContext } from '../utils/StackContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height > 700 ? Dimensions.get('screen').height : 800;

export default function Details(){

  const {selectedData} = useContext(StackContext)
 
  const rend_item = (item:any,index:any) =>{
    return (
    <View key={index} style={{...styles.itemContainer, height: screenHeight <= 800 ? screenHeight*0.09 : screenHeight*0.1}}>
      {item.item.map((myBall:any)=>{
        return <View style={{...styles.lottoBallStyle,width:screenWidth*0.13,height:screenWidth*0.13,marginHorizontal:screenWidth*0.008, backgroundColor:'green'}}>
          <Text style={styles.lottoNumber}>{myBall}</Text>
        </View>
      
      })}
    </View>)
  }


  return (
    <ImageBackground style={{flex:1}} source={require('../assets/backgroundImage.png')}>
      <SafeAreaView style={{flex:1}}>

      <View style={{height: screenHeight ==800 ? screenHeight*0.06 : screenHeight*0.07}}/>

      <View style={{height:screenHeight*0.07, justifyContent:'center'}}>
        <Text style={styles.detailTitle}>{Number(selectedData.volume)}회차 당첨번호</Text>
      </View>
      
      <View style={{...styles.winningContainer, height: screenHeight*0.09}}>
        {selectedData.winningNumber.map((item:any,index:any)=>{
          return(
            <View style={styles.ballContainer}>
              <View style={{...styles.lottoBallStyle,width:screenWidth*0.11,height:screenWidth*0.11,marginHorizontal:screenWidth*0.005, backgroundColor:index > 3 ?'#B8D75B' : '#81C6EE'}}>
                <Text style={styles.lottoNumber}>{item}</Text>
              </View>
              {index ==5 && <View style={{...styles.container, width:screenWidth*0.1,height:screenWidth*0.11}}>
                <Text style={styles.addStyle}>+</Text>
              </View>}
            </View>
          )
        })}
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
    backgroundColor:'rgb(250,250,250)',
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
  }
});