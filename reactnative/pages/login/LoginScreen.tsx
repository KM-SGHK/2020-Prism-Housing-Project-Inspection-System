import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    ImageBackground,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { login } from '../../redux/auth/actions';
import { ROLES } from "../../variables/General";
import { selectedTower, selectedFloor, selectedRoom, selectedType } from '../../redux/flat/SelectActions';
import { showFlatAll } from '../../redux/flat/SearchActions';


const LoginScreen = () => {
    // 2. group form data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // 6. page-changing (redirect) through navigation
    const navigation = useNavigation();

    // 4. get login status
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const user = useSelector((state: RootState) => state.auth.user)

    // 3. send form data to thunk for submission
    const onLogin = () => {
        dispatch(login(username.toLowerCase(), password))
    };

    // 5. page redirection actions based on login status
    useEffect(() => {
        // roleID 寫法跟actions.ts interface
        if (isAuthenticated) {
            if (user?.role_id === ROLES.DEVELOPER) {
                navigation.dispatch(
                    StackActions.replace('Developer'))
            } else if (user?.role_id === ROLES.INSPECTOR) {
                navigation.dispatch(
                    StackActions.replace('Inspector'))
            }

        }
    }, [isAuthenticated, navigation])

    useEffect(()=>{
        dispatch(selectedTower(""));
        dispatch(selectedFloor(""));
        dispatch(selectedRoom(""));
        dispatch(selectedType(""));
        dispatch(showFlatAll("","","",""));
    },[])

    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    
    return (
        <>
            <StatusBar hidden={true} />
            <ImageBackground
                style={styles.bgImage}
                source={require('../../assets/uploads/banner_photo_blurred.png')}>
            <View style={styles.loginContainer}>
                <Text style={{fontSize:80,fontFamily:'NotoSansTC-Thin', color:'#ffffff'}}>Prism</Text>
                <Text style={{fontSize:26,fontFamily:'NotoSansTC-Thin', marginBottom:30, color:'#f0f0f0'}}>Revamping Building Inspection</Text>
                <View 
                    style={usernameFocus ? styles.inputFieldFocused : styles.inputField}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="username" 
                        placeholderTextColor="grey"
                        value={username}
                        caretHidden={true} 
                        multiline={false}
                        autoFocus={true}
                        onFocus={()=>{setUsernameFocus(true)}}
                        onBlur={()=>{setUsernameFocus(false)}}
                        onChangeText={setUsername} />
                </View>
                <View style={passwordFocus ? styles.inputFieldFocused : styles.inputField}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="password" 
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        value={password} 
                        caretHidden={true} 
                        multiline={false}
                        onFocus={()=>{setPasswordFocus(true)}}
                        onBlur={()=>{setPasswordFocus(false)}}
                        onChangeText={setPassword} />
                </View>
                {/* 1.1. Login Process, on press, call the above "onLogin   " function */}
                <TouchableOpacity 
                    style={styles.loginTouchable}
                    onPress={onLogin}>
                    
                        <Text style={styles.loginButtonText}>Login</Text>
                    
                </TouchableOpacity>
                
                <Text style={styles.subText}>2020 Team Prism All Rights Reserved</Text>

            </View>
            </ImageBackground>
        </>
    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    bgImage:{
        width:'100%',
        height:'100%',
        backgroundColor:'black',
        resizeMode:'cover',
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    loginContainer: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '65%', 
        width:'50%',
    },
    inputField: {
        width:506,
        borderWidth:1,
        borderColor: 'white',
        borderRadius:100,
        paddingVertical:10,
        paddingHorizontal:20,
        marginVertical:10,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    inputFieldFocused: {
        width:506,
        borderWidth:2,
        borderColor: 'white',
        borderRadius:100,
        paddingVertical:10,
        paddingHorizontal:20,
        marginVertical:10,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    inputText: {
        color:'white',
        fontSize:30,
        textAlign:'center',
        paddingHorizontal:20,
        paddingVertical:10,
    },
    loginTouchable:{
        width:506,
        backgroundColor:'#F7D732',
        borderWidth:1,
        borderColor:'#F7D732',
        borderRadius:100,
        paddingVertical:10,
        paddingHorizontal:20,
        marginVertical:10,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    loginButton: {
        width:506,
        borderWidth:1,
        borderColor:'#F7D732',
        borderRadius:100,
        paddingVertical:10,
        paddingHorizontal:20,
        marginVertical:10,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    loginButtonText: {
        fontSize:30,
        textAlign:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        color:'grey',
        fontWeight:'400'
    },
    subText: {
        fontSize:14,
        fontWeight:'200',
        marginTop:10,
        color:'#f0f0f0',
        fontFamily:'NotoSansTC-Light'
    }
});

