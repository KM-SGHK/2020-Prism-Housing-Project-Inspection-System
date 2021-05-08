import React, { useEffect, useReducer, useState, forwardRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useNavigation, StackActions } from '@react-navigation/native';
import { logout } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootState } from '../../store';
import { ROLES } from "../../variables/General";
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { Accordian } from './Collapse';
import { showFeatureAndDefect } from '../../redux/feature/actions';
import { selectedTower, selectedFloor, selectedRoom, selectedType } from '../../redux/flat/SelectActions';



const FeatureScreen = ({navThing, route}) => {

    const {spaceName} = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const user = useSelector((state: RootState) => state.auth.user)

    const selectedFlatInfo = useSelector((state: RootState) => state.spaces.selectedFlatInfo);
    // const selectedSpace = useSelector((state:RootState)=>state.spaces.result)

    const showHeader = selectedFlatInfo.map((value, index) =>
        <View key={index}>
            <Text style={[styles.title, {fontWeight: '800'}]}>Carmel, T{value.tower},{value.floor}{value.room}</Text>
            <Text style={[styles.title, {paddingTop: 10}]}>現在位置：{spaceName}</Text>
        </View>
    )

    const content = useSelector((state: RootState) => state.featuresAndDefects.result)
    const selectedFlatId = useSelector((state: RootState) => state.idSaving.flatId);
    const selectedSpaceId = useSelector((state: RootState) => state.idSaving.spaceId);

    const renderAccordians = () => {
        const items = [];
        content.map((item, index) => {
            items.push(
                <Accordian
                    feature={item.feature}
                    featureId={item.feature_id}
                    defects={item.defects}
                    featureIndex={index}
                />
            )
        });
        return items;
    }
    // console.log(renderAccordians())


    useEffect(() => {
        // roleID 寫法跟actions.ts interface
        if (!isAuthenticated) {
            navigation.dispatch(
                StackActions.replace('Login'))
        }

    }, [isAuthenticated, navigation])


    // dispatch(showFeatureAndDefect(selectedFlatId,selectedSpaceId));

    return (
        <>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleBox}>
                            {showHeader}
                        </View>
                    </View>
                    {renderAccordians()}
                </ScrollView>
            </View>
        </>
    )
}



export default FeatureScreen;


// (STYLES BELOW)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    titleContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 25
    },
    titleBox: {
        marginBottom: 15,
        backgroundColor: "#FFF",
        width: 300,
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.5,
        elevation: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 15,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    defectButton: {
        height: 35,
        width: 100,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        marginTop: 10,
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        // flexWrap: 'wrap',
        backgroundColor: 'rgba(247,215,50,1)',
        width: 834
    },
    selector: {
        backgroundColor: 'rgba(247,215,50,1)',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});