import React from 'react';
import axios from "axios"
import BasicListScreen from './BasicListScreen'
import { Text, Linking, BackHandler, Platform, ToastAndroid, Alert } from "react-native";
import { View, Button } from 'react-native-ui-lib';
import { StatusBar } from 'expo-status-bar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();


// Navigation Container 테마(색 변경)
const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};


// splash screen을 위한 함수 두개
function sleep (ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
async function delay_splash() {
    await SplashScreen.preventAutoHideAsync();    // 스크린 없어지는거 일단 막음
    await sleep(2000);                           // 2초 기다림
    await SplashScreen.hideAsync();             // 2초 기다린 후 스크린 없어지게끔
};
 

class Home extends React.Component {

  state = {

  };

  // 현재날짜에 value만큼 더한 날짜의 요일을 반환
  getYoil = (value) =>{
    const day = new Date().getDay();
    var addDay = (day + value) % 7;
    if (addDay == 0) {
      return "일"
    } else if (addDay == 1) {
      return "월"
    } else if (addDay == 2) {
      return "화"
    } else if (addDay == 3) {
      return "수"
    } else if (addDay == 4) {
      return "목"
    } else if (addDay == 5) {
      return "금"
    } else if (addDay == 6) {
      return "토"
    }
  }

  // 현재날짜에 order만큼 더한 날짜를 '21일(수)' 형태로 반환
  getTabLabel = (order) =>{
    var date = new Date();
    date.setDate(date.getDate() + order);
    return `${date.getDate()}${this.getYoil(order)}`;
  }

  // 현재날짜에 order만큼 더한 날짜를 '22' 형태로 반환
  getTabDay = (order) =>{
    var date = new Date();
    date.setDate(date.getDate() + order);
    return date.getDate();
  }

  // 현재날짜에 order만큼 더한 날짜를 요일 형태로 반환
  getTabYoil = (order) =>{
    var date = new Date();
    date.setDate(date.getDate() + order);
    return this.getYoil(order);
  }

  // 현재날짜에 order만큼 더한 날짜를 '2021-7-18' 형태로 반환
  getAfterDate = (order) =>{
    var date = new Date();
    date.setDate(date.getDate() + order);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }


  // 예약DB에서 날짜와 타임id에 따라 정보 가져오기
  // getData = async () => {
  //   try{
  //     const { data : { data } } = await axios.get('http://146.56.170.191/select_with_date.php', {
  //       // date와 time_id로 찾기
  //       params:{
  //         date: '2021-07-16',
  //         time_id: 25
  //       }  
  //     });
  //     console.log(data);
  //   } catch (error){
  //     console.error(error);
  //   }
  // }

  // 예약정보받고 DB에 있는 예약테이블 업데이트
  // insertData = async() =>{
  //   await axios.post('http://146.56.170.191/update_res.php', {
  //     //date와 time_id 로 유저 찾고, name 과 phone_num과 res_ok 업데이트
  //     name: '강혁준2',
  //     phone_num: '01022222222',
  //     date: '2021-07-16',
  //     time_id: 25,
  //     res_ok: 1
      
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  // componentDidMount() {
  //   this.prepare();
  //   this._loadFontsAsync();
  //   this.getData();
  //   this.insertData();
  // }


  render(){  
    
    return (
      <View flex-1  > 
        <StatusBar style="auto" /> 
        {/* <TopNav middleContent="강우리헤어" borderColor="#F5F6F7" middleTextStyle={{fontSize:18, fontWeight:"bold"}}></TopNav> */}
          <Tab.Navigator
            initialRouteName="Tab1"                               // 시작 탭 지정
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {        // 탭 아이콘 지정 (21수 형태를 21 다음칸 수 형태로 하기위함)
                if(route.name === 'Tab1'){
                  return (
                    focused ?     // 탭이 포커스된 상태일때 레이블 색 달리해서 표현
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}}  >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(0)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(0)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(0)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(0)}</Text>
                    </View>
                  )
                }
                else if(route.name === 'Tab2'){
                  return (
                    focused ? 
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(1)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(1)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}}  >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(1)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(1)}</Text>
                    </View>
                  )
                }
                else if(route.name === 'Tab3'){
                  return (
                    focused ? 
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}}  >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(2)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(2)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(2)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(2)}</Text>
                    </View>
                  )
                }
                else if(route.name === 'Tab4'){
                  return (
                    focused ? 
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(3)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(3)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(3)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(3)}</Text>
                    </View>
                  )
                }
                else if(route.name === 'Tab5'){
                  return (
                    focused ? 
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(4)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(4)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(4)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(4)}</Text>
                    </View>
                  )
                }
                else if(route.name === 'Tab6'){
                  return (
                    focused ? 
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(5)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(5)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}}  >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(5)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(5)}</Text>
                    </View>
                  )
                }
                else if(route.name === 'Tab7'){
                  return (
                    focused ? 
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}} >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(6)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(6)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}}  >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(6)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(6)}</Text>
                    </View>
                  )
                }
                else if(route.name === 'Tab8'){
                  return (
                    focused ? 
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}}  >
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(7)}</Text>
                      <Text style={{color:'#5847FF', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(7)}</Text>
                    </View> :
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',}}  >
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 12, fontWeight:"normal" }}>{this.getTabYoil(7)}</Text>
                      <Text style={{color:'grey', alignItems:'center',justifyContent:'center', fontSize: 14, fontWeight:"bold"}}>{this.getTabDay(7)}</Text>
                    </View>
                  )
                }
                
              },
            })}
            backBehavior="none"
            tabBarOptions={{
              activeTintColor: 'black',
              labelStyle: { fontSize: 12, fontWeight: 'bold' },
              style: { backgroundColor: '#F5F6F7' },
              indicatorStyle : { backgroundColor : '#5847FF' },   // 탭 밑바닥 색
              scrollEnabled: true,                                // 탭 스크롤 가능
              tabStyle: { width: 54, height: 54 },
              showIcon: true,                                     // 레이블이 아닌 아이콘형태로 보여주기
              showLabel : false
            }}>
            <Tab.Screen
              name="Tab1"
              //component={ListExample}
              children={ ()=><BasicListScreen today={this.getAfterDate(0)}></BasicListScreen> }     // Tab1 의 화면은 BasicListScreen 이고 props로 오늘날짜를 넘겨줌
              options={{ 
                tabBarLabel: this.getTabLabel(0)    // Tab1의 레이블은 '23목' 형태임
              }}
            />
            <Tab.Screen
              name="Tab2"
              children={ ()=><BasicListScreen today={this.getAfterDate(1)}></BasicListScreen> } 
              options={{ tabBarLabel: this.getTabLabel(1) }}
            />
            <Tab.Screen
              name="Tab3"
              children={ ()=><BasicListScreen today={this.getAfterDate(2)}></BasicListScreen> } 
              options={{ tabBarLabel: this.getTabLabel(2) }}
            />
            <Tab.Screen
              name="Tab4"
              children={ ()=><BasicListScreen today={this.getAfterDate(3)}></BasicListScreen> } 
              options={{ tabBarLabel: this.getTabLabel(3) }}
            />
            <Tab.Screen
              name="Tab5"
              children={ ()=><BasicListScreen today={this.getAfterDate(4)}></BasicListScreen> } 
              options={{ tabBarLabel: this.getTabLabel(4) }}
            />
            <Tab.Screen
              name="Tab6"
              children={ ()=><BasicListScreen today={this.getAfterDate(5)}></BasicListScreen> } 
              options={{ tabBarLabel: this.getTabLabel(5) }}
            />
            <Tab.Screen
              name="Tab7"
              children={ ()=><BasicListScreen today={this.getAfterDate(6)}></BasicListScreen> } 
              options={{ tabBarLabel: this.getTabLabel(6) }}
            />
            <Tab.Screen
              name="Tab8"
              children={ ()=><BasicListScreen today={this.getAfterDate(7)}></BasicListScreen> } 
              options={{ tabBarLabel: this.getTabLabel(7) }}
            />
          </Tab.Navigator>

            
        <Button label="전화걸기" margin-10 size={Button.sizes.large} onPress={ ()=>{Linking.openURL('tel:0220662066');} }></Button>
        
      </View>
    );
  }
}

class App extends React.Component {

  state = {
    notice_msg : "없음"
  };

  // 뒤로가기 버튼눌렀을때 종료되는 이벤트 등록
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  // 뒤로가기 버튼눌렀을때 종료되는 이벤트 해제
  componentWillUnmount() {
      this.exitApp = false;
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  // 이벤트 동작
  handleBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
    if (this.exitApp == undefined || !this.exitApp) {
        ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
        this.exitApp = true;

        this.timeout = setTimeout(
            () => {
                this.exitApp = false;
            },
            2000    // 2초
        );
    } else {
        clearTimeout(this.timeout);

        BackHandler.exitApp();  // 앱 종료
    }
    return true;
  }

  // 공지DB에서 가장 최근에 입력한 공지 1건 가져오기
  getData = async () => {
    try{
      const { data : { data } } = await axios.post('http://146.56.170.191/select_notice.php',{
        msg: 'thisisselectnotice'
      });

      if (data) {
        this.setState({ notice_msg: data[0].message })
      }
      else{
        this.setState({ notice_msg: "없음" })
      }
    } catch (error){
      console.error(error);
    }
  }

  // 공지사항창 띄우기
  noticeAlert = () => {
    this.getData(); // 공지 있으면 업데이트

    Alert.alert("공지사항", this.state.notice_msg, [
      { text: "예", onPress: () => console.log("Yes Pressed")  }
    ]);
  }

  // 맨 처음 앱 들어갈때 스플래쉬 스크린 이후에 바로 메인화면 위에 공지사항창 띄우기 위한것
  getFirstNotice = async () => {
    try{
      const { data : { data } } = await axios.post('http://146.56.170.191/select_notice.php',{
        msg: 'thisisselectnotice'
      });

      if (data) {
        this.setState({ notice_msg: data[0].message });
        console.log("있음");
        Alert.alert("공지사항", data[0].message, [          // 공지사항이 있으면 alert창 띄우기
          { text: "예", onPress: () => console.log("Yes Pressed")  }
        ]);
      }
      else{                                                 // 공지사항이 없으면 alert창 안띄움(평소대로 화면 확인가능)
        this.setState({ notice_msg: "없음" });
        console.log("없음"); 
      }
    } catch (error){
      console.error(error);
    }
  }

  // 렌더링이 끝난후(componentDidMount)의 상태일때! 아래처럼 해야함-> 왜냐면 render함수 아래에 delay_splash 호출하고 getFirstNotice 호출시 스플래쉬 화면이 나오기도전에
  // 공지사항부터 띄워지는 문제가 있었음
  async componentDidMount() {
    await SplashScreen.preventAutoHideAsync();  // 스플래쉬 스크린 띄운상태
    this.getFirstNotice();                      // 공지사항이 있으면 공지사항을 메인화면 앞에 띄우기 
    await SplashScreen.hideAsync();             // 스플래쉬 스크린 끄기
  }


  render() {
    // splash screen 기다리기
    //delay_splash();
    
    return(
      <NavigationContainer theme={MyTheme}>
        
        <Stack.Navigator  initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}  options={{
            title: '강우리헤어',
            headerTitleStyle: {
              //alignSelf : 'center',
              fontWeight: 'normal',
              fontSize : 17
            },
            headerRight: () => (
              <HeaderButtons >
                <Item title="공지" onPress={ () => this.noticeAlert() } />
              </HeaderButtons>
            ),
          }} />

        </Stack.Navigator>

      </NavigationContainer>
    )
  }

}

export default App