
import React, { Component, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, FlatList } from "react-native";
// import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { selectedFeatureAndDefect } from '../../redux/flat/IdSavingActions';
import { useNavigation } from '@react-navigation/native';
import { showFeatureAndDefect } from '../../redux/feature/actions';

export interface IProps {
    feature: string,
    featureId: number,
    defects: any,
    featureIndex: number
}

export function Accordian(props: IProps) {

    const idSaving = useSelector((state: RootState) => state.idSaving)
    // console.log(idSaving);
    // const accordian = useSelector((state: RootState) => state.featuresAndDefects.result)
    const [data, setData] = useState(props.defects);
    const [expanded, setExpand] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();



    const FeatureAndDefectIdSaving = (selectedFeatureId, selectedDefectId) => {
        dispatch(selectedFeatureAndDefect(selectedFeatureId, selectedDefectId))
    }

    const onClick = (index) => {
        const temp = data.slice();
        console.log(temp);
        // temp[index].value = !temp[index].value;
        setData(temp);
    }

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpand(!expanded)
    }


    const showDefectButton = props.defects?.map((item, index) => {
        const thisFeatureId = props.featureId;
        const thisDefectId = item.defect_id;
        return (
            <TouchableOpacity
                key={index}
                style={[styles.childRow, item.hasRec ? { backgroundColor: "red", borderColor: 'white'} : { backgroundColor: "white" }]}
                onPress={() => {
                    FeatureAndDefectIdSaving(thisFeatureId, thisDefectId);
                    onClick(index);
                    { item.hasRec ? navigation.navigate('OldRecord') : navigation.navigate('NewRecord') }
                }}>
                <View>
                    <Text style={[styles.font, styles.itemInActive, item.hasRec ? {color:'white'}:{color: 'black'}]} >{item.issue}</Text>
                </View>
            </TouchableOpacity>
        )
    })

    let defectNumCount = 0;
    for (let defect of props.defects) {
        // console.log(defect);
        if (defect.hasRec === true) {
            defectNumCount++;
        }
    }


    const onShowFeatureAndDefect = (flatId, spaceId) => {
        dispatch(showFeatureAndDefect(flatId, spaceId));
    }

    return (
        <View style={styles.outerContainer}>
            <TouchableOpacity
                key={props.featureIndex}
                style={[styles.row,
                    // props.featureIndex % 2 && { backgroundColor: "#FFF" }
                ]}
                onPress={() => {
                    toggleExpand();
                    //but this can only update when re-turn on the collapse
                }}
            >
                <View style={styles.featureFlex}>
                    <View style={styles.featureInfo}>
                        <Text style={[styles.title]}>{props.feature}</Text>

                    </View>
                </View>
                <View style={styles.featureFlex}>

                </View>
                <View style={styles.featureFlex}>
                    <View style={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", flex: 1, marginRight: '20%' }}>
                        <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color="black" />
                    </View>
                </View>
                {defectNumCount == 0 ? <></> :
                <View style={styles.defectsBubble}>
                    <Text style={styles.defectsCount}>{defectNumCount}</Text>
                </View>
            }
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', flexDirection: "row" }}>
                {/* <View style={styles.formatButton}> */}
                    {expanded
                        ?
                        <View style={styles.formatButton}>
                        {showDefectButton}
                        </View>
                        : 
                        <></>    
                }
                {/* </View> */}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    font: {
        fontSize: 16,
        letterSpacing: 1,
        fontFamily: "NotoSansTC-Medium"
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        fontFamily: "NotoSansTC-Black",
        color: "black",
        letterSpacing: 3
    },
    itemActive: {
        fontSize: 12,
        color: "green",
    },
    itemInActive: {
        fontSize: 14,
        color: "black",
    },
    btnActive: {
        borderColor: "green",
    },
    btnInActive: {
        borderColor: "darkgray",
    },
    outerContainer:{
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2%',
        borderColor: '#696969',
        // position: 'relative'

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 70,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        // borderColor: '#696969',
        // borderWidth: 1,
        borderRadius: 16,
        // marginLeft: '5%',
        // marginRight: '5%',
        // marginBottom: '1.5%',
        position: 'relative'
    },
    featureFlex: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    featureInfo: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        marginLeft: '15%'
    },
    defectsBubble: {
        position: 'absolute',
        right: '-3%',
        top: "-35%",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    defectsCount: {
        fontSize: 22,
        color: 'white',
        fontWeight: '700'
    },
    formatButton: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        marginTop: "1%",
        marginBottom: "2%"
    },
    childRow: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "gray",
        height: 35,
        width: 120,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 10,
        marginTop: 10,
    },
    parentHr: {
        height: 1,
        color: "white",
        width: '100%'
    },
    // colorActive: {
    //     borderColor: "green",
    // },
    // colorInActive: {
    //     borderColor: "darkgray",
    // }

});