import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    GestureResponderEvent,
    Modal,
    TouchableOpacity,
} from 'react-native';
import Svg, { Circle, Pattern, Defs } from 'react-native-svg';
//@ts-ignore
import ListIcon from '../assets/icons/list-ul.svg'
//@ts-ignore
import CheckBoardIcon from '../assets/icons/clipboard-check.svg'
//@ts-ignore
import MapIcon from '../assets/icons/map-marked-alt.svg';
//@ts-ignore
import CloseIcon from '../assets/icons/close-button.svg';
//@ts-ignore
import DropdownIcon from '../assets/icons/chevron-circle-down.svg'
import { floorplan } from '../pages/inspector/assets/SvgArr';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { saveTempDefectXY } from '../redux/newRecords/actions';


const Banner = (props: { feature: string, defect: string, defectX: number, defectY:number }) => {
    const [modalOn, setModalOn] = useState(false);


    const locationX = useSelector((state: RootState)=>state.newRecord.defectX);
    const locationY = useSelector((state: RootState)=>state.newRecord.defectY);
    const dispatch = useDispatch();


    const saveMarker = (e: GestureResponderEvent) => {
        dispatch(saveTempDefectXY(Math.round(e.nativeEvent.locationX),Math.round(e.nativeEvent.locationY)))
    }

    const selectedFlatId = useSelector((state: RootState)=>state.idSaving.flatId)

    const showFloorplan = floorplan.map((value, index) =>{
        // const string = `./assets/${value.floorplan}`;
        if(selectedFlatId==value.flat_id.toString()){
        const Carmel = value.floorplan;
        return(
          <Carmel key={index} width="750" height="750"/>
        )}
      })
    

    return (
        <>
            <View style={{ backgroundColor: '#ffffff', height: 240, paddingBottom: 8, alignItems: 'center' }}>
                
            {/* 檢驗部件 */}
                <View style={{
                    backgroundColor: '#fff',
                    flex: 1,
                    width: '85%',
                    borderColor: '#000000',
                    borderWidth: 2,
                    borderRadius: 12,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <CheckBoardIcon
                        height={'35%'}
                        width={'16%'}
                        fill="black" />
                    <Text style={{
                        fontSize: 25
                    }}>檢驗部件： {props.feature}</Text>
                </View>

            {/* 瑕疵類別 */}    
                <View style={{
                    backgroundColor: '#fff',
                    flex: 1,
                    width: '85%',
                    marginTop: 8,
                    borderColor: '#000000',
                    borderWidth: 2,
                    borderRadius: 12,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <ListIcon
                        height={'35%'}
                        width={'16%'}
                        fill="black" />
                    <Text style={{
                        fontSize: 25
                    }}>瑕疵類別： {props.defect}</Text>
                </View>

            {/* 瑕疵位置 */}   
                <TouchableOpacity 
                style={{
                    backgroundColor: '#F7D732',
                    flex: 1,
                    width: '85%',
                    marginTop: 8,
                    borderColor: '#000000',
                    borderWidth: 2,
                    borderRadius: 12,
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'relative'
                }}
                onPress={()=>{setModalOn(!modalOn)}}>
                    <MapIcon
                        height={'35%'}
                        width={'16%'}
                        fill="black" />
                    <Text style={{
                        fontSize: 25
                    }}>請選擇瑕疵位置</Text>
                    <DropdownIcon
                        position="absolute"
                        right="0%"
                        height={'35%'}
                        width={'16%'}
                        fill="black" />
                </TouchableOpacity>

                

            {/* Floorplan Modal */}
                <Modal visible={modalOn} animationType={"slide"} transparent={false} onRequestClose={() => setModalOn(!modalOn)}>
                    <TouchableOpacity style={styles.modalContainer}
                    activeOpacity={0.7} 
                    onPress={() => {setModalOn(false)}}>
                                <CloseIcon
                                    position={"absolute"}
                                    top={30}
                                    right={20}
                                    height={'8%'}
                                    width={'8%'}
                                    fill="black"
                                    onPress={() => { setModalOn(false); }}
                                />
                        <View style={styles.svgContainer}>
                            <TouchableOpacity style={styles.svg}
                                onPress={(e) => {
                                    saveMarker(e);
                                }}
                            >
                                <Svg width="750" height="750">
                                    {showFloorplan}
                                    <Circle cx={props.defectX==-100?locationX: props.defectX} cy={props.defectY==-100?locationY: props.defectY} r="20" stroke="black" stroke-width="3" fill="red" />
                                    {console.log(locationX, locationY)}
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

            </View>
        </>
    )
}


export default Banner;

const styles = StyleSheet.create({
    closeButton:{
        position:"absolute",
        top:100,
        right:100
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "black",
        opacity: 0.7,
    },
    svgContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 750,
        height: 750
    },
    svg:
    {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        position: "relative",
        width: 750,
        height: 750
    }
});