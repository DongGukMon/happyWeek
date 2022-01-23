
import React,{useEffect,useContext,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { StackContext } from '../utils/StackContext';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function Home({navigation}:any){

  const {fullData,setSelectedData,thisVol,homeModalVisible,setHomeModalVisible} = useContext(StackContext)

  const returnSubText=(pay:any)=>{
    switch(true){
      case (pay<=5000):
        return "5,000원으로 커피를 사먹으면 1시간만 행복합니다."
      case (pay<=20000):
        return "20,000원으로 치킨을 사먹으면 3시간만 행복합니다."
      case (pay<=50000):
        return "50,000원으로 술을 사먹으면 다음날까지 힘듭니다."
      case (pay<=100000):
        return "100,000원으로 친구와 놀러가면 하루만 행복합니다."
      case (pay<=500000):
        return "500,000원으로 주식에 투자하면 일주일 후에 행복할 수도 있습니다."
      case (pay<=1000000):
        return "1,000,000원으로 아이폰을 사면 2주 동안만 행복합니다."
      case (pay<=2000000):
        return "2,000,000원으로 해외 여행을 가면 3주 동안만 행복합니다."
      case (pay<=3000000):
        return "3,000,000원으로 명품백을 사면 한달 동안만 행복합니다."
      case (pay<=10000000):
        return "10,000,000원으로 기부를 하면 진짜 멋진사람이네요."
      case (pay<=100000000):
        return "1,000,000,000원으로 차를 사면 6개월 동안만 행복합니다."
      case (pay<=1000000000):
        return "10,000,000,000원으로 집을 사면 1년 동안만 행복합니다."
      default:
        return "로또를 사지 않으셔도 이미 행복한 사람"
    }
  }

  return (
      <ImageBackground style={{flex:1}} source={require('../assets/backgroundImage.png')}>
        <SafeAreaView style={{flex:1}}>

          <View style={{height:screenHeight*0.07}}/>
          {fullData.total != 0 ?
            <View style={{height:screenHeight*0.15, justifyContent:'center'}}>
              <Text style={styles.homeTitle}>{(Number(fullData.total)*1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원으로</Text>
              <Text style={styles.homeTitle}>{Object.values(fullData).length-1}주의 행복을 샀다!</Text>
            </View> : <View style={{height:screenHeight*0.15, justifyContent:'center'}}>
              <Text style={styles.homeTitle}>1,000원으로</Text>
              <Text style={styles.homeTitle}>행복을 살 수 있다고?</Text>
            </View>
          }
          <View style={{...styles.subTextContainer, height:screenHeight*0.08}}>
            <Text style={styles.subText}>{returnSubText(Number(fullData.total)*1000)}</Text>
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
                  <Icon name="camera" size={27} color="black" />
                  <Text style={styles.qrText}>QR코드를 스캔해주세요</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <Modal visible={homeModalVisible} transparent={true}>
            <TouchableOpacity style={{...styles.container, flex:1, backgroundColor:'rgba(0,0,0,0.25)'}} onPress={()=>{setHomeModalVisible(!homeModalVisible)}}>
              
              <TouchableWithoutFeedback>
                <View style={{height:screenHeight*0.5,width:screenWidth*0.8,backgroundColor:'white', borderRadius:15,overflow:'hidden'}}> 
                
                  <View style={{justifyContent:'center', backgroundColor:"rgb(240,240,240)", height:screenHeight*0.1}}>
                    <Text style={{fontSize:24,fontWeight:'bold',color:"black",paddingLeft:20}}>알려드립니다.</Text>
                  </View>
                  <ScrollView>
                    <View style={{padding:20}} onStartShouldSetResponder={() => true}>
                      <Text style={{fontSize:16}}>
                        {"<"}happy week{">"}는 당첨 여부를 쉽게 확인하고 복권 구매 이력을 한곳에 기록하고자 하는 목적으로 제작되었습니다. 
                      </Text>
                      <Text/>
                      <Text style={{fontSize:16}}>
                        기기의 오작동 등 변수로인해, 항상 100% 일치하는 결과를 보장할 수는 없습니다. 따라서 중요한 시점에는 직접 확인하시거나 다른 방법과 중복하여 확인하는 것을 추천드립니다.
                      </Text>
                      <Text/>
                      <Text style={{fontSize:16}}>
                        {"<"}happy week{">"}에서 확인한 당첨 여부는 실제 당첨 여부에 어떠한 근거로도 활용될 수 없으며, 앱의 사용으로 일어나는 어떠한 문제에도
                        책임이 없음을 알려드립니다.
                      </Text>
                    </View>
                  </ScrollView>

                </View>
              </TouchableWithoutFeedback>
          
            </TouchableOpacity>
          </Modal>

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
    alignItems:'center',
  },
  cameraDrawBorder:{
    justifyContent:'center',
    alignItems:'center', 
    borderWidth:5
  }
});