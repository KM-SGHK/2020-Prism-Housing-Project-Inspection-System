import React, { useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
//@ts-ignore
import UserCircle from '../assets/icons/user-circle.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../redux/auth/actions';


const LogoTopRight = () => {
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.auth.user.username)
    const [modalVisible, setModalVisible] = useState(false);

    const onLogout = () => {
        dispatch(logout())
    };


    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <TouchableOpacity 
                    style={styles.modalBackground} 
                    activeOpacity={1} 
                    onPress={() => {setModalVisible(false)}}
                >

                    
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>User: {username}</Text>
                    <Text style={styles.modalText}>Inspector ID: 1362</Text>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "red" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                onLogout();
                            }}
                            >
                            <Text style={styles.textStyle}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>
            </Modal>
            
            <View
                style={{ height: 50, width: 50, bottom: '1%', right: '46%', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={()=>{
                        setModalVisible(true);
                    }}>
                    <UserCircle
                        height={41}
                        width={41}
                        fill="black"
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}


export default LogoTopRight;


const styles = StyleSheet.create({
    modalBackground: {
        height:'100%',
        width:'100%',
        backgroundColor:'transparent',
        opacity: 1,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginTop: 0
    },
    modalView: {
      margin: 20,
      paddingHorizontal: 55,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.55,
      shadowRadius: 4.84,
      elevation: 15,
      opacity:0.95,
      marginTop: 110
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 9,
      paddingVertical: 10,
      paddingHorizontal: 28,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  