import React, { useEffect, useReducer } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Dimensions,
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { logout } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootState } from '../../store';
import { ROLES } from "../../variables/General";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit";
import { getDevReport3 } from '../../redux/devReport3/actions';
import HeaderBar from '../../components/HeaderBar';

const Report03Screen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const flat1_status1 = useSelector((state: RootState) => state.devReport3.Flat1NotSoSerious)
    const flat1_status2 = useSelector((state: RootState) => state.devReport3.Flat1Moderate)
    const flat1_status3 = useSelector((state: RootState) => state.devReport3.Flat1Serious)

    const flat2_status1 = useSelector((state: RootState) => state.devReport3.Flat2NotSoSerious)
    const flat2_status2 = useSelector((state: RootState) => state.devReport3.Flat2Moderate)
    const flat2_status3 = useSelector((state: RootState) => state.devReport3.Flat2Serious)

    const flat3_status1 = useSelector((state: RootState) => state.devReport3.Flat3NotSoSerious)
    const flat3_status2 = useSelector((state: RootState) => state.devReport3.Flat3Moderate)
    const flat3_status3 = useSelector((state: RootState) => state.devReport3.Flat3Serious)

    const flat4_status1 = useSelector((state: RootState) => state.devReport3.Flat4NotSoSerious)
    const flat4_status2 = useSelector((state: RootState) => state.devReport3.Flat4Moderate)
    const flat4_status3 = useSelector((state: RootState) => state.devReport3.Flat4Serious)

    const user = useSelector((state: RootState) => state.auth.user)

    const isLoading = useSelector((state: RootState) => state.devReport3.isLoading)

    const onLogout = () => {
        dispatch(logout())
    };

    useEffect(() => {
        // roleID 寫法跟actions.ts interface
        if (!isAuthenticated) {
            navigation.dispatch(
                StackActions.replace('Login'))
        }
    }, [isAuthenticated, navigation])

    useEffect(() => {
        // if(!isLoading)
        dispatch(getDevReport3())
    }, [dispatch])

    const data = {
        labels: ["一房單位", "連主人房大單位", "兩房單位", "開放式單位"],
        legend: ["問題不算嚴重單位數量", "問題頗為嚴重單位數量", "問題極為嚴重單位"],
        data: [
            // 
            // [],
            // // [0, 0, 0],
            // // [0, 0, 0],
            // // [0, 0, 0],
            // [0, 0, 0],
            [flat1_status1, flat1_status2, flat1_status3],
            [flat2_status1, flat2_status2, flat2_status3],
            [flat3_status1, flat3_status2, flat3_status3],
            [flat4_status1, flat4_status2, flat4_status3],
        ],
        barColors: ["#bd9f42", "#42bd9f", "#9f42bd"]
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />

            <HeaderBar/>

            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 80 }}>Report #1</Text>
            <Text style={{ fontSize: 60 }}>- Google Chart -</Text>
        </View> */}

            {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: '20%' }} onPress={onLogout}>
                <Text style={{ fontSize: 30 }}>登出</Text>
            </TouchableOpacity> */}


            <View style={{justifyContent:'center', alignItems:'center', flex:1, marginTop:100}}>
                <Text style={{fontSize:50, marginBottom:10, fontFamily:'NotoSansTC-Bold'}}>各類單位問題詳析</Text>
                <StackedBarChart
                    hideLegend={false}
                    // style={graphStyle}
                    data={data}
                    // width={Dimensions.get("window").width}
                    width={750}
                    height={750}
                    chartConfig={{
                        backgroundColor: "#f0f0f0",
                        backgroundGradientFrom: "#f0f0f0",
                        backgroundGradientTo: "#f0f0f0",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "",
                            stroke: "#ffa726"
                        }
                    }}
                />
            </View>

            {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: '20%' }} onPress={onNextPage}>
                <Text style={{ fontSize: 30 }}>下一頁</Text>
            </TouchableOpacity> */}


        </>
    )
}

export default Report03Screen;