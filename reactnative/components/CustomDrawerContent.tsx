import React, { useEffect } from 'react';
import {
    Linking,
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../redux/auth/actions';


function CustomDrawerContent(props) {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
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
    }, [isAuthenticated, navigation]);


    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="管理員專頁(網頁版)"
          labelStyle={{color:'#F7D732', fontSize: 24, fontWeight:'500', paddingLeft:8}}
          style={{padding: 6, borderBottomWidth:2, borderBottomColor:'#666666',}}
          onPress={() => Linking.openURL('https://gdmorning.club')} //link externally to WebApp
        />
        <DrawerItem
          label="[  登 出  ]"
          labelStyle={{color:'#F7D732', fontSize: 24, fontWeight:'500', paddingLeft:8}}
          style={{padding: 6, borderBottomWidth:2, borderBottomColor:'#666666',}}
          onPress={onLogout}
        />
      </DrawerContentScrollView>
    );
  }


  export default CustomDrawerContent