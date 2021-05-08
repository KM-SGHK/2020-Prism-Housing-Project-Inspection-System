import React from 'react'
import {
    View,
    TouchableOpacity,
    useWindowDimensions,
  } from 'react-native';
//@ts-ignore
import BarIcon from '../assets/icons/bars.svg';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const HeaderBar = () => {
    const navigation = useNavigation()
    const dimensions = useWindowDimensions();

    return (
        <>
            <View style={{ backgroundColor: '#F7D732', height: 100, alignItems:'center', flexDirection:'row-reverse' }}>
                {dimensions.width < 900 &&
                    <TouchableOpacity 
                        style={{marginRight:30, marginTop:12}}
                        onPress={()=>{
                            navigation.dispatch(DrawerActions.openDrawer());
                        }}>
                        <BarIcon height={32} width={36} fill='black'/>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}



export default HeaderBar