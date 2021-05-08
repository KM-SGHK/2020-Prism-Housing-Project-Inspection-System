import React, { useEffect, useReducer, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { logout } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ROLES } from "../../variables/General";
import { TowerDropdown, FloorDropdown, RoomDropdown, TypeDropdown } from './Dropdown';
import { SearchTable } from './SearchTable';
import { showFlatAll } from '../../redux/flat/SearchActions';
import { selectedTower, selectedFloor, selectedRoom, selectedType } from '../../redux/flat/SelectActions';

const FlatScreen = () => {


    const navigation = useNavigation();
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const user = useSelector((state: RootState) => state.auth.user)

    const selectedTowerValue = useSelector((state: RootState) => state.select.selectedTowerValue)
    const selectedFloorValue = useSelector((state: RootState) => state.select.selectedFloorValue)
    const selectedRoomValue = useSelector((state: RootState) => state.select.selectedRoomValue)
    const selectedTypeValue = useSelector((state: RootState) => state.select.selectedTypeValue)

    const onSearchResult = () => {
        dispatch(showFlatAll(selectedTowerValue, selectedFloorValue, selectedRoomValue, selectedTypeValue))
    };

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


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('./carmel-bgimg.jpg')}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.logoText}>Carmel</Text>
                </View>
                <View style={styles.buildingInfo}>
                    <Text style={{fontSize:16, paddingVertical:2}}>Total Flat Number: 1000</Text>
                    <Text style={{fontSize:16, paddingVertical:2}}>Expected Launch Date: 01/01/2021</Text>
                    <Text style={{fontSize:16, paddingVertical:2}}>Inspection Progress: 3%</Text>
                </View>
            </View>
            <ScrollView horizontal={false}>
                {/* <Button
                    title="< Back"
                    onPress={() => {
                        navigation.goBack();
                    }}>
                </Button> */}
                <View>
                    <View style={styles.searchForm}>
                        <View style={styles.alignSearch}>
                            <TowerDropdown />
                            <FloorDropdown />
                        </View>
                        <View style={styles.alignSearch}>
                            <RoomDropdown />
                            <TypeDropdown />
                        </View>
                        <TouchableOpacity
                            onPress={() => { onSearchResult(); }}
                            style={styles.searchButton}>
                            <Text
                                style={styles.searchButtonText}>
                                篩選
                            </Text>
                        </TouchableOpacity>
                
                    </View>
                    <SearchTable/>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingVertical: 0,
        width: "100%",
        height: "35%",
        backgroundColor: 'rgba(0,0,0,0.45)',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 23,
        alignItems:'center',
        resizeMode:"cover"
    },

    logo: {
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: 0.6
    },

    textContainer: {
        position: "relative",
        top: "35%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 15,
    },

    logoText: {
        fontSize: 55,
        fontWeight: "700",
        textTransform: "uppercase",
        textShadowColor: "black",
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 1,
        color: "white",
        letterSpacing: -3.8,
    },

    buildingInfo: {
        width: "60%",
        height: '23.5%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        top: "50%",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 15,
        borderRadius:10
    },
    searchForm: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alignSearch: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    searchButton: {
        marginTop: 10,
        width: 180,
        height: 30,
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(247,215,50,1)',
        shadowOffset:{ width: 10, height:10}, 
        shadowColor:'black'
    },
    searchButtonText: {
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 1
    },
});

export default FlatScreen;