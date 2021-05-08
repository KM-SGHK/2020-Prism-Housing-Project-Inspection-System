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
import { getDevReport2 } from '../../redux/devReport2/actions';
import HeaderBar from '../../components/HeaderBar';

const Report02Screen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const type1_flatNumber = useSelector((state: RootState) => state.devReport2.flatType1)
    const type2_flatNumber = useSelector((state: RootState) => state.devReport2.flatType2)
    const type3_flatNumber = useSelector((state: RootState) => state.devReport2.flatType3)
    const type4_flatNumber = useSelector((state: RootState) => state.devReport2.flatType4)
    const user = useSelector((state: RootState) => state.auth.user)

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
        dispatch(getDevReport2())
    }, [dispatch])

    // const onNextPage = () => {
    //     if (isAuthenticated) {
    //         if (user?.role_id === ROLES.DEVELOPER) {
    //             console.log('test 123');
    //             // 在第二層轉頁方法
    //             navigation.dispatch(
    //                 StackActions.replace('Developer', { screen: 'DeveloperReport03' })
    //             );
    //         }
    //     }
    // }

    const data = [
        {
            name: "一房單位",
            number: type1_flatNumber,
            color: "#81718e",
            legendFontColor: "#81718e",
            legendFontSize: 15
        },
        {
            name: "連主人房大單位",
            number: type2_flatNumber,
            color: "#8e7371",
            legendFontColor: "#8e7371",
            legendFontSize: 15
        },
        {
            name: "兩房單位",
            number: type3_flatNumber,
            color: "#7e8e71",
            legendFontColor: "#7e8e71",
            legendFontSize: 15
        },
        {
            name: "開放式單位",
            number: type4_flatNumber,
            color: "#718c8e",
            legendFontColor: "#718c8e",
            legendFontSize: 15
        },

    ];

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

            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                <Text style={{fontSize:50, marginBottom:200, fontFamily:'NotoSansTC-Bold'}}>已檢查單位類型</Text>
                <PieChart
                    data={data}
                    // width={Dimensions.get("window").width}
                    width={750}
                    height={300}
                    chartConfig={{
                        backgroundGradientFrom: "#1E2923",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "#08130D",
                        backgroundGradientToOpacity: 0.5,
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        strokeWidth: 2, // optional, default 3
                        barPercentage: 0.5,
                        useShadowColorFromDataset: false, // optional
                    }}
                    accessor="number"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute={true}

                />
            </View>

            {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: '20%' }} onPress={onNextPage}>
                <Text style={{ fontSize: 30 }}>下一頁</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: '20%' }} onPress={onNextPage}>
                <Text style={{ fontSize: 30 }}>下一頁</Text>
            </TouchableOpacity> */}



        </>
    )
}

export default Report02Screen;