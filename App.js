import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet,Dimensions,ActivityIndicator, Text, View ,ScrollView} from 'react-native';
import * as Location from 'expo-location';
import {Fontisto} from "@expo/vector-icons"


const SCREEN_WIDTH = Dimensions.get("window").width
const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13" // 노마드 코더
// const API_KEY = "a518ac821866c4aab5c088ad4a9b6f16" // 내 꺼
const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
  };
export default function App() {
  const [days,setDays] = useState([]) 
  const [city,setCity] = useState("Loading...")
  const [ok,setOk] = useState(true);
  const ask = async()=>{
    const {granted} =  await Location.requestForegroundPermissionsAsync(); // 현재 위치 허용 요청을 보낸다
    if(!granted){
      setOk(false);
    }
    const {coords : {latitude,longitude}} = await Location.getCurrentPositionAsync()
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps : false});
    setCity(location[0].city);
    const respone = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`)
    const json  = await (await respone).json()
    setDays(json.daily) 
    console.log("days 길이 : ",days.length);
    console.log(json);
  }
  useEffect(()=>{
    ask()
  },[])
  // console.log("여긴 days : ",days)
  // days.map((day,index)=>{
  //   console.log("이건 데이",day,"이건 인덱스",index);
  // })
  return (
    <View style={styles.container}>
       <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
       </View>
       <ScrollView
        pagingEnabled // 스크롤이 자유롭지 못하지만 페이지처럼 만들어줌
        horizontal // 가로로 정렬 시켜줌
        showsHorizontalScrollIndicator={false}  // 아래 바가 생기는데 없애줌
        contentContainerStyle={styles.weather} // contentContainerStyle 가로로 정렬되었을떄 스타일 태그
      >
        {days.length === 0 ? 
        <View style={styles.day}>
          <ActivityIndicator size="large" color="white" style={{marginTop : 10,}}/>
        </View>
        : 
        days.map((day,index)=>{
          return<View key={index} style={styles.day}>
            <View style={
              {
              flexDirection : 'row',
              alignItems : "center" ,
              width : "100%",
              justifyContent :  "space-around"
               }} >
             <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
             <Fontisto name={icons[day.weather[0].main]} size={70} color="block"/>
            </View>
            <Text style={styles.description}>{day.weather[0].main}</Text>
            <Text style={styles.tinyText}>{day.weather[0].description}</Text>
          </View>
        })
        }
        
       </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor :"tomato"
  },
  city : {
    flex : 1.2 ,
    justifyContent: "center",
    alignItems: "center",
    
  },
  cityName :{
    fontSize : 68,
    fontWeight : "500",
  },
  day:{
    width : SCREEN_WIDTH,
    // marginLeft : 10,
  },
  temp:{
    marginTop : 50,
    fontSize : 130,
  },
  description:{
    marginTop : -30,
    marginLeft :  30,
    fontSize : 60,
  }, 
  tinyText:{
    fontSize : 20,
    marginLeft :  30,
  }
})

