import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { Text, Picker, Button, View, Alert, StyleSheet, Modal, StatusBar } from 'react-native';
import { TouchableHighlight, TouchableOpacity, State } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { showTowerAll, showFloorAll, showRoomAll, showTypeAll } from '../../redux/flat/SearchActions';
import { selectedTower, selectedFloor, selectedRoom, selectedType } from '../../redux/flat/SelectActions';

// import {FormLabel}  from 'react-native-elements';


export function TowerDropdown() {
    const [modalOn,setModalOn] = useState(false);
    const dispatch = useDispatch(); 
    // console.log(useSelector((state:RootState)=> state.select))

    const onSelectedTower= (selectedTowerValue) => {
        dispatch (selectedTower(selectedTowerValue))
    }

    const selectedTowerValue = useSelector((state:RootState)=> state.select.selectedTowerValue)

    const onTower = () => {
        dispatch(showTowerAll())
    };

    const towerValues = useSelector((state:RootState) => state.search.towerValues)

    const towerValue = 
        towerValues.map((value, index) => 
        <TouchableOpacity
            key={index}
            onPress={() => {onSelectedTower(value.tower);setModalOn(false)}}
            style={styles.modalSelection}>
            <Text style={styles.selectionTitle}>{value.tower}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.dropDownContainer}>
            <View style={styles.flexLabelAndButton}>
            <Text style={styles.label}>座號:</Text>
            <TouchableOpacity 
                onPress={()=> {onTower();setModalOn(true)}} 
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                    {selectedTowerValue}
                </Text>
            </TouchableOpacity>
            </View>

            <Modal visible={modalOn} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
            {/* <TouchableOpacity style={styles.modalContainer} onPress={() => {setModalOn(!modalOn)}}> */}
                <View style={styles.modalContainer}>
                    {/* <View> */}
                    <Text style={styles.modalHeader}>座號選擇</Text>
                    {towerValue}
                    <TouchableOpacity
                        onPress={() => {onSelectedTower(''); setModalOn(false)}} 
                        style={styles.modalSelection}>
                        <Text style={{ color: '#999' , paddingBottom:10 }}>清除並取消</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
                {/* </TouchableOpacity> */}
            </Modal>
        </View>

    )
}

export function FloorDropdown() {
    const [modalOn,setModalOn] = useState(false)
    const dispatch = useDispatch();

    const onSelectedFloor= (selectedFloorValue) => {
        dispatch (selectedFloor(selectedFloorValue))
    }

    const selectedFloorValue = useSelector((state:RootState)=> state.select.selectedFloorValue)

    const onFloor = () => {
        dispatch(showFloorAll())
    };
    const floorValues = useSelector((state:RootState) => state.search.floorValues)

    const floorValue = floorValues.map((value, index) => 
        <TouchableOpacity
            key={index}
            onPress={() => {onSelectedFloor(value.floor);setModalOn(false)}}
            style={styles.modalSelection}>
            <Text style={styles.selectionTitle}>{value.floor}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.dropDownContainer}>
            <View style={styles.flexLabelAndButton}>
            <Text style={styles.label}>樓層:</Text>
            <TouchableOpacity 
                onPress={()=> {onFloor();setModalOn(true)}} 
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                    {selectedFloorValue}
                </Text>
            </TouchableOpacity>
            </View>

            <Modal visible={modalOn} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>樓層選擇</Text>
                    {floorValue}
                    <TouchableOpacity
                        onPress={() => {onSelectedFloor(''); setModalOn(false)}} 
                        style={styles.modalSelection}>
                        <Text style={{ color: '#999', paddingBottom:10  }}>清除並取消</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>

    )
}

export function RoomDropdown() {
    const [modalOn,setModalOn] = useState(false)
    const dispatch = useDispatch();

    const onSelectedRoom= (selectedRoomValue) => {
        dispatch (selectedRoom(selectedRoomValue))
    }

    const selectedRoomValue = useSelector((state:RootState)=> state.select.selectedRoomValue)

    const onRoom = () => {
        dispatch(showRoomAll())
    };
    const roomValues = useSelector((state:RootState) => state.search.roomValues)

    const roomValue = roomValues.map((value, index) => 
        <TouchableOpacity
            key={index}
            onPress={() => {onSelectedRoom(value.room);setModalOn(false)}}
            style={styles.modalSelection}>
            <Text style={styles.selectionTitle}>{value.room}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.dropDownContainer}>
            <View style={styles.flexLabelAndButton}>
            <Text style={styles.label}>室號:</Text>
            <TouchableOpacity 
                onPress={()=>{onRoom(); setModalOn(true)}} 
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                    {selectedRoomValue}
                </Text>
            </TouchableOpacity>
            </View>

            <Modal visible={modalOn} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>室號選擇</Text>
                    {roomValue}
                    <TouchableOpacity
                        onPress={() => {onSelectedRoom(''); setModalOn(false)}} 
                        style={styles.modalSelection}>
                        <Text style={{ color: '#999' , paddingBottom:10 }}>清除並取消</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>

    )
}

export function TypeDropdown() {
    const [modalOn,setModalOn] = useState(false)
    const dispatch = useDispatch();

    const onSelectedType= (selectedTypeValue) => {
        dispatch (selectedType(selectedTypeValue))
    }

    const selectedTypeValue = useSelector((state:RootState)=> state.select.selectedTypeValue)

    const onType = () => {
        dispatch(showTypeAll())
    };
    const typeValues = useSelector((state:RootState) => state.search.typeValues)

    const typeValue = typeValues.map((value, index) => 
        <TouchableOpacity
            key={index}
            onPress={() => {onSelectedType(value.type);setModalOn(false)}}
            style={styles.modalSelection}>
            <Text style={styles.selectionTitle}>{value.type}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.dropDownContainer}>
            <View style={styles.flexLabelAndButton}>
            <Text style={styles.label}>房型:</Text>
            <TouchableOpacity 
                onPress={()=> {onType();setModalOn(true)}} 
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                    {selectedTypeValue}
                </Text>
            </TouchableOpacity>
            </View>

            <Modal visible={modalOn} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>房型選擇</Text>
                    {typeValue}
                    <TouchableOpacity
                        onPress={() => {onSelectedType(''); setModalOn(false)}} 
                        style={styles.modalSelection}>
                        <Text style={{ color: '#999', paddingBottom:10 }}>清除並取消</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    dropDownContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer:{
        margin: 20,
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.5,
        elevation: 8,
        bottom: 10,
        left: 20,
        right: 20,
        position: 'absolute',
        alignItems: 'center'
    },
    modalHeader:{
        fontWeight: '800',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    modalSelection: {
        paddingTop: 4,
        paddingBottom: 4,
        alignItems: 'center'
    },
    flexLabelAndButton:{
        display: "flex",
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonContainer:{
        width:220,
        height:35,
        backgroundColor: "#efefef",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 8,
    },
    label:{
        fontSize:18,
        fontWeight: '500',
        paddingRight: 20
    },
    buttonText:{
        fontWeight: '400',
        color: 'blue'
    },
    selectionTitle:{
        marginBottom: 10,
        width: 200,
        textAlign: 'center'
    }
})