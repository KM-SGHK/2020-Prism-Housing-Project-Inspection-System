import React, { useEffect, useReducer } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    ImageBackground,
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { logout } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootState } from '../../store';
import { ROLES } from "../../variables/General";
import HeaderBar from '../../components/HeaderBar';

const HomeScreen = () => {

    return (
        <>
            <StatusBar barStyle="dark-content" />
            
            <HeaderBar/>

            <View style={styles.container}>
                <ImageBackground source={require("../../assets/uploads/banner_photo.jpg")} style={styles.image}>

                        <Text style={styles.welcomeText}>Welcome</Text>

                        <Text style={styles.disclaimerText}>Disclaimer：以上圖片及樓盤名稱只屬參考性質，不會用作任何銷售用途。</Text>

                        <Text style={styles.disclaimerTextLong}>
                            本廣告／宣傳資料內載列的相片、圖像、繪圖或素描顯示純屬畫家對有關發展項目之想像。有關相片、圖像、繪圖或素描並非按照比例繪畫及／或可能經過電腦修飾處理。準買家如欲了解發展項目的詳情，請參閱售樓說明書。賣方亦建議準買家到有關發展地盤作實地考察，以對該發展地盤、其周邊地區環境及附近的公共設施有較佳了解。建議準買家參閱有關售樓說明書，以了解發展項目的資料。

                            街道名稱及門牌號碼：青山公路 – 大欖段 168號
                            地區：屯門    網址: www.thecarmel.com
                        </Text>

                </ImageBackground>
            </View>
        </>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
      flex: 2,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      alignItems:'center'
    },
    welcomeText: {
        marginTop:'20%',
        flex:1,
        fontSize:120,
        textAlign:'center',
        fontWeight:"bold",
        color: '#D43A56',
        textShadowOffset:{width: 7.5, height: 6.5},
        textShadowRadius: 1,
        textShadowColor:'white',
    },
    disclaimerText :{
        fontSize:12,
        fontWeight:"200",
        color: '#f0f0f0',
        marginBottom: 20,
    },
    disclaimerTextLong :{
        fontSize:12,
        fontWeight:"200",
        color: '#f0f0f0',
        marginHorizontal:18,
        marginBottom: 30,
        textAlign:'left',
    }
  });