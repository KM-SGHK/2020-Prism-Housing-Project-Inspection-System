import React, { useEffect } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { restoreLogin } from '../../redux/auth/actions';
import { RootState } from '../../store';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ROLES } from "../../variables/General";
import { State } from 'react-native-gesture-handler';


const LoadingScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        dispatch(restoreLogin())
    }, [useDispatch])

    // refer to app.tsx, LoginStack
    useEffect(() => {
        if (isAuthenticated == null) {
            return;
        }
        let page = 'Login';
        if (isAuthenticated) {
            if (user?.role_id === ROLES.DEVELOPER) {
                // navigation.dispatch(
                //     StackActions.replace('Developer'))
                page = 'Developer';
            } else if (user?.role_id === ROLES.INSPECTOR) {
                // navigation.dispatch(
                //     StackActions.replace('Inspector'))
                page = 'Inspector';
            }
            // 
        }
        //  else {
        //     navigation.dispatch(
        //         StackActions.replace('Login')
        //     )
        // }
        navigation.dispatch(StackActions.replace(page));
    }, [isAuthenticated]);

    return (
        <>
            <StatusBar hidden={true}/>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor:'black',
            }}>
                <ActivityIndicator size="large"/>
            </View>
        </>
    )
}

export default LoadingScreen;


const styles = StyleSheet.create({
  
});
