
import React,{useEffect,useContext,useState} from 'react';
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
  TouchableOpacity,
  Alert
} from 'react-native';
import { StackContext } from '../utils/StackContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function Home({navigation}:any){

  const {fullData,setSelectedData,thisVol} = useContext(StackContext)
  

  return (
      <ImageBackground style={{flex:1}} source={require('../assets/backgroundImage.png')}>
        <SafeAreaView style={{flex:1}}>

          <View style={{height:screenHeight*0.07}}/>
          {fullData.total != 0 ?
            <View style={{height:screenHeight*0.15, justifyContent:'center'}}>
              <Text style={styles.homeTitle}>{Number(fullData.total)*1000}원으로</Text>
              <Text style={styles.homeTitle}>{Object.values(fullData).length-1}주의 행복을 샀다!</Text>
            </View> : <View style={{height:screenHeight*0.15, justifyContent:'center'}}>
              <Text style={styles.homeTitle}>1,000원으로</Text>
              <Text style={styles.homeTitle}>행복을 살 수 있다고?</Text>
            </View>
          }
          <View style={{...styles.subTextContainer, height:screenHeight*0.08}}>
            <Text style={styles.subText}>1,000,000원으로 아이폰을 사면 4주 동안만 행복합니다.</Text>
          </View>

          <View style={{...styles.container, height:screenHeight*0.49}}>
            <View style={{width:screenWidth*0.9, height:screenHeight*0.35, justifyContent:'space-between' }}>
              <TouchableOpacity style={{...styles.menuContainer,height:screenHeight*0.16}} onPress={()=>{
                fullData[thisVol] ? (setSelectedData(fullData[thisVol]),navigation.navigate('Details')):Alert.alert("최신 추첨 회차에 구매하신 내역이 없네요!")
                }}>
                <Text style={styles.menuText}>{thisVol}회차 결과보기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.menuContainer,height:screenHeight*0.16}} onPress={()=>navigation.navigate('History')}>
                <Text style={styles.menuText}>기록 보기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={{...styles.cameraDraw, height:screenHeight*0.18}} onPress={()=>navigation.navigate('QrScan')}>
            <View style={{...styles.cameraDrawBorder, height:screenHeight*0.1, width:screenWidth*0.7, marginBottom:screenHeight>700 ? screenHeight*0.03 : screenHeight*0.01}}>
              <View style={{...styles.cameraDraw, height:screenHeight*0.12, width:screenWidth*0.58}}>
                <View style={{...styles.cameraDraw, height:screenHeight*0.05, width:screenWidth*0.75}}>
                  <Text style={styles.qrText}>QR코드를 스캔해주세요</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

        </SafeAreaView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center'
  },
  homeTitle:{
    fontSize:28,
    fontWeight:'bold',
    paddingLeft:20,
    letterSpacing:1
  },
  subText:{
    color:'white',
    fontSize:14,
    fontWeight:'bold',
    textAlign:'center',
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation:3
  },
  subTextContainer:{
    justifyContent:'center', 
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  qrText:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
  },
  menuText:{
    fontSize:32,
    fontWeight:'bold',
    textAlign:'center'
  },
  menuContainer:{
    borderRadius:15,
    backgroundColor:'white', 
    justifyContent:'center',
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation:3
  },
  cameraDraw:{
    backgroundColor:'#B8D75B', 
    justifyContent:'center',
    alignItems:'center'
  },
  cameraDrawBorder:{
    justifyContent:'center',
    alignItems:'center', 
    borderWidth:5
  }
});