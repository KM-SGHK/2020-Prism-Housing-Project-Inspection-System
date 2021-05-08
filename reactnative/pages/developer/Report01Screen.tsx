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
import { getDevReport1 } from '../../redux/devReport1/actions';
import HeaderBar from '../../components/HeaderBar';

const Report01Screen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const type1_flatNumber = useSelector((state: RootState) => state.devReport1.type1)
    const type2_flatNumber = useSelector((state: RootState) => state.devReport1.type2)
    const type3_flatNumber = useSelector((state: RootState) => state.devReport1.type3)
    const user = useSelector((state: RootState) => state.auth.user)

    const onLogout = () => {
        dispatch(logout())
    };

    console.log(type1_flatNumber)
    console.log(type2_flatNumber)
    console.log(type3_flatNumber)

    // useEffect(() => {
    //     // roleID 寫法跟actions.ts interface
    //     dispatch(getDevReport1())
    // }, [])

    useEffect(() => {
        // roleID 寫法跟actions.ts interface
        if (!isAuthenticated) {
            navigation.dispatch(
                StackActions.replace('Login'))
        }
    }, [isAuthenticated, navigation])

    useEffect(() => {
        dispatch(getDevReport1())
    }, [dispatch])

    const onNextPage = () => {
        if (isAuthenticated) {
            if (user?.role_id === ROLES.DEVELOPER) {
                console.log('test 123');
                // 在第二層轉頁方法
                navigation.dispatch(
                    StackActions.replace('Developer', { screen: 'DeveloperReport02' })
                );
            }
        }
    }

    const data = [
        {
            name: "問題不算嚴重單位",
            number: type1_flatNumber,
            color: "#de8621",
            legendFontColor: "#de8621",
            legendFontSize: 15
        },
        {
            name: "問題頗為嚴重單位",
            number: type2_flatNumber,
            color: "#de2179",
            legendFontColor: "#de2179",
            legendFontSize: 15
        },
        {
            name: "問題極為嚴重單位",
            number: type3_flatNumber,
            color: "#de2721",
            legendFontColor: "#de2721",
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
                <Text style={{fontSize:50, marginBottom:200, fontFamily:'NotoSansTC-Bold'}}>單位檢驗問題概覽</Text>
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
                        useShadowColorFromDataset: false // optional
                    }}
                    accessor="number"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute

                />
            </View>

            {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: '20%' }} onPress={onNextPage}>
                <Text style={{ fontSize: 30 }}>下一頁</Text>
            </TouchableOpacity> */}


        </>
    )
}

export default Report01Screen;