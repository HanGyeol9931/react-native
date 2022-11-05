import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet,Dimensions, Text, View ,ScrollView} from 'react-native';
import * as Location from 'expo-location';


const SCREEN_WIDTH = Dimensions.get("window").width
const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13"
export default function App() {
  const [days,setDays] = useState() 
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
    fetch()
    console.log(location);    
  }
  useEffect(()=>{
    ask()
  })
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
         <View style={styles.day}>
           <Text style={styles.temp}>27</Text>
           <Text style={styles.description}>Sunny</Text>
         </View>
         <View style={styles.day}>
           <Text style={styles.temp}>28</Text>
           <Text style={styles.description}>Sunny</Text>
         </View>
         <View style={styles.day}>
           <Text style={styles.temp}>29</Text>
           <Text style={styles.description}>Sunny</Text>
         </View>
         <View style={styles.day}>
           <Text style={styles.temp}>30</Text>
           <Text style={styles.description}>Sunny</Text>
         </View>
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
  weather:{
    // flex:3,
    // backgroundColor : "blue",
  },
  day:{
    width : SCREEN_WIDTH,
    alignItems :  "center",
  },
  temp:{
    marginTop : 50,
    fontSize : 178,
  },
  description:{
    marginTop : -30,
    fontSize : 60,
  }, 
})

