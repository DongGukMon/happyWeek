
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
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { StackContext } from '../utils/StackContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height > 700 ? Dimensions.get('screen').height : 800;

export default function History({navigation}:any){

  const {fullData,setSelectedData} = useContext(StackContext)
  let orderedData:any=[]
    Object.keys(fullData).sort().forEach(key=>{
    orderedData.push(fullData[key])
  })

  const rend_item = (item:any,index:any)=>{
    if(!item.item.volume){
      return
    }
    return(
      <TouchableOpacity key={index} style={{...styles.itemContainer, height:screenHeight*0.15}} onPress={()=>{setSelectedData(item.item),navigation.navigate('Details')}}>
        <View style={{justifyContent:'center'}}>
          <Text style={styles.lottoVolText}>{item.item.volume} 회</Text>
        </View>
        <View style={{...styles.winningContainer}}>
          {item.item.winningNumber.map((winningNumber:any,index:any)=>{
            return(
              <View style={styles.ballContainer}>
                <View style={{...styles.lottoBallStyle,width:screenWidth*0.1,height:screenWidth*0.1,marginHorizontal:screenWidth*0.005, backgroundColor:index > 3 ?'#B8D75B' : '#81C6EE'}}>
                  <Text style={styles.lottoNumber}>{winningNumber}</Text>
                </View>
                {index ==5 && <View style={{...styles.container, width:screenWidth*0.1,height:screenWidth*0.1}}>
                  <Text style={styles.addStyle}>+</Text>
                </View>}
              </View>
            )
          })}
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
    backgroundColor:'rgb(250,250,250)',
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
});